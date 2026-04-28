'use strict';

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs').promises;

const app = express();

// Security & parsing middleware
app.disable('x-powered-by');
app.use(cors()); // Configure more strictly in production if needed
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Mount health route from ./routes/health.js if available, otherwise provide a safe fallback.
// The mounted route should respond with { status: 'ok', uptime: <number> } where uptime is seconds.
try {
  // eslint-disable-next-line global-require, import/no-dynamic-require
  const healthRouter = require('./routes/health');
  if (typeof healthRouter === 'function' || typeof healthRouter === 'object') {
    app.use('/health', healthRouter);
  } else {
    // Fallback if the module doesn't export a router: create simple route
    app.get('/health', (req, res) => {
      res.json({ status: 'ok', uptime: process.uptime() });
    });
  }
} catch (err) {
  // If require fails, still expose a minimal health endpoint to support readiness checks.
  // Do not crash the app because of a missing optional route file.
  // Log the error for debugging but keep the process running.
  // eslint-disable-next-line no-console
  console.info('Optional health route module not found or failed to load; using built-in /health handler.', err && err.message);
  app.get('/health', (req, res) => {
    res.json({ status: 'ok', uptime: process.uptime() });
  });
}

// Serve client static assets (supporting common build outputs).
// Register both Vite's "dist" and create-react-app style "build" directories.
// express.static is safe to register even if the directory doesn't exist.
const clientDist = path.join(__dirname, '..', 'client', 'dist');
const clientBuild = path.join(__dirname, '..', 'client', 'build');

// Use a cache policy appropriate for static built assets; index is handled by SPA fallback below.
const staticOptions = {
  index: false,
  maxAge: '1d',
  immutable: true,
};

app.use(express.static(clientDist, staticOptions));
app.use(express.static(clientBuild, staticOptions));

// SPA fallback: always try to serve index.html from the first existing client build.
// This handler is asynchronous and non-blocking.
app.get('*', async (req, res, next) => {
  try {
    const indexCandidates = [
      path.join(clientDist, 'index.html'),
      path.join(clientBuild, 'index.html'),
    ];

    for (const candidate of indexCandidates) {
      try {
        // Use fs.access to test file existence without blocking the event loop.
        await fs.access(candidate);
        return res.sendFile(candidate);
      } catch (e) {
        // File not found - continue to next candidate
      }
    }

    // If no index.html found, respond with a small helpful message (not exposing internals).
    // This avoids leaking file system information and is useful for debugging in CI.
    res.status(404).send('Client application not built. Please run the client build before starting the server.');
  } catch (err) {
    next(err);
  }
});

// Generic error handler - keeps error responses consistent and avoids stack traces leaking in production.
app.use((err, req, res, next) => {
  // eslint-disable-next-line no-console
  console.error('Unhandled error in request pipeline:', err && err.stack ? err.stack : err);
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server only when run directly (not when required by tests).
if (require.main === module) {
  const port = Number.parseInt(process.env.PORT, 10) || 3001;

  const server = app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.info(`Server listening on port ${port} (env: ${process.env.NODE_ENV || 'development'})`);
  });

  // Graceful shutdown handlers
  const shutdown = (signal) => {
    // eslint-disable-next-line no-console
    console.info(`Received ${signal}; closing server...`);
    server.close((err) => {
      if (err) {
        // eslint-disable-next-line no-console
        console.error('Error while closing server:', err);
        process.exit(1);
      }
      // eslint-disable-next-line no-console
      console.info('Server closed; exiting process.');
      process.exit(0);
    });

    // Force exit if shutdown takes too long
    setTimeout(() => {
      // eslint-disable-next-line no-console
      console.warn('Forcing shutdown after timeout.');
      process.exit(1);
    }, 30_000).unref();
  };

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));

  process.on('unhandledRejection', (reason) => {
    // eslint-disable-next-line no-console
    console.error('Unhandled Rejection at:', reason);
  });

  process.on('uncaughtException', (err) => {
    // eslint-disable-next-line no-console
    console.error('Uncaught Exception thrown:', err);
    // Attempt graceful shutdown
    shutdown('uncaughtException');
  });
}

module.exports = app;
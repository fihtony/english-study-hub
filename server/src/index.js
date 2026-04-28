const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const app = express();

// Basic configuration
const NODE_ENV = process.env.NODE_ENV || 'development';
const CLIENT_ORIGINS = (process.env.CLIENT_ORIGINS || 'http://localhost:5173').split(',');

// Security-related headers (lightweight, avoid extra deps)
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  // modern browsers ignore X-XSS-Protection; set to 0 to avoid inconsistent behavior
  res.setHeader('X-XSS-Protection', '0');
  next();
});

// Logging
const morganFormat = NODE_ENV === 'production' ? 'combined' : 'dev';
app.use(morgan(morganFormat, {
  skip: (req, res) => req.path === '/api/health' // reduce noise for health checks
}));

// Body parsing with size limit to mitigate large payload abuse
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: false, limit: '10kb' }));

// CORS configuration: allow local dev origin and any additional origins via env var
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (e.g., mobile apps, curl)
    if (!origin) return callback(null, true);
    if (CLIENT_ORIGINS.indexOf(origin) !== -1) {
      return callback(null, true);
    }
    const msg = `CORS policy: origin '${origin}' not allowed`;
    return callback(new Error(msg), false);
  },
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Trust proxy if behind a reverse proxy (Heroku, etc.)
if (process.env.TRUST_PROXY === 'true') {
  app.set('trust proxy', true);
}

// API router
const api = express.Router();

/**
 * GET /api/health
 * Healthcheck used by container orchestrators and monitoring
 */
api.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

/**
 * GET /api/content
 * Returns static metadata consumed by the frontend for initial render.
 * This keeps the endpoint idempotent and safe (no user input required).
 */
api.get('/content', (req, res) => {
  const content = {
    title: 'Constellation — Community',
    description: 'Implementation of CSTL-4 Figma page: wireframes & UI kit driven layout.',
    updatedAt: new Date().toISOString(),
    links: {
      figma: 'https://www.figma.com/design/gxd2LNayM2hh3V3qTlcyPF/Website-Wireframes-UI-Kit--Community-?node-id=1-470'
    }
  };
  res.json(content);
});

app.use('/api', api);

// Serve static assets in production if present (optional)
if (NODE_ENV === 'production') {
  const staticRoot = path.join(__dirname, '..', 'client', 'dist');
  app.use(express.static(staticRoot, { maxAge: '1d', index: false }));
  // Fallback to index.html for SPA routes
  app.get('*', (req, res, next) => {
    const indexPath = path.join(staticRoot, 'index.html');
    res.sendFile(indexPath, (err) => {
      if (err) next(err);
    });
  });
}

// 404 handler for unknown API endpoints
app.use((req, res, next) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'Not Found' });
  }
  // For non-API, let other handlers manage (e.g., static SPA)
  next();
});

// Centralized error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // Log server-side errors with some context
  const safeMessage = err && err.message ? err.message : 'Internal Server Error';
  console.error(`[server] ${new Date().toISOString()} - Error on ${req.method} ${req.originalUrl} - ${safeMessage}`);

  // If it's a CORS rejection from our corsOptions, it will be an Error with message already set
  if (res.headersSent) {
    return next(err);
  }

  const status = err && err.status && Number.isInteger(err.status) ? err.status : 500;
  res.status(status).json({
    error: status === 500 ? 'Internal Server Error' : safeMessage
  });
});

// Export app for testing and external run control
module.exports = app;

// If run directly, start the server
if (require.main === module) {
  const DEFAULT_PORT = 4000;
  const port = Number.parseInt(process.env.PORT, 10) || DEFAULT_PORT;

  const server = app.listen(port, () => {
    console.log(`[server] Listening on port ${port} (env=${NODE_ENV})`);
  });

  // Handle server errors
  server.on('error', (err) => {
    console.error(`[server] Failed to start: ${err && err.message ? err.message : err}`);
    process.exit(1);
  });

  // Graceful shutdown
  const shutdown = (signal) => {
    console.log(`[server] Received ${signal}. Shutting down...`);
    server.close((closeErr) => {
      if (closeErr) {
        console.error('[server] Error during shutdown:', closeErr);
        process.exit(1);
      }
      console.log('[server] Shutdown complete.');
      process.exit(0);
    });
    // Force exit if not closed within timeout
    setTimeout(() => {
      console.warn('[server] Shutdown timeout, forcing exit.');
      process.exit(1);
    }, 10000).unref();
  };

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));

  // Catch unhandled promise rejections
  process.on('unhandledRejection', (reason) => {
    console.error('[server] Unhandled Rejection:', reason);
  });
}
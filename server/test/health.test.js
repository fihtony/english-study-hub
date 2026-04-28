const request = require('supertest');
const app = require('../index'); // server/index.js
const healthRouteModule = require('../routes/health'); // keep reference if exported handlers exist

describe('GET /health endpoint', () => {
  // Helper to find the express route layer for /health GET
  function findHealthRouteLayer() {
    if (!app || !app._router || !Array.isArray(app._router.stack)) return null;
    // Find layer with route and path === '/health'
    for (const layer of app._router.stack) {
      if (layer && layer.route && layer.route.path === '/health') {
        // ensure it has a GET handler
        const methods = layer.route.methods || {};
        if (methods.get) return layer;
      }
    }
    return null;
  }

  test('should return 200 JSON with status "ok" and numeric uptime', async () => {
    const res = await request(app)
      .get('/health')
      .set('Accept', 'application/json')
      .expect('Content-Type', /application\/json/)
      .expect(200);

    expect(res.body).toBeDefined();
    expect(res.body.status).toBe('ok');
    expect(typeof res.body.uptime).toBe('number');
    // uptime should be non-negative
    expect(res.body.uptime).toBeGreaterThanOrEqual(0);
  });

  test('should return 404 for unsupported method (POST /health)', async () => {
    // POSTing to GET-only endpoints should yield 404 from Express default
    await request(app)
      .post('/health')
      .send({ some: 'payload' })
      .set('Accept', 'application/json')
      .expect(404);
  });

  test('should return 500 when route handler throws an error (simulated)', async () => {
    const layer = findHealthRouteLayer();
    if (!layer) {
      // If route not found, fail test explicitly
      throw new Error('Health route not found on app; cannot simulate internal error');
    }

    // The route's stack contains handlers; find a GET handler index
    const routeStack = Array.isArray(layer.route.stack) ? layer.route.stack : [];
    let handlerIndex = -1;
    for (let i = 0; i < routeStack.length; i++) {
      const item = routeStack[i];
      // routeStack items are objects with handle function and method info
      if (item && item.method === 'get') {
        handlerIndex = i;
        break;
      }
      // fallback: if only one handler exists, use it
      if (routeStack.length === 1) handlerIndex = 0;
    }

    if (handlerIndex === -1) {
      // As a last resort, try to find any handler function to replace
      if (routeStack.length > 0) handlerIndex = 0;
      else throw new Error('No handler found to mock on /health route');
    }

    const originalHandle = routeStack[handlerIndex].handle;
    // Replace handler with one that throws synchronously
    routeStack[handlerIndex].handle = function simulatedErrorHandler(/* req, res, next */) {
      throw new Error('simulated internal error');
    };

    try {
      const res = await request(app)
        .get('/health')
        .set('Accept', 'application/json');

      // Expect server returned 500 Internal Server Error
      expect(res.status).toBe(500);
      // Response content-type may vary; prefer checking status. If JSON, ensure it's safe.
      if (res.headers['content-type'] && /json/.test(res.headers['content-type'])) {
        expect(res.body).toBeDefined();
        // Do not assert error message contents (avoid depending on env-specific error handlers)
      }
    } finally {
      // Restore original handler to avoid side effects for other tests
      routeStack[handlerIndex].handle = originalHandle;
    }
  });
});
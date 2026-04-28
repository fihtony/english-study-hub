'use strict';

const request = require('supertest');
const app = require('../index');

describe('GET /api/health (AC3)', () => {
  test('responds 200 and body {status: "ok"}', async () => {
    const res = await request(app)
      .get('/api/health')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    // exact body match required by AC3
    expect(res.body).toEqual({ status: 'ok' });
  });

  test('response is JSON and contains status field', async () => {
    const res = await request(app)
      .get('/api/health')
      .set('Accept', 'application/json');

    expect(res.headers['content-type']).toMatch(/application\/json/);
    expect(res.body).toBeDefined();
    expect(res.body.status).toBe('ok');
  });
});

// Attempt graceful shutdown if index exported a server instance with close()
afterAll(() => {
  if (app && typeof app.close === 'function') {
    return new Promise((resolve) => app.close(resolve));
  }
  // If app is an express application, no-op. Jest should exit cleanly.
});
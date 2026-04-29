const request = require('supertest');
const app = require('../server');

describe('Server Endpoints', () => {
  it('GET / should return 200 and HTML', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.type).toEqual('text/html');
  });

  it('POST /api/chat should handle validation', async () => {
    const res = await request(app).post('/api/chat').send({});
    // Should fail because messages is missing
    expect(res.statusCode).not.toBe(200);
  });
});

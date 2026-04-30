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
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  it('POST /api/translate should handle validation', async () => {
    const res = await request(app).post('/api/translate').send({ targetLang: 'hi' });
    // Should fail because text is missing
    expect(res.statusCode).toBe(400);
  });

  it('POST /api/factcheck should handle validation', async () => {
    const res = await request(app).post('/api/factcheck').send({ lang: 'en' });
    expect(res.statusCode).toBe(400);
  });

  it('POST /api/constituency should handle validation', async () => {
    const res = await request(app).post('/api/constituency').send({ pincode: '123', lang: 'en' });
    expect(res.statusCode).toBe(400);
  });

  it('Catch-all route should serve index.html for non-api routes', async () => {
    const res = await request(app).get('/any-route');
    expect(res.statusCode).toEqual(200);
    expect(res.type).toEqual('text/html');
  });
});

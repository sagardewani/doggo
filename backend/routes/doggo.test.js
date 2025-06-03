import request from 'supertest';
import app from '../app';

describe('GET /doggo-api/cities', () => {
  it('should return a list of cities', async () => {
    const res = await request(app).get('/doggo-api/cities');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

describe('GET /doggo-api/vendors', () => {
  it('should return a list of vendors', async () => {
    const res = await request(app).get('/doggo-api/vendors');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toHaveProperty('id');
    expect(res.body[0]).toHaveProperty('name');
  });
});

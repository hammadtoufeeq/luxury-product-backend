import request from 'supertest'
import mongoose from 'mongoose'
import app from '../index.js'

describe('GET /products', function () {
  test('should return 200 and an array', async function () {
    const response = await request(app).get('/products')

    expect(response.status).toBe(200)
    expect(Array.isArray(response.body)).toBe(true)
  })
})

afterAll(async function () {
  await mongoose.connection.close()
})
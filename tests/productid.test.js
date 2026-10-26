import request from 'supertest'
import mongoose from 'mongoose'
import app from '../index.js'
import Product from '../models/Product.js'

describe('GET /products/:id', function () {
  test('should return 200 and the product for a valid id', async function () {
    const anyProduct = await Product.findOne()
    const response = await request(app).get(`/products/${anyProduct._id}`)

    expect(response.status).toBe(200)
    expect(response.body._id).toBe(anyProduct._id.toString())
  })

  test('should return 500 for a non-existent/invalid id format', async function () {
    const response = await request(app).get('/products/123')

    expect(response.status).toBe(500)
  })
})

afterAll(async function () {
  await mongoose.connection.close()
})
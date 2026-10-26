import request from 'supertest'
import mongoose from 'mongoose'
import app from '../index.js'
import User from '../models/User.js'

const uniqueEmail = `testuser_${Date.now()}@test.com`

describe('POST /users/signup', function () {
  test('should create a new user and return 201', async function () {
    const response = await request(app)
      .post('/users/signup')
      .send({ name: 'Test User', email: uniqueEmail, password: '12345678' })

    expect(response.status).toBe(201)
  })

  test('should return 400 if email already exists', async function () {
    const response = await request(app)
      .post('/users/signup')
      .send({ name: 'Test User', email: uniqueEmail, password: '12345678' })

    expect(response.status).toBe(400)
  })
})

afterAll(async function () {
  await User.deleteOne({ email: uniqueEmail })
  await mongoose.connection.close()
})
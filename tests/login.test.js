import request from 'supertest'
import mongoose from 'mongoose'
import app from '../index.js'

describe('POST /users/login', function () {
  test('should return 200 for valid credentials', async function () {
    const response = await request(app)
      .post('/users/login')
      .send({ email: 'hammadtoufeeq02@gmail.com', password: '123456789' })

    expect(response.status).toBe(200)
  })

  test('should return 401 for invalid credentials', async function () {
    const response = await request(app)
      .post('/users/login')
      .send({ email: 'sadasd@asdas.com', password: 'wrongpassword' })

    expect(response.status).toBe(401)
  })
})

afterAll(async function () {
  await mongoose.connection.close()
})
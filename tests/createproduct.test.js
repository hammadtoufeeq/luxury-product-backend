import request from 'supertest'
import mongoose from 'mongoose'
import app from '../index.js'

let createdProductId = null

describe('POST /products (admin protected)', function () {

  test('no login should return 401', async function () {
    const response = await request(app)
      .post('/products')
      .send({ name: 'Test Product', category: 'Watches', price: 100, image: 'x.jpg' })

    expect(response.status).toBe(401)
  })

  test('normal user should return 403', async function () {
    const loginResponse = await request(app)
      .post('/users/login')
      .send({ email: 'hammad1234@gmail.com', password: '1234' })

    const cookies = loginResponse.headers['set-cookie']

    const response = await request(app)
      .post('/products')
      .set('Cookie', cookies)
      .send({ name: 'Test Product', category: 'Watches', price: 100, image: 'x.jpg' })

    expect(response.status).toBe(403)
  })

  test('admin should return 201 and create product', async function () {
    const loginResponse = await request(app)
      .post('/users/login')
      .send({ email: 'hammadtoufeeq02@gmail.com', password: '123456789' })

    const cookies = loginResponse.headers['set-cookie']

    const response = await request(app)
      .post('/products')
      .set('Cookie', cookies)
      .send({ name: 'Test Product', category: 'Watches', price: 100, image: 'x.jpg' })

    expect(response.status).toBe(201)
    createdProductId = response.body._id
  })

})

afterAll(async function () {
  if (createdProductId) {
    await mongoose.connection.collection('products').deleteOne({ _id: new mongoose.Types.ObjectId(createdProductId) })
  }
  await mongoose.connection.close()
})
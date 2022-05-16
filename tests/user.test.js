const supertest = require('supertest')

const testEnv = require('./testEnv')
const app = require('../app')
const api = supertest(app)

beforeEach(async () => {
    jest.setTimeout(10000)
    await testEnv.initUsers()
})

test('There is one user', async () => {
    const response = await api.get('/api/users')
    
    expect(response.body).toHaveLength(1)
})

afterAll(() => {
    testEnv.closeConnection()
})
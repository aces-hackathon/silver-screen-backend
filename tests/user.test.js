const supertest = require('supertest')

const testEnv = require('./testEnv')
const testValues = require('./testValues')
const app = require('../app')
const api = supertest(app)

jest.setTimeout(40000)

beforeEach(async () => {
    await testEnv.initUsers()
})

test('There is one user', async () => {
    const response = await api.get('/api/users')
    
    expect(response.body).toHaveLength(1)
})

describe('User details tests', () => {
    test('Creates user when given valid details', async () => {
        const response = await api
            .post('/api/users')
            .send(testValues.userData)

        expect(response.body.phone).toBe(testValues.userData.phone)
    })

    test('Create user fails when given invalid details', async () => {
        const invalidUser = {
            ...testValues.userData,
            phone: '',
        }
        const response = await api
            .post('/api/users')
            .send(testValues.userData)

        expect(response.status).toBe(500)
    })
});


afterAll(() => {
    testEnv.closeConnection()
})
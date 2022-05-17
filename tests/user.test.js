const supertest = require('supertest')

const testEnv = require('./testEnv')
const initialValues = require('./initialValues')
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

describe('Create user tests', () => {
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
            .expect(500)
    })
});

describe('Get user values tests', () => {
    
    test('Find all users', async () => {
        const response = await api.get('/api/users')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('Find one user with phone', async () => {
        console.log(`/api/users/${testValues.userData[0].phone}`)
        const response = await api.get(`/api/users/${initialValues.userData[0].phone}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('Find one user fails with invalid phone value', async () => {
        const response = await api.get(`/api/users/5555555555`)
            .expect(400)
    })
})


afterAll(() => {
    testEnv.closeConnection()
})
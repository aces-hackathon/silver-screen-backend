const supertest = require('supertest')

const testEnv = require('./testEnv')
const initialValues = require('./initialValues')
const testValues = require('./testValues')
const app = require('../app')
const api = supertest(app)

jest.setTimeout(40000)

beforeEach(async () => {
    await testEnv.initTheatres()
})

test('There is one theatre', async () => {
    const response = await api.get('/api/theatres')
    
    expect(response.body).toHaveLength(1)
})

describe('Create theatre tests', () => {
    test('Creates theatre when given valid details', async () => {
        const response = await api
            .post('/api/theatres')
            .send(testValues.theatreData)

        expect(response.body.phone).toBe(testValues.userData.phone)
    })

    test('Create theatre fails when given invalid details', async () => {
        const invalidUser = {
            ...testValues.userData,
            phone: '',
        }
        const response = await api
            .post('/api/users')
            .send(testValues.userData)
            .expect(500)
    })
})

describe('Get theatre values tests', () => {
    
    test('Find all theatre', async () => {
        const response = await api.get('/api/theatres')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('Find one theatre with phone', async () => {
        const response = await api.get(`/api/theatres/${initialValues.theatreData[0].phone}`)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    })

    test('Find one theatre fails with invalid phone value', async () => {
        const response = await api.get(`/api/theatres/5555555555`)
            .expect(400)
    })
})

afterAll(() => {
    testEnv.closeConnection()
})
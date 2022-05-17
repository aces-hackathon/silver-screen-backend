const supertest = require('supertest')

const testEnv = require('./testEnv')
const testValues = require('./testValues')
const Theatre = require('../models/theatre.model')

const app = require('../app')
const api = supertest(app)

jest.setTimeout(40000)

beforeEach(async () => {
    const added = await testEnv.initSeatTypes()
})

test('There is one seat type', async () => {
    const response = await api.get('/api/seattypes')
    
    expect(response.body).toHaveLength(1)
})

describe('Create seat types tests', () => {
    test('Creates seat type when given valid details', async () => {
        let theatres = await Theatre.find({})

        const seatTypeObject = {
            ...testValues.seatTypeData,
            theatre: theatres[0].id
        }

        const response = await api
            .post('/api/seattypes')
            .send(seatTypeObject)
            .expect(200)
    })

    test('Create seat type fails when given invalid details', async () => {

        const invalidSeatType = {
            ...testValues.seatTypeData,
        }
        const response = await api
            .post('/api/seattypes')
            .send(invalidSeatType)
            .expect(200)
    })
});


afterAll(() => {
    testEnv.closeConnection()
})
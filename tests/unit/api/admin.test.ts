import { describe, test, expect } from 'bun:test'
import { generateAdmin } from 'tests/utils/generateAdmin'
import { request } from 'tests/utils/request'

describe('Admin API', () => {
    const admin = generateAdmin(30)
    let adminId = ''
    let authorizationKey = ''
    test.todo('Should register a new user', async () => {
        const { status, data } = await request.post<{ id: string, authorizationKey: string }>('/admin/', admin)
        expect(status).toBe(201)
        expect(data).toHaveProperty('id')
        expect(data).toHaveProperty('authorizationKey')
        adminId = data.id
        authorizationKey = data.authorizationKey
    })
    test.todo('Should throw error when using wrong password', async () => {
        const response = await request.post('/admin/login', { login: admin.email, password: 'Some Wrong Password' })
        expect(response.status).toBe(401)
    })
    test.todo('Should throw error when trying to create a new admin with the same email', async () => {
        const response = await request.post('/admin/', admin)
        expect(response.status).toBe(400)
    })
    test.todo('Should login with success', async () => {
        const response = await request.post('/admin/login', { login: admin.email, password: admin.password })
        expect(response.status).toBe(200)
    })
    test.todo('Should edit some admin info', async () => {
        const response = await request.put(`/admin/${adminId}`, { is_manager: true })
        expect(response.status).toBe(200)
    })
    test.todo('Should get admin protected infos by ID', async () => {
        const response = await request.get(`/admin/infos/${adminId}`, { headers: { Authorization: `Bearer ${authorizationKey}` } })
        expect(response.status).toBe(200)
        expect(response.data).toHaveProperty('name')
        expect(response.data).toHaveProperty('email')
        expect(response.data).not.toHaveProperty('password')
    })
    test.todo('Should fire the admin', async () => {
        const response = await request.delete(`/admin/${adminId}`, { headers: { Authorization: `Bearer ${authorizationKey}` } })
        expect(response.status).toBe(200)
        const response2 = await request.get(`/admin/infos/${adminId}`, { headers: { Authorization: `Bearer ${authorizationKey}` } })
        expect(response2.status).toBe(404)
    })
})
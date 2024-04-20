import { expect, test, it, beforeAll, describe, afterAll,  } from 'bun:test'
import { routes } from '@/routes'
import { ServerConfig } from '@/middlewares/http'
import { request } from '../../utils/request'
import { getUser } from '../../utils/generateUser'
import type { User } from '@/models/user'
import { type Server } from 'bun'
describe("User routes", async () => {
    const user = getUser()
    let userId = '';
    test("Should create new User", async () => {
        const { data, status } = await request.post<{ id: string }>('/user/', user)
        expect(status).toBe(201)
        expect(data).toHaveProperty('id')
        userId = data.id
    })
    test("Should throw error when using wrong password", async () => {
        const response = await request.post('/user/login', { login: user.CPF, password: 'Some Wrong Password'})
        expect(response.status).toBe(401)
    })
    test("Should login with sucess", async () => {
        const response = await request.post('/user/login', { login: user.CPF, password: user.password })
        expect(response.status).toBe(200)
    })
    test("Should edit some user info", async () => {
        const response = await request.put(`/user/${userId}`, { name: 'New Name' })
        expect(response.status).toBe(200)
    })
    test("Should get user protected infos by ID", async () => {
        const response = await request.get(`/user/infos/${userId}`)
        expect(response.status).toBe(200)
        expect(response.data).toHaveProperty('id')
        expect(response.data).toHaveProperty('name')
        expect(response.data).toHaveProperty('CPF')
        expect(response.data).not.toHaveProperty('password')
    })
    test("Should get user orders by ID", async () => {
        const response = await request.get(`/user/orders/${userId}`)
        expect(response.status).toBe(200)
        expect(Array.isArray(response.data)).toBe(true)
    })
    test("Should delete the user", async () => {
        const response = await request.delete(`/user/${userId}`)
        expect(response.status).toBe(200)
        const response2 = await request.get(`/user/infos/${userId}`)
        expect(response2.status).toBe(404)
    })
})
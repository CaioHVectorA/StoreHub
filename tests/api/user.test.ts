import { expect, test, it, beforeAll, describe, afterAll,  } from 'bun:test'
import { routes } from '../../src/routes'
import { ServerConfig } from '../../src/middlewares/http'
import { request } from '../utils/request'
import { getUser } from '../utils/generateUser'
import type { User } from '../../src/models/User'
import { type Server } from 'bun'
describe("User routes", async () => {
    const user = getUser()
    test("Should create new User", async () => {
        const { data, status } = await request.post('/user/', user)
        expect(status).toBe(201)
        expect(data).toContain('sucesso')
    })
    test("Should throw error when using wrong password", async () => {
        const response = await request.post('/user/login', { login: user.CPF, password: 'Some Wrong Password'})
        expect(response.status).toBe(401)
    })
    test("Should login with sucess", async () => {
        const response = await request.post('/user/login', { login: user.CPF, password: user.password })
        expect(response.status).toBe(200)
    })
    test("Should populate users", async () => {
        const promises = [] as Promise<any>[]
        for (let i = 0; i < 140; i++) {
            const newUser = getUser()
            promises.push(request.post('/user/', newUser))
        }
        const resolved = await Promise.all(promises)
        resolved.forEach((t) => {
            expect(t.status).toBe(201)
            expect(t.data).toContain('sucesso')
        })
    }, { timeout: 200 * 140 })
    test.todo("Should edit some user info", async () => {})
    test.todo("Should get user protected infos by ID", async () => {})
    test.todo("Should get user orders by ID", async () => {})
    test.todo("Should delete the user", async () => {})
    test.todo("Make a fixed order for 10-20 users")
    test.todo("Make a randomic order for 16-32 users")
    test.todo("Should get a ranking of the most 'rich' users with authorization", async () => {})
})
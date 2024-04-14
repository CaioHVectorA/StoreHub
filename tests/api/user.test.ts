import { expect, test, it, beforeAll, describe, afterAll,  } from 'bun:test'
import { routes } from '../../src/routes'
import { ServerConfig } from '../../src/middlewares/http'
import { request } from '../utils/request'
import { getUser } from '../utils/generateUser'
import type { User } from '../../src/models/User'
import { password, type Server } from 'bun'
describe("User routes", async () => {
    let USER = null as User | null
    let Server: Server;
    beforeAll(() => {
        // Guarant that is a list of product
        Server = Bun.serve({ ...ServerConfig })
    })
    test("The server is on", async () => {
        const response = await request.get('/')
        expect(response.status).toBe(200)
        expect(response.data).toBe("Ping!")
    })
    test("Should create new User", async () => {
        const user = getUser() as User
        USER = user
        const { data, status } = await request.post('/user/', user)
        expect(status).toBe(201)
        expect(data).toContain('sucesso')
    })
    test("Should throw error when using wrong password", async () => {
        if (!USER) throw Error('User without props')
        const response = await request.post('/user/login', { login: USER.CPF, password: '123'})
        expect(response.status).toBe(401)
    })
    test("Should login with sucess", async () => {
        if (!USER) throw Error('User without props')
        const response = await request.post('/user/login', { login: USER.CPF, password: USER.password })
        expect(response.status).toBe(200)
    })
    test.todo("Should edit some user info", async () => {})
    test.todo("Make a fixed order for 10-20 users")
    test.todo("Make a randomic order for 16-32 users")
    test.todo("Should get user protected infos by ID", async () => {})
    test.todo("Should get user orders by ID", async () => {})
    test.todo("Should delete the user", async () => {})
    test.todo("Should get a ranking of the most 'rich' users with authorization", async () => {})
    afterAll(() => {
        Server.stop()
    })
    // test(() )
})
import { expect, test, it, beforeAll, describe, afterAll,  } from 'bun:test'
import { request } from '../../utils/request'
import { getUser } from '../../utils/generateUser'
import { generateStore } from 'tests/utils/generateStore'


describe("Store routes", async () => {
    const store = generateStore(30)
    let storeId = '';
    test("Should create new Store", async () => {
        const { data, status } = await request.post<{ id: string }>('/store/', store)
        expect(status).toBe(201)
        expect(data).toHaveProperty('id')
        storeId = data.id
    })
    test.skip("Should get store by ID", async () => {
        const { data, status } = await request.get<{ id: string }>('/store/' + storeId)
        expect(status).toBe(200)
        expect(data).toHaveProperty('name')
    })
    test('Should change the manager of the store', async () => {
        const { data, status } = await request.put('/store/change-manager', { manager_id: store.manager_id, store_id: storeId });
        expect(data).toHaveProperty('message')
        expect(status).toBe(200)
    })
    test("Should get store products by ID", async () => {
        const { data, status } = await request.get('/store/products/' + storeId)
        expect(status).toBe(200)
        expect(Array.isArray(data)).toBe(true)
    })
    test("Should disable the store", async () => {
        const { status } = await request.put('/store/disable/' + storeId, {})
        expect(status).toBe(200)
    })
    test("Should close the store", async () => {
        const { status, data } = await request.put('/store/close/' + storeId)
        expect(status).toBe(200)
        expect(data).toHaveProperty('Message')
    })
    test.todo("Should get store orders by ID", async () => {
        const { data, status } = await request.get('/store/orders/' + storeId)
        expect(status).toBe(200)
        expect(Array.isArray(data)).toBe(true)
    })

})
import { expect, test, it, beforeAll, describe, afterAll,  } from 'bun:test'
import { request } from '../../utils/request'
import { getUser } from '../../utils/generateUser'
import { generateProduct, generateProductInput } from 'tests/utils/generateProduct'

const product = generateProductInput()
describe("Product routes", async () => {
    let productId = -1;
    test.todo("Should create new Product", async () => {
        const { data, status } = await request.post<{ id: number }>('/product/', product)
        expect(status).toBe(201)
        expect(data).toHaveProperty('id')
        productId = data.id
    })
    test.todo("Should get product by ID", async () => {
        const { data, status } = await request.get<{ id: number }>('/product/' + productId)
        expect(status).toBe(200)
        expect(data).toHaveProperty('id')
    })
    test.todo('Should get product by barcode', async () => {
        const { data, status } = await request.get<{ id: number }>('/product/barcode/' + product.barcode)
        expect(status).toBe(200)
        expect(data).toHaveProperty('id')
    })
    test.todo('Should edit the existing product', async () => {
        const { status } = await request.put('/product/' + productId, { title: 'New Title' })
        expect(status).toBe(200)
    })
    test.todo('Should get inventory products', async () => {
        const { data, status } = await request.get('/product/inventory/' + product.inventory_id)
        expect(status).toBe(200)
        expect(Array.isArray(data)).toBe(true)
    })
    test.todo('Should get category products', async () => {
        const { data, status } = await request.get('/product/category/' + product.category_id)
        expect(status).toBe(200)
        expect(Array.isArray(data)).toBe(true)
    })
    test.todo('Should get the more recent edited products', async () => {
        const { data, status } = await request.get('/product/recent-edited')
        expect(status).toBe(200)
        expect(Array.isArray(data)).toBe(true)
    })
    test.todo('Should get the more cheaper products', async () => {
        const { data, status } = await request.get('/product/price?max=10')
        expect(status).toBe(200)
        expect(Array.isArray(data)).toBe(true)
    })
    test.todo('Should get the more expensive products', async () => {
        const { data, status } = await request.get('/product/price?min=100')
        expect(status).toBe(200)
        expect(Array.isArray(data)).toBe(true)
    })
    test.todo('Should get products by brand', async () => {
        const { data, status } = await request.get('/product/brand/' + product.brand)
        expect(status).toBe(200)
        expect(Array.isArray(data)).toBe(true)
    })
    test.todo('Should get a products search', async () => {
        const { data, status } = await request.get('/product/search?query=' + product.title)
        expect(status).toBe(200)
        expect(Array.isArray(data)).toBe(true)
    })
    test.todo('Should delete the product', async () => {
        const { status } = await request.delete('/product/' + productId)
        expect(status).toBe(200)
    })
})
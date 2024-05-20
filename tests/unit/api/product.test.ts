import { expect, test, it, beforeAll, describe, afterAll,  } from 'bun:test'
import { request } from '../../utils/request'
import { getUser } from '../../utils/generateUser'
import { generateProduct, generateProductInput } from 'tests/utils/generateProduct'
import type { Product } from '@/models/product'

const product = generateProductInput()
describe("Product routes", async () => {
    let productBarCode = '';
    let productId = -1;
    test("Should create new Product", async () => {
        const { data, status } = await request.post<{ id: number, barcode: string }>('/product/', product)
        expect(status).toBe(201)
        console.log({data})
        expect(data).toHaveProperty('id')
        expect(data).toHaveProperty('barcode')
        productId = data.id
        productBarCode = data.barcode
    })
    test("Should get product by ID", async () => {
        const { data, status } = await request.get<{ id: number }>('/product/' + productId)
        console.log(data)
        expect(status).toBe(200);
        expect(data).toHaveProperty('id')
    })
    test('Should get product by barcode', async () => {
        const { data, status } = await request.get<{ id: number }>('/product/barcode-search/' + productBarCode)
        console.log({ data, productBarCode })
        expect(status).toBe(200)
        expect(data).toHaveProperty('id')
    })
    test('Should get barcode of the product by your id', async () => {
        const { data, status } = await request.get<Blob>('/product/barcode/' + productId, { isFile: true })
        expect(status).toBe(200)
        expect(data).toBeInstanceOf(Blob)
        expect(data).toBeTruthy()
    })
    test('Should edit the existing product', async () => {
        const { status } = await request.put('/product/' + productId, { title: 'New Title' })
        expect(status).toBe(200)
    })
    test('Should get inventory products', async () => {
        const { data, status } = await request.get('/product/inventory/' + product.inventory_id)
        expect(status).toBe(200)
        expect(Array.isArray(data)).toBe(true)
    })
    test('Should get the more recent edited products', async () => {
        const { data, status } = await request.get('/product/recent-edited')
        expect(status).toBe(200)
        expect(Array.isArray(data)).toBe(true)
    })
    test('Should get the more cheaper products', async () => {
        const { data, status } = await request.get('/product/price?max=10')
        expect(status).toBe(200)
        expect(Array.isArray(data)).toBe(true)
    })
    test('Should get the more expensive products', async () => {
        const { data, status } = await request.get<Array<Product>>('/product/price?min=100')
        expect(status).toBe(200)
        expect(Array.isArray(data)).toBe(true)
        expect(data.length).toBeLessThanOrEqual(100)
    })
    test('Should get products by brand', async () => {
        const { data, status } = await request.get('/product/brand/' + product.brand)
        expect(status).toBe(200)
        expect(Array.isArray(data)).toBe(true)
    })
    test('Should get a products search', async () => {
        const { data, status } = await request.get('/product/search?query=' + product.title)
        expect(status).toBe(200)
        expect(Array.isArray(data)).toBe(true)
    })
    test('Should delete the product', async () => {
        const { status } = await request.delete('/product/' + productId)
        expect(status).toBe(200)
    })
})
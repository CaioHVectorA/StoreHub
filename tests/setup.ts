import { unlink } from 'node:fs/promises'
import { afterAll, beforeAll, describe, test, expect } from 'bun:test'
import { ServerConfig } from '../src/middlewares/http'
import { request } from './utils/request'
import { $ } from 'bun'
import { Database } from 'bun:sqlite'
import type { Product } from '../src/models/Product'
import { generateProduct } from './utils/generateProduct'
beforeAll(() => {
    const testDb = new Database('test.sqlite')
    const insert = testDb.prepare(`
    INSERT INTO products (id, barcode, inventory_id, images, price, category_id, created_at, updated_at, title, description, brand) 
    VALUES ($id, $barcode, $inventory_id, $images, $price, $category_id, $created_at, $updated_at, $title, $description, $brand)`
    );
    const transaction = testDb.transaction((products) => {
        for (const product of products) insert.run(product)
        return products.length
    })
    const count = transaction(Array.from({ length: 300 }).map((i, index) => i = generateProduct(index)))
    Bun.serve({ ...ServerConfig })
})
afterAll(async () => {
    console.log("Teste")
})
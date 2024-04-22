import * as fs from 'node:fs'
import { unlink } from 'node:fs/promises'
import { afterAll, beforeAll, describe, test, expect } from 'bun:test'
import { ServerConfig } from '@/middlewares/http'
import { request } from './utils/request'
import { $ } from 'bun'
import { Database } from 'bun:sqlite'
import type { Product } from '@/models/product'
import { generateProduct } from './utils/generateProduct'
import { translateToDbFields } from '@/lib/utils/translateToDbFields'
import { fakerPT_BR as faker } from '@faker-js/faker'
import { generateStore } from './utils/generateStore'
import { generateAdmin } from './utils/generateAdmin'
const insertProducts = `
INSERT INTO products (id, barcode, inventory_id, images, price, category_id, created_at, updated_at, title, description, brand) 
VALUES ($id, $barcode, $inventory_id, $images, $price, $category_id, $created_at, $updated_at, $title, $description, $brand)
`
const insertStore = `
INSERT INTO stores (id, name, location, manager_id, inventory_id) VALUES ($id, $name, $location, $manager_id, $inventory_id)
`
const insertInventory = `
INSERT INTO inventories (location) VALUES ($location)
`
const insertAdmin = `
INSERT INTO admins (id, name, password, email, store_id, cpf, salary, phone, created_at, termination_date, active, is_manager, details) 
VALUES ($id, $name, $password, $email, $store_id, $cpf, $salary, $phone, $created_at, $termination_date, $active, $is_manager, $details)
`
beforeAll(() => {
    if (fs.existsSync('_test.sqlite')) {
        fs.unlinkSync('_test.sqlite')
    }
    const testDb = new Database('_test.sqlite')
    const productInsert = testDb.prepare(insertProducts);
    const storeInsert = testDb.prepare(insertStore);
    const inventoryInsert = testDb.prepare(insertInventory)
    const productTransaction = testDb.transaction((products) => {
        for (const product of products) productInsert.run(product)
        return products.length
    })
    const storeTransaction = testDb.transaction((stores) => {
        for (const store of stores) storeInsert.run(store)
        return stores.length
    })
    const inventoryTransaction = testDb.transaction((inventories) => {
        for (const inventory of inventories) inventoryInsert.run(inventory)
        return inventories.length
    })
    const adminTransaction = testDb.transaction((admins) => {
        for (const admin of admins) testDb.prepare(insertAdmin).run(admin)
        return admins.length
    })
    productTransaction(Array.from({ length: 300 }, (_, i) => translateToDbFields(generateProduct(i))))  
    inventoryTransaction(Array.from({ length: 31 }, (_, i) => ({ $location: faker.location.city() })))
    storeTransaction(Array.from({ length: 30 }, (_, i) => (translateToDbFields(generateStore(i)))))
    adminTransaction(Array.from({ length: 31 }, (_, i) => (translateToDbFields(generateAdmin(i)))))
    
    Bun.serve({ ...ServerConfig })
})
afterAll(async () => {
   
})
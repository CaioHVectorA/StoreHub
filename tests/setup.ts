import * as fs from 'fs'
import { afterAll, beforeAll, describe, test, expect } from 'bun:test'
import { ServerConfig } from '@/middlewares/http'
import { $, type Server } from 'bun'
import { Database, Statement } from 'bun:sqlite'
import { SQLITE_TEST_DB_NAME } from '@consts/SQLITE_TEST_DB_NAME'
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
let server: Server | null = null;
let testDb = new Database(SQLITE_TEST_DB_NAME);
const productInsert = testDb.prepare(insertProducts);
const storeInsert = testDb.prepare(insertStore);
const inventoryInsert = testDb.prepare(insertInventory)
const adminInsert = testDb.prepare(insertAdmin)
beforeAll(() => {
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
        for (const admin of admins) adminInsert.run(admin)
        return admins.length
    })
    productTransaction(Array.from({ length: 300 }, (_, i) => translateToDbFields(generateProduct(i))))  
    inventoryTransaction(Array.from({ length: 31 }, (_, i) => ({ $location: faker.location.city() })))
    storeTransaction(Array.from({ length: 30 }, (_, i) => (translateToDbFields(generateStore(i)))))
    adminTransaction(Array.from({ length: 31 }, (_, i) => (translateToDbFields(generateAdmin(i)))))
    
    server = Bun.serve({ ...ServerConfig })
})
afterAll(async () => {
    if (server) server.stop(true);
    testDb.exec(`
    DROP TABLE IF EXISTS products;
    DROP TABLE IF EXISTS stores;
    DROP TABLE IF EXISTS inventories;
    DROP TABLE IF EXISTS admins;
`);
    if (testDb) testDb.close();
    [productInsert, storeInsert, inventoryInsert, adminInsert].forEach((i: Statement) => i.finalize())
})
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
import { ADMIN_TABLE } from '@/models/admin'
import { EMPLOOYES_TABLE } from '@/models/emplooyes'
import { INVENTORY_TABLE } from '@/models/inventory'
import { ORDER_TABLE, PRODUCT_ORDER_TABLE } from '@/models/order'
import { PRODUCT_TABLE } from '@/models/product'
import { STORE_TABLE } from '@/models/store'
import { USER_TABLE } from '@/models/user'
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
const deleteTables = () => testDb.exec(`
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS stores;
DROP TABLE IF EXISTS inventories;
DROP TABLE IF EXISTS admins;
`)
const productInsert = testDb.prepare(insertProducts);
const storeInsert = testDb.prepare(insertStore);
const inventoryInsert = testDb.prepare(insertInventory)
const adminInsert = testDb.prepare(insertAdmin)
beforeAll(() => {
    deleteTables();
    [USER_TABLE, ORDER_TABLE, PRODUCT_ORDER_TABLE, PRODUCT_TABLE, STORE_TABLE, EMPLOOYES_TABLE, ADMIN_TABLE, INVENTORY_TABLE].forEach((s) => testDb.run(s))
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
    deleteTables()
    if (testDb) testDb.close();
    [productInsert, storeInsert, inventoryInsert, adminInsert].forEach((i: Statement) => i.finalize())
})
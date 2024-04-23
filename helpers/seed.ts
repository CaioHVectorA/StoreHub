import * as fs from 'fs';
import { translateToDbFields } from '@/lib/utils/translateToDbFields';
import { ADMIN_TABLE } from '@/models/admin';
import { EMPLOOYES_TABLE } from '@/models/emplooyes';
import { INVENTORY_TABLE } from '@/models/inventory';
import { ORDER_TABLE, PRODUCT_ORDER_TABLE } from '@/models/order';
import { PRODUCT_TABLE } from '@/models/product';
import { STORE_TABLE } from '@/models/store';
import { USER_TABLE } from '@/models/user';
import { fakerPT_BR as faker, fr_SN } from '@faker-js/faker';
import Database from 'bun:sqlite';
import readline from 'readline';
import { generateAdmin } from 'tests/utils/generateAdmin';
import { generateProduct } from 'tests/utils/generateProduct';
import { generateStore } from 'tests/utils/generateStore';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
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
const TABLES = [USER_TABLE, ORDER_TABLE, PRODUCT_ORDER_TABLE, PRODUCT_TABLE, STORE_TABLE, EMPLOOYES_TABLE, ADMIN_TABLE, INVENTORY_TABLE]
const terminalParams = process.argv.slice(2);
let input = null;
if (terminalParams[0]) input = terminalParams[0].replace('--', '');
if (input) {
    if (fs.existsSync(input)) fs.unlinkSync(input);
    const database = new Database(input);
    TABLES.forEach((i) => database.run(i));
    const productInsert = database.prepare(insertProducts);
    const storeInsert = database.prepare(insertStore);
    const inventoryInsert = database.prepare(insertInventory);
    const productTransaction = database.transaction((products) => {
        for (const product of products) productInsert.run(product);
        return products.length;
    });
    const storeTransaction = database.transaction((stores) => {
        for (const store of stores) storeInsert.run(store);
        return stores.length;
    });
    const inventoryTransaction = database.transaction((inventories) => {
        for (const inventory of inventories) inventoryInsert.run(inventory);
        return inventories.length;
    });
    const adminTransaction = database.transaction((admins) => {
        for (const admin of admins) database.prepare(insertAdmin).run(admin);
        return admins.length;
    });
    productTransaction(Array.from({ length: 300 }, (_, i) => translateToDbFields(generateProduct(i))));
    inventoryTransaction(Array.from({ length: 30 }, (_, i) => ({ $location: faker.location.city() })));
    storeTransaction(Array.from({ length: 30 }, (_, i) => (translateToDbFields(generateStore(i)))));
    adminTransaction(Array.from({ length: 30 }, (_, i) => (translateToDbFields(generateAdmin(i)))));
    rl.close()
    process.exit(0);
} else {
    rl.question('Enter your input: ', async (input) => {
        if (fs.existsSync(input)) fs.unlinkSync(input);
        const database = new Database(input);
        TABLES.forEach((i) => database.run(i));
        const productInsert = database.prepare(insertProducts);
        const storeInsert = database.prepare(insertStore);
        const inventoryInsert = database.prepare(insertInventory);
        const productTransaction = database.transaction((products) => {
            for (const product of products) productInsert.run(product);
            return products.length;
        });
        const storeTransaction = database.transaction((stores) => {
            for (const store of stores) storeInsert.run(store);
            return stores.length;
        });
        const inventoryTransaction = database.transaction((inventories) => {
            for (const inventory of inventories) inventoryInsert.run(inventory);
            return inventories.length;
        });
        const adminTransaction = database.transaction((admins) => {
            for (const admin of admins) database.prepare(insertAdmin).run(admin);
            return admins.length;
        });
        productTransaction(Array.from({ length: 300 }, (_, i) => translateToDbFields(generateProduct(i))));
        inventoryTransaction(Array.from({ length: 30 }, (_, i) => ({ $location: faker.location.city() })));
        storeTransaction(Array.from({ length: 30 }, (_, i) => (translateToDbFields(generateStore(i)))));
        adminTransaction(Array.from({ length: 30 }, (_, i) => (translateToDbFields(generateAdmin(i)))));
        rl.close();
        process.exit(0);
    });
}
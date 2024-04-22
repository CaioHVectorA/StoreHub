import { unlinkSync, existsSync } from 'node:fs'
import { Database } from 'bun:sqlite'
import { USER_TABLE } from '../models/user'
import { ORDER_TABLE, PRODUCT_ORDER_TABLE } from '../models/order'
import { PRODUCT_TABLE } from '../models/product'
import { STORE_TABLE } from '@/models/store'
import { EMPLOOYES_TABLE } from '@/models/emplooyes'
import { ADMIN_TABLE } from '@/models/admin'
import { INVENTORY_TABLE } from '@/models/inventory'
const TABLES = [USER_TABLE, ORDER_TABLE, PRODUCT_ORDER_TABLE, PRODUCT_TABLE, STORE_TABLE, EMPLOOYES_TABLE, ADMIN_TABLE, INVENTORY_TABLE]
export class Repository {
    db = (() => {
        const testEnv = Bun.env.NODE_ENV == 'test'
        // if (testEnv && existsSync(process.cwd()+'/_test.sqlite')) unlinkSync(process.cwd() + '/_test.sqlite')
        const database = new Database(testEnv ? './_test.sqlite' : './dev.sqlite');
        // database.run(USER_TABLE)
        TABLES.forEach((i) => database.run(i))
        return database
    })()
}
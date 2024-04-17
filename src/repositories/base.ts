import { unlinkSync } from 'node:fs'
import { Database } from 'bun:sqlite'
import { USER_TABLE } from '../models/User'
import { ORDER_TABLE, PRODUCT_ORDER_TABLE } from '../models/Order'
import { PRODUCT_TABLE } from '../models/Product'
export class Repository {
    db = (() => {
        const testEnv = Bun.env.NODE_ENV == 'test'
        if (testEnv) unlinkSync(process.cwd() + '/test.sqlite')
        const database = new Database(testEnv ? './test.sqlite' : './dev.sqlite');
        // database.run(USER_TABLE)
        [USER_TABLE, ORDER_TABLE, PRODUCT_ORDER_TABLE, PRODUCT_TABLE].forEach((i) => database.run(i))
        return database
    })()
}
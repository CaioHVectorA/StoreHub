import { Database } from 'bun:sqlite'
import { USER_TABLE } from '../models/User'
export class Repository {
    db = (() => {
        const database = new Database(Bun.env.NODE_ENV ? './test.sqlite' : './dev.sqlite')
        database.run(USER_TABLE)
        return database
    })()
}
import { Database } from 'bun:sqlite'
export class Repository {
    db = new Database('./dev.sqlite')
}
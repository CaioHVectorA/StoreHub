import { Repository } from "./base";

export class UserRepository extends Repository {
    constructor() {
        super()
        this.db.run(`CREATE TABLE IF NOT EXISTS user (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            password TEXT NOT NULL
        )`)
    }
}
export type Store = {
    id: number,
    name: string,
    location: string,
    manager_id: string,
    inventory_id: number
}

export const STORE_TABLE = `CREATE TABLE IF NOT EXISTS stores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255),
    location VARCHAR(255),
    manager_id VARCHAR(255),
    inventory_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`;
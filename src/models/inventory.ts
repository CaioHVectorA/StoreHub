export type Inventory = {
    id: number,
    last_update: string | Date, 
}

export const INVENTORY_TABLE = `CREATE TABLE IF NOT EXISTS inventories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    location TEXT
);`;
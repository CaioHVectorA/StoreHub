export type Store = {
    id: number,
    name: string,
    location: string,
    manager_id: string,
    inventory_id: number
    is_open: boolean,
    active_status: string,
    created_at: string | Date,
    disabled_at: string | Date | null,
}
export type StoreInput = Omit<Store, 'id' | 'created_at' | 'disabled_at' | 'active_status' | 'is_open'>;
export const STORE_TABLE = `CREATE TABLE IF NOT EXISTS stores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255),
    location VARCHAR(255),
    manager_id VARCHAR(255),
    inventory_id INTEGER,
    is_open BOOLEAN DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    disabled_at TIMESTAMP NULL DEFAULT NULL,
    active_status VARCHAR(255) DEFAULT 'active',
    FOREIGN KEY (manager_id) REFERENCES admins(id),
    FOREIGN KEY (inventory_id) REFERENCES inventories(id)
);`;
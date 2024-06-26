export type Product = {
    id: number,
    inventory_id: number,
    images: string,
    barcode: string,
    created_at: Date | String,
    updated_at: Date | String
    price: number,
    brand: string,
    title: string,
    description: string
    category_id: string,
}

export type ProductInput = Omit<Product, 'id' | 'created_at' | 'updated_at'>;
export const PRODUCT_TABLE = (`CREATE TABLE IF NOT EXISTS products (
    id             INTEGER PRIMARY KEY AUTOINCREMENT,
    title          TEXT,
    description    TEXT,
    barcode        TEXT,
    brand          TEXT,
    inventory_id   INT NULL,
    images         TEXT NULL,
    price          DECIMAL(10, 2) NULL,
    category_id    VARCHAR(36) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT FK_category_TO_product FOREIGN KEY (category_id) REFERENCES category(id)
);`)
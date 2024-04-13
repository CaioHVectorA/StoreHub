type Product = {
    id: string,
    inventory_id: number,
    images: string,
    price: number,
    category_id: string,
}


const PRODUCT_TABLE = (`CREATE TABLE products (
    id             VARCHAR(36) NOT NULL PRIMARY KEY,
    inventory_id   INT NULL,
    images         TEXT NULL,
    price          DECIMAL(10, 2) NULL,
    category_id VARCHAR(36) NOT NULL,
    CONSTRAINT FK_category_TO_product FOREIGN KEY (category_id) REFERENCES category(id)
);`)
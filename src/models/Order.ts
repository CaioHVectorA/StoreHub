export type Order = {
    id: string;
    status: string;
    store_id: string;
    created_at: string | Date;
    user_id: string;
}

export type ProductOrder = {
    id: string;
    product_id: string;
    store_id: string;
    order_id: string;
}
export const ORDER_TABLE = (`CREATE TABLE IF NOT EXISTS orders (
    id       VARCHAR(36) NOT NULL PRIMARY KEY,
    status   TEXT,
    store_id VARCHAR(36) NULL,
    user_id  VARCHAR(36) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT FK_user_TO_order FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT FK_store_TO_order FOREIGN KEY (store_id) REFERENCES stores(id)
);`);

export const PRODUCT_ORDER_TABLE = (`CREATE TABLE IF NOT EXISTS product_orders (
    id         VARCHAR(36) NOT NULL PRIMARY KEY,
    product_id VARCHAR(36) NOT NULL,
    store_id   VARCHAR(36) NULL,
    order_id   VARCHAR(36) NULL,
    CONSTRAINT FK_order_TO_product_order FOREIGN KEY (order_id) REFERENCES orders(id),
    CONSTRAINT FK_product_TO_product_order FOREIGN KEY (product_id) REFERENCES products(id),
    CONSTRAINT FK_store_TO_product_order FOREIGN KEY (store_id) REFERENCES stores(id)
);`);

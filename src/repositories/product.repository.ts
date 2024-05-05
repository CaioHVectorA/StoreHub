import type { Product } from "@/models/product";
import { Repository } from "./base";
import { AppError } from "@/middlewares/appError";
import { translateToDbFields } from "@/lib/utils/translateToDbFields";


export class ProductRepository extends Repository {
    constructor() {
        super();
    }
    async createProduct(data: Omit<Product, 'id' | 'created_at' | 'updated_at'>) {
        const alreadyExists = this.db.query("SELECT id from products WHERE barcode = ?1;").get(data.barcode)
        if (alreadyExists) throw new AppError('Produto já existe no sistema!')
        console.log({ data })
        const insert = this.db.prepare(`INSERT INTO products (barcode, title, description, inventory_id, price, brand, images, category_id) VALUES ($barcode, $title, $description, $inventory_id, $price, $brand, $images, $category_id);`)
        insert.run(translateToDbFields(data))
        return "Produto criado com sucesso!"
    }
    async getProductById(id: number) {
        const product = this.db.query(`SELECT * FROM products WHERE id = ?1;`).get(id)
        if (!product) throw new AppError('Produto inexistente!', 404)
        return product
    }
    async getProductByBarcode(barcode: string) {
        const product = this.db.query(`SELECT * FROM products WHERE barcode = ?1;`).get(barcode)
        if (!product) throw new AppError('Produto inexistente!', 404)
        return product
    }
    async getBarcode(id: number) {
        const barcode = this.db.query(`SELECT barcode FROM products WHERE id = ?1;`).get(id) as string
        if (!barcode) throw new AppError('Produto inexistente!', 404)
        return barcode
    }
    async editProduct(id: number, data: Partial<Product>) {
        let updateQuery = "UPDATE products SET"
        if (data.title) updateQuery += " title = $title,"
        if (data.description) updateQuery += " description = $description,"
        if (data.price) updateQuery += " price = $price,"
        if (data.brand) updateQuery += " brand = $brand,"
        if (data.images) updateQuery += " images = $images,"
        updateQuery = updateQuery.slice(0, -1) + " WHERE id = $id;"
        const update = this.db.prepare(updateQuery)
        update.run(translateToDbFields({ ...data, id }))
        return "Produto atualizado com sucesso!"
    }
    async getProductsByInventory(inventory_id: number) {
        return this.db.query("SELECT * FROM products WHERE inventory_id = ?1;").all(inventory_id)
    }
    async getRecentEditedProducts() {
        return this.db.query("SELECT * FROM products ORDER BY updated_at DESC LIMIT 30;").all()
    }
    async getCheaperProducts(max: number) {
        return this.db.query("SELECT * FROM products WHERE price < ?1;").all(max)
    }
    async getExpensiveProducts(min: number) {
        return this.db.query("SELECT * FROM products WHERE price > ?1;").all(min)
    }
    async getProductsByBrand(brand: string) {
        return this.db.query("SELECT * FROM products WHERE brand = ?1;").all(brand)
    }
    async search(query: string) {
        return this.db.query("SELECT * FROM products WHERE title LIKE ?1 OR description LIKE ?1 OR brand LIKE ?1;").all(`%${query}%`)
    }
    async deleteProduct(id: number) {
        const del = this.db.prepare("DELETE FROM products WHERE id = ?1;")
        del.run(id)
        console.log(del.toString())
        return true
    }
}
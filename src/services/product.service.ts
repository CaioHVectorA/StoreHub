import { generateBarcodeData, storeBarcode } from "@/lib/barcode";
import { AppError } from "@/middlewares/appError";
import type { Product } from "@/models/product";
import { ProductRepository } from "@/repositories/product.repository";
const path = (data: string) => `${process.cwd()}/public/barcode/${data}.png`

export class ProductService {
    db = new ProductRepository();
    async createProduct(data: Omit<Product, 'id' | 'created_at' | 'updated_at' | 'barcode'>) {
        const barcode = generateBarcodeData()
        await storeBarcode(barcode)
        const { id } = await this.db.createProduct({ ...data, barcode })
        return { id, barcode }
    }
    async getProductById(id: number) {
        const res = await this.db.getProductById(id)
        return res
    }
    async getProductByBarcode(barcode: string) {
        const res = await this.db.getProductByBarcode(barcode)
        return res
    }
    async getBarcode(id: number) {
        const barcode = await this.db.getBarcode(id)
        const file = Bun.file(path(barcode))
        const exists = await file.exists()
        if (!exists) throw new AppError('Código de barras não encontrado!', 404)
        return file
    }
    async editProduct(id: number, data: Partial<Product>) {
        const res = await this.db.editProduct(id, data)
        return res
    }
    async getProductsByInventory(inventory_id: number) {
        const res = await this.db.getProductsByInventory(inventory_id)
        return res
    }
    async getRecentEditedProducts() {
        const res = await this.db.getRecentEditedProducts()
        return res
    }
    async getCheaperProducts(max: number) {
        const res = await this.db.getCheaperProducts(max)
        return res
    }
    async getExpensiveProducts(min: number) {
        const res = await this.db.getExpensiveProducts(min)
        return res
    }
    async getProductsByBrand(brand: string) {
        const res = await this.db.getProductsByBrand(brand)
        return res
    }
    async search(query: string) {
        const res = await this.db.search(query)
        return res
    }
    async deleteProduct(id: number) {
        const res = await this.db.deleteProduct(id)
        return res
    }
    async getProducts(limit: number, index: number) {
        const res = await this.db.getProducts({ limit, index })
        return res
    }
}
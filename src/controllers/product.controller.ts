import { ProductService } from "@/services/product.service";
import type { ReqResCallback } from "@/types/router-type";

export class ProductController {
    service = new ProductService()
    create: ReqResCallback = async (req, res) => {
        const data = req.body
        const response = await this.service.createProduct(data)
        res.status(201, response)
    }
    getById: ReqResCallback = async (req, res) => {
        const id = req.params.id
        const response = await this.service.getProductById(Number(id))
        res.status(200, response)
    }
    get: ReqResCallback = async (req, res) => {
        const { limit, index } = req.query
        console.log(req.query)
        console.log(limit, index)
        const response = await this.service.getProducts(Number(limit) || 30, Number(index) || 0)
        console.log(response.length)
        res.status(200, response)
    }
    getByBarcode: ReqResCallback = async (req, res) => {
        const barcode = req.params.barcode
        const response = await this.service.getProductByBarcode(barcode)
        res.status(200, response)
    }
    getBarcode: ReqResCallback = async (req, res) => {
        const id = req.params.id
        const response = await this.service.getBarcode(Number(id))
        res.file(response)
    }
    edit: ReqResCallback = async (req, res) => {
        const id = req.params.id
        const data = req.body
        const response = await this.service.editProduct(Number(id), data)
        res.status(200, response)
    }
    getByInventory: ReqResCallback = async (req, res) => {
        const inventory_id = req.params.inventory_id
        const response = await this.service.getProductsByInventory(Number(inventory_id))
        res.status(200, response)
    }
    getRecentEdited: ReqResCallback = async (req, res) => {
        const response = await this.service.getRecentEditedProducts()
        res.status(200, response)
    }
    getCheaper: ReqResCallback = async (req, res) => {
        const max = req.query.max
        const response = await this.service.getCheaperProducts(Number(max))
        res.status(200, response)
    }
    getExpensive: ReqResCallback = async (req, res) => {
        const min = req.query.min
        const response = await this.service.getExpensiveProducts(Number(min))
        res.status(200, response)
    }
    getByBrand: ReqResCallback = async (req, res) => {
        const brand = req.params.brand
        const response = await this.service.getProductsByBrand(brand)
        res.status(200, response)
    }
    search: ReqResCallback = async (req, res) => {
        const query = req.query.query
        const response = await this.service.search(String(query))
        res.status(200, response)
    }
    delete: ReqResCallback = async (req, res) => {
        const id = req.params.id
        const response = await this.service.deleteProduct(Number(id))
        res.status(200, response)
    }
}
import { generateBarcodeData } from "@/lib/barcode"
import type { Product } from "@/models/product"
import { faker } from '@faker-js/faker'
export function generateProduct(index: number) {
    return {
        barcode: generateBarcodeData(),
        category_id: 'Testing',
        images: '[]',
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        inventory_id: index,
        price: faker.commerce.department(),
        brand: 'Brandless'
    }
}

export function generateProductInput() {
    return {
        barcode: generateBarcodeData(),
        category_id: 'Testing',
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        inventory_id: 301,
        price: faker.commerce.price(),
        brand: faker.commerce.department(),
        images: '[]'
    }
}
import { generateBarcodeData } from '@/lib/barcode';
import { translateToDbFields } from '@/lib/utils/translateToDbFields';
import { fakerPT_BR as faker } from '@faker-js/faker';
import { Database } from 'bun:sqlite'
function generateProduct() {
    const title = faker.commerce.productName();
    const price = parseFloat(faker.commerce.price());
    const category_id = faker.commerce.productAdjective();
    const description = faker.commerce.productDescription();
    const barcode = generateBarcodeData()
    const brand = faker.commerce.department();
    const images = JSON.stringify([
        `https://picsum.photos/800/800/seed/${crypto.randomUUID()}`,
        `https://picsum.photos/800/800/seed/${crypto.randomUUID()}`,
        `https://picsum.photos/800/800/seed/${crypto.randomUUID()}`,
        `https://picsum.photos/800/800/seed/${crypto.randomUUID()}`,
    ])
    return {
        title,
        price,
        category_id,
        description,
        barcode,
        brand,
        images
    };
}

const db = new Database('dev.sqlite');
Array.from({ length: 10000 }).forEach(() => {
    db.prepare(`INSERT INTO products (title, price, category_id, description, barcode, brand, images) VALUES ($title, $price, $category_id, $description, $barcode, $brand, $images)`).run(translateToDbFields(generateProduct()))
})

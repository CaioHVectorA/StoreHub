import { generateBarcodeData, getBarcode, storeBarcode } from "@/lib/barcode";
import { describe, expect, test } from "bun:test";

describe('Barcode should works fine', () => {
    const barcodeArr = [] as string[]
    test('Should generate a bunch of barcode without getting duplicates', async () => {
        for (let i = 0; i < 1000; i++) {
            const barcode = generateBarcodeData()
            expect(barcodeArr.includes(barcode)).toBe(false)
            barcodeArr.push(barcode)
        }
    })
    test('Should store the barcode with sucess', async () => {
        const barcode = barcodeArr[0]
        const file = await storeBarcode(barcode)
        expect(file).toBeTruthy()
        expect(file).toBeTypeOf('string')
    })
    test('Should get the barcode with sucess', async () => {
        const barcode = barcodeArr[0]
        const file = await getBarcode(barcode)
        expect(file).toBeTruthy()
        expect(file).toBeTypeOf('string')
    })
})
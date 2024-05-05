import * as fs from 'fs'
function getRandomNumber(): string {
    const chars = '0123456789';
    return chars[Math.floor(Math.random() * chars.length)];
}
function generateFourDigits(): string {
    let msec = Math.floor(Math.random() * 10000)
    if (msec >= 1000) return String(msec)
    if (msec < 1000 && msec >= 100) return getRandomNumber() + String(msec)
    if (msec < 100 && msec >= 10) return `${getRandomNumber()}${getRandomNumber()}` + String(msec)
    return `${getRandomNumber()}${getRandomNumber()}${getRandomNumber()}` + String(msec)
}
export function generateBarcodeData() {
    const code = `${generateFourDigits()}${generateFourDigits()}${generateFourDigits()}${generateFourDigits()}`   
    if (code.length != 16) console.log(code)
    return code
}

export function getBarcode(barcode: string) {
    return Bun.file(`${process.cwd()}/public/barcode/${barcode}.png`).text()
}

export async function storeBarcode(barcodeData: string) {
    const path = (data: string) => `${process.cwd()}/public/barcode/${data}.png`
    // if (fs.existsSync(path(barcodeData))) return await Bun.file(path(barcodeData)).text()
    const link = `https://barcodeapi.org/api/Code39/${barcodeData}?text=none&qz=1`
    const response = await fetch(link, {  })
    const data = await response.blob()
    console.log(data)
    await Bun.write(path(barcodeData), data)
    return Bun.file(path(barcodeData)).text()
}

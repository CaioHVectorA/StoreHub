export function randomStr(size: number) {
    return Array.from({ length: size }, () => String.fromCharCode(Math.floor(Math.random() * 26) + 97)).join('')
}
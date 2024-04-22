import * as fs from 'fs'
import { randomStr } from "./randomStr"
let sessionTimeouts: { [key: string]: Timer } = {}
function normalize(data: {[ key: string ]: any | string}) {
    if (typeof data !== 'string') return String(JSON.stringify(data))
    return data
}

export async function storeSession(payload: any, hoursToKeep: number = 1) {
    const data = normalize(payload)
    const encrypted = btoa(data)
    const key = randomStr(16).concat(crypto.randomUUID().replaceAll('-', ''))
    const path = `${process.cwd()}/sessions/${key}`
    await Bun.write(path, encrypted)
    const timeout = setTimeout(() => {
        fs.unlinkSync(path)
    }, 1000 * 60 * 60 * hoursToKeep)
    sessionTimeouts[key] = timeout
    return key
}

export async function getSession(key: string): Promise<null | string | { [key: string]: any }> {
    const path = `${process.cwd()}/sessions/${key}`
    if (!fs.existsSync(path)) return null
    const data = await Bun.file(path).text()
    const converted = atob(data)
    return JSON.parse(converted)
}

export async function restartSession(key: string, hoursToKeep: number = 1) {
    const path = `${process.cwd()}/sessions/${key}`
    if (fs.existsSync(path)) {
        clearTimeout(sessionTimeouts[key])
        const timeout = setTimeout(() => {
            fs.unlinkSync(path)
        }, 1000 * 60 * 60 * hoursToKeep)
        sessionTimeouts[key] = timeout
    }
}
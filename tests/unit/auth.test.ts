import { describe, it, test, expect } from 'bun:test'
import { getSession, storeSession, restartSession } from '@/lib/utils/auth'
import { fakerPT_BR as faker } from '@faker-js/faker'
import { getUser } from 'tests/utils/generateUser'
const payload = getUser() 
const timing = 1 / (60 * 60) // 1/360 - 1 second
describe('Auth system', () => {
    let key: string;
    test('Should store the session sucefully', async () => {
        const file = await storeSession(payload, timing)
        expect(file).toBeTruthy()
        key = file
    })
    test('Should get the session sucefully', async () => {
        const data = await getSession(key)
        expect(data).toBeTruthy()
        expect(data).toHaveProperty('username')
        expect(data).toHaveProperty('CPF')
        expect(data).toHaveProperty('password')
        expect(data).toHaveProperty('email')
        await Bun.sleep(1000 * 1.8)
        expect(await getSession(key)).toBeNull()
    }, { timeout: 14000 })
    test('Should restart the session sucefully', async () => {
        key = await storeSession(payload, timing)
        expect(key).toBeTruthy()
        await Bun.sleep(800)
        await restartSession(key, timing)
        await Bun.sleep(800)
        expect(await getSession(key)).toBeTruthy()
        await Bun.sleep(1200)
        expect(await getSession(key)).toBeNull()
    }, { timeout: 12000 })
})
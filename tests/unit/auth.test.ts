import { describe, it, test, expect } from 'bun:test'
import { getSession, storeSession, restartSession } from '@/lib/utils/auth'
import { fakerPT_BR as faker } from '@faker-js/faker'
import { getUser } from 'tests/utils/generateUser'
const payload = getUser() 
const timing = 5 / (60 * 60) // 3sec
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
        await Bun.sleep(1000 * 6)
        expect(await getSession(key)).toBeNull()
    }, { timeout: 14000 })
    test('Should restart the session sucefully', async () => {
        key = await storeSession(payload, timing)
        expect(key).toBeTruthy()
        await Bun.sleep(1000 * 3)
        await restartSession(key, timing)
        await Bun.sleep(1000 * 4)
        expect(await getSession(key)).toBeTruthy()
        await Bun.sleep(1000 * 4)
        expect(await getSession(key)).toBeNull()
    }, { timeout: 12000 })
})
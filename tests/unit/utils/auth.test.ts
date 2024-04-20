import { describe, it, test, expect } from 'bun:test'
import { getSession, storeSession } from '@/lib/utils/auth'
import { fakerPT_BR as faker } from '@faker-js/faker'
import { getUser } from 'tests/utils/generateUser'
const payload = getUser() 
describe('Auth system', () => {
    let key: string;
    test('Should store the session sucefully', async () => {
        const timing = 10 / (60 * 60) // 10sec
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
        await Bun.sleep(1000 * 12)
        expect(await getSession(key)).toBeNull()
    }, { timeout: 14000 })
})
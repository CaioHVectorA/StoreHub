import { Cache } from '@/lib/cache'; 
import { randomStr } from '@/lib/utils/randomStr';
import { describe, expect, test } from 'bun:test';

describe('Cache system', () => {
    const cache = new Cache()
    test('Should store the cache sucefully', async () => {
        const timing = 3 / (60 * 60) // 3sec
        const randomValue = randomStr(10)
        cache.set('testing', randomValue, timing)
        const data = cache.get('testing')
        expect(data).toBeTruthy()
        expect(data).toBe(randomValue)
    })
    test('The cached data should expire', async () => {
        await Bun.sleep(1000 * 4)
        const data = cache.get('test')
        expect(data).toBeFalsy()
    })
    test('Should create a cache and delete it sucefully', async () => {
        const randomValue = randomStr(10)
        cache.set('test', randomValue)
        const data = cache.get('test')
        expect(data).toBeTruthy()
        expect(data).toBe(randomValue)
        cache.delete('test')
        const data2 = cache.get('test')
        expect(data2).toBeFalsy()
    })
})
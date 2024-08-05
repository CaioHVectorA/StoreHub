import { describe, expect, test } from 'bun:test';
// writed by copilot
import { Router } from '../../src/lib/router';
const router = new Router()
describe('Router', () => {
    test('Should create a new route successfully', () => {
        expect(() => {
        router.get('/ping', (req, res) => {
                res.json('pong')
        })
        }).not.fail()
    })
    test.todo('Should handle query parameters correctly');
    test.todo('Should handle different HTTP methods');
    test.todo('Should handle URL parameters correctly');
    test.todo('Should handle request body correctly');
    test.todo('Should serve static files from the public folder');
    test.todo('Should handle middleware functions');
    test.todo('Should handle error handling');
    test.todo('Should handle route not found');
    test.todo('Should handle route conflicts');
    test.todo('Should handle route authorization');
    test.todo('Should handle route validation');
    test.todo('Should handle route caching');
    test.todo('Should handle route rate limiting');
    test.todo('Should handle route logging');
    test.todo('Should handle route metrics');
    test.todo('Should handle route tracing');
    test.todo('Should handle route authentication');
    test.todo('Should handle route authorization');
    test.todo('Should handle route validation');
    test.todo('Should handle route rate limiting');
    test.todo('Should handle route logging');
    test.todo('Should handle route metrics');
    test.todo('Should handle route tracing');
})

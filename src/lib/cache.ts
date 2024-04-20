// inspired by node-cache
export class Cache {
    private cache: Map<string, any>;

    constructor() {
        this.cache = new Map();
    }

    set(key: string, value: any, timeout: number = 1000 * 60 * 60) {
        this.cache.set(key, value);
        setTimeout(() => {
            this.cache.delete(key);
        }, timeout)
    }
    mset(data: { [key: string]: any }, timeout: number = 1000 * 60 * 60) {
        for (const key in data) {
            this.set(key, data[key], timeout);
        }
    }
    get(key: string) {
        return this.cache.get(key);
    }

    delete(key: string) {
        this.cache.delete(key);
    }

    clear() {
        this.cache.clear();
    }

    has(key: string) {
        return this.cache.has(key);
    }

    size() {
        return this.cache.size;
    }
}
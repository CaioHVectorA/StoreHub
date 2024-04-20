export function translateToDbFields(obj: { [key: string]: any }): { [key: string]: any } {
    const transformedObj: { [key: string]: any } = {};

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const transformedKey = `$${key}`;
            transformedObj[transformedKey] = obj[key];
        }
    }

    return transformedObj;
}
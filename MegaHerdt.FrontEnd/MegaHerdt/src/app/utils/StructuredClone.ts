export function structuredClone<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
}
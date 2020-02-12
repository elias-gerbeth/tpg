export function underscorize(val: string): string {
    return val
        .replace(/[A-Z]/g, $ => `_${$.toLowerCase()}`)
        .replace(/^_/, '');
}
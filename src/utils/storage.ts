export const setStorage = (key: string, value: any) => {
    return localStorage.setItem(key, JSON.stringify(value));
}
export const getStorage = (key: string) => {
    const str = localStorage.getItem(key) || '';
    if (!str) return {};
    return JSON.parse(str);
}
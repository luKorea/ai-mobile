// TODO 本地存储
export const setLocalItem = (key, value) => localStorage.setItem(key, JSON.stringify(value));

export const getLocalItem = (key) => {
    let data;
    try {
        data = localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : {};
    } catch (err) {
        data = localStorage.getItem(key) || '';
    }
    return data;
}

export const removeLocalItem = (key) => localStorage.removeItem(key)
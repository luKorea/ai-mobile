// TODO session本地存储
export const setSessionItem = (key, value) => sessionStorage.setItem(key, JSON.stringify(value));

export const getSessionItem = (key) => {
    let data;
    try {
        data = sessionStorage.getItem(key) ? JSON.parse(sessionStorage.getItem(key)) : {};
    } catch (err) {
        data = sessionStorage.getItem(key) || '';
    }
    return data;
}

export const removeSessionItem = (key) => sessionStorage.removeItem(key)
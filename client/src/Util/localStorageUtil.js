export const setToken = (token) => {
    localStorage.setItem("token", token);
};

export const getToken = () => {
    return localStorage.getItem("token");
};

export const removeToken = () => {
    return localStorage.removeItem("token");
};

export const setUser = (user) => {
    localStorage.setItem("user", user);
};

export const getUser = () => {
    return localStorage.getItem("user");
};

export const removeUser = () => {
    return localStorage.removeItem("user");
};
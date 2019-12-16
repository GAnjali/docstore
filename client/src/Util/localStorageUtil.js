export const setToken = (token) => {
    localStorage.setItem("token", token);
};

export const getToken = () => {
    return localStorage.getItem("token");
};

export const setUser = (user) => {
    localStorage.setItem("user", user);
};

export const getUser = () => {
    return localStorage.getItem("user");
};
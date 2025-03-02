const TOKEN_KEY = "jwt";

//Set Token
export const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

//Get Token
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY, token);
};

//Remove Token
export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY, token);
};

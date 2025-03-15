export const baseUrl = "http://localhost:3001";

const token = localStorage.getItem("jwt");

// const handleServerResponse = (res) => {
//   return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
// };

const getItemList = () => {
  return fetch(`${baseUrl}/items`, {
    headers: {
      "Content-Type": "application/json",
    },
  }).then(handleServerResponse);
};

const addItem = ({ name, weather, imageUrl }, token) => {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name,
      weather,
      imageUrl,
    }),
  }).then(handleServerResponse);
};

const removeItem = (id, token) => {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token},`,
    },
  }).then(handleServerResponse);
};

const addCardLike = (id, token) => {
  return fetch(`${baseUrl}/likes/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ id }),
  });
};

const removeCardLike = (id, token) => {
  return fetch(`${baseUrl}/likes/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ id }),
  });
};

const api = {
  getItemList,
  addItem,
  removeItem,
  addCardLike,
  removeCardLike,
};

export default api;

export function handleServerResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

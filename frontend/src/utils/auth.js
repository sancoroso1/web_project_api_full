const BASE_URL = 'https://api.coroso.mooo.com';
//const BASE_URL = 'http://localhost:3001';
const ERROR_INVALID_DATA = 400;
const ERROR_NOT_FOUND = 401;

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => {
      if (!response.ok) {
        if (response.status === ERROR_INVALID_DATA) {
          throw new Error('uno de los campos se rellenó de forma incorrecta');
        }
      }
      return response.json();
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.error(err.message);
    });
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => {
      if (!response.ok) {
        if (response.status === ERROR_INVALID_DATA) {
          throw new Error('No se ha proporcionado uno o más campos');
        } else if (response.status === ERROR_NOT_FOUND) {
          throw new Error('No se ha encontrado al usuario con el correo electrónico especificado');
        } else {
          throw new Error('Error en la solicitud');
        }
      }
      return response.json();
    })
    .then((data) => {
      if (data.token) {
        localStorage.setItem('token', data.token);
        return data;
      } else {
        throw new Error('Token no recibido');
      }
    })
    .catch((err) => {
      console.error(err.message);
    });
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        if (response.status === ERROR_INVALID_DATA) {
          throw new Error('Token no proporcionado o proporcionado en el formato incorrecto');
        } else if (response.status === ERROR_NOT_FOUND) {
          throw new Error('El token proporcionado es inválido');
        }
      }
      return response.json();
    })
    .then((data) => data)
    .catch((err) => {
      console.error(err.message);
    });
};
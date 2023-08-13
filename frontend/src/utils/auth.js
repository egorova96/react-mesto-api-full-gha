export const main_url = process.env.REACT_APP_API_BASE_URL;
//export const main_url = "http://localhost:3000"
export const checkAnswer = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

export const register = (email, password) => {
  return fetch(`${main_url}signup`, {
    method: "POST",
    headers: {
      'Accept': "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(checkAnswer);
};

export const authorize = (email, password) => {
  return fetch(`${main_url}signin`, {
    method: "POST",
    headers: {
      'Accept': "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response => response.json()))
    .then((data) => {
      if (data.token) {
        localStorage.setItem("token", data.token);
        return data;
      }
      return Promise.reject(`Ошибка ${data.status}`)
    });
};

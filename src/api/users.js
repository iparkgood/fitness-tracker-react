const BASE = "http://fitnesstrac-kr.herokuapp.com";

export async function registerUser(username, password) {
  try {
    const response = await fetch(`${BASE}/api/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const result = await response.json();

    if (result.error) {
      const { message } = result;
      throw message;
    }

    const { user, token, message } = result;

    setUsername(user.username);
    setToken(token);

    return message;
  } catch (error) {
    return error;
  }
}

export async function loginUser(username, password) {
  try {
    const response = await fetch(`${BASE}/api/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const result = await response.json();

    if (result.error) {
      const { message } = result;
      throw message;
    }

    const { user, token, message } = result;

    setUsername(user.username);
    setToken(token);

    return message;
  } catch (error) {
    return error;
  }
}

// export async function fetchMe() {
//   try {
//     const token = getToken();

//     const response = await fetch(`${BASE}/api/users/me`, {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     const result = await response.json();

//     if (result.error) {
//       const { message } = result;
//       throw message;
//     }

//     return result.username;
//   } catch (error) {
//     return error;
//   }
// }

export function setUsername(username) {
  localStorage.setItem("currentUsername", username);
}

export function setToken(token) {
  localStorage.setItem("currentToken", token);
}

export function getUsername() {
  const username = localStorage.getItem("currentUsername");
  return username;
}

export function getToken() {
  const token = localStorage.getItem("currentToken");
  return token;
}

export function clearUsernameToken() {
  localStorage.removeItem("currentUsername");
  localStorage.removeItem("currentToken");
}

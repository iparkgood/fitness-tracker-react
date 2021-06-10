const BASE = "https://fitnesstrac-kr.herokuapp.com";

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
      throw result.error;
    }

    const { user, token } = result;

    setUsername(user.username);
    setToken(token);

    return user.username;
  } catch (error) {
    return { error };
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
      throw result.error;
    }

    const { user, token } = result;

    setUsername(user.username);
    setToken(token);

    return user.username;
  } catch (error) {
    return { error };
  }
}

export async function getMyRoutines() {
  try {
    const username = getUsername();
    const token = getToken();

    if (!username) {
      return;
    }

    const response = await fetch(`${BASE}/api/users/${username}/routines`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
}

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

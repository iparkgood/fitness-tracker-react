import axios from "axios";
import { getToken } from "./users";

const BASE = "https://fitnesstrac-kr.herokuapp.com";

export async function getActivities() {
  try {
    const { data } = await axios.get(`${BASE}/api/activities`);
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function createActivity(name, description) {
  try {
    const token = getToken();
    const response = await fetch(`${BASE}/api/activities`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        description,
      }),
    });
    const result = await response.json();

    if (result.error) {
      throw result.error;
    }

    return result;
  } catch (error) {
    return { error };
  }
}

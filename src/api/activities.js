import axios from "axios";

const BASE = "http://fitnesstrac-kr.herokuapp.com";

export async function getActivities() {
  try {
    const { data } = await axios.get(`${BASE}/api/activities`);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function createActivity(name, description) {
  try {
    const response = await fetch(`${BASE}/api/activities`, {
      method: "POST",
      body: JSON.stringify({
        name, description
      }),
    });
    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);
  }
}
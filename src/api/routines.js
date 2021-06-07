import axios from "axios";

const BASE = "http://fitnesstrac-kr.herokuapp.com";

import { getToken } from "./users";

export async function getRoutines() {
  try {
    const { data } = await axios.get(`${BASE}/api/routines`);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function createRoutine(name, goal, isPublic) {
  try {
    const token = getToken();
    const response = await fetch(`${BASE}/api/routines`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        goal,
        isPublic,
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

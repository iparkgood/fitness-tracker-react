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
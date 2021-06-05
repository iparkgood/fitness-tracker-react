import axios from "axios";

const BASE = "http://fitnesstrac-kr.herokuapp.com";

export async function getRoutines() {
  try {
    const { data } = await axios.get(`${BASE}/api/routines`);
    return data;
  } catch (error) {
    throw error;
  }
}

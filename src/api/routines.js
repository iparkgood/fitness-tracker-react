import axios from "axios";

const BASE = "https://fitnesstrac-kr.herokuapp.com";

import { getToken, getUsername } from "./users";

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
        Authorization: `Bearer ${token}`,
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

    result.creatorName = getUsername();

    return result;
  } catch (error) {
    return { error };
  }
}

export async function deleteRoutine(routineId) {
  try {
    const token = getToken();
    const response = await fetch(`${BASE}/api/routines/${routineId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();

    if (result.error) {
      throw result.error;
    }

    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function patchRoutine(routineId, name, goal) {
  try {
    const token = getToken();
    const response = await fetch(`${BASE}/api/routines/${routineId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        goal,
      }),
    });
    const result = await response.json();

    if (result.error) {
      throw result.error;
    }

    return result;
  } catch (error) {
    return {error};
  }
}

export async function addActToRoutine(routineId, activityId, count, duration) {
  try {
    const response = await fetch(
      `${BASE}/api/routines/${routineId}/activities`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          activityId,
          count,
          duration,
        }),
      }
    );
    const result = await response.json();

    if (result.error) {
      throw result.error;
    }

    return result;
  } catch (error) {
    return { error };
  }
}

export async function patchRoutineActivity(routineActivityId, count, duration) {
  try {
    const token = getToken();
    const response = await fetch(
      `${BASE}/api/routine_activities/${routineActivityId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          count,
          duration,
        }),
      }
    );
    const result = await response.json();

    if (result.error) {
      throw result.error;
    }

    return result;
  } catch (error) {
    return {error};
  }
}

export async function deleteRoutineActivity(routineActivityId) {
  try {
    const token = getToken();
    const response = await fetch(
      `${BASE}/api/routine_activities/${routineActivityId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const result = await response.json();

    if (result.error) {
      throw result.error;
    }

    return result;
  } catch (error) {
    console.error(error);
  }
}

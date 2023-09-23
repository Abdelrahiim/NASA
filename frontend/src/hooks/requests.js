import Launch from "../pages/Launch";

const API_URL = "https://127.0.0.1:5000";

// Load planets and return as JSON.
async function httpGetPlanets() {
  const response = await fetch(`${API_URL}/planets`);
  return await response.json();
}

// Load launches, sort by flight number, and return as JSON.
async function httpGetLaunches() {
  const response = await fetch(`${API_URL}/launches`);
  const fetchedLaunches = await response.json();
  return fetchedLaunches.sort((a, b) => {
    return a.flightNumber - b.flightNumber;
  });
}

// Submit given launches data to launches system.
async function httpSubmitLaunch(launch) {
  try {

  return await fetch(`${API_URL}/launches`,{
    method:"POST",
    headers:{
      "Content-Type":"Application/json"
    }
    ,body:JSON.stringify(launch)})
  } catch (e){
    return {
      ok:false
    }

  }
}

// Delete launches with given ID.
async function httpAbortLaunch(id) {
  try {
    return await fetch(`${API_URL}/launches/${id}`, {
      method: "delete",
    });
  } catch(err) {
    console.log(err);
    return {
      ok: false,
    };
  }
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};
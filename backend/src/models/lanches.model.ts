import {Launch} from "../types";

let latestFlightNumber = 100;
const launches = new Map<number, Launch>()

const launch: Launch = {
    flightNumber: 100,
    mission: "Kepler Exploration X",
    rocket: "Explorer IS1",
    launchDate: new Date("December 27 ,2030"),
    destination: "Kepler-442 b",
    customers: ["ZTM", "NASA"],
    upcoming: true,
    success: true
}
launches.set(launch.flightNumber, launch)

/**
 * get All the Elements on launches Map
 */
function getAll() {
    return Array.from(launches.values());
}

/**
 * Create New Launch and Add it To Launches map
 * @param launch
 */
function createNewLaunch(launch: Launch) {
    latestFlightNumber += 100
    launches.set(latestFlightNumber, Object.assign(launch, {
        flightNumber: latestFlightNumber,
        customers: ["ZTM", "NASA"],
        upcoming: true,
        success: true
    }))
    return launches.get(latestFlightNumber)
}

/**
 * Check if launch with id Exists in the db
 * @param launchId
 */
function existsLaunchWithId(launchId: number) {
    return launches.has(launchId)
}

function abortLaunchById(launchId: number) {
    const aborted = launches.get(launchId) as Launch;
    aborted.success = false;
    aborted.upcoming = false;
    return aborted
}

export {getAll, createNewLaunch, existsLaunchWithId, abortLaunchById}




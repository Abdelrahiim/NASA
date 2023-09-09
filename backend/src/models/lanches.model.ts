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

function getAll() {
    return Array.from(launches.values());
}

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


export {getAll, createNewLaunch}




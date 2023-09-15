import {Launch} from "../types";
import LaunchesModel from "./launches.mongo";
import Planet from "./planets.mongo";


// let latestFlightNumber = 100;
const DEFAULT_FLIGHT_NUMBER = 100;
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

/**
 * upsert Launches to The Launch collection on Mongodb
 * @param launch
 */
async function saveLaunches(launch: Launch) {
    const planet = await Planet.findOne({kepler_name: launch.destination});
    if (!planet) {
        throw new Error("No Matching Planning Found")
    }
    await LaunchesModel.findOneAndUpdate({flightNumber: launch.flightNumber}, launch, {upsert: true})
}

// saveLaunches(launch)

/**
 * get All the Elements on launches Map
 */
async function getAll() {
    return LaunchesModel.find({}, {__v: 0, _id: 0})
}


/**
 * Get The Latest Flight Number By Access The Database
 */
async function getLatestLaunchNumber() {
    const latestLaunch = await LaunchesModel
        .findOne()
        .sort('-flightNumber')
    if (!latestLaunch) {
        return DEFAULT_FLIGHT_NUMBER
    }
    return latestLaunch.flightNumber
}


/**
 * Create New Launch and Add it To Launches Collection On The Db
 * @param launch
 */
async function createNewLaunch(launch: Launch) {
    const newLaunch = Object.assign(launch, {
        flightNumber: await getLatestLaunchNumber() + 100,
        customers: ["ZTM", "NASA"],
        upcoming: true,
        success: true
    })
    await saveLaunches(launch)
}

/**
 * Create New Launch and Add it To Launches map
 * @param launch
 */
// function createNewLaunch(launch: Launch) {
//     latestFlightNumber += 100
//     launches.set(latestFlightNumber, Object.assign(launch, {
//         flightNumber: latestFlightNumber,
//         customers: ["ZTM", "NASA"],
//         upcoming: true,
//         success: true
//     }))
//     return launches.get(latestFlightNumber)
// }

/**
 * Check if launch with id Exists in the db
 * @param launchId
 */
async function existsLaunchWithId(launchId: number) {
    return LaunchesModel.findOne({flightNumber: launchId});
}


async function abortLaunchById(launchId: number) {
    // const aborted = launches.get(launchId) as Launch;
    // aborted.success = false;
    // aborted.upcoming = false;
    const aborted = await LaunchesModel.updateOne({flightNumber: launchId}, {success: false, upcoming: false})
    return aborted.modifiedCount === 1
}

export {getAll, createNewLaunch, existsLaunchWithId, abortLaunchById}




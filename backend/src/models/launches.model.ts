import axios, {AxiosError} from "axios";

import {Launch, SpaceXAPILaunch, SpaceXAPILaunchData} from "../types";
import LaunchesModel from "./launches.mongo";
import Planet from "./planets.mongo";
import {response} from "express";
import launchesMongo from "./launches.mongo";
import {SPACEX_API_URL} from "../services/settings";

const DEFAULT_FLIGHT_NUMBER = 100;



/**
 * upsert Launches to The Launch collection on Mongodb
 * @param launch
 */
async function saveLaunches(launch: Launch) {
    await LaunchesModel.findOneAndUpdate(
        {flightNumber: launch.flightNumber},
        launch,
        {upsert: true},
    );
}


/**
 * Helper Function So We Can Load The Data From SpaceXAPi
 * and The Reformat it to make suitable to populate our
 * launches Collect in mongodb database
 */
async function populateLaunches() {
    try {
        const response = await axios.post<SpaceXAPILaunchData>(SPACEX_API_URL, {
            query: {},
            options: {
                pagination: false,
                populate: [
                    {
                        path: "rocket",
                        select: {
                            name: 1,
                        },
                    },
                    {
                        path: "payloads",
                        select: {
                            customers: 1,
                        },
                    },
                ],
            },
        });
        const launchDocs = response.data.docs

        for (const launchDoc of launchDocs) {
            const payloads = launchDoc.payloads
            const customers = payloads.flatMap(payloads => payloads.customers)
            const launch: Launch = {
                customers: customers,
                destination: "",
                flightNumber: launchDoc.flight_number,
                launchDate: launchDoc.date_local,
                mission: launchDoc.name,
                rocket: launchDoc.rocket.name,
                success: launchDoc.success,
                upcoming: launchDoc.upcoming
            }
            await saveLaunches(launch)

        }
    } catch (e) {
        const err = e as AxiosError
        console.log(err.status)
        throw err
    }
}


/**
 * Loading Launches Data From SpaceX API
 *
 */
async function loadLaunches() {
    const firstLaunch = await findLaunch({
        flightNumber: 1,
        mission: "FalconSat",
        rocket: "Falcon 1"
    })
    if (firstLaunch) {
        console.log("Launches data Already Loaded")
    } else {
        await populateLaunches()
    }
}

/**
 * get All the Elements on launches Map
 */
async function getAll(skip:number,limit:number) {
    return LaunchesModel.find({}, {__v: 0, _id: 0}).sort({flightNumber:1}).skip(skip).limit(limit);
}

/**
 * Get The Latest Item in The DataBase
 */
async function getLatestLaunch() {
    return LaunchesModel.findOne().sort("-flightNumber");
}

/**
 * Create New Launch and Add it To Launches Collection On The Db
 * @param launch
 */
async function createNewLaunch(launch: Launch) {
    const planet = await Planet.findOne({kepler_name: launch.destination});
    if (!planet) {
        throw new Error("No Matching Planning Found");
    }
    const latestLaunch = await getLatestLaunch();
    let latestFlightNumber = latestLaunch
        ? latestLaunch.flightNumber
        : DEFAULT_FLIGHT_NUMBER;

    const newLaunch = Object.assign(launch, {
        flightNumber: latestFlightNumber + 1,
        customers: ["ZTM", "NASA"],
        upcoming: true,
        success: true,
    });
    await saveLaunches(newLaunch);
}

/**
 * Generic Object
 */
interface GenericFilter<T> {
    [key: string]: T;
}

/**
 * Allow To Find One Instance With Some filter
 * @param filter GenericFilter
 */
async function findLaunch<T>(filter: GenericFilter<T>) {
    return launchesMongo.findOne(filter);
}

/**
 * Check if launch with id Exists in the db
 * @param launchId
 */
async function existsLaunchWithId(launchId: number) {
    return findLaunch({flightNumber: launchId});
}



/**
 * Abort Mission by set Success and Upcoming Fields To False
 * @param launchId
 */
async function abortLaunchById(launchId: number) {
    const aborted = await LaunchesModel.updateOne(
        {flightNumber: launchId},
        {success: false, upcoming: false},
    );
    return aborted.modifiedCount === 1;
}

export {
    getAll,
    createNewLaunch,
    existsLaunchWithId,
    abortLaunchById,
    getLatestLaunch,
    loadLaunches,
};

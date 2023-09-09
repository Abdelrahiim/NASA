import {Request, Response} from "express";
import {getAll, createNewLaunch} from "../../models/lanches.model";
import {StatusCodes} from "http-status-codes";
import {Launch} from "../../types";

/**
 * Get All The Launches From The Model
 * @param req
 * @param res
 * @route GET /launches
 */
function list(req: Request, res: Response) {
    return res.status(StatusCodes.OK).json(getAll())
}

/**
 * Create New Launch Mission Controller
 * @param req
 * @param res
 * @route POST /launches
 */
function create(req: Request<{}, {}, Launch>, res: Response) {
    const launch = req.body;
    if (!launch.mission || !launch.launchDate || !launch.destination || !launch.rocket) {
        return res.status(StatusCodes.BAD_REQUEST).json({message: "All Fields Are Mandatory"})
    }
    launch.launchDate = new Date(launch.launchDate)
    if (isNaN(Number(launch.launchDate))) {
        return res.status(StatusCodes.BAD_REQUEST).json({message: "Date Is Invalid"})

    }
    const createdLaunch = createNewLaunch(launch)
    return res.status(StatusCodes.CREATED).json(createdLaunch)
}

export default {
    list,
    create
}
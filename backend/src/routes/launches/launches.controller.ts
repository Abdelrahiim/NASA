import {Request, Response} from "express";
import {
    getAll,
    createNewLaunch,
    existsLaunchWithId,
    abortLaunchById,
    getLatestLaunch
} from "../../models/launches.model";
import {StatusCodes} from "http-status-codes";
import {Launch, RequestQueryParameters} from "../../types";
import getPagination from "../../services/query";

/**
 * Get All The Launches From The Model
 * @param req
 * @param res
 * @route GET /launches
 */
async function list(req: Request<{},{},{},RequestQueryParameters>, res: Response) {
    const {skip , limit} = getPagination(req.query);
    return res.status(StatusCodes.OK).json(await getAll(skip,limit))
}

/**
 * Get The Latest Launch in the Database
 * @param req
 * @param res
 * @route GET /launches/latest
 */
async function listLatest(req: Request, res: Response) {
    return res.status(StatusCodes.OK).json( await  getLatestLaunch())
}

/**
 * Create New Launch Mission Controller
 * @param req
 * @param res
 * @route POST /launches
 */
async function create(req: Request<{}, {}, Launch>, res: Response) {
    const launch = req.body;
    if (!launch.mission || !launch.launchDate || !launch.destination || !launch.rocket) {
        return res.status(StatusCodes.BAD_REQUEST).json({error: "All Fields Are Mandatory"})
    }
    launch.launchDate = new Date(launch.launchDate)
    if (isNaN(Number(launch.launchDate))) {
        return res.status(StatusCodes.BAD_REQUEST).json({error: "Date Is Invalid"})

    }
    await createNewLaunch(launch)
    return res.status(StatusCodes.CREATED).json(launch)
}

/**
 * Abort Any mission by Setting upcoming to false
 * @param req
 * @param res
 * @route POST /launches/:id
 */
async function destroy(req: Request<{ id: string }>, res: Response) {
    const launchId = Number(req.params.id);
    if (!await existsLaunchWithId(launchId)) {
        return res.status(StatusCodes.NOT_FOUND).json({error: "Launch Not Found"})
    }
    const aborted = await abortLaunchById(launchId)
    if(!aborted){
        return res.status(StatusCodes.BAD_REQUEST).json({
            error:"Launch Not Aborted"
        })
    }
    return res.status(StatusCodes.OK).json({ok:true})
}


export default {
    list,
    listLatest,
    create,
    destroy
}
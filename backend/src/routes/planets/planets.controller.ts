import {Response, Request} from "express";
import {StatusCodes} from "http-status-codes"
import {listAllPlanets} from "../../models/planets.model";


/**
 * List All planets Controller Function
 * @param req
 * @param res
 * @route GET api/planets
 * */
async function list(req: Request, res: Response) {
    return res.status(StatusCodes.OK).json(await listAllPlanets());
}


export default {
    list
}
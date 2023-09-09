import {Response, Request} from "express";
import {StatusCodes} from "http-status-codes"
import PlanetsModel from "../../models/planets.model";



/**
 * List All planets Controller Function
 * @param req
 * @param res
 * @route GET api/planets
 * */
function listAllPlanet(req: Request, res: Response) {
    return res.status(StatusCodes.OK).json(PlanetsModel.planets);
}


export default {
    listAllPlanet
}
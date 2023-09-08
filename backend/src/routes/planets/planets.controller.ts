import {Response, Request} from "express";
import {StatusCodes} from "http-status-codes"
import planets from "../../models/planets.model";



/**
 * List All planets Controller Function
 * @route GET api/planets
 * */
function listAllPlanet(req: Request, res: Response) {
    return res.status(StatusCodes.OK).json(planets);
}


export default {
    listAllPlanet
}
import {Router} from "express";
import PlanetsController from "./planets.controller";

const PlanetsRouter = Router();

PlanetsRouter.get("/", PlanetsController.list)


export default PlanetsRouter
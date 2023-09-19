import {Router} from "express";
import LaunchesController from "./launches.controller";
const LaunchesRouter = Router();

// Routes Or EndPoints
LaunchesRouter.get("/",LaunchesController.list)
LaunchesRouter.get("/latest",LaunchesController.listLatest)
LaunchesRouter.post("/",LaunchesController.create)
LaunchesRouter.delete("/:id",LaunchesController.destroy)
export default LaunchesRouter

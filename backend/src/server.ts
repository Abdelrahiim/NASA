import colors from "colors";
import dotenv from "dotenv"
import * as http from "http";
import app from "./app";
import {loadPlanetsDate} from "../src/models/planets.model"

/*
This is Responsible for Creating and Setting up Server

 */

dotenv.config()
const PORT = process.env.PORT || 8000;

// Setting up server
const server = http.createServer(app)

/**
 * Start Server and made of Configuration
 *
 * */
async function startServer() {
    await loadPlanetsDate()
    // Make Server Listen on the Specified PORT
    server.listen(PORT, () => {
            console.log(`Starting server at ${colors.underline(colors.green(`http://127.0.0.1:${PORT}/`))}`)
        }
    )
}

startServer();


// Libraries Import
import colors from "colors";
import * as http from "http";

// Files Import
import app from "./app";
import {PORT} from "./services/settings";
import {connectMongo} from "./services/mongo";
import {loadPlanetsDate} from "./models/planets.model"
import {loadLaunches} from "./models/launches.model";


// Setting up server
const server = http.createServer(app)


/**
 * Start Server and made of Configuration
 *
 * */
async function startServer() {
    // Connecting to The DataBase
    await connectMongo()
    await loadPlanetsDate()
    await loadLaunches()
    // Make Server Listen on the Specified PORT
    server.listen(PORT, () => {
            console.log(`Starting server at ${colors.blue(colors.underline(`http://127.0.0.1:${PORT}/`))}`)
        }
    )
}

startServer();

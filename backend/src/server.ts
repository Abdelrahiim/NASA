import colors from "colors";
import {PORT} from "./services/settings";
import * as http from "http";

import app from "./app";
import {connectMongo} from "./services/mongo";
import {loadPlanetsDate} from "./models/planets.model"


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
    // Make Server Listen on the Specified PORT
    server.listen(PORT, () => {
            console.log(`Starting server at ${colors.blue(colors.underline(`http://127.0.0.1:${PORT}/`))}`)
        }
    )
}

startServer();

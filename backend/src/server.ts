// Libraries Import
import colors from "colors";
import * as https from "https";
import * as fs from "fs";
import path from "path";

// Files Import
import app from "./app";
import {PORT} from "./services/settings";
import {connectMongo} from "./services/mongo";
import {loadPlanetsDate} from "./models/planets.model"
import {loadLaunches} from "./models/launches.model";



// Setting up server
const server = https.createServer({
    key : fs.readFileSync(path.join(__dirname,"..","key.pem")) ,
    cert: fs.readFileSync(path.join(__dirname,"..","cert.pem"))
},app)


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
            console.log(`Starting server at ${colors.blue(colors.underline(`https://127.0.0.1:${PORT}/`))}`)
        }
    )
}

startServer();

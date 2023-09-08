import colors from "colors";
import dotenv from "dotenv"
import * as http from "http";
import app from "./app";

/*
This is Responsible for Creating and Setting up Server

 */

dotenv.config()
const PORT = process.env.PORT || 8000;


// Setting up server
const server = http.createServer(app)


// Make Server Listen on the Specified PORT
server.listen(PORT, () => {
        console.log(`Starting server at ${colors.underline(colors.blue(`http://127.0.0.1:${PORT}/`))}`)
    }
)



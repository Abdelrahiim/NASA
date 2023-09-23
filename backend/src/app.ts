import express from "express"
import morgan from "morgan";
import PlanetsRouter from "./routes/planets/planets.router";
import LaunchesRouter from "./routes/launches/launches.route";
import cors from "cors"
import path from "path";
import helmet from "helmet";

// Setting Up Express App
const app = express();

// middleware
app.use(helmet())
app.use(express.json())
app.use(cors({
    origin:"http://localhost:3000"
}))

app.use(morgan("combined"))
app.use(express.static(path.join(__dirname,"..","public","build")))


// Demo EndPoint


// Routers
app.use("/planets", PlanetsRouter);
app.use("/launches",LaunchesRouter )

// Serve React Application After Being Built
app.get("/*", (req, res) => {
    return res.sendFile(path.join(__dirname,"..","public","build","index.html"))
})
export default app

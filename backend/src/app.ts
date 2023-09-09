import express from "express"
import morgan from "morgan";
import PlanetsRouter from "./routes/planets/planets.router";
import cors from "cors"

// Setting Up Express App
const app = express();

// middleware

app.use(express.json())
app.use(cors({
    origin:"http://localhost:3000"
}))

app.use(morgan("dev"))

// Routes
app.use("/planets", PlanetsRouter)


// Demo EndPoint
app.get("/", (req, res) => {
    return res.json({msg: "Hello World"})
})

export default app
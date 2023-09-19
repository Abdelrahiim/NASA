
import dotenv from "dotenv";

dotenv.config()


/**
 * This File Is Responsible for Loading all Environmental Variable
 */
// Database URL
export const Mongo_URL = process.env.MONGO_URL as string
export const PORT = process.env.PORT || 8000;


export const SPACEX_API_URL: string = process.env.SPACEX_API_URL as string;

import dotenv from "dotenv";

dotenv.config()


/**
 * This File Is Responsible for Loading all Environmental Variable
 */
// Database URL
export const Mongo_URL = process.env.MONGO_URL as string
export const PORT = process.env.PORT || 8000;
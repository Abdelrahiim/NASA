import {connectMongo, disconnectMongo} from "../../services/mongo";
import supertest from "supertest";
import colors from "colors";
import app from "../../app";

const Client = supertest(app);

describe("Testing Planets API", () => {
    // Connect The Test Environment To the DataBase before all the Tests
    beforeAll(async () => {
        await connectMongo()
    })
    // Disconnect From The Database After All Tests Done
    afterAll(async () => {
        await disconnectMongo()
    })
    /**
     * Testing Launch Get endpoint
     * GET /planets
     */
    describe(`Test ${colors.green("GET")} /planets`, () => {
        test("It Should Return Response 200 And Content-Type = Application/json ", async () => {
            const response = await Client.get("/planets").expect(200).expect("Content-type", /json/)
        })
    })
})

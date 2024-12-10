import request from "supertest";
import app from "../../../app";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.disconnect(); // Ensure no existing connection
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("Register Route Integration Tests", () => {
  it("GET /register should render the registration page", async () => {
    const response = await request(app).get("/register").expect(200);
    expect(response.text).toContain("Register"); // Adjust based on the content of register.ejs
  });
});

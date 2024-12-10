import request from "supertest";
import mongoose from "mongoose";
import { createApp } from "../../../server.js";

const app = createApp("mongodb://127.0.0.1:27017/tradia_test");

describe("Index Page Route", () => {
  it("should render the index page", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain("Welcome"); // Adjust based on your actual content
  });

  afterAll(async () => {
    await mongoose.connection.close(); // Close the database connection
  });
});

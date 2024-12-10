// login.test.js

jest.mock("passport", () => ({
  initialize: jest.fn(() => (req, res, next) => next()),
  session: jest.fn(() => (req, res, next) => next()),
  authenticate: jest.fn(() => (req, res, next) => {
    req.user = { id: "mockUserId", email: "testuser@example.com" }; // Mock user
    next();
  }),
  serializeUser: jest.fn((user, callback) => {
    console.log("serializeUser called with:", user);
    callback(null, user); // Proper callback behavior
  }),
  deserializeUser: jest.fn((user, callback) => {
    console.log("deserializeUser called with:", user);
    callback(null, user); // Proper callback behavior
  }),
}));

import request from "supertest";
import { createApp } from "../../../server.js";

const app = createApp("mongodb://127.0.0.1:27017/tradia_test");

describe("Login Route", () => {
  it("should render the login page", async () => {
    const res = await request(app).get("/login");
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain("Login");
  });

  it("should handle login requests", async () => {
    const res = await request(app)
      .post("/login")
      .send({ email: "testuser@example.com", password: "testpass" });
    expect(res.statusCode).toBe(302); // Check for redirection
    expect(res.header.location).toBe("/portfolio"); // Verify redirect location
  });
});

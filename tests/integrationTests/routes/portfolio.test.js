import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { createApp } from "../../../server";
import { Journal } from "../../../model/journal";

let mongoServer;
let app;
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
  app = createApp(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

jest.mock("../../../middleware/authentification.js", () => ({
  isAuth: (req, res, next) => {
    req.user = { _id: new mongoose.Types.ObjectId() }; // Mock user object
    next();
  },
}));

describe("Portfolio Route Integration Tests", () => {
  let token; // Mock authentication token
  let userId; // Mock user ID

  beforeEach(async () => {
    // Mock user ID
    userId = new mongoose.Types.ObjectId();

    // Mock authentication middleware by adding a token
    token = "mock-token"; // Replace with actual token generation logic if needed
  });

  afterEach(async () => {
    // Clear the database after each test
    await Journal.deleteMany({});
  });

  it("GET /portfolio should return a list of journals for the authenticated user", async () => {
    // Seed the database with sample data
    await Journal.create({
      asset: "BTC",
      price: 50000,
      amount: 1.5,
      date: new Date(),
      buysell: "buy",
      description: "Test journal entry",
      user: userId,
    });

    const response = await request(app)
      .get("/portfolio")
      .set("Authorization", `Bearer ${token}`) // Mock token
      .expect(200);

    expect(response.text).toContain("BTC"); // Check the rendered response
  });

  it("POST /portfolio/new should create a new journal", async () => {
    const journalData = {
      asset: "ETH",
      price: 3000,
      amount: 2,
      date: new Date(),
      buysell: "buy",
      description: "Integration test journal entry",
    };

    const response = await request(app)
      .post("/portfolio/new")
      .send(journalData)
      .set("Authorization", `Bearer ${token}`) // Mock token
      .expect(302); // Redirect status code

    const savedJournal = await Journal.findOne({ asset: "ETH" });
    expect(savedJournal).not.toBeNull();
    expect(savedJournal.price).toBe(3000);
  });

  it("POST /portfolio/edit/:id should update an existing journal", async () => {
    const journal = await Journal.create({
      asset: "BTC",
      price: 50000,
      amount: 1.5,
      date: new Date(),
      buysell: "buy",
      description: "Original journal entry",
      user: userId,
    });

    const response = await request(app)
      .post(`/portfolio/edit/${journal._id}`)
      .send({ price: 55000 }) // Update the price
      .set("Authorization", `Bearer ${token}`) // Mock token
      .expect(302);

    const updatedJournal = await Journal.findById(journal._id);
    expect(updatedJournal.price).toBe(55000);
  });

  it("POST /portfolio/delete/:id should delete a journal", async () => {
    const journal = await Journal.create({
      asset: "BTC",
      price: 50000,
      amount: 1.5,
      date: new Date(),
      buysell: "buy",
      description: "Journal to delete",
      user: userId,
    });

    const response = await request(app)
      .post(`/portfolio/delete/${journal._id}`)
      .set("Authorization", `Bearer ${token}`) // Mock token
      .expect(302);

    const deletedJournal = await Journal.findById(journal._id);
    expect(deletedJournal).toBeNull();
  });
});

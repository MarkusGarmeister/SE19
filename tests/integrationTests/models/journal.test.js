import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { Journal } from "../../../model/journal";

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("journal model integration tests", () => {
  test("create a valid user journal", async () => {
    const mockUserId = new mongoose.Types.ObjectId();

    const journalData = {
      asset: "BTC",
      price: 50000,
      buysell: "buy",
      amount: 1.5,
      date: new Date(),
      description: "Test journal entry",
      user: mockUserId,
    };

    const journal = new Journal(journalData);
    const savedJournal = await journal.save();

    expect(savedJournal.user.toString()).toBe(mockUserId.toString());
  });

  test("create journal without required field", async () => {
    const journal = new Journal({});
    let err;
    try {
      await journal.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeDefined();
  });
});

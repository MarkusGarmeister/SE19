import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { User } from "../../../model/user";

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
describe("user model integration test", () => {
  test("should correctly hash and validate a password", () => {
    const user = new User({
      name: "Max Mustermann",
      email: "max@mustermann.com",
    });
    user.setPassword("test123");

    expect(user.salt).toBeDefined();
    expect(user.hash).toBeDefined();

    expect(user.validatePassword("test123")).toBe(true);
    expect(user.validatePassword("wrong123")).toBe(false);
  });

  test("should save user with hash and salt", async () => {
    const user = new User({
      name: "Max Mustermann",
      email: "max@mustermann.com",
    });

    user.setPassword("test123");

    const savedUser = await user.save();

    expect(savedUser._id).toBeDefined();
    expect(savedUser.salt).toBeDefined();
    expect(savedUser.hash).toBeDefined();
    expect(savedUser.email).toBe("max@mustermann.com");
  });

  test("password longer than 12 characters should throw an error", async () => {
    try {
      const user = new User({
        name: "Max Mustermann",
        email: "max@mustermann.com",
      });
      user.setPassword("toLongForPassword12"); // Set an invalid password
      await user.save(); // Attempt to save the user
    } catch (error) {
      expect(error).toBeInstanceOf(Error); // Ensure an error is thrown
      expect(error.message).toMatch(
        /Password must be between 6 and 12 characters/
      ); // Validate error message
    }
  });

  test("password shorter than 6 characters should throw an error", async () => {
    try {
      const user = new User({
        name: "Max Mustermann",
        email: "max@mustermann.com",
      });
      user.setPassword("123"); // Set an invalid password
      await user.save(); // Attempt to save the user
    } catch (error) {
      expect(error).toBeInstanceOf(Error); // Ensure an error is thrown
      expect(error.message).toMatch(
        /Password must be between 6 and 12 characters/
      ); // Validate error message
    }
  });
});

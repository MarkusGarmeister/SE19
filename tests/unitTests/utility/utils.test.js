import { validPassword, genPassword } from "../../../utility/passwordUtils";
import crypto from "node:crypto";

describe("generate passwords", () => {
  test("generate hashed passwords with salt", () => {
    const password = "ImSafe123+";
    const salt = "1".repeat(32);
    const result = genPassword(password, salt);
    const expectedHash = crypto
      .pbkdf2Sync(password, salt, 10000, 64, "sha512")
      .toString("hex");
    expect(result).toBeTruthy();
    expect(result.salt).toBe(salt);
    expect(result.hash).toBe(expectedHash);
  });

  test("generate hashed passwords with no salt", () => {
    const password = "ImSafe123+";
    const result = genPassword(password);
    expect(result).toBeTruthy();
    const expectedHash = crypto
      .pbkdf2Sync(password, result.salt, 10000, 64, "sha512")
      .toString("hex");
    expect(result.hash).toBe(expectedHash);
  });

  test("generate hashed passwords with wrong salt", () => {
    const password = "ImSafe123+";
    const salt = "1".repeat(32);
    const expectedHash = crypto
      .pbkdf2Sync(password, salt, 10000, 64, "sha512")
      .toString("hex");
    const result = genPassword(password);
    expect(result).toBeTruthy();
    expect(result.hash).not.toBe(expectedHash);
    expect(result.salt).not.toBe(salt);
  });

  // test("generate hashed passwords with password length 0" , () => {
  //     const password = ""
  //     const salt = "1".repeat(32)
  //     const result = genPassword(password, salt)
  //     const expectedHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')
  //     expect(result).toBeTruthy()
  //     expect(result.salt).toBe(salt)
  //     expect(result.hash).toBe(expectedHash)
  // })
  test("empty password", () => {
    const password = "";
    const salt = "1".repeat(32);
    expect(() => genPassword(password, salt)).toThrowError(
      "Password must be between 6 and 12 characters long"
    );
  });

  test("password longer than 12 characters", () => {
    const password = "1".repeat(13); // 13 characters, exceeds the limit
    const salt = "1".repeat(32);
    expect(() => genPassword(password, salt)).toThrowError(
      "Password must be between 6 and 12 characters long"
    );
  });

  test("password shorter than 6 characters", () => {
    const password = "123"; // 13 characters, exceeds the limit
    const salt = "1".repeat(32);
    expect(() => genPassword(password, salt)).toThrowError(
      "Password must be between 6 and 12 characters long"
    );
  });
});
// test("generate hashed passwords with long password" , () => {
//     const password = "1".repeat(2^53)
//     const salt = "1".repeat(32)
//     const result = genPassword(password, salt)
//     const expectedHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')
//     expect(result).toBeTruthy()
//     expect(result.salt).toBe(salt)
//     expect(result.hash).toBe(expectedHash)
// })

describe("validate password", () => {
  test("password is correct ", () => {
    const password = "CorrectPass";
    const { hash, salt } = genPassword(password);
    expect(validPassword(password, hash, salt)).toBe(true);
  });

  test("password is incorrect", () => {
    const password = "CorrectPass";
    const { hash, salt } = genPassword(password);
    expect(validPassword("WrongPass", hash, salt)).toBe(false);
  });

  test("incorrect salt", () => {
    const password = "CorrectPass";
    const { hash } = genPassword(password);
    const fakeSalt = "x".repeat(32);
    expect(validPassword(password, hash, fakeSalt)).toBe(false);
  });

  test("incorrect hash", () => {
    const password = "CorrectPass";
    const { salt } = genPassword(password);
    const fakeHash = "f".repeat(128);
    expect(validPassword(password, fakeHash, salt)).toBe(false);
  });

  test("undefined hash", () => {
    const password = "CorrectPass";
    const { salt } = genPassword(password);
    expect(validPassword(password, undefined, salt)).toBe(false);
  });
});

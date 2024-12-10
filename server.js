// app.js
import express from "express";
import portfolioRouter from "./routes/portfolio.js";
import loginRouter from "./routes/login.js";
import registerRouter from "./routes/register.js";
import simplepagesRouter from "./routes/simple-pages.js";
import logoutRouter from "./routes/logout.js";
import mongoose from "mongoose";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import { strategy } from "./config/passport.js";
import "dotenv/config";

// Create Express App
const app = express();

// Middleware and Passport Setup
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(morgan("tiny"));

passport.use(strategy);
app.use(passport.initialize());
app.use(passport.session());

// View Engine
app.set("view engine", "ejs");

// Route Handlers
app.use("/", simplepagesRouter);
app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/portfolio", portfolioRouter);
app.use("/logout", logoutRouter);

// Function to Start the Database
export function startDatabase(databaseURL) {
  mongoose
    .connect(databaseURL)
    .then(() => {
      if (mongoose.connection.readyState === 1) {
        console.log("Database is connected");
      }
    })
    .catch((error) => console.error(error));
}

// Configure Session
export function setupSession(databaseURL) {
  return session({
    secret: "secret123",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: databaseURL,
      dbName: "tradia",
      collection: "sessions",
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // expires after 24h
    },
  });
}

// Export App Instance for Testing
export default app;

//ALL IMPORTS
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

function start_server(port, databaseURL) {
  const app = express();
  const session = setupSession(databaseURL)
  startDatabase(databaseURL)
  // SETUP SERVER
  app.use(session);
  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(strategy);
  // UI
  app.set("view engine", "ejs");
  app.use(express.static("public"));
  app.use(express.urlencoded({ extended: false }));
  app.use(morgan("tiny"));
  
  
  // ENDPOINTS
  app.use("/", simplepagesRouter);
  app.use("/login", loginRouter);
  app.use("/register", registerRouter);
  app.use("/portfolio", portfolioRouter);
  app.use("/logout", logoutRouter);

  app.listen(port, () => {
    console.log("Server listen at port: " + port);
  });
}

export function startDatabase(databaseURL) {
  //DATABASE
  mongoose
    .connect(databaseURL)
    .then(() => {
      if (mongoose.connection.readyState === 1) {
        console.log("Database is connected");
      }
    })
    .catch((error) => console.error(error));
}

function setupSession(databaseURL) {
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

start_server(process.env.PORT, process.env.MONGODB_URI)

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import compression from "compression";
dotenv.config();

import postRouter from "./routes/post.js";
import userRouter from "./routes/user.js";
import messageRouter from "./routes/message.js";

import http from "http";
import setupSocket from "./socket.js";

// express app
const app = express();
const server = http.createServer(app);
setupSocket(server);

// middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(cors());
app.use(compression());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/posts", postRouter);
app.use("/users", userRouter);
app.use("/messages", messageRouter);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to database");
    // listen to port
    server.listen(process.env.PORT, () => {
      console.log(`\nServer Running on: http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

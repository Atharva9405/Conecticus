const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authroutes");
require("dotenv").config();

const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use(cors());

// register the routes
app.use("/api/auth", authRoutes);

const server = http.createServer(app);

mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server is listening on ${PORT}`);
      console.log("database connected")
    });
  })
  .catch((err) => {
    console.log("database connection failed. Server not started");
    console.error(err);
  });

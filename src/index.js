const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors=require('cors')
require("dotenv").config();

const userRouter = require("./routes/userRouter");
const petRouter = require("./routes/petRouter");
const { protectRoute } = require("./middlewares/authMiddleware");
const { get404, errorHandler } = require("./middlewares/errorHandlers");

const PORT = process.env.PORT || 3500;
const app = express();

app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use("/api/v1/user", userRouter);

app.use("/api/v1/pets", petRouter);

app.use(get404);

app.use(errorHandler);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => app.listen(PORT, () => console.log("Server @ 3500")))
  .catch((err) => console.log(err.message));

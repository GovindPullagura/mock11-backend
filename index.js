const express = require("express");
const { connection } = require("./db");
const { registerRouter } = require("./routes/registerRoute");
const { loginRouter } = require("./routes/loginRoute");
const { booksRouter } = require("./routes/booksRoute");
const { orderRouter } = require("./routes/ordersRoute");
const { privateRoute } = require("./middlewares/loginMiddleware");
require("dotenv").config();

const app = express();
app.use(express.json());

app.get("/api", (req, res) => {
  res.send("Home Page");
});

app.use("/api/register", registerRouter);
app.use("/api/login", loginRouter);

app.use("/api/books", booksRouter);

app.use(privateRoute);
app.use("/api/orders", orderRouter);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connected to MongoDB Atlas.");
  } catch (error) {
    console.log(error);
  }
  console.log("Listening to the port.");
});

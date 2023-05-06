const express = require("express");
const { OrderModel } = require("../models/orderModel");

const orderRouter = express.Router();

orderRouter.get("/", async (req, res) => {
  try {
    const ordersData = await OrderModel.find();
    res.status(200).send(ordersData);
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = { orderRouter };

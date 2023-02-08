const { createPaymentMP, createOrderPP, capturePaymentPP } = require("../utils/payment");

const makeOrderPP = async (req, res) => {
  try {
    const { products } = req.body;
    const order = await createOrderPP(products);
    return res.json(order);
  }
  catch (error) {
    return res.status(404).json({ message: error });
  }
}

const capturePayment = async (req, res) => {
  try {
    const { token } = req.query;
    const captureData = await capturePaymentPP(token);
    return res.json(captureData);
  }
  catch (error) {
    return res.status(404).json({ message: error });
  }
} 

const makePaymentMP = async (req, res) => {
  try {
    const { products } = req.body;
    const payment = await createPaymentMP(products);

    return res.json(payment);
  }
  catch (error) {
    return res.status(404).json({ message: error });
  }
}

const capturePaymentMP = async (req, res) => {
  try {
    return res.json(req.query);
  } 
  catch (error) {
    return res.status(404).json({ message: error });
  }
}

const cancelPayment = async (req, res) => {
  res.redirect("/");
}

module.exports = {
  makePaymentMP,
  makeOrderPP,
  capturePaymentMP,
  capturePayment,
  cancelPayment
}
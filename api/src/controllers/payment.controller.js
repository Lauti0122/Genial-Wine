const { createPaymentMP, createOrderPP, capturePaymentPP } = require("../utils/payment");

const makeOrderPP = async (req, res) => {
  try {
    const order = await createOrderPP(req.body.wines);
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
    const { payer, products } = req.body;
    const payment = await createPaymentMP(payer, products);

    return res.json(payment);
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
  capturePayment,
  cancelPayment
}
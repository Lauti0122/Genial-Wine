const axios = require("axios");

const createPayment = async (payer, products) => {

  const url = "https://api.mercadopago.com/checkout/preferences";

  const items = products.map(product => {
    return {
      id: product.id,
      title: product.name,
      description: product.description,
      picture_url: product.images,
      category_id: "wines",
      currency_id: "ARS",
      quantity: product.quantity,
      unit_price: product.price
    }
  });

  const body = {
    payer: {
      email: payer.email
    },
    items: items,
    back_urls: {}
  };

  const payment = await axios.post(url, body, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`
    }
  });

  return payment.data;
}

const makePayment = async (req, res) => {
  try {
    const { payer, products } = req.body;
    const payment = await createPayment(payer, products);

    return res.json(payment);
  }
  catch (error) {
    return res.status(404).json({ message: error });
  }
}

module.exports = {
  makePayment
}
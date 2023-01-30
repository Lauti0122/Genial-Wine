const axios = require("axios");

const base = "https://api-m.sandbox.paypal.com";

const createPaymentMP = async (payer, products) => {

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

const createOrderPP = async (items) => {
  const accessToken = await generateAccessToken();
  const url = `${base}/v2/checkout/orders`;
  const total = items.reduce((sum, item) => {
    return sum + item.price * item.quantity
  }, 0)
  const body = {
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: total,
          breakdown: {
            item_total: {
              currency_code: "USD",
              value: total,
            },
          },
        },
        items: items.map(item => {
          return {
            name: item.name,
            unit_amount: {
              currency_code: "USD",
              value: item.price,
            },
            quantity: item.quantity,
          }
        }),
      },
    ],
    application_context: {
      brand_name: "genialwine",
      landing_page: "NO_PREFERENCE",
      user_action: "PAY_NOW",
      return_url: `http://localhost:4000/api/payment/pp/capture`,
      cancel_url: `http://localhost:4000/api/payment/pp/cancel`,
    },
  }
  const response = await axios.post(url, body, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    }
  });
  return response.data;
}


const capturePaymentPP = async (token) => {
  try {
    const accessToken = await generateAccessToken();
    const url = `${base}/v2/checkout/orders/${token}/capture`;
    const response = await axios.post(url, {}, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
  console.log(response);
  return response.data;
  }
  catch (error) {
    console.log(error);
  }
}

const generateAccessToken = async () => {
  const auth = Buffer.from(process.env.PP_CLIENT_ID + ":" + process.env.PP_SECRET).toString("base64");
  const response = await axios.post(`${base}/v1/oauth2/token`, "grant_type=client_credentials", { 
    headers: {
      Authorization: `Basic ${auth}`,
    },
  });
  return response.data.access_token;
}

module.exports = {
  createPaymentMP,
  createOrderPP,
  capturePaymentPP
}
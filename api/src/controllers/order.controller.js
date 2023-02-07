const { Order, OrderItem, User, Wine } = require("../db");

const getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: OrderItem,
          include: [Wine]

        },
        {
          model: User,
        }
      ]
    })
    res.status(201).json(orders)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

const postOrder = async (req, res) => {
  try {
    const { total, payment_method, userId } = req.body;

    if (!total || !payment_method) return res.status(400).json({ message: "Missing data" });

    const newOrder = await Order.create(req.body);
    newOrder.setUser(userId);

    return res.status(201).json(newOrder);
  }
  catch (error) {
    return res.status(404).json({ message: error.message })
  }
}

module.exports = {
  getOrders,
  postOrder
}
const { OrderItem, Wine } = require("../db");

const postOrderItem = async (req, res) => {
  try {
    const { name, quantity, total_price, wineId, orderId } = req.body;
    
    if (!name || !quantity || !total_price) return res.status(400).json({ message: "Missin data" });

    console.log(OrderItem);
    const newOrderItem = await OrderItem.create({ name, quantity, total_price });
    newOrderItem.setWine(wineId);
    newOrderItem.setOrder(orderId);

    return res.status(201).json(newOrderItem);
  }
  catch (error) {
    return res.status(404).json({ message: error.message })   
  }
}

const getOrderItems = async (req, res) => {
  try {
    const orderItems = await OrderItem.findAll({
      include: [{
        model: Wine,
        attributes: ["name", "price"]
      }]
    })

    return res.json(orderItems);
  } 
  catch (error) {
    return res.status(404).json({ message: error.message });
  }
}

module.exports = {
  postOrderItem,
  getOrderItems
}
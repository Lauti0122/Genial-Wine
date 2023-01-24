const { Order } = require("../db");

const getOrders = async (req, res) => {
    try {
        const orders = await Order.findAll()
        res.status(201).json(orders)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

module.exports = {
    getOrders
}
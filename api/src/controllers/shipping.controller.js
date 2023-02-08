const { Shipping } = require("../db");
const postShipping = async (req, res) => {
    try {
        const { city, country, address, phone, orderId } = req.body
        if (!city || !country || !address || !phone) return res.status(400).json({ message: "Missing data" });

        const newShipping = await Shipping.create(req.body);
        newShipping.setOrder(orderId)

        return res.status(201).json(newShipping);

    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

module.exports = {
    postShipping
}
const { Wine } = require("../db");

const getWines = async (req, res) => {
  try {
    const wines = await Wine.findAll();
    res.status(201).json(wines);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

const postWines = async (req, res) => {
  try {
    const { name, price } = req.body
    if (!name || !price) {
      return res.status(400).json({ message: "Missing data" });
    }
    const wineExists = await Wine.findOne({ where: { name: name } });

    if (wineExists) return res.status(400).json({ message: "Wine already exists" });

    const newWine = await Wine.create(req.body);
    res.status(201).json(newWine);

  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

module.exports = {
  getWines,
  postWines
}
const { Wine } = require("../db");

const getWines = async (req, res) => {
  try {
    const wines = await Wine.findAll();
    
    return res.status(201).json(wines);
  } 
  catch (error) {
    return res.status(404).json({ message: error.message });
  }
}

const getTrendingWines = async (req, res) => {
  try {
    const wines = await Wine.findAll({ where: { is_trending: true }});
    
    res.json(wines);
  }
  catch (error) {
    return res.status(404).json({ message: error.message });
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

const updateWine = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, country, region, type, grape_type, description, stock, capacity, year, images, is_trending } = req.body;

    const wineExists = await Wine.findOne({ where: { id: id } });

    if (!wineExists) return res.status(400).json({ message: "Wine not found" });

    const updatedWine = await Wine.update(
      {
        name: name,
        price: price,
        country: country,
        region: region,
        type: type,
        grape_type: grape_type,
        description: description,
        stock: stock,
        capacity: capacity,
        year: year,
        images: images,
        is_trending: is_trending
      }, { where: { id } }
    );

    updatedWine ? res.json({ message: "Data updated successfully" }) : res.json({ message: "The data has not been updated" });
  }
  catch (error) {
    console.log(error)
  }
}

module.exports = {
  getWines,
  getTrendingWines,
  postWines,
  updateWine
}
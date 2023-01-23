const { Wine } = require("../db");

const getWines = async (req, res) => {
  res.send("Wines GET");
}

module.exports = {
  getWines
}
const axios = require("axios");
const fs = require('fs')
const path = require('path')

const postWines = async () => {
  const file = fs.readFileSync(path.join(__dirname, "wines.json"));
  const wines = JSON.parse(file);
  const winesExists = await axios.get("http://localhost:4000/api/wines");
  if (!winesExists.data.length) {
    await Promise.all(
      wines.map(async wine => {
        const res = await axios.post(`http://localhost:4000/api/wines/`, wine);
        return res;
      })
    );
  }
}

module.exports = {
  postWines
}
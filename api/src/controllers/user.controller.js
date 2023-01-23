const { User } = require("../db");

const postUser = async (req, res) => {
  res.send("User POST");
}

module.exports = {
  postUser
}
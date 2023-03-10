const { User } = require("../db");

const postUser = async (req, res) => {
  try {
    const { name, lastname, email } = req.body;

    if (!name || !lastname || !email) return res.status(400).json({ message: "Missing data" });

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) return res.status(400).json({ message: "Invalid email" });

    const emailExists = await User.findOne({ where: { email } });
    if (emailExists) return res.status(400).json({ message: "User already exists" });

    const newUser = await User.create(req.body);
    return res.status(201).json(newUser);
  }
  catch (error) {
    return res.status(404).json({ message: error.message });
  }
}

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    return res.json(users);
  }
  catch (error) {
    return res.status(404).json({ message: error.message });
  }
}

const getUser = async (req, res) => {
  try {
    const { email } = req.params;

    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(400).json({ message: "User not found" });

    return res.json(user);
  }
  catch (error) {
    return res.status(404).json({ message: error.message });
  }
}

const updateUser = async (req, res) => {
  try {
    const { email: paramEmail } = req.params;
    const { city, cp, address, birthday, phone, photo, name, lastname, admin } = req.body;

    const userExists = await User.findOne({ where: { email: paramEmail } });

    if (!userExists) return res.status(400).json({ message: "User not found" });

    const updatedUser = await User.update(
      {
        name: name,
        lastname: lastname,
        city: city,
        cp: cp,
        address: address,
        birthday: birthday,
        phone: phone,
        photo: photo,
        admin: admin
      }, { where: { email: paramEmail } }
    );

    updatedUser ? res.json({ message: "Data updated successfully" }) : res.json({ message: "The data has not been updated" });
  }
  catch (error) {

  }
}

module.exports = {
  postUser,
  getUsers,
  getUser,
  updateUser
}
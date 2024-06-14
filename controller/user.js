const { User } = require('../postgres/connection.js');

const CreateUser = async (req, res) => {
  const { name, email_id, password } = req.body;
  try {
    const existingUser = await User.findOne({ where: { email_id } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const newUser = await User.create({ name, email_id, password });
    return res.status(201).json({ user: newUser });
  } catch (error) {
    return res.status(500).json({ message: "Error creating user", error: error.message });
  }
};

const GetUser = async (req, res) => {
  try {
    const users = await User.findAll(); 
    return res.status(200).json({ users }); 
  } catch (error) {
    return res.status(500).json({ message: "Error fetching users", error: error.message }); 
  }
};

module.exports = {
  CreateUser,
  GetUser
};


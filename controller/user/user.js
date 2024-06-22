const { User,CategoryExpense,Expense,Category } = require('../../postgres/connection.js');
const { generateToken } = require('../../utils/jwt.js');

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

const SigninUser = async (req, res) => {
  const { email_id, password } = req.body;
  try {
    const existingUser = await User.findOne({ where: { email_id, password } });
    if (existingUser) {
      const token = generateToken(existingUser.id);
      return res.status(200).json({ token, message: "User signed in",id:existingUser.id });
    } else {
      return res.status(404).json({ message: "User not found. Please sign up." });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error signing in", error: error.message });
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

const GetUserById = async (req, res) => {
  const userId = req.user.userId;
  try {
    const users = await User.findOne({where:{id: userId}}); 
    if(users){
      return res.status(200).json({ users }); 
    }
    else{
      return res.status(200).json({message: "No user exists" }); 
    }
  } catch (error) {
    return res.status(500).json({ message: "Error fetching users", error: error.message }); 
  }
};




module.exports = {
  CreateUser,
  GetUser,
  SigninUser,
  GetUserById
};


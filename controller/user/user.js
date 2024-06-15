const { User,CategoryExpense,Expense,Category } = require('../../postgres/connection.js');

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
    const existingUser = await User.findOne({ where: { email_id ,password} });
    if (existingUser) {
      return res.status(200).json({ message: "User signed in" });
    }
    else{
      return res.status(501).json({message:"PLease sign up user"});
    }
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

const GetUserById = async (req, res) => {
   const {id}= req.params;
  try {
    const users = await User.findOne({where:{id}}); 
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

const SpecificUserAllCategory = async (req, res) => {
  const { id } = req.params; 

  try {
    const allExpenses = await Expense.findAll({ where: { user_id: id } });

    const expenseIds = allExpenses.map(expense => expense.id);

    const categoryExpenses = await CategoryExpense.findAll({ where: { ExpenseId: expenseIds } });

    const categoryIds = categoryExpenses.map(categoryExpense => categoryExpense.CategoryId);

    const categories = await Category.findAll({ where: { id: categoryIds } });

    return res.status(200).json({ categories });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching categories", error: error.message });
  }
};


module.exports = {
  CreateUser,
  GetUser,
  SigninUser,
  SpecificUserAllCategory,
  GetUserById
};


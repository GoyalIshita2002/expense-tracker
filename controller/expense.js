const { Expense } = require('../postgres/connection.js'); 

const CreateExpense = async (req, res) => {
  const { date, amount, user_id } = req.body;
  try {
    const newExpense = await Expense.create({ date, amount, user_id });
    return res.status(201).json({ Expense: newExpense });
  } catch (error) {
    return res.status(500).json({ message: "Error creating Expense", error: error.message });
  }
};

const GetExpense = async (req, res) => {
  try {
    const Expenses = await Expense.findAll();
    return res.status(200).json({ Expenses });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching Expenses", error: error.message });
  }
};

module.exports = {
  CreateExpense,
  GetExpense
};

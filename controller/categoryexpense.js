const { CategoryExpense } = require('../postgres/connection.js'); // Import CategoryExpense model

const CreateCategoryExpense = async (req, res) => {
  const { CategoryId, ExpenseId } = req.body;
  try {
    const newCategoryExpense = await CategoryExpense.create({CategoryId, ExpenseId });
    return res.status(201).json({ CategoryExpense: newCategoryExpense });
  } catch (error) {
    return res.status(500).json({ message: "Error creating CategoryExpense", error: error.message });
  }
};

const GetCategoryExpense = async (req, res) => {
  try {
    const CategoryExpenses = await CategoryExpense.findAll();
    return res.status(200).json({ CategoryExpenses });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching CategoryExpense", error: error.message });
  }
};

module.exports = {
    CreateCategoryExpense,
    GetCategoryExpense
};
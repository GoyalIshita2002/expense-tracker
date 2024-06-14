const { Category , CategoryExpense ,Expense } = require('../../postgres/connection.js'); // Import Expense and CategoryExpense models

const CreateCategory = async (req, res) => {
  const { name, max_spend, role } = req.body;
  try {
    // Create the category
    const newCategory = await Category.create({ name, max_spend, role });
    return res.status(201).json({ Category: newCategory });
  } catch (error) {
    return res.status(500).json({ message: "Error creating Category", error: error.message });
  }
};

const GetCategory = async (req, res) => {
  try {
    const Categories = await Category.findAll();
    return res.status(200).json({ Categories });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching Categories", error: error.message });
  }
};

const GetExpenseSpecificCategory = async (req, res) => {
  const CategoryId = req.params.id; // Assuming req.params.id contains the category ID
  const userId = req.params.userId; // Assuming req.params.userId contains the user ID
  try {
    // Find all CategoryExpenses for the given categoryId
    const categoryExpenses = await CategoryExpense.findAll({ where: { CategoryId } });
    
    // Extract expense IDs from CategoryExpenses
    const expenseIds = categoryExpenses.map(expense => expense.ExpenseId);
    
    // Find all Expenses with the extracted expense IDs
    const expenses = await Expense.findAll({ where: { id: expenseIds } });
    
    // Filter expenses by userId and calculate the total amount
    const totalAmount = expenses
      .filter(expense => expense.user_id == userId)
      .reduce((total, expense) => total + expense.amount, 0);

    return res.status(200).json({ totalAmount });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching Expenses", error: error.message });
  }
};



module.exports = {
  CreateCategory,
  GetCategory,
  GetExpenseSpecificCategory
};

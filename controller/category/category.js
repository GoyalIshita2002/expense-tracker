const moment = require('moment');

const { Op } = require('sequelize'); 
const { Category , CategoryExpense ,Expense } = require('../../postgres/connection.js'); // Import Expense and CategoryExpense models

const CreateCategory = async (req, res) => {
  const { name, max_spend, role } = req.body;
  try {
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
  const CategoryId = req.params.id; 
  const userId = req.user.userId;
  try {
    const categoryExpenses = await CategoryExpense.findAll({ where: { CategoryId } });

    const expenseIds = categoryExpenses.map(expense => expense.ExpenseId);
  
    const expenses = await Expense.findAll({ where: { id: expenseIds } });
  
    const totalAmount = expenses
      .filter(expense => expense.user_id == userId)
      .reduce((total, expense) => total + expense.amount, 0);

    return res.status(200).json({ totalAmount });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching Expenses", error: error.message });
  }
};


const GetDailyExpensesForDate = async (req, res) => {
  const userId = req.user.userId; 
  const CategoryId = req.params.id; 
  const weekStartDate = req.query.Date; 
  try {
    const categoryExpenses = await CategoryExpense.findAll({ where: { CategoryId: CategoryId } });

    const expenseIds = categoryExpenses.map(expense => expense.ExpenseId);

    const expenses = await Expense.findAll({
      where: {
        id: expenseIds,
        user_id: userId,
        date: {
          [Op.gte]: weekStartDate,
          [Op.lt]: moment(weekStartDate).add(7, 'days').format('YYYY-MM-DD')
        }
      }
    });

    const dailyExpenses = {};
    expenses.forEach(expense => {
      const dayOfWeek = moment(expense.date).format('dddd');
      if (!dailyExpenses[dayOfWeek]) {
        dailyExpenses[dayOfWeek] = 0;
      }
      dailyExpenses[dayOfWeek] += expense.amount;
    });

    return res.status(200).json(dailyExpenses);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching daily expenses", error: error.message });
  }
};







module.exports = {
  CreateCategory,
  GetCategory,
  GetExpenseSpecificCategory,
  GetDailyExpensesForDate
};

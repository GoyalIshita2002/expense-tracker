
const { Op } = require('sequelize'); 
const { ExpenseCategory,User } = require('../../postgres/connection.js');

const GetOverallExpense = async (req, res) => {
  const userId = req.user.userId;
  try {
      const user = await User.findOne({ where: { id: userId } });
      if (user) {
          const categories = await ExpenseCategory.findAll({ where: { userId } });
          const totalAmount = categories.reduce((sum, category) => sum + category.amount, 0);
          return res.status(200).json({ Category: categories, overallAmount: totalAmount });
      } else {
          return res.status(404).json({ message: "User not found" });
      }
  } catch (error) {
      console.error('Error finding category:', error);
      return res.status(500).json({ message: "Error finding category", error: error.message });
  }
};


const GetOverallExpenseByDate = async (req, res) => {
  const userId = req.user.userId;
  const { date } = req.query; 
  const targetDate = new Date(date);
  targetDate.setHours(0, 0, 0, 0); 

  try {
    const user = await User.findOne({ where: { id: userId } });
    if (user) {
      const categories = await ExpenseCategory.findAll({ 
        where: { 
          userId,
          createdAt: {
            [Op.gte]: targetDate,
            [Op.lt]: new Date(targetDate.getTime() + 24 * 60 * 60 * 1000) 
          }
        }
      });
      const totalAmount = categories.reduce((sum, category) => sum + category.amount, 0);
      return res.status(200).json({ Category: categories, overallAmount: totalAmount });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error('Error finding category:', error);
    return res.status(500).json({ message: "Error finding category", error: error.message });
  }
};

const GetOverallExpenseByWeek = async (req, res) => {
  const userId = req.user.userId;
  const { date } = req.query; 
  const targetDate = new Date(date);

  const dayOfWeek = targetDate.getDay(); 
  const firstDayOfWeek = new Date(targetDate.setDate(targetDate.getDate() - dayOfWeek));
  firstDayOfWeek.setHours(0, 0, 0, 0); 
  const lastDayOfWeek = new Date(firstDayOfWeek.getTime() + 7 * 24 * 60 * 60 * 1000); 

  try {
    const user = await User.findOne({ where: { id: userId } });
    if (user) {
      const categories = await ExpenseCategory.findAll({ 
        where: { 
          userId,
          createdAt: {
            [Op.gte]: firstDayOfWeek,
            [Op.lt]: lastDayOfWeek
          }
        }
      });
      const totalAmount = categories.reduce((sum, category) => sum + category.amount, 0);
      return res.status(200).json({ Category: categories, overallAmount: totalAmount });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error('Error finding category:', error);
    return res.status(500).json({ message: "Error finding category", error: error.message });
  }
};

const GetWeeklyExpensesForMonth = async (req, res) => {
  const userId = req.user.userId;
  const { month, year } = req.query; // Expecting month and year as query parameters

  // Calculate the first and last day of the month
  const firstDayOfMonth = new Date(year, month - 1, 1);
  const lastDayOfMonth = new Date(year, month, 0);

  // Initialize an array to hold the weekly expenses
  const weeklyExpenses = [];
  let overallMonthlyExpense = 0;

  try {
    const user = await User.findOne({ where: { id: userId } });
    if (user) {
      // Iterate through each week of the month
      for (let weekStart = new Date(firstDayOfMonth); weekStart < lastDayOfMonth; weekStart.setDate(weekStart.getDate() + 7)) {
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekEnd.getDate() + 6);

        // Ensure the weekEnd does not exceed the last day of the month
        if (weekEnd > lastDayOfMonth) {
          weekEnd.setDate(lastDayOfMonth.getDate());
        }

        // Retrieve expenses for the current week
        const categories = await ExpenseCategory.findAll({
          where: {
            userId,
            createdAt: {
              [Op.gte]: weekStart,
              [Op.lt]: new Date(weekEnd.getTime() + 24 * 60 * 60 * 1000)
            }
          }
        });

        const totalAmount = categories.reduce((sum, category) => sum + category.amount, 0);
        overallMonthlyExpense += totalAmount;

        weeklyExpenses.push({
          weekStart: weekStart.toISOString().split('T')[0],
          weekEnd: weekEnd.toISOString().split('T')[0],
          totalAmount: totalAmount
        });
      }

      return res.status(200).json({ 
        weeklyExpenses, 
        overallMonthlyExpense 
      });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error('Error finding categories:', error);
    return res.status(500).json({ message: "Error finding categories", error: error.message });
  }
};



module.exports={
  GetOverallExpense,GetOverallExpenseByDate,
  GetOverallExpenseByWeek,GetWeeklyExpensesForMonth

}

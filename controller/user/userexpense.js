const {Expense} = require('../../postgres/connection.js')
const { Op } = require('sequelize');

const SpecificUserExpense = async (req, res) => {
    const { id } = req.params;
    try {
      const expenses = await Expense.findAll({ where: { user_id: id } });
      const totalAmount = expenses.reduce((total, expense) => total + expense.amount, 0);
      
      return res.status(200).json({ totalAmount });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };


  const SpecificDateUserExpense = async (req, res) => {
    const { id } = req.params;
    const date = req.query.date; 
    try {
      let expenses;
      if (date) {
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);
        expenses = await Expense.findAll({
          where: {
            user_id: id,
            date: {
              [Op.between]: [startOfDay, endOfDay]
            }
          }
        });
      } else {
        expenses = await Expense.findAll({ where: { user_id: id } });
      }
  
      const totalAmount = expenses.reduce((total, expense) => total + expense.amount, 0);
  
      return res.status(200).json({ totalAmount });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

  
  

  module.exports={
    SpecificUserExpense,
    SpecificDateUserExpense
  }
  
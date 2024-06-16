const { Income,User } = require('../../postgres/connection.js')


const CreateIncome = async (req, res) => {
    const { name,amount,userId } = req.body;
    try {
      const Incomes = await Income.create({ name,amount,userId });
      return res.status(201).json({ Income: Incomes });
    } catch (error) {
      return res.status(500).json({ message: "Error creating Income", error: error.message });
    }
  };

  const ShowIncome = async (req,res) =>{
    const { userId } = req.params;  
    try {
      const users = await User.findOne({ where: {id: userId } });
      if (users) {
        const Incomes = await Income.findAll({where:{userId}});
        return res.status(201).json({ Income: Incomes });
      } else {
        return res.status(404).json({ message: "User not found" });
      }
      } catch (error) {
        return res.status(500).json({ message: "Error finding Income", error: error.message });
      }
  }

  const ShowSpecificIncome = async (req,res) =>{
    const {id,userId} = req.params;
    const users = await User.findOne({ where: {id: userId } });
    try {
      if (users) {
        const Incomes = await Income.findOne({where:{id,userId}});
        return res.status(201).json({ Income: Incomes });
      } else {
        return res.status(404).json({ message: "User not found" });
      }
      } catch (error) {
        return res.status(500).json({ message: "Error finding Income", error: error.message });
      }
  }

  const UpdateIncome = async (req, res) => {
    const { id,userId } = req.params;
    const { name, amount } = req.body;
    const users = await User.findOne({ where: {id: userId } });
    try {
      if (users) {
        const income = await Income.findOne({ where: { id,userId } });
        if (income) {
          await income.update({ name, amount });
          return res.status(200).json({ income });
        } else {
          return res.status(404).json({ message: "Income id does not exist" });
        }
      } else {
        return res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Error finding Income", error: error.message });
    }
  };
  

  module.exports = {
    UpdateIncome ,
    ShowSpecificIncome,
    ShowIncome,
    CreateIncome
  }

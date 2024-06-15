const {Income} = require('../../postgres/connection.js')


const CreateIncome = async (req, res) => {
    const { name,amount,userId } = req.body;
    try {
      const Income = await Income.create({ name,amount,userId });
      return res.status(201).json({ Income: Income });
    } catch (error) {
      return res.status(500).json({ message: "Error creating Income", error: error.message });
    }
  };

  const ShowIncome = async (req,res) =>{
    try {
        const Incomes = await Income.findAll();
        return res.status(201).json({ Income: Incomes });
      } catch (error) {
        return res.status(500).json({ message: "Error finding Income", error: error.message });
      }
  }

  const ShowSpecificIncome = async (req,res) =>{
    const {id} = req.params;
    try {
        const Income = await Income.findOne({where:{id}});
        return res.status(201).json({ Income: Income });
      } catch (error) {
        return res.status(500).json({ message: "Error finding Income", error: error.message });
      }
  }

  const UpdateIncome = async (req,res) =>{
    const {id} = req.params;
    const {name,amount,userId} = req.body;
    try {
        const Income = await Income.findOne({where:{id}});
        if(Income){
            Income = Income.update(name,amount,userId);
            return res.status(201).json({ Income: Income });
        }
        else{
            return res.status(404).json({ message: "Income id do not exist"});  
        }
      } catch (error) {
        return res.status(500).json({ message: "Error finding Income", error: error.message });
      }
  }

  module.exports = {
    UpdateIncome ,
    ShowSpecificIncome,
    ShowIncome,
    CreateIncome
  }

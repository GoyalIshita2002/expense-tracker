const { ExpenseCategory,User } = require('../../postgres/connection.js');

const { Op } = require('sequelize'); 

const CreateCategory = async (req, res) => {
    try {
        const { name, max_spend, role, amount } = req.body;
        const userId = req.user.userId;
        const user = await User.findOne({ where: { id: userId } });
        
        if (user) {
            const existingCategory = await ExpenseCategory.findOne({ 
                where: { 
                    name: { [Op.iLike]: name },
                    userId: userId
                }
            });

            if (existingCategory) {
   
                existingCategory.amount += amount;
                await existingCategory.save();
                return res.status(200).json({ 
                    message: 'Category amount updated successfully', 
                    Category: existingCategory 
                });
            } else {
               
                const newCategory = await ExpenseCategory.create({ name, max_spend, role, amount, userId });
                return res.status(201).json({ 
                    message: 'Category created successfully', 
                    Category: newCategory 
                });
            }
        } else {
            return res.status(404).json({ message: "No user exists" });
        }
    } catch (error) {
        console.error('Error creating/updating category:', error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};



  const GetCategory = async (req, res) => {
    const userId = req.user.userId;
    try {
      const users = await User.findOne({ where: {id: userId } });
      if (users) {
        const category = await ExpenseCategory.findAll({where:{userId}});
        return res.status(200).json({ Category: category});
      } else {
        return res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Error finding category", error: error.message });
    }
  };

  const SpecificCategory = async (req, res) => {
    const userId = req.user.userId;
    const {id} = req.params;
    try {
      const users = await User.findOne({ where: {id: userId } });
      if (users) {
        const category = await ExpenseCategory.findOne({where:{userId,id}});
        return res.status(200).json({ Category: category});
      } else {
        return res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Error finding category", error: error.message });
    }
  };

  const DeleteCategory = async (req, res) => {
    const userId = req.user.userId;
    const {id} = req.params;
    try {
      const users = await User.findOne({ where: {id: userId } });
      if (users) {
        const category = await ExpenseCategory.findOne({where:{userId,id}});
        await category.destroy();
        return res.status(200).json({message: "category deleted successfully"});
      } else {
        return res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Error finding category", error: error.message });
    }
  };

  module.exports = {
    CreateCategory,GetCategory,
    SpecificCategory,DeleteCategory
  };
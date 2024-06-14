const { Expense, Category, CategoryExpense } = require('../../postgres/connection.js');


const GetAllCategory = async (req, res) => {
    const { categoryName } = req.query; // Extract categoryName from query parameters
    try {
        // Find all categories with the given name
        const categories = await Category.findAll({ where: { name: categoryName } });
        if (!categories || categories.length === 0) {
            return res.status(404).json({ message: "No categories found with the given name" });
        }
        return res.status(200).json({ categories });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

const GetAllExpense = async (req, res) => {
  
  try {
      // Find all categories with the given name
      const categories = await Category.findAll({ where: { name: categoryName } });
      if (!categories || categories.length === 0) {
          return res.status(404).json({ message: "No categories found with the given name" });
      }
      const categoriesId = categories.id;
      
  } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
   
    GetAllCategory
};
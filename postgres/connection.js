const Sequelize = require('sequelize');
const UserModel = require('../models/user.js');
const CategoryModel = require('../models/category.js');
const ExpenseModel = require('../models/expense.js');
const CategoryExpenseModel = require('../models/categoryexpense.js'); // Import the CategoryExpense model

const sequelize = new Sequelize('expensetracker', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres'
});

const User = UserModel(sequelize, Sequelize.DataTypes);
const Expense = ExpenseModel(sequelize, Sequelize.DataTypes);
const Category = CategoryModel(sequelize, Sequelize.DataTypes);
const CategoryExpense = CategoryExpenseModel(sequelize, Sequelize.DataTypes); // Define the CategoryExpense model

User.hasMany(Expense, { foreignKey: 'user_id', as: 'expenses' });
Expense.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

// // Define the many-to-many relationship between Category and Expense using the CategoryExpense join model
// Category.belongsToMany(Expense, { through: CategoryExpense, foreignKey: 'category_id', as: 'expenses' });
// Expense.belongsToMany(Category, { through: CategoryExpense, foreignKey: 'expense_id', as: 'categories' });

// // Ensure associations are properly loaded
// CategoryExpense.associate({ Expense, Category }); // Corrected this line

Category.belongsToMany(Expense, { through: CategoryExpense });
Expense.belongsToMany(Category, { through: CategoryExpense });

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    await sequelize.sync({ alter: true });
    console.log('Models were synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

module.exports = { sequelize, connectDB, User, Expense, Category, CategoryExpense }; // Export CategoryExpense model

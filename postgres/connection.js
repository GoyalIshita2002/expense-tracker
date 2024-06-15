const Sequelize = require('sequelize');
const UserModel = require('../models/user.js');
const CategoryModel = require('../models/category.js');
const ExpenseModel = require('../models/expense.js');
const CategoryExpenseModel = require('../models/categoryexpense.js'); 
const IncomeModel = require('../models/income.js');
const GoalModel = require('../models/goal.js');

const sequelize = new Sequelize('expensetracker', 'johndoe', 'randompassword', {
  host: 'localhost',
  dialect: 'postgres'
});

const User = UserModel(sequelize, Sequelize.DataTypes);
const Expense = ExpenseModel(sequelize, Sequelize.DataTypes);
const Category = CategoryModel(sequelize, Sequelize.DataTypes);
const CategoryExpense = CategoryExpenseModel(sequelize, Sequelize.DataTypes); 
const Income = IncomeModel(sequelize, Sequelize.DataTypes);
const Goal = GoalModel(sequelize, Sequelize.DataTypes);

User.hasMany(Expense, { foreignKey: 'user_id', as: 'expenses' });
Expense.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

User.hasMany(Income, { foreignKey: 'userId' });
Income.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Goal, { foreignKey: 'userId' });
Goal.belongsTo(User, { foreignKey: 'userId' });

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

module.exports = { sequelize, connectDB, User, Expense, Category, CategoryExpense ,Income,Goal }; 

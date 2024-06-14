// CategoryExpense.js
'use strict';

module.exports = (sequelize, DataTypes) => {
    const CategoryExpense = sequelize.define('CategoryExpense', {
        CategoryId: {
          type: DataTypes.INTEGER,
          references: {
            model: 'Categories',
            key: 'id',
          },
        },
        ExpenseId: {
          type: DataTypes.INTEGER,
          references: {
            model: 'Expenses',
            key: 'id',
          },
        },
      });

    // Define associations
    // CategoryExpense.associate = models => {
    //     CategoryExpense.belongsTo(models.Expense, { foreignKey: 'expense_id', onDelete: 'CASCADE' });
    //     CategoryExpense.belongsTo(models.Category, { foreignKey: 'category_id', onDelete: 'CASCADE' });
    //   };

  return CategoryExpense;
};

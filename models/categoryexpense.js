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

  return CategoryExpense;
};

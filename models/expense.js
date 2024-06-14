'use strict';

module.exports = (sequelize, DataTypes) => {
  const Expense = sequelize.define('Expense', {
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    amount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0 // Ensure amount is non-negative
      }
    }
  }, {
    tableName: 'expenses',
    timestamps: true
  });

  Expense.associate = models => {
    // Expense.hasMany(models.CategoryExpense, { foreignKey: 'expense_id', onDelete: 'CASCADE' });
    // Expense.belongsToMany(models.Category, {
    //   through: models.CategoryExpense,
    //   foreignKey: 'expense_id',
    //   as: 'categories'
    // });
    Expense.belongsTo(models.User, {
      foreignKey: {
        name: 'user_id',
        allowNull: false
      },
      as: 'user',
      onDelete: 'CASCADE'
    });
  };
  

  return Expense;
};

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
        min: 0 
      }
    }
  }, {
    tableName: 'expenses',
    timestamps: true
  });

  Expense.associate = models => {
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

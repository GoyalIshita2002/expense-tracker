// CategoryExpense.js
'use strict';

module.exports = (sequelize, DataTypes) => {
    const ExpenseCategory = sequelize.define('ExpenseCategory', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            collate: 'utf8_general_ci',
          },
          max_spend: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null,
          },
          role: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'need',
            validate: {
              isIn: [['must', 'need', 'want']]
            }
          },
          amount: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            validate: {
              min: 0 
            }
          },
         
      } ,{
        tableName: 'expensecategory',
        timestamps: true
      }
    
    );

  return ExpenseCategory;
};
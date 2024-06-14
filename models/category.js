'use strict';

module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
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
      // type: DataTypes.ENUM('must', 'need', 'want'),
      allowNull: false,
      defaultValue: 'need',
      validate: {
        isIn: [['must', 'need', 'want']]
      }
    }
  }, {
    tableName: 'categories',
    timestamps: true
  });

  // Category.associate = models => {
  //   Category.hasMany(models.CategoryExpense, { foreignKey: 'category_id', onDelete: 'CASCADE' });
  //   Category.belongsToMany(models.Expense, {
  //     through: models.CategoryExpense,
  //     foreignKey: 'category_id',
  //     as: 'expenses'
  //   });
  // };

  // Category.beforeCreate(async (category, options) => {
  //   try {
  //     const existingCategory = await Category.findOne({ where: { name: category.name } });
      
  //     if (existingCategory && existingCategory.max_spend !== null) {
  //       if (existingCategory.max_spend != category.max_spend) {
  //         throw new Error(`Category '${category.name}' already exists with max_spend value ${existingCategory.max_spend}`);
  //       }
  //     }

  //     if (category.max_spend === null) {
  //       category.max_spend = 0;
  //     }
  //   } catch (error) {
  //     console.error('Error in beforeCreate hook:', error.message);
  //     throw error;
  //   }
  // });

  return Category;
};

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

  return Category;
};

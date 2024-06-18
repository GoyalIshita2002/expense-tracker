'use strict';

module.exports = (sequelize, DataTypes) => {
    const Notification = sequelize.define('Notification', {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        repeatinterval: {
          type: DataTypes.ENUM('daily', 'weekly', 'monthly', 'yearly'),
          allowNull: false,
        },
        description: {
          type: DataTypes.STRING,
          allowNull: true,
        },
      }, {
        tableName: 'notification',
        timestamps: true
      }
    
    );

  return Notification;
};

module.exports = (sequelize,DataTypes)=>{
    const Goal = sequelize.define('Goal', {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        requiredAmount: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        goalDeposit: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        expectedTime: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      },{
        tableName: 'goals',
        timestamps: true
      }
    );
   return Goal;
}
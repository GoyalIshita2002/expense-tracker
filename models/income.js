module.exports = (sequelize, DataTypes)=>{
    const Income = sequelize.define('Income', {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        amount: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
      },{
        tableName: 'incomes',
        timestamps: true
      }
    );
   return Income;
}
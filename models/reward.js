module.exports = (sequelize,DataTypes)=>{
    const Reward = sequelize.define('Reward', {
        points: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          badge: {
            type: DataTypes.STRING,
            allowNull: false,
          },
      },{
        tableName: 'reward',
        timestamps: true
      }
    );
   return Reward;
}
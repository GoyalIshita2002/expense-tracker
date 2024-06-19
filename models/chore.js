module.exports = (sequelize,DataTypes)=>{
    const Chore = sequelize.define('Chore', {
        status: {
            type: DataTypes.ENUM('assigned', 'completed'),
            defaultValue: 'assigned',
          },
      },{
        tableName: 'chores',
        timestamps: true
      }
    );
   return Chore;
}
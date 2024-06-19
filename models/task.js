module.exports = (sequelize,DataTypes)=>{
    const Task = sequelize.define('Task', {
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
        },
        points: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },{
        tableName: 'tasks',
        timestamps: true
      }
    );
   return Task;
}
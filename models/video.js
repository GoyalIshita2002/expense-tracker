module.exports = (sequelize,DataTypes)=>{
    const Video = sequelize.define('Video', {
        Badgename: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },{
        tableName: 'video',
        timestamps: true
      }
    );
   return Video;
}
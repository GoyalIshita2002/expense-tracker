const Sequelize = require('sequelize');
const UserModel = require('../models/user.js');
const IncomeModel = require('../models/income.js');
const GoalModel = require('../models/goal.js');
const NotificationModel = require('../models/notification.js');
const VideoModel = require('../models/video.js');
const ChoreModel = require('../models/chore.js');
const RewardModel = require('../models/reward.js');
const TaskModel = require('../models/task.js');
const ExpenseCategoryModel = require('../models/expensecategory.js');


const sequelize = new Sequelize('expensetracker', 'johndoe', 'randompassword', {
  host: 'localhost',
  dialect: 'postgres'
});
// let sequelize;
// if (process.env.DB_URL) {
//   sequelize = new Sequelize(process.env.DB_URL);
// } else {
//   sequelize = new Sequelize(
//     process.env.DB_NAME,
//     process.env.DB_USER,
//     process.env.DB_PW,
//     {
//       host: 'localhost',
//       dialect: 'postgres',
//     },
//   );
// }

const User = UserModel(sequelize, Sequelize.DataTypes);
const Income = IncomeModel(sequelize, Sequelize.DataTypes);
const Goal = GoalModel(sequelize, Sequelize.DataTypes);
const Notification = NotificationModel(sequelize,Sequelize.DataTypes);
const Video = VideoModel(sequelize,Sequelize.DataTypes);
const Task = TaskModel(sequelize,Sequelize.DataTypes);
const Reward = RewardModel(sequelize,Sequelize.DataTypes);
const Chore = ChoreModel(sequelize,Sequelize.DataTypes);
const ExpenseCategory = ExpenseCategoryModel(sequelize,Sequelize.DataTypes);


User.hasMany(Income, { foreignKey: 'userId' });
Income.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Goal, { foreignKey: 'userId' });
Goal.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Notification, { foreignKey: 'user_id', as: 'notification' });
Notification.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

User.hasMany(Video, { foreignKey: 'userId', as: 'video' });
Video.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.hasMany(Chore, { foreignKey: 'userId', as: 'chores' });
Chore.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.hasMany(Reward, { foreignKey: 'userId', as: 'reward' });
Reward.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Task.hasMany(Chore, { foreignKey: 'taskId', as: 'chores' });
Chore.belongsTo(Task, { foreignKey: 'taskId', as: 'task' });

User.hasMany(ExpenseCategory, { foreignKey: 'userId', as: 'expensecategory' });
ExpenseCategory.belongsTo(User, { foreignKey: 'userId', as: 'user' });

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    await sequelize.sync({ alter: true });
    console.log('Models were synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

module.exports = { sequelize, connectDB, User ,Income,Goal,Notification,Video,Chore,Task,Reward,ExpenseCategory }; 

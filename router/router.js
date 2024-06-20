const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken.js');
const { SpecificUserExpense,SpecificDateUserExpense } = require('../controller/user/userexpense.js')
const { CreateUser, GetUser,SpecificUserAllCategory,GetUserById,SigninUser } = require('../controller/user/user.js');
const { CreateExpense,GetExpense} = require('../controller/expense.js')
const { CreateCategory,GetCategory,GetExpenseSpecificCategory,GetDailyExpensesForDate} = require('../controller/category/category.js')
const { CreateCategoryExpense, GetCategoryExpense } = require('../controller/categoryexpense.js')
const {UpdateIncome,ShowSpecificIncome,ShowIncome,CreateIncome} = require('../controller/Income/Income.js')
const { UpdateGoal,ShowSpecificGoal,ShowGoal,CreateGoal,DeleteGoal } = require('../controller/Goal/userGoal.js')
const {OverAllIncomeUser } = require('../controller/Income/overall_income.js')
const {GoalDepositUser} = require('../controller/Goal/income.js')
const {DeleteNotification,UpdateNotification,GetSpecificNotification,GetAllNotification,CreateNotification} = require('../controller/Notification/notification.js')
const {CreateVideo,GetVideo} = require('../controller/video/video.js')
const {CreateTask,ShowTask,DeleteTask} = require('../controller/task/task.js')
const {assignDailyTasks,getDailyTasks,getDailyAssignedTasks,UpdateChore,getDailyCompletedTasks} = require('../controller/chore/chore.js')
const {UserTasksAndPoints} = require('../controller/chore/points.js')
const {updateUserRewardStatus,getBadgeThresholds} = require('../controller/reward/overallreward.js')

router.post('/user', CreateUser); 
router.post('/signin', SigninUser); 
router.get('/user', GetUser); 
router.post('/category', CreateCategory); 
router.get('/category', GetCategory); 

router.post('/task', CreateTask); 
router.get('/task', ShowTask); 
router.delete('/task/:id',DeleteTask); 



router.use(authenticateToken);
 
router.post('/rewards', updateUserRewardStatus); 
router.get('/Badge', getBadgeThresholds); 



router.post('/assignDailyTasks', assignDailyTasks);
router.get('/getDailyTasks', getDailyTasks); 
router.get('/getDailyAssignedTasks', getDailyAssignedTasks);
router.get('/getDailyCompletedTasks', getDailyCompletedTasks); 
router.put('/updatechore/:id', UpdateChore); 

router.get('/overallpoints', UserTasksAndPoints); 



router.get('/specificUser', GetUserById); 
router.get('/specificCategory', SpecificUserAllCategory); 
router.get('/userOverallExpense',  SpecificUserExpense);
router.get('/userExpenseThroughDate', SpecificDateUserExpense); 
router.get('/useroverallIncome', OverAllIncomeUser); 
router.get('/userGoalIncome', GoalDepositUser); 



router.post('/expense', CreateExpense); 
router.get('/expense',GetExpense); 

router.post('/categoryexpense', CreateCategoryExpense); 
router.get('/categoryexpense',GetCategoryExpense); 

router.get('/userexpensecategory/:id',GetExpenseSpecificCategory); 
router.get('/userexpensecategorybyday/:id',GetDailyExpensesForDate); 

router.post('/income',CreateIncome); 
router.get('/userincome', ShowIncome); 
router.get('/userspecificincome/:id', ShowSpecificIncome); 
router.put('/userupdateincome/:id', UpdateIncome); 

router.post('/usergoal', CreateGoal); 
router.get('/usergoal', ShowGoal); 
router.get('/usergoal/:id', ShowSpecificGoal); 
router.put('/usergoal/:id', UpdateGoal); 
router.delete('/usergoal/:id',DeleteGoal); 

router.post('/usernotification', CreateNotification); 
router.get('/usernotification', GetAllNotification); 
router.get('/usernotification/:id', GetSpecificNotification); 
router.put('/usernotification/:id', UpdateNotification); 
router.delete('/usernotification/:id',DeleteNotification);

router.post('/addBadges', CreateVideo); 
router.get('/badges', GetVideo); 


module.exports = router;

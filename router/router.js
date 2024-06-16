const express = require('express');
const router = express.Router();
const { SpecificUserExpense,SpecificDateUserExpense } = require('../controller/user/userexpense.js')
const { CreateUser, GetUser,SpecificUserAllCategory,GetUserById,SigninUser } = require('../controller/user/user.js');
const { CreateExpense,GetExpense} = require('../controller/expense.js')
const { CreateCategory,GetCategory,GetExpenseSpecificCategory,GetDailyExpensesForDate} = require('../controller/category/category.js')
const { CreateCategoryExpense, GetCategoryExpense } = require('../controller/categoryexpense.js')
const {UpdateIncome,ShowSpecificIncome,ShowIncome,CreateIncome} = require('../controller/Income/Income.js')
const { UpdateGoal,ShowSpecificGoal,ShowGoal,CreateGoal,DeleteGoal } = require('../controller/Goal/userGoal.js')
const {OverAllIncomeUser } = require('../controller/Income/overall_income.js')
const {GoalDepositUser} = require('../controller/Goal/income.js')

router.post('/user', CreateUser); 
router.get('/user', GetUser); 
router.get('/user/:id', GetUserById); 
router.post('/signin', SigninUser); 
router.get('/user/:id/category', SpecificUserAllCategory); 
router.get('/user/:id/expense', SpecificUserExpense);
router.get('/user/:id/expenseDate', SpecificDateUserExpense); 
router.get('/user/:id/overallIncome', OverAllIncomeUser); 
router.get('/user/:id/GoalIncome', GoalDepositUser); 



router.post('/expense', CreateExpense); 
router.get('/expense', GetExpense); 

router.post('/category', CreateCategory); 
router.get('/category', GetCategory); 

router.post('/categoryexpense', CreateCategoryExpense); 
router.get('/categoryexpense',GetCategoryExpense); 

router.get('/user/:userId/category/:id',GetExpenseSpecificCategory); 
router.get('/user/:userId/category/:id/ByDay',GetDailyExpensesForDate); 

router.post('/income', CreateIncome); 
router.get('/user/:userId/income', ShowIncome); 
router.get('/user/:userId/income/:id', ShowSpecificIncome); 
router.put('/user/:userId/income/:id', UpdateIncome); 

router.post('/goal', CreateGoal); 
router.get('/user/:userId/goal', ShowGoal); 
router.get('/user/:userId/goal/:id', ShowSpecificGoal); 
router.put('/user/:userId/goal/:id', UpdateGoal); 
router.delete('/user/:userId/goal/:id',DeleteGoal); 

module.exports = router;

const express = require('express');
const router = express.Router();
const { SpecificUserExpense,SpecificDateUserExpense } = require('../controller/user/userexpense.js')
const { CreateUser, GetUser,SpecificUserAllCategory,GetUserById,SigninUser } = require('../controller/user/user.js');
const { CreateExpense,GetExpense} = require('../controller/expense.js')
const { CreateCategory,GetCategory,GetExpenseSpecificCategory,GetDailyExpensesForDate} = require('../controller/category/category.js')
const { CreateCategoryExpense, GetCategoryExpense } = require('../controller/categoryexpense.js')


router.post('/user', CreateUser); 
router.get('/user', GetUser); 
router.get('/user/:id', GetUserById); 
router.post('/signin', SigninUser); 
router.get('/user/:id/category', SpecificUserAllCategory); 
router.get('/user/:id/expense', SpecificUserExpense);
router.get('/user/:id/expenseDate', SpecificDateUserExpense); 

router.post('/expense', CreateExpense); 
router.get('/expense', GetExpense); 

router.post('/category', CreateCategory); 
router.get('/category', GetCategory); 

router.post('/categoryexpense', CreateCategoryExpense); 
router.get('/categoryexpense',GetCategoryExpense); 

router.get('/user/:userId/category/:id',GetExpenseSpecificCategory); 
router.get('/user/:userId/category/:id/ByDay',GetDailyExpensesForDate); 


module.exports = router;

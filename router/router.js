
const express = require('express');
const router = express.Router();

const { CreateUser, GetUser } = require('../controller/user.js');
const { CreateExpense,GetExpense} = require('../controller/expense.js')
const { CreateCategory,GetCategory,GetExpenseSpecificCategory} = require('../controller/category/category.js')
// const { GetAllCategory} = require('../controller/category/income.js')
const { CreateCategoryExpense, GetCategoryExpense } = require('../controller/categoryexpense.js')

router.post('/user', CreateUser); 
router.get('/user', GetUser); 

router.post('/expense', CreateExpense); 
router.get('/expense', GetExpense); 

router.post('/category', CreateCategory); 
router.get('/category', GetCategory); 

router.post('/categoryexpense', CreateCategoryExpense); 
router.get('/categoryexpense',GetCategoryExpense); 

router.get('/user/:userId/category/:id',GetExpenseSpecificCategory); 

// router.get('/category_by_name' , GetAllCategory )

module.exports = router;

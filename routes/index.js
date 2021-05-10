const { Router } = require('express');
const express=require('express');
const router=express.Router();
const homeControllers=require('../controllers/home_controller');

console.log('router loaded');
router.get('/', homeControllers.home);
router.get('/name',homeControllers.name);
router.use('/users',require('./users'));

router.use('/posts',require('./posts'));
router.use('/comments',require('./comments'));
router.use('/api',require('./api'));

module.exports=router;
const { Router } = require('express');
const express=require('express');
const router=express.Router();
const homeControllers=require('../controllers/home_controller');

console.log('router loaded');

router.get('/',homeControllers.name);
router.use('/users',require('./users'));
// router.get('/', homeControllers.home);
module.exports=router;
const express=require('express');
const router=express.Router();
const passport=require('passport');

const userController=require('../controllers/users_controller');

router.get('/profile/:id',passport.checkAuthentication,userController.profile);
router.post('/update/:id',passport.checkAuthentication,userController.update);
router.get('/post',userController.post);


router.get('/sign-up',userController.signUp);

router.get('/sign-in',userController.signIn);



router.post('/create',userController.Create);

//use passport as amiddleware to authenticate
router.post('/create-session',
passport.authenticate('local',{failureRedirect:'/users/sign-in'},),
userController.CreateSession);




router.get('/sign-out',userController.destroySession);


router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/users/sign-in'}),userController.CreateSession);

module.exports=router;
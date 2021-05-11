const passport=require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');
const User=require('../models/user');

//tell passport to use a new google strategy
passport.use(new googleStrategy({
    clientID:"531360331526-kmqngpmabpr13ls8p6i25h7u3s6hq2bj.apps.googleusercontent.com",
    clientSecret:"LH4StgH58MuBDvbrgcaz1qcg",
    callbackURL:"http://localhost:8000/users/auth/google/callback"
    },
    function(accessToken,refreshToken,profile,done){
        //find a user

        User.findOne({email:profile.emails[0].value}).exec(function(err,user){
                  if(err){
                      console.log('error in google strategy',err);
                      return;
                  }

                  console.log(profile);

                  if(user){
                      //if found set the user as req.user
                      return done(null,user);
                  }else{

                    //if not found create the user and set it as req.user
                      User.create({
                          name:profile.displayName,
                          email:profile.emails[0].value,
                          password:crypto.randomBytes(20).toString('hex')
                      },
                      function(err,user){
                          if(err){console.log('error in creating google strategy-passport',err); return;}

                          return done(null,user);
                      })
                  }
        })
    }



))

module.exports=passport;
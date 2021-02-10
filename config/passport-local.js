const passport=require('passport');

const LocalStrategy=require('passport-local').Strategy;

///database model/schema
const User=require('../models/user');


///authentication using passport 


passport.use(new LocalStrategy({
    usernameField:'email'
        },
        function(email,password,done){
            //find auser and establish the identity

            User.findOne({email:email}, function(err,user){
                if(err){console.log('error finding user ---> passport');
                            return done(err);
                 }

                 if(!user||user.password!=password){
                     console.log('Invalid username/password');
                     return done(null,false);
                 }

                 return done(null,user);
            });
        }
));






///serializing the user to decide which key is kept to be in cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
});


//deserialising the user from the key in the cookies


passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){console.log('error finding user ---> passport');
        return done(err);
            }

            return done(null,user);
    });
});


module.exports=passport;





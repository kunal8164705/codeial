const User=require('../models/user');
const { use } = require('../routes');


module.exports.profile=function(req,res){
    return res.render('users',{
        title:"profile"
        
    });
}

module.exports.post=function(req,res){
    return res.render('users',{
        title:"post"
    });
}

//render the sign up page
module.exports.signUp=function(req,res){
    return res.render('user_sign_up',{
        title:"Codeial | SignUp"
    })
}

//render the sign in page
module.exports.signIn=function(req,res){
    return res.render('user_sign_in',{
        title:"Codeial | SignIn"
    })
}

// get the sign up data
module.exports.Create=function(req,res){

    //check wether a password and confirm password are same
    if(req.body.password!=req.body.confirm_password){
        return res.redirect('back');
    }


    User.findOne({email:req.body.email}, function(err,user){
        if(err){console.log('error in finding user in signing up ');   return;}

        if(!user){
            User.create(req.body,function(err,user){
                if(err){console.log('error in creating user while signing up'); return;}

                return res.redirect('/users/sign-in');
            })
        } else{
            return res.redirect('back');
        }
    });

}


//crete session for the user

module.exports.CreateSession=function(req,res){
    
        //steps to authenticate
    //find the user
        User.findOne({email:req.body.email},function(err,user){
            if(err){console.log('error in finding user in signing in');   return;}

            
            //handle user found
              if(user){
                    
                        //handle password don't match
                            if(user.password!=req.body.password){
                                return res.redirect('back');
                            }
                        //handle session creation
                            res.cookie('user_id',user.id);
                            // return res.redirect('/users/profile');
                            return res.render('users',{
                                title: user.name+" Profile",
                                email: user.email,
                                name: user.name
                            });
    
              }else{
                  //handle user not found
                  return res.redirect('back');
              }
        });



    



    
}
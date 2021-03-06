const User=require('../models/user');
const { use } = require('../routes');
const fs=require('fs');
const path=require('path');


module.exports.profile=function(req,res){
    User.findById(req.params.id,function(err,user){
        return res.render('profile',{
            title:"User profile",
            profile_user:user
        });
    });
   
}

module.exports.update= async function(req,res){
    // if(req.user.id==req.params.id){
    //     User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
    //         return res.redirect('back');
    //     });
    // }
if(req.user.id==req.params.id){

    try {
        
        let user=await User.findById(req.params.id);
        User.uploadedAvatar(req,res,function(err){
            if(err){console.log("multer error",err)  ;   }
            user.name=req.body.name;
            user.email=req.body.email;

            if(req.file){

                if(user.avatar){
                       
                    if (fs.existsSync(path.join(__dirname,'..',user.avatar))) {
                        // Do something
                        fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                    }
                }

                user.avatar=User.avatarPath+'/'+req.file.filename;
            }

            user.save();
            return res.redirect('back');


        });
    } catch (err) {
        req.flash('error',err);
        return res.redirect('back');
    }
}

    else{
        return res.status(401).send('Unauthorized');
    }
}


module.exports.post=function(req,res){
    return res.render('users',{
        title:"post"
    });
}

//render the sign up page
module.exports.signUp=function(req,res){
    //if sigin alredy then redirect to profile
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    
    
    return res.render('user_sign_up',{
        title:"Codeial | SignUp"
    })
}

//render the sign in page
module.exports.signIn=function(req,res){
    
    //if sigin alredy then redirect to profile
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    
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


//sign in and create session for the user

module.exports.CreateSession=function(req,res){
    req.flash('success','Logged in successfully');
    return res.redirect('/');    
}

module.exports.destroySession=function(req,res){
    ///passport js function   
    req.logout();
    req.flash('success','Logged out successfully');
    return res.redirect('/');
}


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

}


//crete session for the user

module.exports.CreateSession=function(req,res){
    
}
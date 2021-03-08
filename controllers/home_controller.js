const Post=require('../models/post');
const User=require('../models/user');

module.exports.home=function(req,res){
    // console.log(req.cookies);
    // res.cookie('kamal',666);

        /*for showing all posts only */
//    Post.find({},function(err,posts){
//     return res.render('home',{
//         title:"Codeial | Home",
//         posts:posts
//      });
//    });
   
//to show posts and also the user who posts that
   Post.find({})
   .populate('user')
   .populate({
       path:'comments',
       populate:{
           path:'user'
       }
   })
   .exec(function(err,posts){

    User.find({},function(err,users){
        return res.render('home',{
            title:"Codeial | Home",
            posts:posts,
            all_users:users
         });
       });
    
    });
   
    
}

module.exports.name=function(req,res){
    return res.end('<b style="font-size:2rem;">kunal</b>');
}


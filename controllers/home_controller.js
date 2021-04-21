const Post=require('../models/post');
const User=require('../models/user');

module.exports.home=async function(req,res){
  try{
   let posts=await Post.find({})
   .sort('-createdAt')
   .populate('user')
   .populate({
       path:'comments',
       populate:{
           path:'user'
       }
   });

   

   let users=await User.find({});
   
   return res.render('home',{
    title:"Codeial | Home",
    posts:posts,
    all_users:users
 });
}
catch(err){
    console.log('error',err);
    return;
}
    
}

module.exports.name=function(req,res){
    return res.end('<b style="font-size:2rem;">kunal</b>');
}


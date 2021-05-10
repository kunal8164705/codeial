const Post=require('../../../models/post');

const Comment=require('../../../models/comment');
module.exports.index=async function(req,res){
   
    let posts=await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    });
 
   
   
   
   
    return res.json(200,{
        message:"List of Posts",
        posts:posts
    })
}




module.exports.destroy=async function(req,res){
    
  
   
    try{
    // if(post.user==req.user.id){
        let post=await Post.findById(req.params.id);
        post.remove();

        await Comment.deleteMany({post:req.params.id});

        return res.status(200).json({
            message:"posts and associated comments deleted sucessfully"
        });

        
        
    // } else{
    //     req.flash('error','you are not authorised to delete this post');
    //     return res.redirect('back');
    // }
}catch(err){
    console.log("***********",err);
    return res.status(500).json({
        message:"Internal server Error"
    });
}


}


const Post=require('../models/post');
const Comment=require('../models/comment');

module.exports.create= async function(req,res){
    
    try{
       let post= await Post.create({
        content:req.body.content,
        user:req.user._id
    });

    if(req.xhr){
        
        return res.status(200).json({
            data:{
                post:post
            },
            message:"Post Created!"
        });
        
    }
    
    req.flash('success','Post Published !');
    return res.redirect('back');
}
catch(err){
    req.flash('error',err);
    return;
}
    
    
}


module.exports.destroy=async function(req,res){
    
  
    let post=await Post.findById(req.params.id);
    try{
    if(post.user==req.user.id){
        post.remove();

        await Comment.deleteMany({post:req.params.id});

        if(req.xhr){
            return res.status(200).json({
                data:{
                    post_id:req.params.id
                },
                message:"Post deleted!"
            });
        }

        req.flash('success','Post deleted');
        return res.redirect('back');
        
    } else{
        req.flash('error','you are not authorised to delete this post');
        return res.redirect('back');
    }
}catch(err){
    req.flash('error',err);
    return;
}


}


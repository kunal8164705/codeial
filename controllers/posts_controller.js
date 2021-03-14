const Post=require('../models/post');
const Comment=require('../models/comment');

module.exports.create= async function(req,res){
    
    try{
        await Post.create({
        content:req.body.content,
        user:req.user._id
    })
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


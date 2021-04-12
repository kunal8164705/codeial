const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async function (req, res) {
    try {
        let post = await Post.findById(req.body.post);

        if (post) {

            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            })
            post.comments.push(comment);
            post.save();  //so whenever we push something we have to also save it
            req.flash('success','your comment is successfully added');
           res.redirect('/');

        }
    } catch (err) {
        req.flash('error',err);
        return;
    }
}


module.exports.destroy = async function (req, res) {
    try {
        let comment = await Comment.findById(req.params.id);
        if (comment.user == req.user.id) {

            let postId = comment.post;
            comment.remove();

            Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } }, function (err, post) {
                req.flash('success','comment deleted successfully')
                return res.redirect('back');
            })
        } else {
            req.flash('error','you are not authorised to delete this comment');
            return res.redirect('back');
        }
    } catch (err) {
        req.flash('error',err);
        return;
    }

}
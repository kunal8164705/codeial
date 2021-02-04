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
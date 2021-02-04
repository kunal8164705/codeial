module.exports.home=function(req,res){
    return res.render('home',{
        title:"Home"
    });
}

module.exports.name=function(req,res){
    return res.end('<b style="font-size:2rem;">kunal</b>');
}
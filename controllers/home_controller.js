module.exports.home=function(req,res){
    return res.end('<h1>express is up for codeial</h1>');
}

module.exports.name=function(req,res){
    return res.end('<b style="font-size:2rem;">kunal</b>');
}
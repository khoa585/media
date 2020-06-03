const checkAdminPermision = (req,res,next)=>{
    if(req.user){
        res.redirect("/admin/login");
    }
    next();
}
module.exports ={
    checkAdminPermision
}
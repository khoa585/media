const checkAdminPermision = (req,res,next)=>{
    let user = req.session.user ;
    if(!user){
        res.redirect("/admin/login");
    }
    else {
        req.user= user ;
        next();
    }
   
}
module.exports ={
    checkAdminPermision
}
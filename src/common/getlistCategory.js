let {categoryDB} = require('./../databases/category');
let getCategoryMiddleware = async(req,res,next)=>{
    try {
        let category = await categoryDB.findAll({raw:true,logging:false});
        res.locals.category = category ;
        req.category = category ;
        next();
    } catch (error) {
        console.log("Error Middware Get Category ")
        next();
    }
}
module.exports = getCategoryMiddleware;
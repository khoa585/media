const {productsDB ,productsFields} = require('./../databases/products');
const sequelize = require("./../databases/connectdDb");
const { QueryTypes } = require('sequelize');
const PAGE =1  ;
const LIMIT_NUMBER= 2 ;
const createNews = async (data)=>{
    return productsDB.create({...data});
}
const getListProducts = async (page=PAGE,LIMIT=LIMIT_NUMBER,order,type)=>{
    let sql = `select products.* ,categories.name as category from products left join categories on products.categoryid = categories.id where 1=1`
    if(type){
        sql += ` and products.categoryid = ${type}  `
    }
    if(order=="1"){
        sql += ` order by price desc `
    }
    else if(order=="2"){
        sql += ` order by price asc `
    }
    else {
        sql += ` order by createdAt desc `
    }
    sql += ` limit ${LIMIT} offset ${(page-1)*LIMIT} `
    let listProdcts = await  sequelize.query(sql,{type:QueryTypes.SELECT})
    return listProdcts ;
}
const totalNumber = async (type)=>{
    if(type){
        return productsDB.findAndCountAll({
            where:{
                [productsFields.categoryid]:type
            },
            raw:true
        })
    }
    return productsDB.findAndCountAll({raw:true})
}
const deleteProduct = async (id)=>{
    return productsDB.destroy({
        where:{
            [productsFields.id]:id
        }
    })
}
const detialProduct = async(id)=>{
    return productsDB.findOne({
        where:{
            [productsFields.id]:id
        }
    })
}
const updateProduct = async(id,data)=>{
    return productsDB.update({...data},{
        where:{
            [productsFields.id]:id
        }
    })
}
module.exports = {
    createNews,
    getListProducts,
    totalNumber,
    deleteProduct,
    detialProduct,
    updateProduct
}
let UserDb = require("./../databases/user");
let LoginUser = async(username,password)=>{
    let resultUser = await UserDb.findOne({
        where:{
            username:username,
            password:password
        }
    })
    if(resultUser) {
        return resultUser
    }
    throw "Tên Đăng Nhập Hoặc Mật Khẩu Không Chính Xác"
}
module.exports = {
    LoginUser
}
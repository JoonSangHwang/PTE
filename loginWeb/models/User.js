const mongoose  = require('mongoose');

const userSchema = mongoose.Schema({
    name : {
        type : String,
        maxlength : 50
    },
    email : {
        type  : String,
        trim : true,
        unique : 1 // 혹시나 띄어쓰기 한경우 띄어쓰기 안되게 
    },
    password : {
        type : String,
        minlength : 5
    },
    lastname : {
        type : String,
        maxlength : 50
    },
    role : {
        type : Number,
        default : 0 // 1 이면 관리자, 0이면 사용자 이렇게 사용 
    },
    image : String,
    token : {
        type : String
    },
    tokenExp : {
        type : Number
    },// 유효 기간 설정
})
const User = mongoose.model('User',userSchema)
module.exports = {User};// 이모델을 다른곳에서 사용 하기위해서 
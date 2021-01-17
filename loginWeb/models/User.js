const mongoose  = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10 // 열자리를 라운드처리하는것

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

userSchema.pre('save',function(next){
    var user = this;
    //비밀 번호를 암호화 시키기
//우리가 이메일이나 이름 바꿀때 마다 비번이 암호화된다면 낭비이니까

if(user.isModified('password')){
    bcrypt.genSalt(saltRounds, function(err, salt) {
        if(err) return next(err)// 오류가 나면 이곳으로 


        bcrypt.hash(user.password, salt, function(err, hash) {//암호화된 비번
            // Store hash in your password DB.
            if(err) return next(err)
            user.password =hash //성공하면 암호화된 비번으로 바꿈
            next()//되돌아가기
        })
    })
 }
})

const User = mongoose.model('User',userSchema)
module.exports = {User};// 이모델을 다른곳에서 사용 하기위해서 
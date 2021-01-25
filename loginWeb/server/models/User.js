const mongoose  = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10 // 열자리를 라운드처리하는것
const jwt = require('jsonwebtoken');
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
 }else{
     next()
 }
})
    userSchema.methods.comparePassword=function(plainPassword,cb){
        //painPassword 1234567  암호화된 비밀번호 "$2b$10$LnOrbKhg...
        //이두개가 맞는지 확인하는 과정이 필요하다.
        bcrypt.compare(plainPassword,this.password, function(err,isMatch){
            if(err) return cb(err);
                cb(null,isMatch);

        })
    }


    userSchema.methods.generateToken =function(cb){

        var user = this;
        //jsonwebtoken을 이용해서 token을 생성하기
        var token = jwt.sign(user.id.toString(),'secretToken')
        //toHexString()
        user.token = token
        user.save(function(err,user){
            if(err) return res.cb(400)
            cb(null,user)

        })
    }

    userSchema.statics.findByToken =function(token,cb){
        var user =this;
        //토큰을 decode 한다. 


        jwt.verify(token, 'secretToken', function(err, decoded) {//'secretToken'우리가 암호화한 토큰
            //유저아이디를 이용해서 유저를 찾은 다음에
            //클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인
            user.findOne({ "_id": decoded, "token": token }, function (err, user) {
            if(err) return cb(err);
            cb(null,user) 
        })
        })
    }
    
const User = mongoose.model('User',userSchema)
module.exports = {User};// 이모델을 다른곳에서 사용 하기위해서 
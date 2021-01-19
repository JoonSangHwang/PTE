const express = require('express');
const app = express();
const port = 5000
const bodyParser = require('body-parser');
const {User}=require("models/User");// 회원가입에 필요한 정보를 가져오기 위한것
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const config = require("./key");
const { auth } = require('./middleware/auth');

//application/x-www-form-urlencoded 
//이렇게된 데이터를 분석해서 가져오게하는것
app.use(bodyParser.urlencoded({extended : true}));
//application/json 이파일을 분석해서 가져오게 하는것
app.use(bodyParser.json());
app.use(cookieParser());


mongoose.connect(config.mongoURI,{
    useNewUrlParser: true, useUnifiedTopology : true, useCreateIndex : true, useFindAndModify : false
}).then(()=>console.log('MongoDB Connected...')).catch(err=>console.log(err))


app.get('/', (req, res) => res.send('Hello World!'))
 
app.post('/api/user/register',(req,res)=>{
  //회원가입시 핑요한 정보들을 Client에서 가져오면
  //그것을 데이터 베이스에 넣는다. 
  const user = new User(req.body);
  
  user.save((err,userInfo)=>{
    if(err)return res.json({success : false, err})
    return res.status(200).json({
      success : true
    })
  })//이것은 몽고 DB에서오는 메소드 
})


app.post('/api/users/login',(req,res)=>{
  //요청된 이메일을 데이터베이스에서  있는지 찾고
  User.findOne({email : req.body.email},(err,user)=>{
    if(!user){//유저가 없다면
      return res.json({
        loginSuccess:false,
        message:"제공된 이메일에 해당하는 유저가 없습니다."
      })
    }

  //요청된 이메일이 데이터베이스에 있다면 맞는 비번인지 확인
    user.comparePassword(req.body.password,(err,isMatch)=>{
      if(!isMatch)
      return res.json({loginSuccess: false, message: "비밀번호가 틀렸습니다."
 })
      //비밀번호 까지 맞다면 토큰 생성
        user.generateToken((err,user)=>{
          if(err) return res.status(400).send(err);
                      //토큰 저장을 한다. 어디에? 쿠키? 아니면 로컬스토리지, 세션 스토리지에 해야하는지
            //논란이 많다. 
            res.cookie("x_auth",user.token)
            .status(200)
            .json({loginSuccess: true, userId:user._id})
        })
    })
  })
})

app.get('/api/users/auth',auth,(req,res)=>{// auth 부분은 미들웨어를 만들어 사용할예정 
  // 여기까지 미들웨어를 통과했다면 여기는 Authentication 이 ture
  //클라이언트에 정보제공해야함
  res.status(200).json({
    _id : req.user.id,
    //어드민 부분의 경우 role 1 어드민 role 2 특정 부서 어드민 하면 바꿀수 있지만
    //role 0 일반유저, role 0이 아니면 관리자로 되어있어서 아래와같이 선언
    isAdmin : req.user.role ===0?false:true,
    isAuth : true,
    email : req.user.email,
    name : req.user.name,
    lastname : req.user.lastname,
    role : req.user.role,
    image : req.user.image
  })
})

app.get('/api/users/logout',auth,(req,res)=>{
  User.findOneAndUpdate({_id : req.user._id}//유저를 찾아서 업데이트하기위한 메소드
    ,{token : ""}
    ,(err,user) => {
      if(err) return res.json({success : false, err});
      return res.status(200).send({
        success : true
      })
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
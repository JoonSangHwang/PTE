const express = require('express');
const app = express();
const port = 5000
const bodyParser = require('body-parser');
const {User}=require("./models/User");// 회원가입에 필요한 정보를 가져오기 위한것
const mongoose = require('mongoose');

const config = require("./config/key");


//application/x-www-form-urlencoded 
//이렇게된 데이터를 분석해서 가져오게하는것
app.use(bodyParser.urlencoded({extended : true}));
//application/json 이파일을 분석해서 가져오게 하는것
app.use(bodyParser.json());

mongoose.connect(config.mongoURI,{
    useNewUrlParser: true, useUnifiedTopology : true, useCreateIndex : true, useFindAndModify : false
}).then(()=>console.log('MongoDB Connected...')).catch(err=>console.log(err))


app.get('/', (req, res) => res.send('Hello World!'))
 
app.post('/register',(req,res)=>{
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

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
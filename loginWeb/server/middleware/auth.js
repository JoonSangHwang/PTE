const { User } = require("../../../models/User");

let auth = (req,res,next)=>{
    // 인증 처리하는곳
    // 클라이언트 쿠키에서  토큰을 가져오고 
    let token = req.cookies.x_auth; // 이부분은 index.js부분의
                                    //res.cookie("x_auth",user.token)
    // 토큰을 복호화 한 후 유저를 찾는다.
    User.findByToken(token,(err,user)=>{
        if(err) throw err;
        if(!user) return res.json({isAuth: false, error:true})

        req.token=token;//이렇게 두개 선언한것은 다른곳 에서 저 변수를 불러와서쓰려고
        req.user=user;
        next();//next()하는 이유는 없으면 이 곳에 가치는데 할것이 다하면 넘어가게하기위함

    })
    // 유저가 있으면 인증 Okay
    // 유저가 없으면 인증 No
}
module.exports ={auth};//어떤 곳에서도 접근가능하도록 선언
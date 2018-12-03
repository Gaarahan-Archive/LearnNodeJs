const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser());
app.use(session({
  secret : '12345',
  cookie : {maxAge : 600},
  resave : false,
  saveUninitialized : true
}));

app.get('/',(req,res)=>{
  req.session.loginUser = 'han';
  res.json({ret_code: 0, ret_msg: '登录成功'});
})

app.listen(8848,()=>{
  console.log('server on ...');
})

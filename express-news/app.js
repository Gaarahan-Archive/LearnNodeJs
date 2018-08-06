const express = require('express');
const app = express();
const config = require('./src/config.js');
const router = require('./src/router.js');
const path = require('path');
const bodyParser  = require('body-parser');

app.use((req,res,next) => {
  console.log(req.url);
  next();
});

app.set('views',path.join(__dirname,"./Views"));
app.set('view engine','ejs');

app.use('/public',express.static('public'));

//挂载自定义路由
app.use(bodyParser.json(),router);

//启动服务
app.listen(config.port,function(){
  console.log("server on http://localhost:" + config.port);
});

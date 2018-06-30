var http = require('http');
var router = require('./src/router.js');
//为req与res绑定自定义事件
var context = require('./src/context.js');

http.createServer(function(req,res){

  //绑定context中的自定义事件
  context(req,res);
  //处理不同的请求
  router(req,res);

}).listen(8080,function(){
  console.log("Servering on http://127.0.0.1:8080");
});

var srv = require('./service.js');
var path = require('path');

module.exports = function(req,res){

  var method = req.method.toLowerCase();

  //初始化srv中的变量
  srv.init(req,res);
  if(req.url === '/'){
    srv.root();
  }
  //get 方式添加新闻
  else if(req.url.startsWith('/add') && method === 'get'){
    srv.getAdd();
  }
  //post方式添加新闻 处理数据量大的事件
  //数据量较大时，可能分多次提交，每次提交一部分数据
  //此时应监听(on) data 事件(每次提交触发一次 data 事件)
  //当 requst 的 end 事件被触发时，数据提交结束 
  else if(req.url.startsWith('/add') && method === 'post'){
    srv.postAdd();
  }
  else if(req.url.startsWith("/item") ){
    srv.item();
  }
  else{
    srv.other();
  }
}

//封装的一些需要的方法
var func = require('./function.js');
var path = require('path');
var config = require('./config.js');

var req,res,file;

module.exports.init = function(request,response){
  req = request;
  res = response;
  file = path.join(__dirname,req.pathname);
}

module.exports.root = function(){
  //在服务器端使用模板引擎，将list中的数据渲染到主页中去
  func.readNews(config.dataFile,function(news){
    res.render(config.mainPage,res,{ list : news });
  });
}

module.exports.getAdd = function(){
  var message = req.query;

  func.readNews(config.dataFile,function(newsList){
    message.id = newsList.length;
    newsList.push(message);
    func.writeNews(config.dataFile,newsList,function(){
      func.home(res);
    });
  });
};

module.exports.postAdd = function(){
  func.readNews(config.dataFile,function(newsList){
    func.getPostNews(req,function(message){
      newsList.push(message);
      func.writeNews(config.dataFile,newsList,function(){
        func.home(res);
      });
    });
  });
}

module.exports.item = function(){
  func.readNews(config.dataFile,function(list){
    var query = req.query;
    res.render(file,res,{ news : list[query.id]});
  });
}

module.exports.other = function(){
  if(req.url.endsWith('ico'))
    res.render(path.join(__dirname,req.url),res);
  else
    res.render(file,res);
}

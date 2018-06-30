var fs = require('fs');
var mime = require('mime');
//用于替换网页中的模板数据
var _ = require('underscore');
//使用内置 url 模块解析 url
var url =require('url');

module.exports = function(req,res){

  //为req增加query属性,表示url中的query
  req.query = url.parse(req.url.toLowerCase(),true).query;

  req.pathname = url.parse(req.url.toLowerCase(),true).pathname;

  //封装一个render函数,并将其挂载到res上
  res.render = function (file, res,tplData){
    fs.readFile(file,function(err,data){
      if(err){
        res.writeHeader(404,{'content-type':mime.getType('html')});
        res.write("<h1>404</h1><h2>Page Not Found</h2>");
        res.end();
      }
      else{
        //模板替换
        if(tplData){
          var fn = _.template( data.toString('utf8') );
          var data = fn(tplData);
        }
        res.writeHeader(200,{'content-type':mime.getType(file)});
        res.write(data);
        res.end();
      } 
    });
  };

}

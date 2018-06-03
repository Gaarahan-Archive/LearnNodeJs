var http = require('http');
var mime = require('mime');
var fs = require('fs');
var path = require('path');
//使用内置 url 模块解析 url
var url =require('url');
//用于替换网页中的模板数据
var _ = require('underscore');
//封装的一些需要的方法
var func = require('./src/function.js');

http.createServer(function(req,res){


  //处理新闻的提交
  req.url = req.url.toLowerCase();
  var method = req.method.toLowerCase();
  var file = path.join(__dirname,"/src",req.url);
  var mainPage = path.join(__dirname,"/src/index.html");
  var dataFile = path.join(__dirname, "/data/data.json");

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

  if(req.url === '/'){

    //在服务器端使用模板引擎，将list中的数据渲染到主页中去
    func.readNews(dataFile,function(news){
      res.render(mainPage,res,{ list : news });
    });
  }
  //get 方式添加新闻
  else if(req.url.startsWith('/add') && method === 'get'){

    //添加新闻到本地文件
    var urlObj = url.parse(req.url,true);
    var message = urlObj.query;

    func.readNews(dataFile,function(newsList){
      message.id = newsList.length;
      newsList.push(message);
      func.writeNews(dataFile,newsList,function(){
        func.home(res);
      });
    });
  }
  //post方式添加新闻 处理数据量大的事件
  //数据量较大时，可能分多次提交，每次提交一部分数据
  //此时应监听(on) data 事件(每次提交触发一次 data 事件)
  //当 requst 的 end 事件被触发时，数据提交结束 
  else if(req.url.startsWith('/add') && method === 'post'){
    func.readNews(dataFile,function(newsList){
      func.getPostNews(req,function(message){
        newsList.push(message);
        func.writeNews(dataFile,newsList,function(){
          func.home(res);
        });
      });
    });
  }
  else if(req.url.startsWith("/item") ){
    var file = path.join(__dirname,"/src/item.html");
    func.readNews(dataFile,function(list){
      var urlObj  = url.parse(req.url,true);
      var query = urlObj.query;
      res.render(file,res,{ news : list[query.id]});
    });
  }
  else{
    if(req.url.endsWith('ico'))
      res.render(path.join(__dirname,req.url),res);
    else
      res.render(file,res);
  }
}).listen(8080,function(){
  console.log("Servering on http://127.0.0.1:8080");
});

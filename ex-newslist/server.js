var http = require('http');
var mime = require('mime');
var fs = require('fs');
var path = require('path');
var querystring = require('querystring');
//使用内置 url 模块解析 url
var url =require('url');
var _ = require('underscore');

http.createServer(function(req,res){


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

  //处理新闻的提交
  req.url = req.url.toLowerCase();
  var method = req.method.toLowerCase();
  var file = path.join(__dirname,"/src",req.url);
  var mainPage = path.join(__dirname,"/src/index.html");
  var dataFile = path.join(__dirname, "/data/data.json");

  console.log(req.url);
  if(req.url === '/'){

    //在服务器端使用模板引擎，将list中的数据渲染到主页中去
    fs.readFile(path.join(__dirname,"/data/data.json"),"utf8",function(err,data){
      if(err && err.code !== 'ENOENT'){
        throw err;
      }
      else{
        var news = JSON.parse(data || '[]');
        res.render(mainPage,res,{ list : news });
      }
    });
  }
  //get 方式添加新闻
  else if(req.url.startsWith('/add') && method === 'get'){

    //添加新闻到本地文件
    var urlObj = url.parse(req.url,true);
    var message = urlObj.query;
    var dataFile = path.join(__dirname, "/data/data.json");

    fs.readFile(dataFile,function(err,data){
      if(err && err.code !== 'ENOENT') throw err;
      else{
        var newsList = JSON.parse(data || '[]');
        message.id = newsList.length;
        newsList.push(message);
        fs.writeFile(dataFile,JSON.stringify(newsList),function(err){
          if(err){
            console.log('data write failed !');
          }
          else{
            //使用服务器端的跳转方式:重定向
            //res.render(mainPage,res);

            //3开头为跳转操作，301为持久的跳转到某页面，302为暂时跳转
            res.statusCode = 302;
            res.statusMessage = "Found";
            res.setHeader('location','/');
            res.end();
          }
        });
      }
    });
  }
  //post方式添加新闻 处理数据量大的事件
  //数据量较大时，可能分多次提交，每次提交一部分数据
  //此时应监听(on) data 事件(每次提交触发一次 data 事件)
  //当 requst 的 end 事件被触发时，数据提交结束 
  else if(req.url.startsWith('/add') && method === 'post'){
    var chunkList = [];
    //监听data事件，chunk参数为每次提交的部分数据,buffer类型
    req.on('data',function(chunk){
      chunkList.push(chunk);
    });
    req.on('end',function(){
      //读取文件中的内容
      fs.readFile(dataFile,function(err,data){
        if(err && err.code !== "ENOENT") 
          throw err;
        else{
          var newsList = JSON.parse(data || '[]');
          //此时获取的 chunkList 只是一个buffer对象，需要转化为query字符串,再转化为JSON对象
          var postBody = Buffer.concat(chunkList).toString('utf8');

          //将query字符串转化为JSON对象
          newsList.push(querystring.parse(postBody));
          fs.writeFile(dataFile,JSON.stringify(newsList),function(err){
            if(err){
              console.log("data write failed !");
            }
          });
        }
      });
    });

    res.statusCode = 302;
    res.statusMessage = "Found";
    res.setHeader('location','/');
    res.end();
  }
  else if(req.url.startsWith("/item") ){
    var file = path.join(__dirname,"/src/item.html");
    fs.readFile(dataFile,function(err,data){
      if(err && err.code !== 'ENOENT')
        throw err;
      else{
        var list = JSON.parse(data);
        var urlObj  = url.parse(req.url,true);
        var query = urlObj.query;
        res.render(file,res,{ news : list[query.id]});
      }
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



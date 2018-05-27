var http = require('http');
var fs = require('fs');
var mime = require('mime');

//设置文件的根目录
var documentRoot = '/home/gaarahan/Documents/Web/NodeJs/server';

var server = http.createServer(function(req,res){
  // 该函数内容即为服务器的响应部分
  // 该部分必须有一个 res.end 来结束响应,否则浏览器会一直请求响应
  // 写在该函数体部分并且没有任何限定条件的语句,会默认在任何情况下执行
  var url = req.url;
  var file = documentRoot + url;
  console.log(url);

  if(url === '/main'){
    //console.log('main page load' + file);
    fs.readFile(file + '.html',function(err,data){
      if(err){
        res.writeHeader(404,{
          //设置字符串解析编码,默认为utf-8 
          //设置解析为html文件
          'content-type' : 'text/html',
          'charset':'utf-8'
        });
        res.write('<h1>404</h1><p> Page not found </p>');
        res.end();
      }
      else{
        res.writeHeader(200,{
          'content-type' : 'text/html',
          'charset':'utf-8'
        });
        res.write(data);
        res.end();
      }
    });
  }
  else {
    // 处理静态资源：
    //  对 html 中的图片及 css 统一处理，接到url后，先读取一次该url对应文件
    //  如果有这个文件，根据后缀名写入不同的头，否则返回404

    fs.readFile(file,function(err,data){
      if(err){
        res.writeHeader('404',{
          'content-type':'text/plain', //纯文本解释
          'charset':'utf_8'
        });
        res.write('you got wrong input !!');
        res.end();
      }
      else{
        //var head = {'charset':'utf8'};
        //使用 mime 模块通过后缀名直接获取对应的 content-type
        //var end = url.slice(url.indexOf('.') + 1);
        
        //if(end == 'png') head['content-type'] = 'image/png';
        //else if(end == 'css') head['content-type'] = 'text/css';
        //else head['content-type'] = 'text/plain';
        res.setHeader('content-type',mime.getType(url));
        res.end(data);
      }
    });
  }
}).listen(8080,function(){
  console.log('severing on http://127.0.0.1:8080');
});



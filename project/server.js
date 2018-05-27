var fs = require('fs');
var http = require('http');
var path = require('path');

var mainPage = path.join(__dirname + '/index.html');

//返回报文头
var backHeader = {
  'html' : {
    'content-type' : 'text/html',
    'charset':'utf8'
  },
  'css' : {
    'content-type' : 'text/css',
    'charset':'utf8'
  },
  'pic' : {
    'content-type' : 'image/jpeg',
    'charset':'utf8'
  },
  'js' : {
    'content-type' : 'application/x-javascript',
    'charset':'utf8'
  }
}

var server = http.createServer(function(req,res){
  var url = req.url;
  var errPage = '<h1>404 page not found</h1>';

  console.log(url);
  if(url == '/'){
    fs.readFile(mainPage , function(err,data){
      if(err){
        res.writeHeader(404,backHeader['html']);
        res.write(errPage);
        res.end();
      }
      else{
        res.writeHeader(200,backHeader['html']);
        res.write(data);
        res.end();
      }
    });
  }
  else{
    var file = path.join(__dirname,url);

    fs.readFile(file,function(err,data){

      var staticHead = "";
      if(url.endsWith('.jpg') || url.endsWith('.jpeg'))
        staticHead = backHeader['pic'];
      else if( url.endsWith('.css') ){
        staticHead = backHeader['css'];
      }
      else if(url.endsWith('.js')){
        staticHead = backHeader['js'];
      }
      else if(url.endsWith('.html')){
        staticHead = backHeader['html'];
      }


      if(err){
        res.writeHeader(404,backHeader['html']);
        res.write(errPage);
        res.end();
      }
      else{
        res.writeHeader(200,staticHead);
        res.write(data);
        res.end();
      }
    });
  }
}).listen(8080,function(){
  console.log('severing on http://127.0.0.1:8080');
});

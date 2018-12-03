let http = require("http");
let fs = require("fs");

http.createServer((req,res)=>{
  if(req.url){
    fs.readFile('./index.html',function(err,data){
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
        console.log(data);
        res.write(data);
        res.end();
      }
    });
  }
}).listen(8888,()=>{
  console.log("server on http://localhost:8888");
})

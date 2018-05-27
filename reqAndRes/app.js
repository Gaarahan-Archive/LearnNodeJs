var http = require('http');

http.createServer(function(req,res){

  console.log("request : {")
  //req.headers 返回的是一个对象，这个对象包含了所有的请求报文头
  console.log("req.headers: ");
  console.log(req.headers);

  //req.rawHeaders 返回一个数组，其中内容为 headers 的字符串形式
  console.log("\nreq.rawHeaders: ");
  console.log(req.rawHeaders);

  //req.httpVersion 返回客户端所使用的 http 版本
  console.log("\nreq.http-version: ");
  console.log(req.httpVersion);

  //req.method 返回客户端请求的方法(POST、GET ...)
  console.log("\nreq.method:");
  console.log(req.method);

  //req.url 返回请求报文中的请求路径
  console.log("\nreq.url: ");
  console.log(req.url);
  console.log("}");

  console.log("response: {");

  //通过 res.setHeader() 来为返回报文设置响应报文头
  //res.setHeader() 应该放在 res.write() 之前
  res.setHeader('content-type','text/plain');

  //设置 http 响应状态码
  //res.statusCode  设置 http 响应状态码
  //res.statusMessage 设置响应状态对应的信息
  res.statusCode = 404;
  res.statusMessage = "page not found !";

  //以上方式可以用 res.writeHeader() 替代
  res.writeHeader(200,'ok',{'content-type':'text/plain'});

  //res.write() 将数据写入响应报文体
  res.write("Hello Gaarahan ! ! ");

  // 每个请求都必须调用 res.end 来结束响应
  // res.end() 中响应的数据必须为字符串或者Buffer
  res.end('hello world');
  console.log("}");
}).listen(9090,function(){
  console.log('server on http://localhost:9090 ...')
});

var fs =require('fs');

var str = "this is a content";
/*
fs.writeFile('./xxx/text.txt',str,'utf8',function(err){
  if(err){
    console.log("写入文件到 ./xxx/text.txt 出错(路径)");
    throw err;
  }
  else{
    console.log('OK !');
  }
});
*/
// try-catch 无法捕获异步操作的异常
console.log('使用 try-catch 来判断错误');
try{
  fs.writeFile('./xxx/text.txt',str,'utf8',function(err){
    console.log('写入str到 ./xxx/text.txt 成功');
  });
}
catch(e){
  console.log('捕获到了异常' + e);
}

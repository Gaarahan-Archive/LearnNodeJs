var fs = require('fs');

console.log('同步读取文件:\n');
var data = fs.readFileSync('input.txt');

console.log(data.toString());
console.log('程序结束');

console.log('异步读取文件:\n');

var data = fs.readFile('input.txt',function(err,data){
  if(err) return console.error(err);
  console.log(data.toString());
});

console.log('程序结束');

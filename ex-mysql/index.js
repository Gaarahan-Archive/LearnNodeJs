var mysql = require('mysql');

//配置链接信息
var connection = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : '42272000',
  database : 'ttms',
  charset : 'utf8'
});

//链接数据库
connection.connect();

//执行语句
var sql = 'select * from studio';
connection.query(sql,function(err,result,fields){
  if(err)
    console.log('[SELECT ERROR] - ',err.message);
  else
    console.log(result);
});

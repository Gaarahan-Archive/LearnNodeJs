var mysql = require('mysql');


var dbFunc = {

  add : function(addData){
    var connection = mysql.createConnection({
      host : 'localhost',
      user : 'root',
      password : '42272000',
      database : 'ttms',
      charset : 'utf8'
    });

    connection.connect();

    connection.query("insert into studio values(" + addData + ")",function(err,result){
      if(err)
        throw err;
      console.log(result);
    });
  }

  delByID : function(id){
    var connection = mysql.createConnection({
      host : 'localhost',
      user : 'root',
      password : '42272000',
      database : 'ttms',
      charset : 'utf8'
    });

    connection.connect();

    var sql = "delete from studio where studio_id = " + id;
    connection.query(sql,function(err,result){
      if(err)
        throw err;
      console.log(result);
    });
  }

}



module.exports = dbFunc; 

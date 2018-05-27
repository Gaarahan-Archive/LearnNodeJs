var _ = require('underscore');
var fs = require('fs');

fs.readFile("./ts.html",function(err,data){
  if(err) 
    throw err;
  else{
    var html = "hello: <%= name %>";
    var compiled = _.template(html);
    var html = compiled({name: 'moe'});
    console.log(html);
  }
});


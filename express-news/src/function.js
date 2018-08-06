const fs = require('fs');
const queryString = require('querystring');

exports.home = function(res){
  //使用服务器端的跳转方式:重定向
  //3开头为跳转操作，301为持久的跳转到某页面，302为暂时跳转
  res.statusCode = 301;
  res.location('/');
  res.end();
};

  //封装一个读取data.json 文件的方法
  //封装异步方法时，由于异步操作导致的时间差异，不能直接return要的结果
exports.readNews = function(dataFile,callback){
    fs.readFile(dataFile,function(err,data){
      if(err && err.code !== "ENOENT") 
        throw err;
      else{
        const newsList = JSON.parse(data || '[]');
        callback(newsList);
      }
    });
  };

  //封装一个写入数据到 data.json 文件的方法

exports.writeNews = function(dataFile,newsList,callback){
  const data = JSON.stringify(newsList);
  fs.writeFile(dataFile,data,function(err){
      if(err){
        throw err;
      }
      callback();
    });
  };

//封装获取用户post 数据的方法, on也是异步方法
exports.getPostNews = function(req,callback){
  const chunkList = [];
  //监听data事件，chunk参数为每次提交的部分数据,buffer类型
    req.on('data',function(chunk){
      chunkList.push(chunk);
    });
  req.on('end',function(){
    //此时获取的 chunkList 只是一个buffer对象，需要转化为query字符串,再转化为JSON对象
    const postBody = Buffer.concat(chunkList).toString('utf8');
    const message = queryString.parse(postBody);
    callback(message);
  });
};


const path = require('path');
const config = require('./config.js');
const func = require('./function.js');

module.exports.index = function(req,res){
  func.readNews(config.dataFile,function(news){
    res.render('index',{list:news});
  });
};

module.exports.view = function(req,res){
  console.log("da" + req.url);
  if(req.url === "/submit.ejs")
    res.render('submit');
  else if(req.url === "/item.ejs") {
    func.readNews(config.dataFile, function (list) {
      const query = req.query;
      res.render('item', {news: list[query.id]});
    });
  }
};

module.exports.item = function(req,res){
  func.readNews(config.dataFile,function(list){
    const query = req.query;
    res.render('item',{ news : list[query.id]});
  });
};

module.exports.getAdd = function(req,res){
  const message = req.query;

  func.readNews(config.dataFile,function(newsList){
    message.id = newsList.length;
    newsList.push(message);
    func.writeNews(config.dataFile,newsList,function(){
      func.home(res);
    });
  });
};

module.exports.postAdd = function(req,res){
  func.readNews(config.dataFile,function(newsList){
    func.getPostNews(req,function(message){
      message.id = newsList.length;
      newsList.push(message);
      func.writeNews(config.dataFile,newsList,function(){
        func.home(res);
      });
    });
  });
};

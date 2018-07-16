var request = require('request');
var cheerio = require('cheerio');


//获取网址的内容并转化
var getNewsList=function(done) {
  request('http://www.xiyou.edu.cn/', function (err, res) {
    if (err) return console.error(err);
    //创建一个可操作的DOM对象
    var $ = cheerio.load(res.body.toString());

    //获取每一个搜索结果的标题
    for(var i = 0; i < $('.conMid_ul2 li').length;i++) {
      var rst = $('.conMid_ul2 li').children('a').eq(i).attr("title");
      console.log(rst);
    }

  });
};

getNewsList();

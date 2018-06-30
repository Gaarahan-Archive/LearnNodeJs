var path = require('path');

module.exports = {
  "port" : 8080,
  "mainPage" :  path.join(__dirname,"/index.html"),
  "dataFile" : path.join(__dirname,"../","/data/data.json")
}

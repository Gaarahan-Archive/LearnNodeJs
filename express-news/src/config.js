var path = require('path');

module.exports = {
  "port" : 9090,
  "mainPage" :  path.join(__dirname,"../Views/index.ejs"),
  "dataFile" : path.join(__dirname,"../","/data/data.json")
};

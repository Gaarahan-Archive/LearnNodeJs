var em = require("events").EventEmitter;
em.prototype.once = function (type,callback){
  var that = this;
  this.on(type,function listener(){
    that.removeListener(type,listener);
    callback.apply(that,arguments);
  });
};

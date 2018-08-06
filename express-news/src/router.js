//创建一个router对象,挂载路由
const express = require('express');
const router = express.Router();
const srv = require('./service.js');

router.get('/',function(req,res){
    srv.index(req,res);
});

router.use('/Views',(req,res)=>{
  srv.view(req,res);
});

router.get('/item',srv.item);

router.get('/add',srv.getAdd);

router.post('/add',srv.postAdd);

module.exports = router;


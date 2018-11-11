const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const http = require('http');

http.get('http://www.zfjw.xupt.edu.cn/jwglxt/xtgl/login_slogin.html?language=zh_CN&_t=1541751872676',(res)=>{
  const { statusCode } = res;
  if(statusCode !== 200){
    console.log('get page error' + `${statusCode}`);
    return ;
  }else{
    let pageHtml = '';
    res.on('data',(chunk)=>{ pageHtml += chunk });
    res.on('end',()=>{
      try{
        //const dom = new JSDOM(pageHtml);
        const { document } = new JSDOM(pageHtml).window;
        console.log(document.querySelector('#csrftoken').value);
      }catch(e){ console.error(e.message); }
    });
  }
}).on('error',(e)=>{
  console.error(`got error ${e.message}`);
});

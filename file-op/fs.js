//执行文件操作

// 1.加载文件操作模块
var fs = require('fs');
//加载 path 模块
var path = require('path');

var theOtherFile = path.join(__dirname,'/source/text.txt');

var msg = 'hello world';
// 2. 实现文件写入操作
//    调用函数fs.writeFile进行文件写入(异步写入)
//    ./ 相对路径是相对于执行 node 命令的路径,而不是本文件所在路径
  fs.writeFile('./hello.txt',msg,'utf8',function(err){
      // 如果 err === null ,表示写入文件成功
      // 只要 err 中不是null ,表示写入文件失败
      if(err){
        console.log('write file wrong ' + err);
      }
      else
        console.log('写入文件成功');
  });

// 3. 实现文件读取操作
// fs.readFile (filePath, [options], callback)
  fs.readFile(theOtherFile,function(err,data){
    // 当未传入参数编码 utf8 时,data参数的数据类型是一个 buffer 对象,里面保存的是一个个的字节
    if(err){
      throw(err);
    }
    else{
      console.log('data的实际值:\n');
      console.log(data);
      console.log('你读取到的内容是(转化后):\n' + data.toString('utf8'));
    }
  });
// 4.解决文件相对路径的问题
//  __dirname : 当前正在执行的 js 文件所在的目录
//  __filename : 当前正在执行文件的完整路径
//  (__dirname and __filename) is not actual a global but rather local to each module.
  console.log("当前打开文件的信息(绝对路径):");
  console.log('  _dirname : \n\t' + __dirname);
  console.log('  _filename : \n\t' + __filename);

// Tips : 光有当前路径还不够,如果要访问 ./source/text.txt 这样的路径,就需要继续在 __dirname 后进行
//      拼接路径,然而问题是 windows 中与 linux/mac 中需要的路径符不同
//      windows : __dirname\source\text.txt
//      unix/mac : __dirname/source/text.txt
//      自己手动拼接成的固定的字符串只能满足其中一种状况
// 解决 : 使用 path 模块来拼接路径(见 readFile 中的路径)

/*
 * 5.创建一个文件夹 hello
 *  fs.mkdir('dir_name',callback)
 */

  fs.mkdir('test-mkdir',function(err){
    if(err){
      console.log('文件夹 test-mkdir 创建出错 :\n ' + err);
    }
    else{
      console.log('\n5. 文件夹 mkdir 创建成功!\n');
    }
  });


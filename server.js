var http = require('http');
var parse = require('url').parse;
var join = require('path').join;
var fs = require('fs');

var root = __dirname;

var server = http.createServer(function(req, res){
    var url = parse(req.url);
    var path = join(root, url.pathname);  //构造绝对路径
    //var stream = fs.createReadStream(path);  //创建fs.ReadStream
    fs.stat(path,function(err,stat){
        if(err){
            if('ENOENT' == err.code){
                res.statusCode = 404;
                res.end('Not Found');
            }else{
                res.statusCode = 500;
                res.end('Internal Server Error');
            }
        }else{
            res.setHeader('content-length',stat.size);
            var stream = fs.createReadStream(path);
            stream.pipe(res);
            stream.on('error',function(err){
                res.statusCode = 500;
                res.end('Internal Server Error');
            });
        }
    });
    //stream.on('data', function(chunk){  //将文件数据写到响应中
    //    res.write(chunk);
    //});
    //stream.on('end', function(){
    //    res.end();  //文件写完后结束响应
    //});
    //stream.pipe(res);
    //var readStream = fs.createReadStream('./original.txt');
    //var writeStream = fs.createWriteStream('./copy.txt');
    ////readStream.pipe(writeStream);
    //req.pipe(writeStream);
    //stream.on('error',function(err){
    //    res.statusCode = 500;
    //    res.end('Internal Server Error');
    //});
});
server.listen(3000);

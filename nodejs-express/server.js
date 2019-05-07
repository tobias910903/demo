var app = require('express')();
var http = require('http').Server(app);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

http.listen(66,'0.0.0.0',function(){
  console.log('开启端口: 66');
});
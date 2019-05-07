var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.get('/', function(req, res){
  res.sendFile(__dirname + '/chat.html');
});

app.get('/api', function(req, res) { 
  io.emit('gg', '服务器发来了一个数据~');
});


io.on('connection', function(socket){
  console.log('加入聊天~');
  console.log("当前连接数量：" + io.eio.clientsCount);
  io.emit('userNum',io.eio.clientsCount);

  socket.on('disconnect',function(){
    console.log('离开聊天~');
    console.log("当前连接数量：" + io.eio.clientsCount);
    io.emit('userNum',io.eio.clientsCount);
  });

  socket.on('msg', function(text){ 
    console.log('发送了一条消息=====: ' + text);
    io.emit('gg', text);
  });
});


http.listen(66,'0.0.0.0',function(){
  console.log('端口: 66');
});
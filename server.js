var Hapi = require('hapi');
var server = new Hapi.Server();

server.connection({ port: 3000 });
//console.log(server.listener);

//var io = require('socket.io')(server.listener)

var socket = require('socket.io-client')('http://localhost:4001');
//var socket = io.connect('http://localhost:4001');

server.register(require('inert'), function(err){

  if(err){
    throw err;
  }

  server.route({

    method: 'GET',
    path: '/',
    handler: function(request, reply){
      
      reply('Starting......');
      //reply.file('index.html');
    }
  });

  server.start(function() {

    console.log('Server is running at: ', server.info.uri);
  });

});

socket.on('io:welcome', function(data, fn){
  console.log(data);
  fn('sdfsdf');
  socket.emit('io:name', 'DuyCuong');
  socket.on('newuser', function(msgData, fn){
    console.log('#___1');
    console.log(msgData);
    fn('woot');
  });
});

/*socket.on('chat:people:new', function(msgData){
  console.log('#___1');
});*/

socket.on('newuser', function(msgData, callback){
    console.log('#_Manager: >>>');
    console.log(msgData);
    callback('woot1');
});

socket.on('chat:messages:latest', function(msg){
  console.log(msg);
  //var newMSG = JSON.parse(msg);
  //console.log(typeof(msg));
  //console.log(msg.t);
  //socket.emit('io:message', {'myid':'0nkjh', 'did':msg.myid, 't':'OK BOY'});  
  //socket.emit('io:message', {'did':msg.myid, 't':'OK BOY'});  
});

/*io.on('connection', function(socket){
  socket.emit('news', { hello: 'world' });
  socket.on('something', function(data){
    console.log(data);
  });
});*/



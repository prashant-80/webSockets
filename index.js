const express = require('express');
const { createServer } = require('node:http');
const app = express();
const server = createServer(app);
const { join } = require('node:path');
const { Server } = require('socket.io');
const io = new Server(server);


app.use('/',express.static(__dirname+'/public'));

io.on('connection', (socket) => {
    console.log('a user connected');

    // socket.on('from_client',()=>{
    //   console.log('recieved from the client')
    // })

    // setInterval(function f(){
    //   socket.emit('from_server')
    // },3000)

    socket.on('new_msg',(data)=>{
      //io.emit('msg_rcvd',data)
      socket.broadcast.emit('msg_rcvd',data)

    })
    
  });

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});
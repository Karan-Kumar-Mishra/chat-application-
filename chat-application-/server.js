const express=require('express')
const app= express()
const http=require('http').createServer(app)
const PORT =process.env.PORT || 3000
http.listen(PORT,()=>{
    console.log('Listing on port ',PORT)
})
app.use(express.static(__dirname +'/public'))
app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html')
})
var users_in_chat={};
let u_name;
let i=0;
const io=require('socket.io')(http)
io.on('connection', (socket) => {
    socket.emit('get-users', users_in_chat);
  
    socket.on('joins', (name) => {
     // console.log(name + ' join the chat..');
      u_name = name;
      users_in_chat[socket.id] = name;
      socket.broadcast.emit('come', users_in_chat[socket.id]);
    });
    i = i + 1;
    socket.on('message', (msg) => {
      socket.broadcast.emit('message', msg);
    });
  
    // Handle incoming image data
    socket.on('image', (data) => {
      socket.broadcast.emit('image', data);
    });
  
    socket.on('disconnect', function () {
      socket.broadcast.emit('left', users_in_chat[socket.id]);
      delete users_in_chat[socket.id];
    });
  });
  

 
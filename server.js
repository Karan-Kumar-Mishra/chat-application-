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
var users_in_chat=[];
let u_name;
let i=0;
const io=require('socket.io')(http)
io.on('connection',(socket)=>{
    socket.emit('get-users',users_in_chat);
    console.log('connected....')
    socket.on('joins',(name)=>{
        console.log(name+' join the chat..');
        u_name=name;
        users_in_chat.push(name);
        socket.broadcast.emit('come',name);       
    })
    i=i+1;
    socket.on('message',(msg)=>{
        socket.broadcast.emit('message',msg)
    })
    socket.on('disconnect',function()
    {
        socket.broadcast.emit('left',u_name);
        console.log("disconnected...")
        users_in_chat.pop();
    })
    console.log("live user => "+users_in_chat);
})

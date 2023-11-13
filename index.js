const express = require ('express');  //express dependence declaration
const path = require ('path');  //nodejs core module path declaration
const app = express();  //initialize express application
const port = process.env.PORT || 4000; //setting the port of express app
const server = app.listen(port, ()=> 
console.log(`🗨 Server is running in port ${port}`)); //start the Express.js server on the specified port. 

const io = require('socket.io')(server);// initializes a Socket.io instance and attaches it to your Express server.

app.use(express.static(path.join(__dirname,  '/public'))); //setting up Express to serve static files from a directory named "public.
                                                           // express.static: This is Express's built-in middleware to serve static files, such as images, CSS, JavaScript, etc 
let socketConnected = new Set();  //You're creating a new Set named socketConnected. In JavaScript, a Set is a collection of values where each value must be unique. This can be useful when you want to store a collection of items but ensure that each item is unique.

io.on('connection', onConnected); //The io.on('connection', callback) event is fired whenever a new client connects to the server.

; 

function onConnected(socket){ //It looks like you're logging the ID of the connected socket 
    console.log(socket.id);  //and adding it to the socketConnected Set.
    socketConnected.add(socket.id); 

io.emit('client-total', socketConnected.size) ////This method sends a message to all connected clients. It broadcasts the message to all sockets connected to the Socket.io server.

socket.on('disconnect', () =>{
    console.log('Socket Disconnected', socket.id);
    socketConnected.delete(socket.id);
    io.emit('client-total', socketConnected.size)
})
socket.on('message', (data)=>{
    console.log(data)
    socket.broadcast.emit('chat-message', data)
})
socket.on('feedback', (data)=>{
    socket.broadcast.emit('feedback', data) 
})
}
const express = require('express');
const app = express();
const port = process.env.Port || 3000;
//create server for the socket
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server)

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

server.listen(port, ()=> {
    console.log(`server is listening on port ${port}`);
})

// detect socket events
// detect connection
io.on('connection', (socket) => {
    console.log('someone is connected');
    // detect disconnection
    socket.on('disconnect', () => {
        console.log('someone is disconnected');
        
    })
    socket.emit('welcomeMsg', 'Welcome to our chat');

    socket.on('msg', (data) => {
        console.log(data);
        socket.broadcast.emit('incomeMessage', data)
        
    })
})
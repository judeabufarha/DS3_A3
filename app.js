const express   = require('express');
const app       = express();
const http      = require('http');
const server    = require('http').createServer(app);  
const io        = require('socket.io')(server);

const LISTEN_PORT   = 8080;

server.listen(LISTEN_PORT);
app.use(express.static(__dirname + '/public')); //set root path of server ...

console.log("Listening on port: " + LISTEN_PORT );

//our routes
app.get( '/', function( req, res ){ 
    res.sendFile( __dirname + '/public/mainApplication.html' );
});

let total = 0;
//socket.io stuff
io.on('connection', (socket) => {

    console.log( socket.id + " connected" );

    socket.on('disconnect', () => {
        console.log( socket.id + " disconnected" );
    });

    socket.on("generateMars", (data) => {
        console.log( "Mars Generated" );
        io.sockets.emit("generateMars");
        total = 0;
    });

    socket.on("removeMars", (data) => {
        console.log( "Mars Deleted" );
        io.sockets.emit("removeMars", data);
    });

    socket.on("updateScore", (data) => {
        console.log( "Score Updated" );
        io.sockets.emit("updateScore");
    });

    socket.on("gameMode", (data) => {
        console.log( "Game Mode Updated" );
        io.sockets.emit("updateGameMode");
    });

    socket.on("trackTotal", (data) => {
        total++;
        if(total == 10)
        {
            io.sockets.emit("gameOver")
            total = 0;
        }
    });

});
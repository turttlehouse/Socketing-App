const express = require('express')
const app = express();
const {Server} = require('socket.io');
const ConnectToDb = require('./database');

ConnectToDb();

//first ma http connection needed webscoket connection ko lagi 
const server = app.listen(5000,(req,res)=>{
    console.log('Server is running on port 5000')
})

const io = new Server(server) //2nd argument vaneko cors ko lagi hunxa

io.on('connection',(socket)=>{
    //client ko information haru socket bata aaucha
    //but chaine vaneko client ko id ho
    // console.log(socket);
    // console.log(socket);
    console.log(socket.id);
    console.log('someone made connection to the websocket')
}) 
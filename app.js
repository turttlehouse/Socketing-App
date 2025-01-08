const express = require('express')
const app = express();
const {Server} = require('socket.io');
const ConnectToDb = require('./database');
const Message = require('./model/messageModel');

ConnectToDb();

const server = app.listen(5000,(req,res)=>{
    console.log('Server is running on port 5000')
})

//2nd argument for cors
const io = new Server(server) 

io.on('connection',(socket)=>{
    console.log('user connected');

    //Add message
    socket.on('Addmessage',async(data)=>{
        // console.log(data);
        try{
            if(data){
                const {message} = data;
                const newMessage = await Message.create({
                    message
                })
                
                //socket.emit('response',newMessage) to send to only sender

                //io.emit('response',newMessage) to send to all connected users
                io.emit('response',{
                    status : '200',
                    message : 'Message received',
                    data : newMessage
                })
            }
        }
        catch(err){
            io.emit('response',{
                status :'500',
                message : 'Message not received',
            })
        }


    })

    //Get All Messages
    socket.on("getMessages",async()=>{
        try{
            const messages = await Message.find();
            io.emit('response',{
                status:200,
                message : 'messages fetched',
                data : messages
            })
        }
        catch(err){
            io.emit('response',{
                status:500,
                message : 'failed to fetch message',
            })
        }
    })
})

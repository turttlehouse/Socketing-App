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
                message : 'messages sent successfully',
                data : messages
            })
        }
        catch(err){
            io.emit('response',{
                status:500,
                message : 'failed to send messages',
            })
        }
    })

    //Get Single Message
    socket.on('getMessage',async(data)=>{
        try {
            const {id} = data;
            const message = await Message.findById(id);
            io.emit('response',{
                status:200,
                message : 'single message sent successfully',
                data : message
            })
            
        } catch (error) {
            io.emit('response',{
                status:500,
                message : 'failed to send single message',
            })
            
        }
    })

    //Update Message
    socket.on('updateMessage',async(data)=>{
        try {
            const {id,message} = data;
            const updatedMessage = await Message.findByIdAndUpdate(id,{message},{new:true});
            io.emit('response',{
                status:200,
                message : 'message updated successfully',
                data : updatedMessage
            })
            
        } catch (error) {
            io.emit('response',{
                status:500,
                message : 'failed to update message',
            })
            
        }
    })

    //Delete Message
    socket.on('deleteMessage',async(data)=>{
        try {
            const {id} = data
            await Message.findByIdAndDelete(id);
            io.emit('response',{
                status : 200,
                message : 'message deleted successfully'
            })
            
        } catch (error) {
            io.emit('response',{
                status : 500,
                message : 'failed to delete message'
            })
            
        }
    })
})

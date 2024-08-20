const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes")
const messageRoutes = require("./routes/messageRoute")
const socket = require("socket.io");

// mongoose is basically required to intract with the mongodb server
require('./db/Config');


const app = express();
require("dotenv").config();

// using midleware here

app.use(cors());
app.use(express.json());

// calling the router here;

app.use("/api/auth",userRoutes);
app.use("/api/messages",messageRoutes);


// creating the listening port in .env file and connecting it within this code

const server = app.listen(process.env.PORT,()=>{
    console.log(`server is started on port ${process.env.PORT} `)
});


const io = socket(server,{
    cors:{
        origin:"http://localhost:3000",
        credentials :true,
    }
});

global.onlineUsers = new Map();

io.on("connection" , (socket)=>{
    global.chatSocket = socket;
    socket.on("add-user" ,(userId)=>{
        onlineUsers.set(userId,socket.id);
    });
    socket.on("send-msg" ,(data)=>{
        const sendUserSocket = onlineUsers.get(data.to);
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("msg-receive" , data.message);
        }
    })
})


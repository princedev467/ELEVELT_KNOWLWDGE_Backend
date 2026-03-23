const { Server, Socket } = require("socket.io");
const cors = require('cors')

const connectSocket = () => {

    try {
        console.log("ok");

        const io = new Server({
            cors: {
                origin: "http://localhost:5173"
            }
        });



        io.on('connection', (socket) => {

            console.log('a user connected');
            console.log("soket id:", socket.id);
            socket.emit('welcome', 'welcome our socket user')
            socket.on('Private_message', (messsage) => {
                io.emit("message",messsage)
                console.log(`user ${socket.id}:-`,messsage)

            });
           socket.on('send_msg',({to,msg})=>{
                console.log(to,msg);
                
                io.to(to).emit("recieve_msg",msg)
           }) 

           socket.on('create_Group',(group)=>{
            socket.join(group)
           })
        });

        

        io.listen(4040);

    } catch (error) {
        console.log(error);

    }
}

module.exports = connectSocket
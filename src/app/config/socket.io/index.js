const Logger = require("../../utils/Logger");

class SocketConnection {
    constructor(){
        this.users = [];
    }
    connect(io){
        io.use((socket, next) => {
            const userId = socket.handshake.auth.userId;
            if (!userId) {
              return next(new Error("invalid userId"));
            }
            socket.userId = userId;
            next();
        });
        
        io.on(`connection`,(socket) => {
            Logger.info(`A new user just ${socket.id} -` ,socket.userId)
            this.users =  this.users.filter(item => item.userId != socket.userId);
            this.users.push({
                userId:socket.userId,
                socketId:socket.id
            })
            socket.on('disconnect',()=>{
                console.log(`${socket.id} disconnected`);
                this.users =  this.users.filter(item => item.socketId != socket.id);
            })
           
            socket.on('join', (room) => {
                console.log(`Socket ${socket.id} joining ${room}`);
                socket.join(room);
            });
            socket.on('change_schedule', (data) => {
                const { message } = data;
                const {_class,des,start,end} = message;
                var options = { hour12: false };
                const convertStart = new Date(start).toLocaleString('en-US',options)
                const convertEnd = new Date(end).toLocaleString('en-US',options)
                console.log(_class,des,convertStart,convertEnd);
                io.sockets.emit('receive_data',{_class,des,convertStart,convertEnd});
                io.sockets.emit('chat','hello from server');
            });
            socket.on('send-message', (data) => {
                const {message} = data;
                const messageWrite =message.message;
                const request = {};
                request.body = messageWrite;
                const findDesSocketId = this.users.find(item => item.userId == messageWrite.message.userReceiveId);
                if(findDesSocketId){
                    console.log(messageWrite);
                    io.to(findDesSocketId.socketId).emit('receive-message',messageWrite)
                }
            });
            socket.on('from_mobile', (data) => {
                console.log('data from mobile',data);
            });
            
        })
    }
}
module.exports = new SocketConnection();
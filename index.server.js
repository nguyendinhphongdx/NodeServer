const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const env = require('dotenv');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const Route = require('./src/Route/Root');
const { connect } = require('./src/app/config/database/connect');
const fileUpload = require('express-fileupload');
const http = require('http')
const socketIO = require('socket.io')


app.use(morgan('combined'));

// default options
app.use(fileUpload());
// Allow access from another ports
app.use(cors());
// Enviroment variable
env.config();
//static files
app.use(express.static(path.join(__dirname,'public')))
// Use Request Body
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
//Route app
Route(app);
// Connect mongoDB
connect()
//config socket io
const server = http.createServer(app)
let io = socketIO(server,{
    cors: {
        origin: '*',
      }
})
io.on(`connection`,(socket) => {
    console.log(`A new user just ${socket.id}` );
    socket.on('disconnect',()=>{
        console.log(`${socket.id} disconnected`);
    })
    socket.on('disconnect', () =>
    console.log(`Disconnected: ${socket.id}`));
    socket.on('join', (room) => {
        console.log(`Socket ${socket.id} joining ${room}`);
        socket.join(room);
    });
    socket.on('notif', (data) => {
        const { message } = data;
        const {_class,des,start,end} = message;
       console.log('class',_class)
       console.log('dess',des)
       console.log('start',start)
       console.log('end',end)
    });
})
server.listen(5050,()=>{
    console.log(`Socket is running localhost:5050`)
})
app.listen(process.env.PORT,()=> console.log(`Server is running localhost:${process.env.PORT}`));

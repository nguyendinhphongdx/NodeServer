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

app.listen(process.env.PORT,()=> console.log(`Server is running localhost:${process.env.PORT}`));

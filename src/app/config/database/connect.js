const e = require('cors');
const mongoose = require('mongoose');
async function connect(){
    //const url = 'mongodb://localhost:27017/webManager';
    const url =`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.axsfv.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`;
    //const url = `mongodb+srv://phongnd:khongbaogio12345>@cluster0.zd0wf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
    //const url = 'mongodb://localhost:27017/Web_Manament';
    try {
        await mongoose.connect(url,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('Connect database successfull !!')
    } catch (error) {
        console.log('Connect database failure !!',error)
    }
}
module.exports = {connect};

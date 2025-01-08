const mongoose = require('mongoose');

async function  ConnectToDb(){
    try{
        await mongoose.connect('mongodb+srv://buildandrun464:admin123@cluster0.js3sk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
        console.log('Connected to database');
    }
    catch(err){
        console.log(`something went wrong ${err}`);
    }
}

module.exports = ConnectToDb;
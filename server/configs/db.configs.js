
const mongoose = require('mongoose');


const connectDataBase = async () => {

    try{

        await mongoose.connect('mongodb://127.0.0.1:27017/MatchUp');

        console.log("Data Base Successfully Connected ! ")

    }catch(err){

        console.log(`Data Base connection error : ${err.message}`)

    }
};


module.exports = connectDataBase;
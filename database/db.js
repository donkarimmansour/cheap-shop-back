const mongoose = require("mongoose")


const DB_URL = "mongodb://localhost:27017/shop"
//const DB_URL = "mongodb+srv://admin:admin@rdv.o6wsj.mongodb.net/ectest"

function DB(){
    return mongoose.connect(DB_URL, (err) => {
            if (err) 
                throw new Error("db error")
            
            console.log("db start")
        })

}


module.exports = DB
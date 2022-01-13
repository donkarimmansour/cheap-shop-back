const mongoose = require("mongoose")

const ServiceSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    },
    doctor: {
        type: mongoose.Types.ObjectId,
        required : true ,
        ref : "Doctor"
    }
})


const ServiceRquest = mongoose.model("Service", ServiceSchema)
 


module.exports = ServiceRquest

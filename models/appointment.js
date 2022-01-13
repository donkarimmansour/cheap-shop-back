const mongoose = require("mongoose")

const AppointmentSchema = mongoose.Schema({
    nameClient: {
        type: String,
        required: true,
        trim: true,
    },
    desination: {
        type: String,
        required: true,
        trim: true,
    },
    type: {
        type: String,
        required: true,
        enum: ["blood donation" , "appointment doctor"],
    },
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: Date,
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
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        required : true ,
        ref : "Patient"
    },
    programme: {
        type: mongoose.Schema.Types.ObjectId,
        required : true ,
        ref : "Programme"
    },
    service: {
        type: mongoose.Schema.Types.ObjectId,
        required : true ,
        ref : "Service"
    },
    isAppointmentActivated: {
        type: Boolean,
        default: true
    } 

})


const AppointmentRquest = mongoose.model("Appointment", AppointmentSchema)


module.exports = AppointmentRquest

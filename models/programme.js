const mongoose = require("mongoose")

const ProgrammeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    date: {
        type: Date,
        required: true,
        trim: true,
    },
    capacity: {
        type: Number,
        required: true,
    },
    horaire: {
        type: {
            morning: { type: Array },
            afternoon: { type: Array },
            evening: { type: Array },
        },
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
        type: mongoose.Schema.Types.ObjectId,
        required : true ,
        ref : "Doctor"
    }
})


const ProgrammeRquest = mongoose.model("Programme", ProgrammeSchema)

module.exports = ProgrammeRquest

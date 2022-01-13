const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const PatientSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true,
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique : true
    },
    phone: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    cin: {
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
    isEmailVerified: {
        type: Boolean,
        default: false
    } ,
    isAccountSuspended: {
        type: Boolean,
        default: false
    }
})

// hash Password
PatientSchema.methods.hashPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

// compare Password
PatientSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password)
}

const PatientRquest = mongoose.model("Patient", PatientSchema)



module.exports =  PatientRquest
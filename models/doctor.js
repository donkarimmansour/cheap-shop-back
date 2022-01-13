const mongoose = require("mongoose")
const bcrypt = require("bcrypt")


const DoctorSchema = mongoose.Schema({
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
    
    password: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        trim: true,
    },

    address: {
        type: {},
        trim: true,
    },
    country: {
        type: String,
        trim: true,
    },
    city: {
        type: String,
        trim: true,
    },
    postal: {
        type: String,
        trim: true,
    },
    experience: {
        type: Array,
        trim: true,
    },
   
    deplome: {
        type: Array,
        trim: true,
    },


    presentation: {
        type: String,
        trim: true,
    },
  
    type: {
        type: String,
        enum: ["doctor" , "donation place"],
    },
    social: {
        type: {
            fb : { type : String } ,
            insta : { type : String } ,
            twtr : { type : String } ,
            lnk : { type : String } ,
        }
    },
    name_cabinet: {
        type: String,
        trim: true,
    },
    patente: {
        type: String,
        trim: true,
    },
    RCI: {
        type: String,
        trim: true,
    },
    RIB: {
        type: String,
        trim: true,
    },
    form_juridique: {
        type: String,
        trim: true,
    },
    banque: {
        type: String,
        trim: true,
    },
    Ice: {
        type: String,
        trim: true,
    },
    specialite: {
        type: String,
        trim: true,
    },
    contact_Secrutere: {
        type: String,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    },
    isLoginActivated: {
        type: Boolean,
        default: false
    } ,
    isAccountActivated: {
        type: Boolean,
        default: false
    } ,
    isAccountSuspended: {
        type: Boolean,
        default: false
    } ,

})
 


// hash Password
DoctorSchema.methods.hashPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

// compare Password
DoctorSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password)
}

const DoctorRquest = mongoose.model("Doctor", DoctorSchema)



module.exports = DoctorRquest
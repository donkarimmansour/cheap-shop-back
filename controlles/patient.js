const PatientModel = require("../services/patient")


// get All Patients
const getAllPatients = (req, res) => {
    const { sort , limit , skip , filter ,  select } = req.query ;

    PatientModel.getAllPatients( sort , limit , skip , filter ,  select).then(result => {
        res.status(200).json({"error": "no", "message": result})
    }).catch(result => {
        res.status(401).json({"error": "yes", "message": result})
    })
}


// login
const login = (req, res) => {
    const {email , password} = req.body ;

    PatientModel.login(email , password).then(result => {
        res.status(200).json({"error": "no", "message": result})
    }).catch(result => {
        res.status(401).json({"error": "yes", "message": result})
    })
}

// signup
const signup = (req, res) => {
    const {firstname , lastname ,email , password , phone, cin} = req.body ;

    PatientModel.signup(firstname , lastname ,email , password , phone, cin).then(result => {
        res.status(200).json({"error": "no", "message": result})
    }).catch(result => {
        res.status(401).json({"error": "yes", "message": result})
    })
}

// edit Patient
const editPatient = (req, res) => {
    const {firstname , lastname ,email  , phone, cin} = req.body ;
    const {id} = req.params ;

    PatientModel.editPatient(id ,firstname , lastname ,email  , phone, cin).then(result => {
        res.status(200).json({"error": "no", "message": result})
    }).catch(result => {
        res.status(401).json({"error": "yes", "message": result})
    })
}

// reset Password Patient
const resetPasswordPatient = (req, res) => {
    const {id} = req.params ;
    const { oldpassword , password} = req.body ;

    PatientModel.resetPasswordPatient(id , oldpassword , password).then(result => {
        res.status(200).json({"error": "no", "message": result})
    }).catch(result => {
        res.status(401).json({"error": "yes", "message": result})
    })
}

// forgot Password Patient
const forgotPasswordPatient = (req, res) => {
    const {email} = req.body ;

    PatientModel.forgotPasswordPatient(email).then(result => {
        res.status(200).json({"error": "no", "message": result})
    }).catch(result => {
        res.status(401).json({"error": "yes", "message": result})
    })
}

// confirm email Patient
const confirmEmailPatient = (req, res) => {
    const {id} = req.params ;

    PatientModel.confirmEmailPatient(id).then(result => {
        res.status(200).json({"error": "no", "message": result})
    }).catch(result => {
        res.status(401).json({"error": "yes", "message": result})
    })
}

// Account Suspension
const Suspension = (req, res) => {
    const {id} = req.params ;
    const { isAccountSuspended } = req.body ;

    PatientModel.Suspension(id , isAccountSuspended).then(result => {
        res.status(200).json({"error": "no", "message": result})
    }).catch(result => {
        res.status(401).json({"error": "yes", "message": result})
    })
}

module.exports = {
    getAllPatients,
     login ,
     signup ,
     resetPasswordPatient ,
     confirmEmailPatient ,
     editPatient , 
     Suspension ,
     forgotPasswordPatient
}
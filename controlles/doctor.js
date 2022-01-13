const DoctorModel = require("../services/doctor")


// get All Doctors
const getAllDoctors = (req, res) => {
        
    const { sort , limit , skip , filter ,  select } = req.query ;

    DoctorModel.getAllDoctors( sort , limit , skip , filter ,  select ).then(result => {
        res.status(200).json({"error": "no", "message": result})
    }).catch(result => {
        res.status(401).json({"error": "yes", "message": result})
    })
}



// login
const login = (req, res) => {
    const {email , password} = req.body ;

    DoctorModel.login(email , password).then(result => {
        res.status(200).json({"error": "no", "message": result})
    }).catch(result => {
        res.status(401).json({"error": "yes", "message": result})
    })
}

// signup
const signup = (req, res) => {
    const {firstname , lastname ,email , phone} = req.body ;

    DoctorModel.signup(firstname , lastname ,email , phone).then(result => {
        res.status(200).json({"error": "no", "message": result})
    }).catch(result => {
        res.status(401).json({"error": "yes", "message": result})
    })
}

// edit Doctor
const editDoctor = (req, res) => {
    const {firstname , lastname , email , phone , address ,
        country , city , postal , experience , deplome , presentation ,
        type , social , contact_Secrutere , specialite , banque ,
        name_cabinet , patente ,RCI ,RIB , Ice ,form_juridique} = req.body ;
    const {id} = req.params ;

    DoctorModel.editDoctor(id ,firstname , lastname , email , phone , address ,
        country , city , postal , experience , deplome , presentation ,
        type , social , contact_Secrutere , specialite , banque ,
        name_cabinet , patente ,RCI ,RIB , Ice ,form_juridique).then(result => {
        res.status(200).json({"error": "no", "message": result})
    }).catch(result => {
        res.status(401).json({"error": "yes", "message": result})
    })
}

// reset Password Doctor
const resetPasswordDoctor = (req, res) => {
    const {id} = req.params ;
    const { oldpassword , password} = req.body ;

    DoctorModel.resetPasswordDoctor(id , oldpassword , password).then(result => {
        res.status(200).json({"error": "no", "message": result})
    }).catch(result => {
        res.status(401).json({"error": "yes", "message": result})
    })
}

// forgot Password Doctor
const forgotPasswordDoctor = (req, res) => {
    const {email} = req.body ;

    DoctorModel.forgotPasswordDoctor(email).then(result => {
        res.status(200).json({"error": "no", "message": result})
    }).catch(result => {
        res.status(401).json({"error": "yes", "message": result})
    })
}


// Login Activated
const LoginActivated = (req, res) => {
    const {id} = req.params ;
    const { isLoginActivated } = req.body ;

    DoctorModel.LoginActivated(id , isLoginActivated).then(result => {
        res.status(200).json({"error": "no", "message": result})
    }).catch(result => {
        res.status(401).json({"error": "yes", "message": result})
    })
}

// activate the account
const Activate = (req, res) => {
    const {id} = req.params ;
    const { isAccountActivated } = req.body ;

    DoctorModel.Activate(id , isAccountActivated).then(result => {
        res.status(200).json({"error": "no", "message": result})
    }).catch(result => {
        res.status(401).json({"error": "yes", "message": result})
    })
}

// Suspension the account
const Suspension = (req, res) => {
    const {id} = req.params ;
    const { isAccountSuspended } = req.body ;

    DoctorModel.Suspension(id , isAccountSuspended).then(result => {
        res.status(200).json({"error": "no", "message": result})
    }).catch(result => {
        res.status(401).json({"error": "yes", "message": result})
    })
}


module.exports = {
     getAllDoctors,
     login ,
     signup ,
     resetPasswordDoctor ,
     editDoctor , 
     LoginActivated ,
     forgotPasswordDoctor ,
     Activate, Suspension
}
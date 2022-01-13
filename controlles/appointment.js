const AppointmentModel = require("../services/appointment")


// get All Appointments
const getAllAppointments = (req, res) => {

    const { sort , limit , skip , filter ,  select , expend , includes } = req.query ;

    AppointmentModel.getAllAppointments(sort , limit , skip , filter ,  select , expend , includes).then(result => {
        res.status(200).json({"error": "no", "message": result})
    }).catch(result => {
        res.status(401).json({"error": "yes", "message": result})
    })
}

// users Appointments
const usersAppointments = (req, res) => {
    const { sort , limit , skip , filter ,  select , expend , includes } = req.query ;
    const { id } = req.params ;

    AppointmentModel.usersAppointments(id , sort , limit , skip , filter ,  select , expend , includes).then(result => {
        res.status(200).json({"error": "no", "message": result})
    }).catch(result => {
        res.status(401).json({"error": "yes", "message": result})
    })
}

// create Appointments
const createAppointment = (req, res) => {
    const { programmeId , serviceId , nameClient, desination, type, date, time } = req.body ;
    const { id } = req.params ;

    AppointmentModel.createAppointment( id , programmeId , serviceId , nameClient, desination, type, date,  time )
    .then(result => {
        res.status(200).json({"error": "no", "message": result})
    }).catch(result => {
        res.status(401).json({"error": "yes", "message": result})
    })
}


// edit Appointment
const editAppointment = (req, res) => {
    const {  nameClient, desination, type, date, time } = req.body ;
    const { id } = req.params ;

    AppointmentModel.editAppointment( id  , nameClient, desination, type, date,  time )
    .then(result => {
        res.status(200).json({"error": "no", "message": result})
    }).catch(result => {
        res.status(401).json({"error": "yes", "message": result})
    })
}


// activate Appointment
const activateAppointment = (req, res) => {
    const {  appointmentId, isAppointmentActivated } = req.body ;
    const { id } = req.params ;

    AppointmentModel.activateAppointment( id  , isAppointmentActivated )
    .then(result => {
        res.status(200).json({"error": "no", "message": result})
    }).catch(result => {
        res.status(401).json({"error": "yes", "message": result})
    })
}


module.exports = {
    getAllAppointments ,
    createAppointment ,
    usersAppointments ,
    editAppointment ,
    activateAppointment
}

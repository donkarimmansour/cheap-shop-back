const AppointmentControlles = require("../controlles/appointment")
const { check ,handleError , idValidator , passport , ApiEndpoints , handleValidation} = require("../common/routersImports")
const router = require("express").Router()



// getall
router.get(ApiEndpoints.AppointmentEndpoints.list , passport.authenticate("userOradminOrsuperAdmin", {session: false}) ,
  AppointmentControlles.getAllAppointments, handleError)
  

// users
router.get(ApiEndpoints.AppointmentEndpoints.users , passport.authenticate("admin", {session: false}) ,
idValidator ,  AppointmentControlles.usersAppointments, handleError)

 
// create
router.post(ApiEndpoints.AppointmentEndpoints.create , passport.authenticate("user", {session: false}) , [
  check("nameClient").notEmpty().withMessage("nameClient is required"),
  check("desination").notEmpty().withMessage("desination is required"),
  check("type").isIn(["blood donation" , "appointment doctor"]).withMessage("type is required"),
  check("date").notEmpty().withMessage("date is required"),
  check("time").notEmpty().withMessage("time is required"),
  check("programmeId").notEmpty().withMessage("programme Id is required"),
  check("serviceId").notEmpty().withMessage("serviceId is required"),
], idValidator , handleValidation , AppointmentControlles.createAppointment , handleError)


// edit
router.put(ApiEndpoints.AppointmentEndpoints.edit , passport.authenticate("user", {session: false}) , [
  check("nameClient").notEmpty().withMessage("nameClient is required"),
  check("desination").notEmpty().withMessage("desination is required"),
  check("type").isIn(["blood donation" , "appointment doctor"]).withMessage("type is required"),
  check("date").notEmpty().withMessage("date is required"),
  check("time").notEmpty().withMessage("time is required"),
], idValidator , handleValidation , AppointmentControlles.editAppointment, handleError)


// activate the Appointment
router.put(ApiEndpoints.AppointmentEndpoints.activate , passport.authenticate("user", {session: false}) , [
  check("isAppointmentActivated").notEmpty().withMessage("type is required"),
], idValidator , handleValidation , AppointmentControlles.activateAppointment , handleError)


module.exports = router

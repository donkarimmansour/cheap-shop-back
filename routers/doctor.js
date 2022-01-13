const DoctorControlles = require("../controlles/doctor")
const { check ,handleError , idValidator , passport , ApiEndpoints , handleValidation} = require("../common/routersImports")
const router = require("express").Router()

// getall
router.get(ApiEndpoints.DoctorEndpoints.list , passport.authenticate("adminOrsuperAdmin", {session: false}) 
,  DoctorControlles.getAllDoctors , handleError)


// login
router.post(ApiEndpoints.DoctorEndpoints.login , [
    check("email").notEmpty().withMessage("email is required"),
    check("password").notEmpty().withMessage("password is required"),
], handleValidation , DoctorControlles.login)

// signup
router.post(ApiEndpoints.DoctorEndpoints.signup , [
    check("firstname").notEmpty().withMessage("firstname is required"),
    check("lastname").notEmpty().withMessage("lastname is required"),
    check("email").notEmpty().withMessage("email is required"),
    check("phone").notEmpty().withMessage("phone is required"),
], handleValidation , DoctorControlles.signup)

// edit Doctor
router.put(ApiEndpoints.DoctorEndpoints.edit , passport.authenticate("admin", {session: false}) , [
    check("firstname").notEmpty().withMessage("fisrtname is required"),
    check("lastname").notEmpty().withMessage("lastname is required"),
    check("email").notEmpty().withMessage("email is required"),
    check("phone").notEmpty().withMessage("phone is required"),
] , idValidator, handleValidation , DoctorControlles.editDoctor , handleError)

// reset password
router.put(ApiEndpoints.DoctorEndpoints.resetPassword, passport.authenticate("admin", {session: false}) , [
    check("oldpassword").notEmpty().withMessage("old password is required"),
    check("password").notEmpty().withMessage("password is required"),
], idValidator , handleValidation , DoctorControlles.resetPasswordDoctor, handleError)

// forgot password
router.put(ApiEndpoints.DoctorEndpoints.forgotPassword , [
    check("email").notEmpty().withMessage("email is required"),
],  handleValidation , DoctorControlles.forgotPasswordDoctor)


// Account Suspension
router.put(ApiEndpoints.DoctorEndpoints.suspension  , passport.authenticate("superAdmin", {session: false}) , [
    check("isAccountSuspended").notEmpty().withMessage("type is required"),
], idValidator , handleValidation , DoctorControlles.Suspension , handleError)

 
// login Activate
router.put(ApiEndpoints.DoctorEndpoints.loginActivate  , passport.authenticate("superAdmin", {session: false}) , [
    check("isLoginActivated").notEmpty().withMessage("type is required"),
], idValidator , handleValidation , DoctorControlles.LoginActivated , handleError)


// activate the account
router.put(ApiEndpoints.DoctorEndpoints.activate  , passport.authenticate("superAdmin", {session: false}) , [
    check("isAccountActivated").notEmpty().withMessage("type is required"),
], idValidator , handleValidation , DoctorControlles.Activate , handleError)





module.exports = router
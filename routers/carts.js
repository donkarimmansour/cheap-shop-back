const PatientControlles = require("../controlles/patient")
const { check ,handleError , idValidator , passport , ApiEndpoints , handleValidation} = require("../common/routersImports")
const router = require("express").Router()

// getall
router.get(ApiEndpoints.UserEndpoints.list , passport.authenticate("userOradminOrsuperAdmin", {session: false}) 
,  PatientControlles.getAllPatients , handleError)

// login
router.post(ApiEndpoints.UserEndpoints.login, [
    check("email").notEmpty().withMessage("email is required"),
    check("password").notEmpty().withMessage("password is required"),
], handleValidation , PatientControlles.login)

// signup
router.post(ApiEndpoints.UserEndpoints.signup, [
    check("firstname").notEmpty().withMessage("firstname is required"),
    check("lastname").notEmpty().withMessage("lastname is required"),
    check("email").notEmpty().withMessage("email is required"),
    check("phone").notEmpty().withMessage("phone is required"),
    check("cin").notEmpty().withMessage("cin is required"),
    check("password").notEmpty().withMessage("password is required"),
], handleValidation , PatientControlles.signup)

// edit Patient
router.put(ApiEndpoints.UserEndpoints.edit , passport.authenticate("user", {session: false}) , [
    check("firstname").notEmpty().withMessage("fisrtname is required"),
    check("lastname").notEmpty().withMessage("lastname is required"),
    check("email").notEmpty().withMessage("email is required"),
    check("phone").notEmpty().withMessage("phone is required"),
    check("cin").notEmpty().withMessage("cin is required"),
] , idValidator, handleValidation , PatientControlles.editPatient , handleError)

// reset password
router.put(ApiEndpoints.UserEndpoints.resetPassword, passport.authenticate("user", {session: false}) , [
    check("oldpassword").notEmpty().withMessage("old password is required"),
    check("password").notEmpty().withMessage("password is required"),
], idValidator , handleValidation , PatientControlles.resetPasswordPatient, handleError)

// forgot password
router.put(ApiEndpoints.UserEndpoints.forgotPassword , [
    check("email").notEmpty().withMessage("email is required"),
],  handleValidation , PatientControlles.forgotPasswordPatient)


// confirm email
router.get(ApiEndpoints.UserEndpoints.confirmEmail , idValidator , PatientControlles.confirmEmailPatient)

// Account Suspension
router.put(ApiEndpoints.UserEndpoints.suspension , passport.authenticate("superAdmin", {session: false}) , [
    check("isAccountSuspended").notEmpty().withMessage("type is required"),
], idValidator , handleValidation , PatientControlles.Suspension , handleError)




module.exports = router
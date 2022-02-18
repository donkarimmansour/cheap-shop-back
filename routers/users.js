const UserControlles = require("../controlles/users")
const {  handleError , idValidator , passport , ApiEndpoints , HandleValidatorError} = require("../common/routersImports")
const router = require("express").Router()
const {SginupValidator , LoginValidator , emailValidator , resetPasswordValidator , ImageValidator  , EditValidator , AccountSuspendedValidator} = require("../middlewares/validators")
const { address } = require("../services/users")

// getall
router.get(ApiEndpoints.UserEndpoints.list , passport.authenticate("userOradmin", {session: false}) 
,  UserControlles.getAllUsers ,  handleError)

// login
router.post(ApiEndpoints.UserEndpoints.login, LoginValidator ,  HandleValidatorError , UserControlles.login)

// signup
router.post(ApiEndpoints.UserEndpoints.signup, SginupValidator, HandleValidatorError , UserControlles.signup)

// edit user
router.put(ApiEndpoints.UserEndpoints.edit , passport.authenticate("user", {session: false}) , EditValidator , idValidator, HandleValidatorError , UserControlles.editUser , handleError)

// edit image
router.put(ApiEndpoints.UserEndpoints.image , passport.authenticate("user", {session: false}) , ImageValidator , idValidator, HandleValidatorError , UserControlles.editImage , handleError)


// address
router.put(ApiEndpoints.UserEndpoints.address , passport.authenticate("user", {session: false}) , EditValidator , idValidator, HandleValidatorError , UserControlles.address , handleError)

// reset password
router.put(ApiEndpoints.UserEndpoints.resetPassword, passport.authenticate("user", {session: false}) , resetPasswordValidator, idValidator , HandleValidatorError , UserControlles.resetPasswordUser, handleError)

// forgot password
router.put(ApiEndpoints.UserEndpoints.forgotPassword , emailValidator,  HandleValidatorError , UserControlles.forgotPasswordUser)


// confirm email
router.put(ApiEndpoints.UserEndpoints.confirmEmail , idValidator , UserControlles.confirmEmailUser)

// Account Suspension
router.put(ApiEndpoints.UserEndpoints.suspension , passport.authenticate("admin", {session: false}) , AccountSuspendedValidator, idValidator , HandleValidatorError , UserControlles.Suspension , handleError)




module.exports = router
const {check} = require("express-validator")
const {handleError} = require("../middlewares/handleErrors")
const {idValidator} = require("../middlewares/idValidator")
const {handleValidation} = require("../middlewares/handleValidation")
const passport = require("passport")
const {ApiEndpoints} = require("../common/apiEndpoints")

module.exports = {
    check ,
    handleError ,
    idValidator ,
    passport ,
    ApiEndpoints ,
    handleValidation
}
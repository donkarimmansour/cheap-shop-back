const ContactsControlles = require("../controlles/contact")
const { ApiEndpoints , HandleValidatorError} = require("../common/routersImports")
const router = require("express").Router()
const {ContactValidator} = require("../middlewares/validators")

// getall
router.get(ApiEndpoints.ContactEndpoints.list ,  ContactsControlles.getAllContacts )

// create
router.post(ApiEndpoints.ContactEndpoints.create  , ContactValidator ,  HandleValidatorError , ContactsControlles.createContact )

 
module.exports = router
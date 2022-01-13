
const ServiceControlles = require("../controlles/services")
const {  check ,handleError , idValidator , passport , ApiEndpoints , handleValidation} = require("../common/routersImports")
const router = require("express").Router()

// getall
router.get(ApiEndpoints.ServicesEndpoints.list , passport.authenticate("userOradminOrsuperAdmin", {session: false}) ,
  ServiceControlles.getAllServices  , handleError)

// create Service
router.post(ApiEndpoints.ServicesEndpoints.create, passport.authenticate("admin", {session: false}), [
    check("name").notEmpty().withMessage("name is required"),
    check("price").notEmpty().withMessage("price is required"),
], idValidator , handleValidation , ServiceControlles.createService , handleError)

// edit Service
router.put(ApiEndpoints.ServicesEndpoints.edit, passport.authenticate("admin", {session: false}), [
    check("name").notEmpty().withMessage("name is required"),
    check("price").notEmpty().withMessage("price is required"),
], idValidator , handleValidation , ServiceControlles.editService  , handleError)

// delete Service
router.delete(ApiEndpoints.ServicesEndpoints.delete, passport.authenticate("admin", {session: false}) ,
 idValidator , ServiceControlles.deleteService , handleError)

// duplicate Service
router.post(ApiEndpoints.ServicesEndpoints.duplicate, passport.authenticate("admin", {session: false}) , 
 idValidator  , ServiceControlles.duplicateService , handleError)


module.exports = router
 
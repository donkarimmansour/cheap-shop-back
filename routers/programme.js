
const programmeControlles = require("../controlles/programme")
const { check ,handleError , idValidator , passport , ApiEndpoints , handleValidation} = require("../common/routersImports")
const router = require("express").Router()



// getall
router.get(ApiEndpoints.ProgrammeEndpoints.list , passport.authenticate("userOradminOrsuperAdmin", {session: false}) ,
  programmeControlles.getAllProgrammes , handleError)


// create Programme
router.post(ApiEndpoints.ProgrammeEndpoints.create, passport.authenticate("admin", {session: false}) , [
    check("name").notEmpty().withMessage("name is required"),
    check("date").notEmpty().withMessage("date is required"),
    check("capacity").notEmpty().withMessage("capacity is required"),

    check("horaire").custom((value) => {
        if(value.morning.length > 0 || value.afternoon.length > 0 || value.evening.length > 0){
            return true
            
        }else{
            throw new Error("horaire is required")
        }
    })

] , idValidator , handleValidation, programmeControlles.createProgramme , handleError)

// edit Programme
router.put(ApiEndpoints.ProgrammeEndpoints.edit, passport.authenticate("admin", {session: false}) , [
    check("date").notEmpty().withMessage("date is required"),
    check("capacity").notEmpty().withMessage("capacity is required"),

    check("horaire").custom((value) => {
        if(value.morning.length > 0 || value.afternoon.length > 0 || value.evening.length > 0){
            return true
            
        }else{
            throw new Error("horaire is required")
        }
    })
] , idValidator , handleValidation , programmeControlles.editProgramme , handleError)


// duplicate Programme
router.post(ApiEndpoints.ProgrammeEndpoints.duplicate, passport.authenticate("admin", {session: false}) , 
 idValidator  , programmeControlles.duplicateProgramme , handleError)



module.exports = router

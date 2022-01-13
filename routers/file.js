const fileControlles = require("../controlles/file")
const { singleFile } = require("../common/files")
const {  handleError , idValidator , passport , ApiEndpoints , handleValidation} = require("../common/routersImports")
const router = require("express").Router()


// get Single Image View
router.get(ApiEndpoints.FileEndpoints.getSingleImageView  , passport.authenticate("userOradminOrsuperAdmin", {session: false}) ,
idValidator , fileControlles.getSingleImageView , handleError)
 
// get Single Image Download
router.get(ApiEndpoints.FileEndpoints.getSingleImageDownload  , passport.authenticate("userOradminOrsuperAdmin", {session: false}) ,
    idValidator , fileControlles.getSingleImageDownload , handleError)
     
// create Single Image
router.post(ApiEndpoints.FileEndpoints.createSingleImage , passport.authenticate("userOradminOrsuperAdmin", {session: false}) ,
singleFile("./public/images" , "image" , ((1024 * 1024) * 1) , { name : "image/png" ,  error : "Please choose a png image only" } , ".png" ) 
, fileControlles.createSingleImage , handleError)



module.exports = router

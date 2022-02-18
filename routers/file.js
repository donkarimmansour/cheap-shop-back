const fileControlles = require("../controlles/file")
const { singleFile , multipleFiles } = require("../common/uploader")
const {  handleError , idValidator , passport , ApiEndpoints} = require("../common/routersImports")
const router = require("express").Router()


// get Single Image View
router.get(ApiEndpoints.FileEndpoints.getSingleImageView  , //passport.authenticate("userOradmin", {session: false}) ,
idValidator , fileControlles.getSingleImageView , handleError)
 
// get Single Image Download
router.get(ApiEndpoints.FileEndpoints.getSingleImageDownload  , //passport.authenticate("userOradmin", {session: false}) ,
    idValidator , fileControlles.getSingleImageDownload , handleError)
      
// create Single Image
router.post(ApiEndpoints.FileEndpoints.createSingleImage,  passport.authenticate("userOradmin", {session: false}) ,
singleFile("./public/images" , "image" , ((1024 * 1024) * 2) , { name : "image/png" ,  error : "Please choose a png image only" } , ".png" ) 
, fileControlles.createSingleImage , handleError)
  
// create Multiple Images
router.post(ApiEndpoints.FileEndpoints.createMultipleImage, passport.authenticate("userOradmin", {session: false}) ,
multipleFiles("./public/images" , "images" , ((1024 * 1024) * 2) , { name : "image/jpeg" ,  error : "Please choose a jpeg image only" } , ".jpeg" ) 
, fileControlles.createMultipleImages , handleError)
 


module.exports = router

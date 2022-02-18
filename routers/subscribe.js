const SubscribesControlles = require("../controlles/subscribe")
const { ApiEndpoints , HandleValidatorError} = require("../common/routersImports")
const router = require("express").Router()
const {emailValidator} = require("../middlewares/validators")

// getall
router.get(ApiEndpoints.SubscribeEndpoints.list ,  SubscribesControlles.getAllSubscribes )

// create
router.post(ApiEndpoints.SubscribeEndpoints.create  , emailValidator ,  HandleValidatorError , SubscribesControlles.createSubscribe )

 
module.exports = router
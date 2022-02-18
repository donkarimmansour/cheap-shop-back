const OrdersControlles = require("../controlles/orders")
const {  handleError , idValidator , passport , ApiEndpoints , HandleValidatorError} = require("../common/routersImports")
const router = require("express").Router()
const {OrdersCreateValidator , OrdersCalculateValidator, trackingOrderValidator, statusOrderValidator} = require("../middlewares/validators")

// getall
router.get(ApiEndpoints.OrdersEndpoints.list , passport.authenticate("userOradmin", {session: false}) 
,  OrdersControlles.getAllOrders , handleError)

// create
router.post(ApiEndpoints.OrdersEndpoints.create   , passport.authenticate("user", {session: false}), OrdersCreateValidator ,  HandleValidatorError , OrdersControlles.createOrder , handleError)


// calculate
router.post(ApiEndpoints.OrdersEndpoints.calculate   , passport.authenticate("user", {session: false}), OrdersCalculateValidator ,  HandleValidatorError , OrdersControlles.calculateOrder , handleError)

// delete
router.delete(ApiEndpoints.OrdersEndpoints.delete , passport.authenticate("user", {session: false}), idValidator , OrdersControlles.deleteOrder , handleError)

// duplicate
router.post(ApiEndpoints.OrdersEndpoints.duplicate, passport.authenticate("user", {session: false}) , idValidator , OrdersControlles.duplicateOrder , handleError)


// tracking
router.put(ApiEndpoints.OrdersEndpoints.tracking , trackingOrderValidator , HandleValidatorError , OrdersControlles.updateOrderTracking , handleError)

//status
router.put(ApiEndpoints.OrdersEndpoints.status, statusOrderValidator , HandleValidatorError , OrdersControlles.updateOrderStatus , handleError)


module.exports = router
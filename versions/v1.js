const { ApiEndpoints } = require("../common/apiEndpoints")
const { app  } = require("../server")

const users = require("../routers/users")
const file = require("../routers/file")
const products = require("../routers/products")
const orders = require("../routers/orders")
const wishlist = require("../routers/wishlist")
const main = require("../routers/main")
const subscribe = require("../routers/subscribe")
const contact = require("../routers/contact")
 

app.use(ApiEndpoints.UserEndpoints.route, users)
app.use(ApiEndpoints.FileEndpoints.route, file)
app.use(ApiEndpoints.ProductsEndpoints.route, products)
app.use(ApiEndpoints.OrdersEndpoints.route, orders) 
app.use(ApiEndpoints.wishlistEndpoints.route, wishlist)
app.use(ApiEndpoints.MainEndpoints.route, main)
app.use(ApiEndpoints.SubscribeEndpoints.route, subscribe)
app.use(ApiEndpoints.ContactEndpoints.route, contact)

app.use((req, res, next) => {
    res.status(404).json("Api not found") 
})


app.listen(process.env.PORT || 3001 , () => {
    console.log("server start")
})
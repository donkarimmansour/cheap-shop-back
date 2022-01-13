const { ApiEndpoints } = require("../common/apiEndpoints")
const { app } = require("../server")

const doctor = require("../routers/doctor")
const programme = require("../routers/programme")
const appointment = require("../routers/appointment")
const services = require("../routers/services")
const patient = require("../routers/patient")
const file = require("../routers/file")

app.use(ApiEndpoints.ProgrammeEndpoints.route, programme)
app.use(ApiEndpoints.DoctorEndpoints.route , doctor)
app.use(ApiEndpoints.AppointmentEndpoints.route, appointment)
app.use(ApiEndpoints.ServicesEndpoints.route, services)
app.use(ApiEndpoints.UserEndpoints.route, patient)
app.use(ApiEndpoints.FileEndpoints.route, file)

app.use((req, res, next) => {
    res.status(404).json("Api not found")
})

require("dotenv").config()

app.listen(process.env.PORT || 8080, () => {
    console.log("server start")
})
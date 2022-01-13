const ServiceModel = require("../services/services")


// get All Services
const getAllServices = (req, res) => {
    const { sort , limit , skip , filter ,  select , expend , includes } = req.query ;

    ServiceModel.getAllServices( sort , limit , skip , filter ,  select , expend , includes ).then(result => {
        res.status(200).json({"error": "no", "message": result})
    }).catch(result => {
        res.status(401).json({"error": "yes", "message": result})
    })
}


// create Service
const createService = (req, res) => {

    const { name , price } = req.body
    const { id } = req.params

    ServiceModel.createService(id , name , price)
    .then(result => {  res.status(200).json({"error": "no", "message": result})
     }).catch(result => { res.status(401).json({"error": "yes", "message": result})
    })
}


// edit Service
const editService = (req, res) => {

    const { name , price } = req.body
    const { id } = req.params

    ServiceModel.editService( id , name , price)
    .then(result => {  res.status(200).json({"error": "no", "message": result})
     }).catch(result => { res.status(401).json({"error": "yes", "message": result})
    })
}



// delete Service
const deleteService = (req, res) => {

    const { id } = req.params

    ServiceModel.deleteService( id )
    .then(result => {  res.status(200).json({"error": "no", "message": result})
     }).catch(result => { res.status(401).json({"error": "yes", "message": result})
    })
}


// duplicate Service
const duplicateService = (req, res) => {
    const { id } = req.params

    ServiceModel.duplicateService(id)
    .then(result => {  res.status(200).json({"error": "no", "message": result})
     }).catch(result => { res.status(401).json({"error": "yes", "message": result})
    })
  
}


module.exports = {
    getAllServices ,
    createService ,
    editService ,
    deleteService ,
    duplicateService
}

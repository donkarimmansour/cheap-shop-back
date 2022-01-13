const mongoose = require("mongoose")
const   DoctorRquest  = require("../models/doctor")
const   ServiceRquest  = require("../models/services")



// getAllServices
const getAllServices = (sort = '{"updatedAt" : 1}' , limit = 0 , skip = 0 ,
filter = '{"name" : { "$ne": "xxxxx" }}' ,  select = null , expend = null , includes = 'xxxxx') => {

    includes = (includes != "xxxxx") ? {"name" : { $regex : new RegExp( includes , "i") }} : null ;

    return new Promise((resolve, reject) => { 
    
      
            ServiceRquest.find({}, (errFind, Services) => {

                if (errFind) {
                    reject(errFind)
                    return
                }
                
                if (Services.length <= 0) {
                    reject("there are no Services")
                    return
                }

                resolve(Services)
            
     
            })
            .populate(expend)
            .select(select)
            .sort(JSON.parse(sort))
            .limit(parseInt(limit)) 
            .skip(parseInt(skip))
            .setQuery({...JSON.parse(filter) ,  ...includes})
      
           
    
    })
}






// create Service
const createService = ( doctor , name , price) => {
    return new Promise((resolve, reject) => { 

          // check id()
          DoctorRquest.findOne({}, (errFind, user) => {
            if (errFind)
                reject(errFind)

            if (!user) {
                reject("doctor id not exist")

            } else {

                //create
                    ServiceRquest.create({
                        name, price , doctor
                    } , (errCreate, doc) => {
                        if (errCreate){ 
                            reject(errCreate)
                            return
                        }
                
                        resolve("created")
                    })
            }
            }).where("_id").equals(doctor)

    })
}



// update Service
const editService = (id, name , price) => {

    return new Promise((resolve, reject) => { 

          // check id
          ServiceRquest.findOne({}, (errFind, serv) => {
            if (errFind)
                reject(errFind)

            if (!serv) {
                reject("id not exist")

            } else {

                //update

                ServiceRquest.updateOne({}, {
                    name , price , updatedAt: Date.now()
                }, (errUpdate, doc) => {
                    if (errUpdate){ 
                        reject(errUpdate)
                        return
                    }
                    
                    if (doc.modifiedCount > 0) {
                        resolve("modified")

                    } else {
                        reject("something went wrong")
                    }

                }).where("_id").equals(id)

            }//else
        }).where("_id").equals(id)

    })
}

// delete Service
const deleteService = (id, name, price) => {

    return new Promise((resolve, reject) => {

        // check id
        ServiceRquest.findOne({}, (errFind, serv) => {
            if (errFind)
                reject(errFind)

            if (!serv) {
                reject("id not exist")

            } else {
                //delete
                ServiceRquest.deleteOne({}
                    , (errUpdate, doc) => {
                    if (errUpdate) {
                        reject(errUpdate)
                        return
                    }

                    if (doc.deletedCount > 0) {
                        resolve("deleted")

                    } else {
                        reject("something went wrong")
                    }

                }).where("_id").equals(id)
            }//else
        }).where("_id").equals(id)

    })
}




// duplicate Service
const duplicateService = (id) => {

    return new Promise((resolve, reject) => {

        // check id
        ServiceRquest.findOne({}, (errFind, serv) => {
            if (errFind)
                reject(errFind)

            if (!serv) {
                reject("id not exist")

            } else {

                //create
                ServiceRquest.create({
                    name : serv.name , price : serv.price ,
                    doctor : serv.doctor 
                }, (errCreate, doc) => {
                    if (errCreate) {
                        reject(errCreate)
                        return
                    }
        
                    resolve("duplicated")
                })

            }//else
        }).where("_id").equals(id)

    })
}

module.exports = {
    getAllServices,
    editService,
    createService,
    deleteService ,
    duplicateService
}

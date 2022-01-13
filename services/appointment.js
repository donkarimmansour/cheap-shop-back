const   PatientRquest  = require("../models/patient")
const   ProgrammeRquest  = require("../models/programme")
const   AppointmentRquest  = require("../models/appointment")


// getAllAppointments
const getAllAppointments = (sort = '{"updatedAt" : 1}' , limit = 0 , skip = 0 ,
filter = '{"nameClient" : { "$ne": "xxxxx" }}' ,  select = null , expend = null , includes = 'xxxxx') => {

   includes = (includes != "xxxxx") ? {"nameClient" : { $regex : new RegExp( includes , "i") }} : null ;

    return new Promise((resolve, reject) => { 

            AppointmentRquest.find({}, (errFind, Appointments) => {

                if (errFind) {
                    console.log(errFind)
                    reject(errFind)
                    return 
                }
                 
                if (Appointments.length <= 0) {
                    reject("there are no Appointments")
                    return
                }
    
                resolve(Appointments)
 

            })

            .populate(expend)
            .select(select)
            .sort(JSON.parse(sort))
            .limit(parseInt(limit)) 
            .skip(parseInt(skip))
            .setQuery({...JSON.parse(filter) ,  ...includes})
    })
}

 
// get All users
const usersAppointments = (doctor , sort = '{"updatedAt" : 1}' , limit = 1000 , skip = 0 ,
 filter = '{"nameClient" : { "$ne": "xxxxx" }}' ,  select = null , expend = null , includes = 'xxxxx') => {

   includes = (includes != "xxxxx") ? {"nameClient" : { $regex : new RegExp( includes , "i") }} : null ;

    return new Promise((resolve, reject) => { 

         // check id()
         ProgrammeRquest.find({} , (errFind, Programme) => {
            if (errFind)
                reject(errFind)

            if (Programme.length <= 0) {
                reject("Programme id not exist") 

            } else {
     
               
  
                AppointmentRquest.aggregate()
                
                .limit(parseInt(limit)).sort(JSON.parse(sort)).project(select).skip(parseInt(skip))

               .lookup({ from: `${expend||"patient"}s`, localField: `${expend||"patient"}` ,
                 foreignField: "_id", as: `doc`})

                .match({ "programme" : { $in : Programme } , ...JSON.parse(filter) ,  ...includes })
                
                .group({ "_id": `$patient` , "doc": {"$last": "$$ROOT" } })
 
                .exec((errFind, Appointments) => {  
                     
        

                    if (errFind) { 
                        reject(errFind) 
                        return
                    }

                    else if (Appointments.length <= 0) {
                        reject("there are no Appointments")
                        return 
                    }else{
                            resolve(Appointments)

                    }

        
        
                })
                
            }
            }).where("doctor").equals(doctor).distinct("_id")

       
       
            
    })
}



// create Appointments
const createAppointment = ( patient , programme , service , nameClient, desination, type, date, time ) => {
    return new Promise((resolve, reject) => { 
     
          // check id()
          PatientRquest.findOne({}, (errFind, user) => {
            if (errFind)
                reject(errFind)

            if (!user) {
                reject("user id not exist") 

            } else {

                //create
                  AppointmentRquest.create({
                        patient , programme , service , nameClient, desination, type, date, time 
                    } , (errCreate, doc) => {
                        if (errCreate){ 
                            reject(errCreate)
                            return
                        }
                
                        resolve("created")
                    })
            }
            }).where("_id").equals(patient)

    })
}

// edit Appointment
const editAppointment = ( id , nameClient, desination, type, date, time ) => {
    return new Promise((resolve, reject) => { 
     
          // check id()
          AppointmentRquest.findOne({}, (errFind, user) => {
            if (errFind)
                reject(errFind)

            if (!user) {
                reject("Appointment id not exist") 

            } else {

                //create
                  AppointmentRquest.updateOne({} , {
                      nameClient, desination, type, date, time , updatedAt: Date.now()
                    } , (errUpdate, doc) => {
                        if (errUpdate) 
                            reject(errUpdate)
                        
                        if (doc.modifiedCount > 0) {
                            resolve("modified")
            
                        } else {
                            reject("something went wrong")
            
                        }
            
                    }).where("_id").equals(id)
            }
            }).where("_id").equals(id)

    })
}



// activate Appointmen
const activateAppointment = ( id  , isAppointmentActivated ) => {
    return new Promise((resolve, reject) => { 
     
          // check id()
          AppointmentRquest.findOne({}, (errFind, user) => {
            if (errFind)
                reject(errFind)

            if (!user) {
                reject("Appointment id not exist") 

            } else {

                //create
                  AppointmentRquest.updateOne({} , {
                     isAppointmentActivated , updatedAt: Date.now()
                    } , (errUpdate, doc) => {
                        if (errUpdate) 
                            reject(errUpdate)
                        
                        if (doc.modifiedCount > 0) {
                            resolve("modified")
            
                        } else {
                            reject("something went wrong")
            
                        }
            
                    }).where("_id").equals(id)
            }
            }).where("_id").equals(id)

    })
}


module.exports = {
    getAllAppointments ,
    createAppointment ,
    usersAppointments ,
    editAppointment ,
    activateAppointment
}

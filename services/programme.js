const  DoctorRquest= require("../models/doctor")
const  ProgrammeRquest = require("../models/programme")


// getAllProgrammes
const getAllProgrammes = (sort = '{"updatedAt" : 1}' , limit = 0 , skip = 0 ,
filter = '{"name" : { "$ne": "xxxxx" }}' ,  select = null , expend = null , includes = 'xxxxx') => {

    includes = (includes != "xxxxx") ? {"name" : { $regex : new RegExp( includes , "i") }} : null ;

    return new Promise((resolve, reject) => {

        ProgrammeRquest.find({}, (errFind, Programmes) => {

            if (errFind) {
                reject(errFind)
                return
            }

            if (Programmes.length <= 0) {
                reject("there are no Programmes")
                return
            }

            resolve(Programmes)

        })
        .populate(expend)
        .select(select)
        .sort(JSON.parse(sort))
        .limit(parseInt(limit)) 
        .skip(parseInt(skip))
        .setQuery({...JSON.parse(filter) ,  ...includes})

    })
}




// create Programme
const createProgramme = (doctor , name, date, capacity, horaire) => {
    return new Promise((resolve, reject) => {

        // check id()
        DoctorRquest.findOne({}, (errFind, user) => {
            if (errFind)
                reject(errFind)

            if (!user) {
                reject("doctor id not exist")

            } else {

                //create

                    ProgrammeRquest.create({
                        name, capacity, date, horaire, doctor
                    }, (errCreate, doc) => {
                        if (errCreate) {
                            reject(errCreate)
                            return
                        }

                        resolve("created")
                    })
                }

            }).where("_id").equals(doctor)



    })
}


// update Programme
const editProgramme = (id, date, capacity, horaire) => {

    return new Promise((resolve, reject) => {

        // check id
        ProgrammeRquest.findOne({}, (errFind, prog) => {
            if (errFind)
                reject(errFind)

            if (!prog) {
                reject("id not exist")

            } else {

                //update

                ProgrammeRquest.updateOne({}, {
                    capacity, date, horaire , updatedAt: Date.now()
                }, (errUpdate, doc) => {
                    if (errUpdate) {
                        reject(errUpdate)
                        return
                    }
                    // with doc
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

// duplicate Programme
const duplicateProgramme = (id) => {

    return new Promise((resolve, reject) => {

        // check id
        ProgrammeRquest.findOne({}, (errFind, prog) => {
            if (errFind)
                reject(errFind)

            if (!prog) {
                reject("id not exist")

            } else {
     
                //create
                ProgrammeRquest.create({
                    name : prog.name , capacity : prog.capacity ,
                    date : prog.date , horaire  : prog.horaire ,
                    doctor : prog.doctor , date :  new Date().setDate(prog.date.getDate() + 1)
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
    getAllProgrammes,
    editProgramme,
    createProgramme,
    duplicateProgramme
}

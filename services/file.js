const fs = require("fs")
const fileRquest = require("../models/file")


//create Single Image
const createSingleImage = (imageUrl) => {

    return new Promise((resolve, reject) => {

            fileRquest.create({
               imageUrl
            }, (errCreate, doc) => {
                if (errCreate) {

                    if (fs.existsSync("./public/images/" + imageUrl)) {
                         fs.unlink("./public/images/" + imageUrl, () => { })
                    }

                    reject(errCreate)
                    return
                }

                resolve(doc["_id"])
            })
                
    })
}



//get Single Image
const getSingleImage = (id) => {
    return new Promise((resolve, reject) => {

        // check id()
        fileRquest.findOne({}, (errFind, file) => {
            if (errFind)
                reject(errFind)

            if (!file) {
                reject("file id not exist")

            } else {
               resolve(file.imageUrl)
            }
            }).where("_id").equals(id)
                
    })
}

module.exports = {
    createSingleImage ,
    getSingleImage ,
}

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


//create Multiple Images

const createMultipleImages = (imagesUrl) => {

    return new Promise((resolve, reject) => {

            fileRquest.create({
               imagesUrl , type : "array"
            }, (errCreate, doc) => {
                if (errCreate) {
                       
                    imagesUrl.forEach(img => {
                        if (fs.existsSync("./public/images/" + img)) {
                         fs.unlink("./public/images/" + img, () => { })
                        }
                    });

                    reject(errCreate)
                    return
                }

                resolve(doc["_id"])
            })
                
    })
}


module.exports = {
    createSingleImage ,
    createMultipleImages
 }

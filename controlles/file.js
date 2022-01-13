const fileModel = require("../services/file")
const fs = require("fs")


//create Single Image
const createSingleImage = (req, res) => {
    const { filename } = req.file

    fileModel.createSingleImage(filename)
    .then(result => {  res.status(200).json({"error": "no", "message": result})
     }).catch(result => { res.status(401).json({"error": "yes", "message": result})
    })
}

//get Single Image View
const getSingleImageView = (req, res) => {
    const { id } = req.params

  
    fileModel.getSingleImage(id)
    .then(imageUrl => { 

          fs.readFile(`public/images/${imageUrl}`, function(err, data) {
            if (err) res.status(401).json({"error": "yes", "message": "There was an error fetching your image"}) ;
            else {
              res.writeHead(200, {'Content-Type': 'image/jpeg'});
              res.end(data); 
            }
          });

     }).catch(result => { res.status(401).json({"error": "yes", "message": result})}) 

}

//get Single Image Download
const getSingleImageDownload = (req, res) => {
    const { id } = req.params

    fileModel.getSingleImage(id)
    .then(imageUrl => { 

              res.download(`public/images/${imageUrl}`, err => {
                if (err) {
                    res.status(401).json({"error": "yes", "message": "There was an error fetching your image"}) ;
                }
              })

     }).catch(result => { res.status(401).json({"error": "yes", "message": result})}) 

}

module.exports = {
    createSingleImage ,
    getSingleImageDownload ,
    getSingleImageView ,
}

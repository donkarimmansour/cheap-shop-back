const fileModel = require("../services/file")
const fs = require("fs")
const sharp = require("sharp")
const codes = require("../common/codes")

//create Single Image
const createSingleImage = (req, res) => {


    const { filename , path } = req.file
     const { size } = req.body
 
  //resize
  sharp(path).resize({ width: parseInt(size) , height: parseInt(size) })
  //.png({ quality: 80 })
    .toBuffer().then(buffer => {
      //re write
      fs.writeFile(path, buffer, err => {
        if (err) res.status(codes.badRequest).json({ err: true, msg: err })

        fileModel.createSingleImage(filename)
          .then(result => {

            res.status(codes.ok).json({ err: false , msg : result })

          }).catch(erri => res.status(codes.badRequest).json({ err: true, msg: erri }))

      })

    }).catch(err => res.status(codes.badRequest).json({ err: true, msg: err }))

}

//create Multiple Images 
const createMultipleImages = (req, res) => {
  const images = []

  req.files.map((img, i) => {

    //resize
    sharp(img.path).resize({ width: size, height: size })
   // .png({ quality: 80 })
      .toBuffer().then(buffer => {
        //re write
        fs.writeFile(img.path, buffer, err => {
          if (err) res.status(codes.badRequest).json({ err: true, msg: err })

          //add to array
          images.push(img.filename)
          console.log();

          //check if last one
          if (i == (req.files.length - 1)) {
            fileModel.createMultipleImages(images)
              .then(result => {

                res.status(codes.ok).json({ err: false, msg: result })

              }).catch(erri => res.status(codes.badRequest).json({ err: true, msg: erri }))

          }

        })

      }).catch(err => res.status(codes.badRequest).json({ err: true, msg: err }))


  })

}


//get Single Image View
const getSingleImageView = (req, res) => {
    const { id } = req.params

          fs.readFile(`public/images/${id}`, function(err, data) {
            if (err)  res.status(codes.badRequest).json({ err: true, msg: err })
            else {
              res.writeHead(200, {'Content-Type': 'image/jpeg'});
              res.end(data); 
            }
          });


}



//get Single Image Download
const getSingleImageDownload = (req, res) => {
  const { id } = req.params

  res.download(`public/images/${id}`, err => {
    if (err) {
      res.status(codes.badRequest).json({ err: true, msg: "The re was an error fetching your image" })
    }
  })

}



module.exports = {
    createSingleImage ,
    getSingleImageDownload ,
    getSingleImageView ,
    createMultipleImages
}

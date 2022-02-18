const WishlistsRquest = require("../models/wishlist")



// getAllWishlists
const getAllWishlists = (sort = '{"updatedAt" : 1}', limit = 0 , skip = 0, filter = '{"name" : { "$ne": "xxxlxxx" }}', select = null , expend = null) => {
    return new Promise((resolve, reject) => {

        const newExpend = 
        (expend == "userId") ? {path : "userId" , model : "user"} : 
        (expend == "productId") ?
        {path : "productId" , model : "product" ,  populate:{ path: 'images' ,model: 'file'}} : 
         expend
         
        WishlistsRquest.find({}, (errFind, Wishlists) => {

            if (errFind) {console.log(errFind);
                reject(errFind)
                return
            }

            if (Wishlists.length <= 0) {
                reject("there are no Wishlists")
                return
            }

            resolve(Wishlists)


        })
            .populate(newExpend)
            .select(select)
            .sort(JSON.parse(sort))
            .limit(parseInt(limit))
            .skip(parseInt(skip))
            .setQuery({ ...JSON.parse(filter) })



    })
}






// create Wishlist
const createWishlist = (userId , productId) => {
    return new Promise((resolve, reject) => {
        //create
        WishlistsRquest.create({
            userId , productId ,
        }, (errCreate, doc) => {
            if (errCreate) {
                reject(errCreate)
                return
            }

             resolve(doc.populate("productId"))
        })

    })
}



// delete Wishlist
const deleteWishlist = (id) => {

    return new Promise((resolve, reject) => {

        // check id
        WishlistsRquest.findOne({}, (errFind, fvrt) => {
            if (errFind)
                reject(errFind)

            if (!fvrt) {
                reject("id not exist")

            } else {
                //delete
                WishlistsRquest.deleteOne({}
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



module.exports = {
    getAllWishlists, deleteWishlist,  createWishlist,
}

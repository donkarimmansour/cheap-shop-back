const ProductsRquest = require("../models/products")



// getAllProducts
const getAllProducts = (sort = '{"updatedAt" : 1}', limit = 0 , skip = 0, filter = '{"name" : { "$ne": "xxxlxxx" }}', select = null) => {
    return new Promise((resolve, reject) => {

        ProductsRquest.find({}, (errFind, Products) => {

            if (errFind) {
                reject(errFind)
                return
            }

            if (Products.length <= 0) {
                reject("there are no Products")
                return
            }

            resolve(Products)


        })
            .populate("images")
            .select(select)
            .sort(JSON.parse(sort))
            .limit(parseInt(limit))
            .skip(parseInt(skip))
            .setQuery({ ...JSON.parse(filter) })



    })
}





// getAllProducts tab area
const getAllProductsTab = (sort = '{"updatedAt" : 1}', limit = 10000000 , skip = 0, filter = '{"name" : { "$ne": "xxxlxxx" }}', select = null) => {
    
    return new Promise((resolve, reject) => {


        ProductsRquest.aggregate([
            { $match: { ...JSON.parse(filter) } },
            { $lookup: { from: `files`, localField: `images`, foreignField: "_id", as: `images` } },
            { $unwind: "$images" },
            { $group: { "_id": `$$ROOT.category`, "products": { "$push": { "product": "$$ROOT" } } } },
            { $project: { products: { $slice: ["$products", parseInt(limit)] } } },
            { $skip: parseInt(skip) },
            { $sort: JSON.parse(sort) },

        ]).exec((errFind, Products) => {  

                    if (errFind) {
                        reject(errFind)
                        return
                    }
        
                    if (Products.length <= 0) {
                        reject("there are no Products")
                        return
                    }
        
                    resolve(Products)
        
        
         })
    
    

    })
}



// getAll Distinct
const getAllDistinct = (distinct) => {
    
     return new Promise((resolve, reject) => {

            ProductsRquest.find({}, (errFind, Products) => {
    
                if (errFind) {
                    reject(errFind)
                    return
                }
    
                if (Products.length <= 0) {
                    reject("there are no Categories")
                    return
                }
    
                resolve(Products)
    
    
            }).distinct(distinct)
    

    })
}



// create Product
const createProduct = (name, description, stock, oldprice, price, condition, status, limitedAtt, color, size, review, images, viewcount, soldcount, category , info) => {
    return new Promise((resolve, reject) => {

        //create
        ProductsRquest.create({
            name, description, stock, oldprice, price, condition, status, limitedAtt, color, size, review, images, viewcount, soldcount, category ,info
        }, (errCreate, doc) => {
            if (errCreate) {
                reject(errCreate)
                return
            }

            resolve("created")
        })

    })
}


// get Products Count
const getProductsCount = (filter) => {

    return new Promise((resolve, reject) => {

        ProductsRquest.find({}, (errFind, Products) => {

            if (errFind) {
                reject(errFind)
                return
            }

            if (Products.length <= 0) {
                reject("there are no Products")
                return
            }

            resolve(Products)
 

        }).count({ ...JSON.parse(filter) })

    })
}


// update Product
const editProduct = (id, name, description, stock, oldprice, price, condition, status, limitedAtt, color, size, review, images, viewcount, soldcount, info) => {

    return new Promise((resolve, reject) => {

        // check id
        ProductsRquest.findOne({}, (errFind, prdct) => {
            if (errFind)
                reject(errFind)

            if (!prdct) {
                reject("id not exist")

            } else {

                //update

                ProductsRquest.updateOne({}, {
                    name, description, stock, oldprice, price, condition, status, limitedAtt, color, size, review, images, viewcount, soldcount, info
                    , updatedAt: Date.now()
                }, (errUpdate, doc) => {
                    if (errUpdate) {
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

// review Product
const reviewProduct = (id, iduser, feedback, rate) => {

    return new Promise((resolve, reject) => {

        // check id
        ProductsRquest.findOne({}, (errFind, prdct) => {
            if (errFind)
                reject(errFind)

            if (!prdct) {
                reject("id not exist")

            } else {

                //update

                let reviews = prdct.reviews;
                const index = prdct.reviews.findIndex(review => review.id == iduser);

                if (index > -1) {
                    reviews[index].id = iduser
                    reviews[index].feedback = feedback
                    reviews[index].rate = rate
                } else {
                    reviews.push({ id: iduser, feedback, rate })
                }


                ProductsRquest.updateOne({}, {
                    reviews, updatedAt: Date.now()
                }, (errUpdate, doc) => {
                    if (errUpdate) {
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

// delete Product
const deleteProduct = (id) => {

    return new Promise((resolve, reject) => {

        // check id
        ProductsRquest.findOne({}, (errFind, prdct) => {
            if (errFind)
                reject(errFind)

            if (!prdct) {
                reject("id not exist")

            } else {
                //delete
                ProductsRquest.deleteOne({}
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




// duplicate Product
const duplicateProduct = (id) => {

    return new Promise((resolve, reject) => {

        // check id
        ProductsRquest.findOne({}, (errFind, prdct) => {
            if (errFind)
                reject(errFind)

            if (!prdct) {
                reject("id not exist")

            } else {

                if(delete prdct._doc._id){
          

                    ProductsRquest.create({...prdct._doc , updatedAt: Date.now() , createdAt : Date.now() }, (errCreate, doc) => {
                        if (errCreate) {
                            reject(errCreate)
                            return
                        }

                        resolve("duplicated")
                    })

                }else{
                    reject("something went wrong")

                }
                

            }//else
        }).where("_id").equals(id)
 
    })
}


// update Views
const updateViews = (id , type) => {

    return new Promise((resolve, reject) => {

        // check id
        ProductsRquest.findOne({}, (errFind, prdct) => {
            if (errFind)
                reject(errFind)

            if (!prdct) {
                reject("id not exist")

            } else {

        
                //update
                ProductsRquest.updateOne({}, {
                     viewcount : type == "view" ? prdct._doc.viewcount + 1 : prdct._doc.viewcount,
                     soldcount : type == "sold" ? prdct._doc.soldcount + 1 : prdct._doc.soldcount,
                     updatedAt: Date.now()
                }, (errUpdate, doc) => { 
                    if (errUpdate) {
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

module.exports = {
    getAllProducts, deleteProduct, editProduct, createProduct,
     duplicateProduct, reviewProduct , getAllProductsTab
     ,getAllDistinct ,getProductsCount , updateViews
}

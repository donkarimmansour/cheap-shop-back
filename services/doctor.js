const messages = require("../common/messages")
const mailer = require("../common/mailer")
const JWt = require("jsonwebtoken")
const DoctorRquest = require("../models/doctor")

// getAllDoctors
const getAllDoctors = (sort = '{"updatedAt" : 1}' , limit = 0 , skip = 0 ,
 filter = '{"firstname" : { "$ne": "xxxxx" }}' ,  select = null ) => {

    return new Promise((resolve, reject) => { 
            DoctorRquest.find({}, (errFind, Doctors) => {

                if (errFind) {
                    reject(errFind)
                    return
                }

                if (Doctors.length <= 0) {
                    reject("there are no Doctors")
                    return
                }
    
                resolve(Doctors)
            
    
            })
            
           .select(select)
           .sort(JSON.parse(sort))
           .limit(parseInt(limit))
           .skip(parseInt(skip))
           .setQuery({...JSON.parse(filter)})
 
               
    })
}






// signup
const signup = (firstname , lastname ,email  , phone, cin) => {

    return new Promise((resolve, reject) => { // check email
        DoctorRquest.findOne({}, (errFind, user) => {

            if (errFind) 
                reject(errFind)
               
            if (user) {
                reject("the email already exists")
                return
            }

            const password = (Math.random() + 1).toString(36).substring(4);

            // inser a new user
            DoctorRquest.create({
                firstname , lastname ,email , password , phone, cin ,
                password: new DoctorRquest().hashPassword(password),
                
            }, (errInsert, res) => {
                if (errInsert){ 
                    reject(errInsert)
                return
            }

                
                 //get new pass
                 const html = messages.resetPasswordMsg(password)

                  // send new pass
                  mailer.sendMAIL(process.env.SMTP_SENDER_NAME , process.env.SMTP_SENDER_EMAIL, res.email, "new Password", html)
                  .then((succ) => resolve("Sent password"))
                  .catch(error => reject(error))

            })

        }).where("email").equals(email)
    })
}


// login
const login = (email, password) => {

    return new Promise((resolve, reject) => { // check details
        DoctorRquest.findOne({}, (errFind, user) => {
            if (errFind){ 
                reject(errFind)
            return }
            
            if (!user || !user.comparePassword(password)) {
                reject("email or password is incorrect")
           
            }else {
                if(user.isAccountSuspended){ 
                    reject("your account is suspended")

                }
                else if(!user.isLoginActivated){ 
                    reject("your account is not activated yet")

                }else{
                    const TOKEN = JWt.sign({
                        user , role : "admin"
                    }, process.env.KEY, {expiresIn: "3d"})
                    resolve(TOKEN)
                }
               
            }

        }).where("email").equals(email)

    })
}





// edit Doctor
const editDoctor = (id ,firstname , lastname , email  , phone , address ,
    country , city , postal , experience , deplome , presentation ,
    type , social , contact_Secrutere , specialite , banque ,
    name_cabinet , patente ,RCI ,RIB , Ice ,form_juridique) => {
    return new Promise((resolve, reject) => { // update user
       // check id
        DoctorRquest.findOne({}, (errFind, user) => {
            if (errFind) 
                reject(errFind)
            
            if (!user) {
                reject("id not exist")

            } else {

                //update

                DoctorRquest.updateOne({}, {
                    firstname , lastname , email , phone , address ,
                    country , city , postal , experience , deplome , presentation ,
                    type , social , contact_Secrutere , specialite , banque ,
                    name_cabinet , patente ,RCI ,RIB , Ice ,form_juridique  ,updatedAt: Date.now()

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
               
            }

        }).where("_id").equals(id)



    })
}




// reset Password Doctor
const resetPasswordDoctor = (id , oldpassword , password) => {
    return new Promise((resolve, reject) => { // update user
       // check id
        DoctorRquest.findOne({}, (errFind, user) => {
            if (errFind) 
                reject(errFind)
            
            if (!user) {
                reject("id not exist")

            } else {

                //update
              

                if(!user.comparePassword(oldpassword)){
                    reject("old password is incorrect")

                }else{

                    DoctorRquest.updateOne({}, {
                        password: new DoctorRquest().hashPassword(password),
                        updatedAt: Date.now()
                    }, (errUpdate, doc) => {
                        if (errUpdate) 
                            reject(errUpdate)
                        
                        if (doc.modifiedCount > 0) {

                           resolve("modified")
            
                        } else {
                            reject("something went wrong")
            
                        }
            
                    }).where("_id").equals(id)
                }

               
            }

        }).where("_id").equals(id)



    })
}


// forgot Password Doctor
const forgotPasswordDoctor = (email) => {
    return new Promise((resolve, reject) => { // update user
       // check id
        DoctorRquest.findOne({}, (errFind, user) => {
            if (errFind) 
                reject(errFind)
            
            if (!user) {
                reject("email not exist")

            } else {

                //update
                   const password = (Math.random() + 1).toString(36).substring(4);;

                    DoctorRquest.updateOne({}, {
                        password: new DoctorRquest().hashPassword(password),
                        updatedAt: Date.now()
                    }, (errUpdate, doc) => {
                        if (errUpdate) 
                            reject(errUpdate)
                        
                        if (doc.modifiedCount > 0) {

                           //get new pass
                           const html = messages.resetPasswordMsg(password)

                           // send new pass
                           mailer.sendMAIL(process.env.SMTP_SENDER_NAME , process.env.SMTP_SENDER_EMAIL, email, "new Password", html)
                           .then((succ) => resolve("new Sent password"))
                           .catch(error => reject(error))
            
                        } else {
                            reject("something went wrong")
            
                        }
            
                    }).where("email").equals(email)
                }


        }).where("email").equals(email)



    })
}




// Login Activated
const LoginActivated = (id , isLoginActivated) => {
    return new Promise((resolve, reject) => { // update user
       // check id
        DoctorRquest.findOne({}, (errFind, user) => {
            if (errFind) 
                reject(errFind)
            
            if (!user) {
                reject("id not exist")

            } else {

                //update

        
                    DoctorRquest.updateOne({}, {
                        isLoginActivated,
                        updatedAt: Date.now()
                    }, (errUpdate, doc) => {
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


// activate the account
const Activate = (id , isAccountActivated) => {
    return new Promise((resolve, reject) => { // update user
       // check id
        DoctorRquest.findOne({}, (errFind, user) => {
            if (errFind) 
                reject(errFind)
            
            if (!user) {
                reject("id not exist")

            } else {

                //update

        
                    DoctorRquest.updateOne({}, {
                        isAccountActivated,
                        updatedAt: Date.now()
                    }, (errUpdate, doc) => {
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



// Suspension the account
const Suspension = (id , isAccountSuspended) => {
    return new Promise((resolve, reject) => { // update user
       // check id
        DoctorRquest.findOne({}, (errFind, user) => {
            if (errFind) 
                reject(errFind)
            
            if (!user) {
                reject("id not exist")

            } else {

                //update

        
                    DoctorRquest.updateOne({}, {
                        isAccountSuspended,
                        updatedAt: Date.now()
                    }, (errUpdate, doc) => {
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
    getAllDoctors,
     login ,
     signup ,
     resetPasswordDoctor ,
     editDoctor , 
     LoginActivated ,
     forgotPasswordDoctor ,
     Activate , Suspension 
    }
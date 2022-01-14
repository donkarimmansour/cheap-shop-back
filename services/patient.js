const mongoose = require("mongoose")
const messages = require("../common/messages")
const mailer = require("../common/mailer")
const JWt = require("jsonwebtoken")
const PatientRquest = require("../models/patient")

// getAllPatients
const getAllPatients = (sort = '{"updatedAt" : 1}' , limit = 0 , skip = 0 , filter = '{"firstname" : { "$eq": "Ronni" }}' ,  select = null ) => {

    return new Promise((resolve, reject) => { 
  
            PatientRquest.find({}, (errFind, Patients) => {

                if (errFind) {
                    reject(errFind)
                    return
                }
                // console.log(Patients.length)
                // console.log({...JSON.parse(filter)})

                if (Patients.length <= 0) {
                    reject("there are no users")
                    return
                }
    
                resolve(Patients)
            
    
            })
            .select(select)
           .sort(JSON.parse(sort))
           .limit(parseInt(limit))
           .skip(parseInt(skip))
           .setQuery({...JSON.parse(filter)})
 
    
           
       
    })
}






// signup
const signup = (firstname , lastname ,email , password , phone, cin) => {

    return new Promise((resolve, reject) => { // check email
        PatientRquest.findOne({}, (errFind, user) => {

            if (errFind) 
                reject(errFind)
               
            if (user) {
                reject("the email already exists")
                return
            }

            // inser a new user
            PatientRquest.create({
                firstname , lastname ,email , password , phone, cin ,
                password: new PatientRquest().hashPassword(password),
                
            }, (errInsert, res) => {
                if (errInsert){ 
                    reject(errInsert)
                return
            }

                
                 //get confim Email Msg
                 const html = messages.confimEmailMsg(res._id)

                // send Email Verification
                 mailer.sendMAIL(process.env.SMTP_SENDER_NAME , process.env.SMTP_SENDER_EMAIL, res.email, "Verify Email", html)
                 .then((succ) => resolve("Confirm your email"))
                 .catch(error => reject(error))


            })

        }).where("email").equals(email)
    })
}


// login
const login = (email, password) => {

    return new Promise((resolve, reject) => { // check details
        PatientRquest.findOne({}, (errFind, user) => {
            if (errFind){ 
                reject(errFind)
            return }
            
            if (!user || !user.comparePassword(password)) {
                reject("email or password is incorrect")
           
            }else {
                if(user.isAccountSuspended){ 
                    reject("your account is suspended")

                }
               else if(!user.isEmailVerified){ 
                 //get confim Email Msg
                 const html = messages.confimEmailMsg(user._id)

                 // send Email Verification
                  mailer.sendMAIL(process.env.SMTP_SENDER_NAME , process.env.SMTP_SENDER_EMAIL , user.email, "Verify Email", html)
                  .then((succ) => resolve("re Confirm your email"))
                  .catch(error => reject(error))


                }else{
                    const TOKEN = JWt.sign({
                        user , role : "user"
                    }, process.env.KEY, {expiresIn: "3d"})
                    resolve(TOKEN)
                }
               
            }

        }).where("email").equals(email)

    })
}





// edit Patient
const editPatient = (id ,firstname , lastname ,email , phone, cin) => {
    return new Promise((resolve, reject) => { // update user
       // check id
        PatientRquest.findOne({}, (errFind, user) => {
            if (errFind) 
                reject(errFind)
            
            if (!user) {
                reject("id not exist")

            } else {

                //update

                PatientRquest.updateOne({}, {
                    firstname , lastname ,email , password , phone, cin ,
                    updatedAt: Date.now()
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




// reset Password Patient
const resetPasswordPatient = (id , oldpassword , password) => {
    return new Promise((resolve, reject) => { // update user
       // check id
        PatientRquest.findOne({}, (errFind, user) => {
            if (errFind) 
                reject(errFind)
            
            if (!user) {
                reject("id not exist")

            } else {

                //update

                if(!user.comparePassword(oldpassword)){
                    reject("old password is incorrect")

                }else{

                    PatientRquest.updateOne({}, {
                        password: new PatientRquest().hashPassword(password),
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


// forgot Password Patient
const forgotPasswordPatient = (email) => {
    return new Promise((resolve, reject) => { // update user
       // check id
        PatientRquest.findOne({}, (errFind, user) => {
            if (errFind) 
                reject(errFind)
            
            if (!user) {
                reject("email not exist")

            } else {

                //update
                   const password = (Math.random() + 1).toString(36).substring(4);;

                    PatientRquest.updateOne({}, {
                        password: new PatientRquest().hashPassword(password),
                        updatedAt: Date.now()
                    }, (errUpdate, doc) => {
                        if (errUpdate) 
                            reject(errUpdate)
                        
                        if (doc.modifiedCount > 0) {

                           //get confim Email Msg
                           const html = messages.resetPasswordMsg(password)

                           // send Email Verification
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



// confirm email Patient
const confirmEmailPatient = (id) => {
    return new Promise((resolve, reject) => { // update user
       // check id
        PatientRquest.findOne({}, (errFind, user) => {
            if (errFind) 
                reject(errFind)
            
            if (!user) {
                reject("id not exist")

            } else {

                //update

        
                    PatientRquest.updateOne({}, {
                        isEmailVerified : true,
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



// Account Suspension
const Suspension = (id , isAccountSuspended) => {
    return new Promise((resolve, reject) => { // update user
       // check id
        PatientRquest.findOne({}, (errFind, user) => {
            if (errFind) 
                reject(errFind)
            
            if (!user) {
                reject("id not exist")

            } else {

                //update

        
                    PatientRquest.updateOne({}, {
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
    getAllPatients,
     login ,
     signup ,
     resetPasswordPatient ,
     confirmEmailPatient ,
     editPatient , 
     Suspension ,
     forgotPasswordPatient ,
     PatientRquest
}
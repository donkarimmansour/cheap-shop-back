const ProgrammeModel = require("../services/programme")


// get All Programmes
const getAllProgrammes = (req, res) => {
    const { sort , limit , skip , filter ,  select , expend , includes } = req.query ;

    ProgrammeModel.getAllProgrammes(sort , limit , skip , filter ,  select , expend , includes).then(result => {
        res.status(200).json({"error": "no", "message": result})
    }).catch(result => {
        res.status(401).json({"error": "yes", "message": result})
    })
}


// create Programme 
const createProgramme = (req, res) => {

    const { name , date , capacity , horaire} = req.body
    const { id } = req.params

    ProgrammeModel.createProgramme(id , name , date , capacity , horaire)
    .then(result => {  res.status(200).json({"error": "no", "message": result})
     }).catch(result => { res.status(401).json({"error": "yes", "message": result})
    })
}


// edit Programme
const editProgramme = (req, res) => {

    const { date , capacity , horaire} = req.body
    const { id } = req.params

    ProgrammeModel.editProgramme(id , date , capacity , horaire)
    .then(result => {  res.status(200).json({"error": "no", "message": result})
     }).catch(result => { res.status(401).json({"error": "yes", "message": result})
    })
}

// duplicate Programme
const duplicateProgramme = (req, res) => {
    const { id } = req.params

    ProgrammeModel.duplicateProgramme(id)
    .then(result => {  res.status(200).json({"error": "no", "message": result})
     }).catch(result => { res.status(401).json({"error": "yes", "message": result})
    })
  
}


module.exports = {
    getAllProgrammes,
    editProgramme,
    createProgramme,
    duplicateProgramme
}

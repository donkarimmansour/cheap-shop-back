//params Validator
function idValidator(req, res, next) {
    const { id } = req.params

    if (id == "" || id == null) {
        res.status(401).json({"error": "yes", "message":"id not exist"})
        return
    }

    next()
}

module.exports = {
    idValidator
}

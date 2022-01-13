const {validationResult} = require("express-validator")

//handle Validation
function handleValidation(req, res, next) {
    const errors = validationResult(req).array().map(err => err.msg)

    if (errors.length > 0) {
        res.status(401).json({"error": "yes", "message": errors})
        return
    }

    next()
}

module.exports = {
    handleValidation 
}

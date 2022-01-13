//handle Error
function handleError(err, req, res, next) {
    res.status(401).json({"error": "yes", "message": err.message})
}

module.exports = {
    handleError
}

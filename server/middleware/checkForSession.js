
module.exports =  function (req, res, next) {
    if (!req.session.user) {
        return res.sendStatus(409)
    } else {
        next()
    }
}

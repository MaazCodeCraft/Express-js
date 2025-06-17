function log (req, res, next){
    console.log('Authenticating......'); // req.body
    next();
}

module.exports = log;
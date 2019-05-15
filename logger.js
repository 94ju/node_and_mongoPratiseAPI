function log(req,res,next){
    console.log('loading...');
    next();
}

module.exports = log;
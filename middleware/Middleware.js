const logger = (req, res, next ) => {

    console.log(`Method: ${req.method}`);

    console.log(`URL: ${req.url}`);

    console.log(`Timing ${new Date().toLocaleTimeString()}`);
    
    next();
};

module.exports = logger;
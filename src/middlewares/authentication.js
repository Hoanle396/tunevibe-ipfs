module.exports = {
  authentication: function (req, res, next) { 
    if (!req?. headers?.authorization) {
      return res.status(401).json({ status:401, message:"Missing API_KEY in Authorization" })
    }
    if (req?.headers?.authorization == process.env.API_KEY) {
     return next();
    }
    res.status(401).json({ status:401, message:"Your API_KEY is not Unauthorized" })
  }
}
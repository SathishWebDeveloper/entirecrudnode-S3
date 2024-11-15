
const createError = require("http-errors");



const uniqueImageUpload =  async (req,res,next) => {
    try{
      console.log('132',req.body )
      console.log('file sysytem',req.file )
      res.send("image upload success")
    }
    catch (err){
        next(createError(500, "Login error"));
    }
}

module.exports = {
    uniqueImageUpload
}
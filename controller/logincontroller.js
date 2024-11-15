const createError = require("http-errors");
const Register = require("../modal/registermodal");
const bcrypt = require('bcrypt');

const authLoginVerify = async (req,res,next) => {
    try {
        const { email, password } = req.body;
    
        // Check if user exists
        const user = await Register.findOne({ email: email });
        if (!user) {
          return next(createError(404, "User not found"));
        }
    
        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return next(createError(401, "Invalid email or password"));
        }
    
        res.status(200).json({ message: "Login successful", user });
      } catch (err) {
        next(createError(500, "Login error"));
      }
}

module.exports = {
    authLoginVerify
}
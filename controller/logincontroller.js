const createError = require("http-errors");
const Register = require("../modal/registermodal");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();


let refreshTokens = []; // Store valid refresh tokens

// Generate tokens
 function generateAccessToken(user) {
  console.log("execute", user);
  
  return jwt.sign({user}, process.env.ACCESS_TOKEN, { expiresIn: '5m' }); // Access token expires in 15 minutes
}

function generateRefreshToken(user) {
  const refreshToken = jwt.sign({user}, process.env.REFRESH_TOKEN, { expiresIn: '7d' }); // Refresh token expires in 7 days
  refreshTokens.push(refreshToken);
  return refreshToken;
}


//token create area and send that token into the authLoginVerify 
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

        // const accessToken = jwt.sign(email, process.env.ACCESS_TOKEN);
        // console.log("accesstoken" , accessToken);

        // const user = { name: username };
        const accessToken =  generateAccessToken(email);
        const refreshToken =  generateRefreshToken(email);
      
        res.cookie('refreshToken', refreshToken, {
          httpOnly: true,
          secure: false, // Set to true in production
          sameSite: 'strict',
        });

        console.log("access", accessToken);
        console.log("refresh", refreshToken);

        res.status(200).json({ accessToken, user });
      } catch (err) {
        next(createError(500, "Login error"));
      }
}

const getSpecificLoginUserList = async (req, res, next) => {
  try {
    // const urlId = req.params.id;

    // const getUserData = await Register.findOne({ _id: urlId });
    // if (!getUserData) {
    //   return next(createError(404, "user not found"));
    //   // return res.status(404).json({ message: 'User not found' });
    // }
    // console.log('getUserData', getUserData)
    res.status(200).json({ message: "verified successfully" });
  } catch (err) {
    next(createError(500, "Error no user data"));
  }
};

module.exports = {
    authLoginVerify,
    getSpecificLoginUserList
}
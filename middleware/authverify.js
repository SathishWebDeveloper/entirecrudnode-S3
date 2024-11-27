// const jwt = require('jsonwebtoken');
// require('dotenv').config();
// const createError = require("http-errors");

// const authentication = (req,res,next) => {
//     const token = req.headers['authorization'];
//     console.log("auth" ,  req.headers);
//     // const token = authHeader && authHeader.split('')[1];
//     console.log("token", token)
//     if(!token) return next(createError(401, "access token missing , forbidden"))

//         try {
//             const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
//             req.user = decoded; // Attach decoded user info to the request
//             next(); // Proceed to the next middleware/controller
//           } catch (error) {
//             return res.status(403).json({ message: 'Invalid or expired token!' });
//           }

//     // jwt.verify(token,process.env.ACCESS_TOKEN,(err,user) => {
//     //   if(err){
//     //     return next(createError(403, "invalid or expired access token"));
//     //   }
//     //   res.user = user;
//     //   console.log("res", res)
//     //   next();
//     // })
//   }

//   module.exports = {
//     authVerify : authentication
//   }


const jwt = require('jsonwebtoken');
require('dotenv').config();
const createError = require("http-errors");

const authentication = (req, res, next) => {
    console.log("test123")
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1]; // Extract token
  const token = req.headers.authorization.split(' ')[1]; // Extract token
//   console.log("Authorization header:", authHeader);
  console.log("Token--->:", token);

  if (!token) {
    return next(createError(401, "Access token missing, forbidden"));
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
    console.log("decodeediuewhewiufugh", decoded)
    req.user = decoded; // Attach decoded user info to the request
    next(); // Proceed to the next middleware/controller
  } catch (error) {
    console.log("error----->",error)
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired!' });
    }
    return res.status(403).json({ message: 'Invalid token!' });

  }
};

module.exports = {
  authVerify: authentication
};

const Register = require("../modal/registermodal");
const createError = require("http-errors");


const bcrypt = require('bcrypt');
const saltRounds = 10;
// const myPlaintextPassword = 's0/\/\P4$$w0rD';
// const someOtherPlaintextPassword = 'not_bacon';


// const getAlluserList = async (req, res, next) => {
//   try {
//     const allData = await Register.find();
//     if (!allData || allData.length === 0) {
//       return next(createError(404, "user not found"));
//     }
    
//     console.log("data", allData);
//     res.status(200).json({message : "data fetched successfully" , data : allData , totalCount : allData.length})
//   } catch (err) {
//     next(createError(500, "Error no user data api issue"));
//   }
// };

// with pagination setup
const getAlluserList = async (req, res, next) => {
  const no_of_docs_each_page = parseInt(req.query?.count) || 2; // Default: 2 documents per page
  const current_page_number = parseInt(req.query?.page) || 1;  // Default: Page 1
   


  try {
    // Get the total count of documents
    const totalCount = await Register.countDocuments();

    // Get the paginated data
    const allData = await Register.find({})
      .skip(no_of_docs_each_page * (current_page_number - 1))
      .limit(no_of_docs_each_page);

    // Check if no data exists
    if (!allData || allData.length === 0) {
      return next(createError(404, "No users found"));
    }

    // Send paginated data and total count
    res.status(200).json({
      message: "Data fetched successfully",
      data: allData,
      totalCount: totalCount, // Total number of documents in the collection
      currentPage: current_page_number,
      totalPages: Math.ceil(totalCount / no_of_docs_each_page),
    });
  } catch (err) {
    // Handle errors
    next(createError(500, "Error retrieving user data"));
  }
};

const createUserList = async (req, res, next) => {
  try {
    const { name, email, mobile, password } = req.body;

    // Check if email already exists
    const existEmail = await Register.findOne({ email: email });
    if (existEmail) {
      return next(createError(409, `User ${email} is already registered`));
    }

    // Encrypt password using bcrypt
    const encryptedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user with hashed password
    const newUser = new Register({
      name,
      email,
      mobile,
      password: encryptedPassword, // Store the hashed password
    });

    console.log("New User:", newUser);

    // Save the user in the database
    const data = await newUser.save();
    res.status(200).json({ message: "User data created successfully", data });
  } catch (err) {
    next(createError(500, "Error not saving user data"));
  }
};

const getSpecificUserList = async (req, res, next) => {
  try {
    const urlId = req.params.id;

    const getUserData = await Register.findOne({ _id: urlId });
    if (!getUserData) {
      return next(createError(404, "user not found"));
      // return res.status(404).json({ message: 'User not found' });
    }
    // console.log('getUserData', getUserData)
    res.status(200).json({ message: getUserData });
  } catch (err) {
    next(createError(500, "Error no user data"));
  }
};

const putSpecificUserList = async (req, res, next) => {
  try {
    // const { name , email , mobile , password } = req.body
    const urlId = req.params.id;
    console.log("urlId", urlId);
    const userExist = await Register.findOne({ _id: urlId });
    console.log("userExist", userExist);
    if (!userExist) {
      return next(createError(404, "user not found"));
    }
    console.log("test", req.body);
    const result = await Register.findByIdAndUpdate(
      urlId, // Filter by _id
      { $set: req.body }, // Fields to update
      { new: true } // Option to return the updated document
    );
    console.log("final update", result);
    res.status(200).json({ message: "User found", data: req.body });
  } catch (err) {
    next(createError(500, "Error no user data api issue"));
  }
};

const deleteSpecificUserList = async (req, res, next) => {
  try {
    const specificUser = await Register.findOne({ _id: req.params.id });
    if (!specificUser) {
      return next(createError(404, "user not found"));
    }
    const deleteData = await Register.deleteOne({ _id: req.params.id });
    console.log("deleteData", deleteData);
    res.status(200).json({ message: "user deleted succeessfully" });
  } catch (err) {
    next(createError(500, "Error no user data api issue"));
  }
};
module.exports = {
  getAlluserList,
  createUserList,
  getSpecificUserList,
  putSpecificUserList,
  deleteSpecificUserList,
};




/////  optimized way 

// const Register = require("../modal/registermodal");
// const createError = require("http-errors");

// // Utility for sending responses
// const sendResponse = (res, statusCode, message, data = null) => {
//   res.status(statusCode).json({ message, data });
// };

// // Utility for finding user by ID
// const findUserById = async (id, next) => {
//   try {
//     const user = await Register.findById(id);
//     if (!user) {
//       throw createError(404, "User not found");
//     }
//     return user;
//   } catch (err) {
//     return next(err);
//   }
// };

// Get all users
// const getAlluserList = async (req, res, next) => {
//   try {
//     const allData = await Register.find();
//     if (!allData.length) {
//       return next(createError(404, "No users found"));
//     }
//     sendResponse(res, 200, "Data fetched successfully", {
//       users: allData,
//       totalCount: allData.length,
//     });
//   } catch (err) {
//     next(createError(500, "Failed to fetch user data"));
//   }
// };

// // Create a new user
// const createUserList = async (req, res, next) => {
//   try {
//     const { name, email, mobile, password } = req.body;

//     const existEmail = await Register.findOne({ email });
//     if (existEmail) {
//       return next(createError(409, `User with email ${email} is already registered`));
//     }

//     const newUser = new Register({ name, email, mobile, password });
//     const savedUser = await newUser.save();
//     sendResponse(res, 201, "User created successfully", savedUser);
//   } catch (err) {
//     next(createError(500, "Failed to create user"));
//   }
// };

// // Get a specific user
// const getSpecificUserList = async (req, res, next) => {
//   try {
//     const user = await findUserById(req.params.id, next);
//     if (user) {
//       sendResponse(res, 200, "User found", user);
//     }
//   } catch (err) {
//     next(err);
//   }
// };

// // Update a specific user
// const putSpecificUserList = async (req, res, next) => {
//   try {
//     const updatedUser = await Register.findByIdAndUpdate(
//       req.params.id,
//       { $set: req.body },
//       { new: true }
//     );
//     if (!updatedUser) {
//       return next(createError(404, "User not found"));
//     }
//     sendResponse(res, 200, "User updated successfully", updatedUser);
//   } catch (err) {
//     next(createError(500, "Failed to update user"));
//   }
// };

// // Delete a specific user
// const deleteSpecificUserList = async (req, res, next) => {
//   try {
//     const user = await findUserById(req.params.id, next);
//     if (user) {
//       await Register.deleteOne({ _id: req.params.id });
//       sendResponse(res, 200, "User deleted successfully");
//     }
//   } catch (err) {
//     next(err);
//   }
// };

// module.exports = {
//   getAlluserList,
//   createUserList,
//   getSpecificUserList,
//   putSpecificUserList,
//   deleteSpecificUserList,
// };

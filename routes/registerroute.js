const express = require("express");
const router = express.Router();
const registerController = require('../controller/registercontroler');

router.get("/", registerController.getAlluserList)

router.post("/", registerController.createUserList);

router.get("/:id" , registerController.getSpecificUserList)

// router.get("/:id", (req,res)=> {
//     // console.log("req", req.url , req.baseUrl , req.originalUrl , req.query); 
//     // req.url with the query string 
//     // console.log("req", req.path) - without the query string params 
//     res.send("register getby id  created successfully");
// })

router.put("/:id", registerController.putSpecificUserList);

router.delete("/:id",registerController.deleteSpecificUserList);


module.exports = router;
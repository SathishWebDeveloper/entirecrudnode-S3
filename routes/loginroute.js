const express = require('express');
const router = express.Router();
const logincontroller =  require('../controller/logincontroller');
const auth = require('../middleware/authverify')
console.log("224516354")

router.get('/users', auth.authVerify , logincontroller.getSpecificLoginUserList )
router.post('/' , logincontroller.authLoginVerify)

module.exports = router;
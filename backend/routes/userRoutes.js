const express = require('express')
const router = express.Router()
const {register, login, getUserInfo } = require('../controllers/userControllers')
const { authMiddleware } = require('../middleware/authMiddleware')
const { check } = require('express-validator')

// @desc register user 
// @params : post /api/v1/user/register
// @access : public
router.post('/register', 
[ check('email', "Email is not valid")
.isEmail()
.normalizeEmail(),
check('password', "Use at least 6 characters")
.isLength({min: 6})
],register)
router.post('/login', login)
router.get('/userinfo', authMiddleware,getUserInfo)



module.exports = router
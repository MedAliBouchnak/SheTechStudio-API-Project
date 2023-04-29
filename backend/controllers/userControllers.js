const User = require('../models/userSchema')
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken')

// @desc: register new user and return token
// @params : post /api/v1/user/register
// @access : public
const register = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        const {name, email, password, address} = req.body
        const existedUser = await User.findOne({email})
        if (existedUser) res.status(400).json({msg: "user exist, please login"})
        else {
            const hashedPw = await bcrypt.hash(password, 10)
            console.log(hashedPw)

            const newPerson = await User.create({name, email, password: hashedPw, address})
            const token = jwt.sign({id: newPerson._id}, process.env.JWT_SECRET, {expiresIn: '7d'})
            console.log(token)
            res.status(201).json({msg:"user created", token: token, user: newPerson})
        }
    } catch (error) {
        res.status(500).json({msg:"something went wrong!", error: error.message})
    }
}


const login = async (req, res) => {
    try {
        const {email, password} =req.body
        const exitedUser= await User.findOne({email})
        if (!exitedUser) res.status(400).json({msg: "user does not exist, please register"})
        else {
            const checkPw = await bcrypt.compare(password, exitedUser.password)
            if (!checkPw) res.status(400).json({msg: "password does not match please try again"})
            const token = jwt.sign({id: exitedUser._id}, process.env.JWT_SECRET, {expiresIn: '7d'})
            console.log(token)
            res.status(200).json({msg:" login success", token: token, user: exitedUser})
        }
    
    } catch (error) {
        res.status(500).json({msg:"something went wrong!", error: error.message})
    }
}

const getUserInfo = async (req, res) => {
    try {
        const user = await User.findById(req.userId)
        if (!user) res.status(400).json({msg: "user does not exist"})
        res.status(200).json({msg:'got info', user: user})
    } catch (error) {
        res.status(500).json({msg:"something went wrong!", error: error.message})

    }
}

module.exports = { register, login, getUserInfo}
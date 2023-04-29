const jwt = require('jsonwebtoken')

exports.authMiddleware = async (req, res, next) => {
    try {
        
        const token = req.headers.token
        console.log(token)
        if (!token) res.status(401).json({msg:'not authorized'})
        const verifyToken = jwt.verify(token, process.env.JWT_SECRET)
        console.log(verifyToken)
        req.userId = verifyToken.id
        next()

    } catch (error) {
        res.status(500).json({msg:"something went wrong!", error: error.message})
    }

}
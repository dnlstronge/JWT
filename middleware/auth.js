const jwt = require("jsonwebtoken")
const { UnauthenicatedError }= require("../errors/index")


const authenticationMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new UnauthenicatedError("No token provided")
    }
    const token = authHeader.split(" ")[1]
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const {id, username } = decoded
        req.user = {id, username}
        next()
    } catch (error) {
        throw new UnauthenicatedError("not authorized to access this route")
    }
    console.log(token)
    
}

module.exports = authenticationMiddleware;
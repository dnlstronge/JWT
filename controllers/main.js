// only a request with JWT can access the dashboard:

// check for username & password
// if exists create new JWT
// send back to frontend
const jwt = require("jsonwebtoken")
const CustomAPIError = require("../errors/custom-error")

const login = async (req, res) => {

    const { username, password } = req.body
    if(!username || !password) {
        throw new CustomAPIError("Please provide email and password", 400)
    }
    // // again, for demo purposes - in prod use long unguessable string value
    const id = new Date().getDate() // demo purposed normally get from db
    const token = jwt.sign({id, username}, process.env.JWT_SECRET, {expiresIn: "30d"}); // keep payload small
    res.status(200).json({msg: "user created", token})
}



const dashboard = async (req, res) => {
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new CustomAPIError("No token provided", 401)
    }
    const token = authHeader.split(" ")[1]
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const luckyNum = Math.floor(Math.random() * 100)
        res.status(200).json({msg: `Hello ${decoded.username}`, secret: `Data Authorised: Your lucky number is ${luckyNum}`})
    } catch (error) {
        throw new CustomAPIError("not authorized to access this route", 401)
    }
    console.log(token)
   
}

module.exports = {login, dashboard}
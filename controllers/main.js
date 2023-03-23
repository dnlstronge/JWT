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
    
    res.send("dummy login/signup route")
}



const dashboard = async (req, res) => {
    
    const luckyNum = Math.floor(Math.random * 100)
    res.status(200).json({msg: `Hello Mr. X`, secret: `Data Authorised: Your lucky number is ${luckyNum}`})
}

module.exports = {login, dashboard}
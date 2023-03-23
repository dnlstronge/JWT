// only a request with JWT can access the dashboard:

// check for username & password
// if exists create new JWT
// send back to frontend
const jwt = require("jsonwebtoken")
const CustomAPIError = require("../errors/custom-error")
const { BadRequestError } = require("../errors")

const login = async (req, res) => {

    const { username, password } = req.body
    if(!username || !password) {
        throw new BadRequestError("Please provide email and password")
    }
    // // again, for demo purposes - in prod use long unguessable string value
    const id = new Date().getDate() // demo purposed normally get from db
    const token = jwt.sign({id, username}, process.env.JWT_SECRET, {expiresIn: "30d"}); // keep payload small
    res.status(200).json({msg: "user created", token})
}



const dashboard = async (req, res) => {

    console.log(req.user)
    const luckyNum = Math.floor(Math.random() * 100)
    res.status(200).json({msg: `Hello ${req.user.username}`, secret: `Data Authorised: Your lucky number is ${luckyNum}`})
   
}

module.exports = {login, dashboard}
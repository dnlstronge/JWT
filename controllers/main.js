const login = async (req, res) => {
    res.send("dummy login/signup route")
}

const dashboard = async (req, res) => {
    const luckyNum = Math.floor(Math.random * 100)
    res.status(200).json({msg: `Your luck number is ${luckyNum}`})
}


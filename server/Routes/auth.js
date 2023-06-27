const router = require('express').Router()
const User = require('../Models/User.js')
const bcrypt = require('bcrypt')


//register

router.post('/register', async (req, res) => {
    const emailToLower = req.body.email
    const userCheck = await User.findOne({email: emailToLower})
        if(userCheck){
            res.status(400).json("Email already in use")
        }
    const userNameCheck = await User.findOne({username: req.body.username})
    if(userCheck){
        res.status(400).json("Username taken!")
    }
    const passwordCheck = req.body.password
    if(passwordCheck.length < 6){
       return res.status(400).json("Password must contain more than 6 characters.")
    }
    const hashed = await bcrypt.hash(req.body.password, 10)
    const newUser = new User({
        email: emailToLower,
        username: req.body.username,
        password: hashed
    })
    try {
        const savedUser = await newUser.save()
        res.status(201).json(savedUser)
    } catch (error) {
        res.status(500).json(error)
        console.log(error)
    }
})


//login

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({username: req.body.username})
            if(!user){
                res.status(400).json("No user found")
            }
        const passwordCheck = await bcrypt.compare(req.body.password, user.password)
            if(!passwordCheck){
                res.status(400).json("Incorrect password")
            }
        const {password, ...others} = user._doc
        res.status(200).json(others)
    } catch (error) {
        res.status(500).json(error)
    }
})









module.exports = router















module.exports = router
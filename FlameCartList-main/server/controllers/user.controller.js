const User = require('../models/user.model');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

module.exports.findAllUsers = async (req, res) => {
    try{
        let user= await User.find()
        res.json({user})
    }
    catch(error){
        res.status(400).json({ message: 'Something went wrong', error})
    }
}

module.exports.findOneSingleUser = async (req, res) => {
    try{
        let user= await  User.findOne({ _id: req.params.id })
        res.json({user})
    }
    catch(error){
        res.status(400).json({ message: 'Something went wrong', error})
    }
}

module.exports.createNewUser = async (req, res) => {
    // console.log(req.cookies.usertoken)
    try{
        let user= await User.create(req.body)
        const userToken = jwt.sign({
            id: user._id
        }, process.env.SECRET_KEY);
        console.log(userToken)
        res.cookie("usertoken",userToken,{httpOnly: true}).cookie("name",user.name,{}).json({user:'success'})
    }
    catch(error){
        console.log(error)
        res.status(400).json({ message: 'Something went wrong', error})
    }
}

module.exports.LogOutUser = async (req, res) => {
    console.log('logout')
    // console.log(req.cookies.usertoken)
    res.clearCookie("usertoken")
    res.clearCookie("name")
    res.sendStatus(200)
}
module.exports.LoginUser = async (req, res) => {
    // console.log(req.cookies.usertoken)
    try{
        let user= await User.findOne({username: req.body.username})
        if(user === null) {
            return res.status(400).json({ message: 'Invalid Credentials'});
        }
        const correctPassword = await bcrypt.compare(req.body.password, user.password);
        if(!correctPassword) {
            return res.status(400).json({ message: 'Invalid Credentials'});
        }
        const userToken = jwt.sign({
            id: user._id
        }, process.env.SECRET_KEY);
        console.log(userToken)
        res.cookie("usertoken",userToken,{httpOnly: true}).cookie("name",user.name,{}).json({user:'success'})
    }
    catch(error){
        console.log(error)
        res.status(400).json({ message: 'Something went wrong', error})
    }
}

module.exports.auth = async (req, res) => {
    console.log(req.cookies.usertoken)
    try{
        let token=await jwt.verify(req.cookies.usertoken, process.env.SECRET_KEY)
        let id;
        if(token.hasOwnProperty('id')){
            id=token.id
        }
        else{
            return res.status(401).json({verified: false});
        }
        console.log(id);
        let user= await User.findOne({ _id: id })
        if(user === null) {
            return res.status(401).json({verified: false});
        }
        res.json({verified: true})
    }
    catch(error){
        res.status(401).json({verified: false});
    }
}

module.exports.internalauth = async (req, res, next) => {
    // console.log(req.cookies.usertoken)
    try{
        let token=await jwt.verify(req.cookies.usertoken, process.env.SECRET_KEY)
        let id;
        if(token.hasOwnProperty('id')){
            id=token.id
        }
        else{
            return res.status(401).json({verified: false});
        }
        let user= await User.findOne({ _id: id })
        if(user === null) {
            return res.status(401).json({verified: false});
        }
        res.locals.user=user; //https://stackoverflow.com/questions/18875292/passing-variables-to-the-next-middleware-using-next-in-express-js
        res.locals.authenticated = true;
        next()
    }
    catch(error){
        res.status(401).json({verified: false})
    }
}

module.exports.updateExistingUser = async (req, res) => {
    try{
        let user= await User.findOneAndUpdate({_id: req.params.id},req.body,{new: true, runValidators: true})
        res.json({user})
    }
    catch(error){
        res.status(400).json({ message: 'Something went wrong', error})
    }
}

module.exports.deleteAnExistingUser = async (req, res) => {
    try{
        let result= await User.deleteOne({ _id: req.params.id })
        res.json({ result: result })
    }
    catch(error){
        res.status(400).json({ message: 'Something went wrong', error})
    }
}
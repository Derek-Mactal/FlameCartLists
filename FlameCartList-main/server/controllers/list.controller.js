const List = require('../models/list.model');

module.exports.findAllLists = async (req, res) => {
    try{
        if (res.locals.authenticated) {
            console.log(res.locals.user._id);
        }
        let list= await List.find({authorizedUsers:{$in: res.locals.user._id}})
        res.json({list})
    }
    catch(error){
        res.status(400).json({ message: 'Something went wrong', error})
    }
}

module.exports.internalListAuth= async (req, res, next)=>{
    try{
        let list= await  List.findOne({ _id: req.params.list_id })
        if(list === null) {
            return res.status(401).json({verified: false});
        }
        if(list.authorizedUsers.includes(res.locals.user._id)){
            res.locals.list=list
            next();
        }
        else{
            return res.status(401).json({verified: false});
        }
    }
    catch(error){
        res.status(400).json({ message: 'Something went wrong', error})
    }
}

module.exports.findOneSingleList = async (req, res) => {
    try{
        let list= await  List.findOne({ _id: req.params.id })
        if(list === null) {
            throw new Error('List not found')
        }
        if(list.authorizedUsers.includes(res.locals.user._id)){
            res.json({list})
        }
        else{
            return res.status(401).json({verified: false});
        }
    }
    catch(error){
        res.status(400).json({ message: 'Something went wrong', error})
    }
}

module.exports.createNewList = async (req, res) => {
    try{
        if (res.locals.authenticated) {
            console.log(res.locals.user._id);
        }
        let list= await List.create({...req.body, authorizedUsers:[res.locals.user._id]})
        res.json({list})
    }
    catch(error){
        res.status(400).json({ message: 'Something went wrong', error})
    }
}

module.exports.updateExistingList = async (req, res) => {
    try{
        let list= await List.findOneAndUpdate({_id: req.params.id},req.body,{new: true, runValidators: true})
        res.json({list})
    }
    catch(error){
        res.status(400).json({ message: 'Something went wrong', error})
    }
}

module.exports.deleteAnExistingList = async (req, res) => {
    try{
        let result= await List.deleteOne({ _id: req.params.id })
        res.json({ result: result })
    }
    catch(error){
        res.status(400).json({ message: 'Something went wrong', error})
    }
}

module.exports.shareList = async (req, res) => {
    try{
        console.log('sharing is caring')
        if (res.locals.authenticated) {
            console.log(res.locals.user._id);
        }
        let ls=await List.findOne({_id: req.params.list_id})
        if(ls === null) {
            throw new Error('List not found')
        }
        let userList=ls.authorizedUsers
        if(!userList.includes(res.locals.user._id)){
            userList.push(res.locals.user._id)
        }
        console.log(userList)
        let list= await List.findOneAndUpdate({_id: req.params.list_id},{authorizedUsers: userList},{new: true, runValidators: true})
        res.json({list})
    }
    catch(error){
        res.status(400).json({ message: 'Something went wrong', error})
    }
}

module.exports.recList = async (req, res) => {
    try{
        let list= await  List.findOne({ _id: req.params.id })
        if(list === null) {
            throw new Error('List not found')
        }
        res.json({list})
    }
    catch(error){
        res.status(400).json({ message: 'Something went wrong', error})
    }
}
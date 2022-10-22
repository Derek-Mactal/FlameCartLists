const Item = require('../models/item.model');

module.exports.findAllItems = async (req, res) => {
    try{
        let item= await Item.find()
        res.json({item})
    }
    catch(error){
        res.status(400).json({ message: 'Something went wrong', error})
    }
}

module.exports.findAllItemsInList = async (req, res) => {
    try{
        let item= await Item.find({list: req.params.list_id})
        res.json({item})
    }
    catch(error){
        res.status(400).json({ message: 'Something went wrong', error})
    }
}

module.exports.findOneSingleItem = async (req, res) => {
    try{
        let item= await  Item.findOne({ _id: req.params.item_id })
        // console.log(typeof(item.list))
        // console.log(typeof(res.locals.list._id.toString()))
        if(item===null||item.list!==res.locals.list._id.toString()){
            return res.status(401).json({verified: false});
        }
        res.json({item})
    }
    catch(error){
        res.status(400).json({ message: 'Something went wrong', error})
    }
}

module.exports.createNewItem = async (req, res) => {
    try{
        let item= await Item.create(req.body)
        res.json({item})
    }
    catch(error){
        res.status(400).json({ message: 'Something went wrong', error})
    }
}

module.exports.updateExistingItem = async (req, res) => {
    try{
        let itemVer= await  Item.findOne({ _id: req.params.item_id })
        // console.log(typeof(item.list))
        // console.log(typeof(res.locals.list._id.toString()))
        if(itemVer===null||itemVer.list!==res.locals.list._id.toString()){
            return res.status(401).json({verified: false});
        }
        let item= await Item.findOneAndUpdate({_id: req.params.item_id},req.body,{new: true, runValidators: true})
        res.json({item})
    }
    catch(error){
        res.status(400).json({ message: 'Something went wrong', error})
    }
}

module.exports.deleteAnExistingItem = async (req, res) => {
    try{
        let item= await  Item.findOne({ _id: req.params.item_id })
        // console.log(typeof(item.list))
        // console.log(typeof(res.locals.list._id.toString()))
        if(item===null||item.list!==res.locals.list._id.toString()){
            return res.status(401).json({verified: false});
        }
        let result= await Item.deleteOne({ _id: req.params.item_id })
        res.json({ result: result })
    }
    catch(error){
        res.status(400).json({ message: 'Something went wrong', error})
    }
}
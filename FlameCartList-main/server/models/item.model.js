const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const ItemSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: [true, "Name field is required!"],
        minlength: [2, "Name must be at least 2 characters!"]
    },
    description: {
        type: String,
        default: "",
    },
    quantity: {
        type: Number,
        default: 1,
    },
    list: {
        type: String,
    },
    completed: {
        type: Boolean,
        default: false,
    }
},{ timestamps: true });
const Item = mongoose.model('Item', ItemSchema);
module.exports = Item;
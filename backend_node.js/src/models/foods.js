const mongoose = require('mongoose')

const foodSchema = new mongoose.Schema({
    image: {
        type: Buffer
    },
    name: {
        type: String,
        trim:true,
        required:true
    },
    isVegan:{
        type:String,
        trim:true,
        required:true
    },
    price: {
        type: String,
        trim:true,
        required:true
    },
    description: {
        type:String,
        trim:true,
        required:true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    createdby:{
        type:String,
        trim:true,
        required:true
    }
},
    {
        timestamps:true
    })

const Food = mongoose.model('Food', foodSchema)    

module.exports = Food
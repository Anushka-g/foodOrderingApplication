const mongoose = require('mongoose')

const Order = mongoose.model('Order',{

    orders:[{
        _id:{
            type:String
        },
        name:{
            type:String
        },
        price:{
            type:String
        },
        quantity:{
            type:String
        },
        total:{
            type:String
        }
    }],

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },

    amount: {
        type:String,
        required:true
    },

    orderNo:{
        type:String,
    },
    status:{
        type:String,
        required:true
    }
})

module.exports = Order
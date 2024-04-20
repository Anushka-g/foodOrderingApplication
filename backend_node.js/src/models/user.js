const mongoose = require('mongoose')
const validator = require('validator')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('../database/connection-file')

const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,})/;

const userSchema = new mongoose.Schema({

    image: {
        type: Buffer
    },
    name:{
        type:String,
        trim:true
    },

    gender:{
        type:String,
        trim:true,
        validate(value){
            if( !(value == 'male' || value == 'female') ){
                throw new Error('Provide proper data')
            }
        }
    },

    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid Email')
            }
        }
    },

    role:{
        type:String,
        required:true,
        trim:true,
        validate(value){
            if( !(value == 'admin' || value == 'visitor') ){
                throw new Error('Provide proper data')
            }
        }
        
    },

    password:{
        type:String,
        required:true,
        trim:true,
        validate(value){
            const checkStrength = passwordRegex.test(value);

            if(!checkStrength){
                throw new Error('must be of 8 character, contain at least a number, an uppercase letter & a special character')
            }
        }
    },

    phone:{
        type:String,
        trim:true,
        validate(value){
            if( !(value.toString().length == 10 )){
                throw new Error('Invalid Phone number')
            }
        }
    },

    isActiveAccount:{
        type:String,
        trim:true
    },

    dateOfBirth:{
        type:String,
        trim:true
    },

    tokens: [{
        token: {
            type:String,
            required:true
        }
    }]
},
    {
    timestamps:true
})

userSchema.virtual('order', {
    ref:'Food',
    localField:'_id',
    foreignField:'owner'
})

userSchema.methods.toJSON = function () {
    const user = this
    const userObj = user.toObject()

    delete userObj.password
    delete userObj.tokens

    return userObj
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if(!user){
        throw new Error('Unable to Login!')
    }
    const isMatch = await bcryptjs.compare(password, user.password)
    const isActiveUserAccount = user.isActiveAccount

    if( !isMatch ){
        throw new Error('Unable to Login!') 
    }

    if(isMatch && (isActiveUserAccount == 'false') ){
        throw new Error('Inactive Account')
    }

    return user
}

// userSchema.statics.checkPassword = async (email, oldpassword, newpassword) => {
//     const user = await User.findOne({ email })

//     const isMatch = await bcryptjs.compare(oldpassword,user.password)

//     if( !isMatch ){
//         throw new Error('Wrong password')
//     }

//     return user

// }

userSchema.methods.generateAuthToken = async function() {
    const user = this

    const token = jwt.sign({ _id:user._id.toString() }, process.env.JWT_SECRET)

    user.tokens = user.tokens.concat({ token })
    await user.save() 
    return token
}

userSchema.pre('save', async function (next) {
    const user = this

    if(user.isModified('password')) {
        user.password = await bcryptjs.hash(user.password, 8)
    }

    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User
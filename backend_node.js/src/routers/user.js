const express = require('express')
const auth = require('../middleware/auth')
const User = require('../models/user')
const multer = require('multer')

const router = new express.Router()

const  image = multer({
    limits:{
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if(!file.originalname.endsWith('.jpg')){
            return cb(new Error('Please upload file having extension .jpg'))
        }

        cb(undefined, true)
    }
})

router.get('/user/image/:id', async (req, res) => {
    try{
        const user = await User.findById(req.params.id)
        if (!user || !user.image){
            throw new Error() 
        }
        
        res.set('Content-Type', 'image/jpg')
        res.send(user.image)
    }catch(e){
        res.status(404).send() 
    }
})

router.post('/user/upload',auth, image.single('image'), async(req,res) => {

    req.user.image = req.file.buffer

    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message})
})

router.post('/user', async (req, res) => {

    const user = new User({
        ...req.body,
        isActiveAccount: true
    })
  
    try{
        await user.save()
        res.status(201).send({ user })
    }catch(error){
        if(error.code == 11000){
            res.status(400).send({
                error : 'Found a duplicate !'
            })
        }else{
            res.status(400).send(error)
        } 
    } 
})

router.post('/user/login', async (req, res) => {
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user , token})
    }catch(error){
        if(error == "Error: Inactive Account"){
            res.status(400).send({errors : "ACCOUNT DEACTIVATE"})
        }else{
            res.status(400).send({errors:"WRONG CREDENTIALS"})
        }
    }
})

router.post('/user/logout', auth, async (req,res) => {
    try{
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })

        await req.user.save()

        res.send()
    }catch (e){ 
        res.status(500).send()
    }
})

router.post('/user/logoutAll', auth, async (req, res) => {
    try{
        req.user.tokens = []

        await req.user.save()

        res.send()
    }catch(e){
        res.status(500).send()
    }
})

router.get('/user/me', auth, async (req,res) => {
    res.send(req.user)
})

router.get('/users', auth, async(req,res) => {
    try{
        const user = await User.find({})
        res.send(user)
    }catch(error){
        res.status(500).send({error:'Internal Server Error!'})
    }
})

router.patch('/user/:id',auth, async (req, res) =>{

    const updates = Object.keys(req.body)
    const allowUpdates = ['name','phone','dateOfBirth']

    const validOperation = updates.every((update) => allowUpdates.includes(update))

    if(!validOperation){
        return res.status(400).send({ error:'Invalid Updates!' }) 
    }

    try{
        const user = await User.findById(req.params.id)
        updates.forEach((update) => user[update] = req.body[update])
        await user.save()

        if(!user){
            return res.status(404).send({ error:'User not found !' })
        }
        res.send(user) 
    }catch(error){
        res.status(400).send(error)
    }
})

router.patch('/user/deactivate/:id', auth, async(req, res) =>{
    const updates = Object.keys(req.body)
    const allowUpdates = ['_id','gender','name','email','phone','dateOfBirth','isActiveAccount']

    const validOperation = updates.every((update) => allowUpdates.includes(update))

    if(!validOperation){
        return res.status(400).send({ error:'Invalid Updates!' })
    }

    try{
        const user = await User.findById(req.params.id)
        updates.forEach((update) => user[update] = req.body[update])
        await user.save()

        if(!user){
            return res.status(404).send({ error:'User not found !' })
        }
        res.send(user)
    }catch(error){
        res.status(400).send(error)
    }
})

router.delete('/delete/:id',auth,async(req,res) => {
    try{
        const user = await User.findByIdAndDelete(req.params.id)
        if(!user){
            return res.status(404).send('Not Found')
        }
        res.send()
    }catch(error){
        res.status(500).send(error)
    }
})

module.exports = router
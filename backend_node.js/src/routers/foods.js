const express = require('express')
const multer = require('multer') 
const Food = require('../models/foods')
const Order = require('../models/order')
const auth = require('../middleware/auth')
const json2csv = require('json2csv').parse
const csv2json = require('fast-csv')
const mongoose = require('mongoose')
const fs = require('fs')
const path = require('path')

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

const document = new multer({
    dest: "uploads/",
    limits:{
        fileSize: 2000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.endsWith('.csv')){
            return cb(new Error('Please upload file having extension .csv'))
        }

        cb(undefined, true)
    }
})

router.post('/food', auth, async (req, res) => {
    const food = new Food({
        ...req.body,
        owner:req.user._id
    })
    try{
        await food.save()
        res.status(201).send({ food })
    }catch(error){
        res.status(400).send(error)
    } 
})

router.get('/foods' ,auth, async(req, res) => {

    try{
        const food = await Food.find({})
        res.send(food)
    }catch(error){
        res.status(500).send({ error:'Internal Server Error!' })
    }
})

router.get('/json2csv/foods', auth, (req,res) => {

    try{
        const fields = [
            'name',
            'isVegan',
            'price',
            'description',
            'createdby'
        ]
        const csv = json2csv([{name:"", isVegan:"", price:"", description:"", createdby:""}],{fields})
        res.set("Content-Disposition", "attachment;filename=food-template.csv");
        res.set("Content-Type","application/octet-stream");
        res.send(csv)
    }catch(error){
        console.log(error)
    }
})

router.post('/csv2json/foods',auth, document.single('csv'), (req,res) => {
    try{
        const foods = [];
        const uploadFile = req.file.path;

        csv2json.parseFile(uploadFile, {
            headers: true,
            ignoreEmpty: true
        }).on("data", function(data) {
            data['_id'] = new mongoose.Types.ObjectId();
            data['owner'] = req.user._id;
            foods.push(data)
        }).on("end", function(){
            Food.insertMany(foods)
            .then(()=> {
                fs.unlink(path.join(__dirname, "../../", req.file.path), function (error){
                    if(error) throw error;
                })
                res.status(201).send(foods)
            }).catch((err)=>{
                console.log(err)
            })
        })
    }catch(error){
        console.log(error)
    }
})

router.post('/food/upload/:id',auth, image.single('image'), async(req,res) => {

    const _id = req.params.id

    const food = await Food.findById(_id) 
    food.image = req.file.buffer

    await food.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message})
})

router.get('/food/image/:id', async (req, res) => {
    try{
        const food = await Food.findById(req.params.id)

        if (!food || !food.image){
            throw new Error()
        }
        
        res.set('Content-Type', 'image/jpg')
        res.send(food.image)
    }catch(e){
        res.status(404).send() 
    }
})

router.post('/orders', auth, async(req, res) => {
    var data = req.body
    let sum = 0;
    for(let i=0; i<data.length;i++){
        let temp = data[i]
        sum = sum + temp.total
        //console.log(sum) 
    }
    const randomId = Math.floor((Math.random() * 1000000) + 1);
    const order = new Order({
        ...req.body,
        owner:req.user._id,
        orderNo:randomId,
        amount:sum,
        status:'received'
    })
    order.orders = order.orders.concat(req.body)

    try{
        await order.save()
        //console.log(order)
        res.status(201).send(order)
    }catch(e){
        res.status(400).send(e)
    }
})

router.patch('/update/order/:id', async (req,res) => {

    const updates = Object.keys(req.body)
    const allowUpdates = ['status']

    const validOperation = updates.every((update) => allowUpdates.includes(update))

    if(!validOperation){
        return res.status(400).send({ error:'Invalid Updates!' })
    }

    try{
        const order = await Order.findById(req.params.id)
        updates.forEach((update) => order[update] = req.body[update])
        await order.save()

        if(!order){
            return res.status(404).send({ error:'User not found !' })
        }
        res.send(order)
    }catch(error){
        res.status(400).send(error)
    }
})

router.get('/get/orders', auth, async (req, res) => {
    try{
        const order = await Order.find({}) 
        res.set('Content-Type', 'application/json')
        res.send(order)
    }catch{
        res.status(500).send({ error:'Internal Server Error!' })
    }
})

router.get('/my/orders', auth, async(req,res) => {
    try{
        const order = await Order.find({owner : req.user._id})
        res.send(order)
    }catch(error){
        console.log(error)
        res.status(500).send({ error:'Internal Server Error!' })
    }
})

router.delete('/remove/:id', auth, async(req, res) => {
    try{
        const order = await Order.findByIdAndDelete(req.params.id)
        if(!order){
            return res.status(404).send('Not Found')
        }
        res.send()
    }catch(error){
        //console.log(error)
        res.status(500).send(error)
    }
})

module.exports = router
const express = require('express')
require('./database/connection-file')
const foodRouter = require('./routers/foods')
const userRouter = require('./routers/user')
const cors = require('cors')
const path = require('path')

const app = express()
const port = process.env.PORT

app.use(cors())
app.options('*',cors())

app.use(express.static(path.join(__dirname, '../dist/food-application')))

app.use(express.json())

app.use(foodRouter)
app.use(userRouter)

app.get('/*', function(req,res) {
    res.sendFile(path.join(__dirname, '../dist/food-application/index.html'))
}) 

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
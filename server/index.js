const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv')
const aiRoutes = require('./Routes/ai.js')
const authRoute = require('./Routes/auth.js')
const mongoose = require('mongoose')

dotenv.config()
const port = process.env.PORT || 8000

app.use(express.json())
app.use(cors())



app.get('/', (req, res) => {
    res.send("Welcome to JackGPT")
})
app.use('/api/ai', aiRoutes)
app.use('/api/auth', authRoute)



const startServer = async () => {
    await mongoose.connect(process.env.MONGO_URL,
        console.log("Mongo connected")
    )
    app.listen(port, () => {
        console.log(`App listening on ${port}`)
    })
}


startServer()
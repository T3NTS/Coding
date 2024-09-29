const express = require('express')
const app = express()
const tasks = require('./routes/tasks')
const connectDB = require('./db/connect')
require('dotenv').config()
const notFound = require('./middleware/not-found')
const errorHandlerMiddleWare = require('./middleware/error-handler')

//middleware
app.use(express.json())
app.use(express.static('./public'))

//routes
app.use('/api/v1/tasks', tasks)

app.use(notFound)
app.use(errorHandlerMiddleWare)

const port = process.env.PORT || 3000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        console.log('Connnected to MongoDB')
        app.listen(port, console.log(`Server is listenin on ${port}`))
    } catch(err) {
        console.log(err)
    }
}

start()






//async errors

const express = require('express')
const app = express()
const productsRouter = require('./routes/products')
const connectDB = require('./db/connect')
const populate = require('./')
require('dotenv').config()
require('express-async-errors')

const notFoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler')

//middleware
app.use(express.json())

//routes
app.get('/', (req, res) => {
    res.send('<h1>Store API</h1><a href="/api/v1/products">Products Route</a>')
})

app.use('/api/v1/products', productsRouter)

//products route

app.use(notFoundMiddleware)
app.use(errorMiddleware)


const port = process.env.PORT || 3000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Listening on ${port}...`))
    } catch(err) {
        console.log(err)
    }
}

start()
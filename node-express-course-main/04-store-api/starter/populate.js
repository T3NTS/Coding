require('dotenv').config()

const connectDB = require('./db/connect')
const Product = require('./models/product')

const jsonProducts = require('./products.json')
console.log(jsonProducts)

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        await Product.deleteMany()
        await Product.create(jsonProducts)
        process.exit(0) // Not letting the program run indefinitely
    } catch (err) {
        console.log(err)
        process.exit(1) // Do not exit if error
    }
}

start()

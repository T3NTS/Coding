/*require('dotenv').config()

const mongoose = require('mongoose')
const { MongoClient, ServerApiVersion } = require('mongodb');

const connectionString = 
    'mongodb+srv://t3nts:OPXGsXiTrw5xrLaZ@nodeexpressprojects.hzt5u.mongodb.net/?retryWrites=true&w=majority&appName=NodeExpressProjects'

const client = new MongoClient(process.env.MONGO_URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
    });

async function connectDB() {
}

module.exports = client*/

const mongoose = require('mongoose')

const connectDB = (url) => {
  return mongoose.connect(url)
}

module.exports = connectDB
const mongoose = require('mongoose')
mongoose.set('strictQuery', false);
const MONGO_URI = "mongodb://localhost:27017/mean-db";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGO_URI)
        console.log(`MONGODB CONNECTED Host: ${conn.connection.host}, uri: ${MONGO_URI}`)
    } catch (error) {
        console.log(`Error: ${error.message}`)
        process.exit(1)
    }
}

module.exports = connectDB

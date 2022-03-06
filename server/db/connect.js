import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const DB_USERNAME = process.env.DB_USERNAME
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_URL = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.jsgwx.mongodb.net/tinyworld_db?retryWrites=true&w=majority`


const connectDB = async () => {
    try {
        await mongoose.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('MongoDB connected')
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

export default connectDB

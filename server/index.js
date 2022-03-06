import express from 'express'
import connectDB from './db/connect.js'
import routeApp from './routes/index.js'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 5000

connectDB()
app.use(express.json())
app.use(cors())
routeApp(app)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

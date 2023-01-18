const express = require('express')
const connectDB = require('./config/db')
const PORT = 5000

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))


app.get('/', (req, res) => {
    res.status(200).json({ mesage: "Welcome to MEAN API" })
})

// routes
app.use('/', require('./routes/userRoutes'))

app.listen(PORT, () => console.log(`SERVER IS RUNNING ON PORT ${PORT}`))

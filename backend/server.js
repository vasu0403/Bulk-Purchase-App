const express = require('express')
const cors = require('cors')

const app = express()
const PORT = 4000

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send('server running')
})

let sign = require('./routes/sign')
let vendorRoutes = require('./routes/vendorRoutes')

app.use('/sign', sign)
app.use('/vendor', vendorRoutes)


app.listen(PORT, () => {
    console.log('Server is running on port 4000')
})
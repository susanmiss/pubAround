const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose');
require('dotenv').config()


const app = express()

//DB:
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
    .then(() => console.log(`DB connected for Pub Around listen on PORT ${port}`))
    .catch(err => console.log(err))

//MIDDLEWARES
app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())



//ROUTE TESTING:
app.get('/', (req, res) => { res.send('test backend') })

//ROUTES
const postRoutes = require('./Routes/postRoutes.js')

//ROUTES MIDDLEWARE
app.use('/api', postRoutes);




//LISTEN:
const port = process.env.PORT || 8080
app.listen(port, () => console.log(`App is listen on port ${port} for Pub Around`))












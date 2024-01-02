require('dotenv').config()
// initialize express framework
const express = require('express')
// create an express application
const app = express()
// define a basic route for testing purpose
app.get('/', (req, res) => {
  res.send('Hello world')
})
console.log("get",process.env.MONGO_URI)
const connectToMongo=require('./db')
const cors=require('cors')
const bodyParser = require('body-parser');
//midlewares
app.use(cors())
// to increae limit of payload
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());

app.use('/api/auth',require('./routes/auth'))
app.use('/api/posts',require('./routes/posts'))

app.listen(4000,()=>{
    console.log('iNotebook listening on 4000')
})
connectToMongo();
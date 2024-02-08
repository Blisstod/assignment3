const express = require('express')
const bodyParser = require('body-parser')
const connectDB= require('./src/config/databaseConfig')
const authRoutes = require('./src/routes/auth')

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(express.json());
app.use('/', authRoutes);
app.set('view engine', 'ejs'); 
app.set('views', 'views');

require('dotenv').config()
connectDB();

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})
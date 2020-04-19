const express = require('express')
const mongoose = require('mongoose')
const rotaMongoDB = 'mongodb+srv://admin:admin@servidor-mu6s9.gcp.mongodb.net/Server?retryWrites=true&w=majority'
const routes = require('./routes')

const app = express()

mongoose.Promise = global.Promise
mongoose.connect(rotaMongoDB, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
console.log('MongoDB Conectado...');

app.use(express.json())
app.use(routes)

app.listen(3333)
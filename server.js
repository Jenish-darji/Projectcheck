require('dotenv').config()
var admin = require("firebase-admin");

var serviceAccount = require("./sec.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


const express = require('express')
const app = express()

app.use(express.json())
const projectRoutes = require('./routes/project')
const userRoutes = require('./routes/user')
const tasksRoutes = require('./routes/task')

app.get('/', function (req, res) {
  res.send('Hello World')
})
// Route for signup
app.use('/projects', projectRoutes)

// Route for signup, login
app.use('/user', userRoutes)
app.use('/tasks', tasksRoutes)


app.listen(3001)



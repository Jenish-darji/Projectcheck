const express = require('express')
const router = express.Router()

const { addTask, getTaskByProject } = require('../controller/task')


const {addTaskValidator} = require('../core/validators')

router.post('/add', addTaskValidator, addTask)
router.get('/all/:pid', getTaskByProject)

module.exports = router


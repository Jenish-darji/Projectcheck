const express = require('express')
const router = express.Router()

const { addTask, getTaskByProject, getTasksByDate } = require('../controller/task')


const {addTaskValidator} = require('../core/validators')

router.post('/add', addTaskValidator, addTask)
router.get('/all/:pid', getTaskByProject)
router.get('/byDate', getTasksByDate);

module.exports = router


const express = require('express')
const router = express.Router()

const {addNewProject, getProjectsByUID, getProjectsByUserId} = require('../controller/project')

const {projectValidator} = require('../core/validators')

router.post('/add', projectValidator, addNewProject)
router.get('/all/:uid', getProjectsByUserId)

module.exports = router
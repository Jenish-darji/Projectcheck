const express = require('express')
const router = express.Router()

const {addNewProject, getProjectsByUID, getProjectsByUserId, 
    getUsersByProjectId, addUsersToProject} = require('../controller/project')

const {projectValidator} = require('../core/validators')

router.post('/add', projectValidator, addNewProject)
router.get('/all/:uid', getProjectsByUserId)
router.get('/:pid/users', getUsersByProjectId);
router.post('/:pid/addUsers', addUsersToProject);

module.exports = router
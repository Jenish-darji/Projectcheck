const {check} = require('express-validator')

// name, pid, description, end_date, p_status, photo_url
const projectValidator = [
    check('name').not().isEmpty(),
    check('description').trim().escape(),
    check('end_date').notEmpty(),
    check('p_status').isIn(['Active', 'Done']),
    check('photo_url').isURL(),
    check('uid').not().isEmpty()
]

const userValidators = [
    check('first_name', 'First Name is required.')

]
const userSignup = [
    // email validation
    check('email').normalizeEmail({all_lowercase: true}).isLength({min: 5}),
    // password validation
    check('password').isLength({ min: 8 }),
    //full name 
    check('fullName').matches(/^[a-zA-Z]+$/),
    // phone number
    check('phoneNumber').isMobilePhone(),
    // dob
    check('dob'),
    // gender
    check('gender').isIn(['Male','Female', 'Other'])
]
const userLogin = [
    check("idToken").notEmpty()

]
const addTaskValidator = [
    // title, status, priority, created_by, assign_to, description, created_date
    check('title').not().isEmpty(),
    // status
    check('status').isIn(['Ongoing', 'Pending', 'Completed']),
    // priority
    check('priority').isNumeric(),
    // created by
    check('created_by').not().isEmpty(),
    // assigned to
    check('assign_to').not().isEmpty(),
    // description
    check('description').trim().escape()
    // set created date  as current date
    
]
    
    
    
    

module.exports = {
    projectValidator,
    userValidators,
    userSignup,
    userLogin,
    addTaskValidator
}
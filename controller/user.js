const { validationResult } = require('express-validator')
const { getAuth } = require('firebase-admin/auth')
const sql = require('../db')

const login = async (req, res) => {
    const result = validationResult(req)
    const hasErrors = !result.isEmpty();

    if (hasErrors) {
        return res.send({ result })
    }
    const { idToken } = req.body
    const decodedIDToken = await getAuth().verifyIdToken(idToken)
    .catch((e) => {
        console.log(e)
        return res.send({ error: "Something went wrong", e: e })
    })
    console.log({decodedIDToken});
    const loginData = await sql`
    SELECT uid, name, email, last_login, ac_type, gender, dob, phone
	FROM public."user"
    WHERE uid = ${decodedIDToken.uid};
    `

    return res.send({loginData})

}


const signUp = async (req, res) => {
    const result = validationResult(req)
    const hasErrors = !result.isEmpty();

    if (hasErrors) {
        return res.send({ result })
    }

    const { email, password, fullName, phoneNumber, dob, gender } = req.body
    const userRecord = await getAuth().createUser({
        email: email,
        emailVerified: false,
        phoneNumber: phoneNumber,
        password: password,
        displayName: fullName,
        disabled: false,
    }).catch((e) => {
        console.log(e)
        return res.send({ error: "Something went wrong", e: e })
    })
    const user = await sql`
      INSERT INTO public."user"(
        uid, name, email, ac_type, gender, dob, phone)
        VALUES (${userRecord.uid}, ${fullName}, ${email}, 'user', ${gender}, ${dob}, ${phoneNumber})
        RETURNING *
      `.catch((e) => {
            console.log(e)
            getAuth().deleteUser({uid: userRecord.uid})
            return res.send({ error: e })
        })
    return res.send({ user })

}
// Add task 

    


module.exports = { signUp, login }
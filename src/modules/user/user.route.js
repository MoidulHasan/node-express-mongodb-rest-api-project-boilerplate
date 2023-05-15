const express = require('express')
const userController = require('./user.controller')

const router = express.Router();



// route :  /v1/users/
router.route('/')
    .get(userController.getAll)
    .post(userController.create)


module.exports = router;

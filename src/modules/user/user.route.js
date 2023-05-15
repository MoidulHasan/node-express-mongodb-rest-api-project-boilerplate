const express = require('express')


const router = express.Router();



// route :  /v1/users/
router.route('/')
    .get((req, res, next) => {
        res.status(200).json({
            message: 'User route'
        })
    })


module.exports = router;

const express = require('express');
const router = express.Router()
const userModel = require('../db/model/userModel');

router.post('/register', (req, res) => {
    let { email, password } = req.body;
    userModel.insertMany({ email, password }).then(() => {
        res.send({err:0,msg:'注册成功！'})
    }).catch(() => {
        res.send({err:-1,msg:'注册失败！'})
    })
})

module.exports = router;
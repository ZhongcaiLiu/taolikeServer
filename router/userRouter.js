const express = require('express');
const router = express.Router()
const userModel = require('../db/model/userModel');

router.post('/register', (req, res) => {
    let { us, ps } = req.body;
    userModel.insertMany({ us, ps }).then(() => {
        res.send({err:0,msg:'添加成功'})
    }).catch(() => {
        res.send({err:-1,msg:'添加失败'})
    })
})
router.post('/del', (req, res) => {
    let { us } = req.body
    userModel.deleteMany({ us }).then(() => {
        res.send({ err:0,msg:'删除成功'})
    }).catch(() => {
        res.send({err:-1,msg:'删除失败'})
    })
})

module.exports = router;
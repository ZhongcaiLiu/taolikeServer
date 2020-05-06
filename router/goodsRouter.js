const express = require('express');
const router = express.Router();
const goodsModel=require('../db/model/goodsModel')

//往数据库写数据接口
router.post('/inc', (req, res) => {
    let { name, price, img, buy_Num, sold_Num, discount, address } = req.body;
    goodsModel.insertMany({ name, price, img, buy_Num, sold_Num, discount, address })
        .then(() => {
            res.send({err:0,msg:'添加成功'})
        }).catch(() => {
            res.send({err:-1,msg:'添加失败'})
        })
})

router.get('/', (req, res) => {
    res.send({ err: 0, msg: 'test ok' });
})
module.exports = router;
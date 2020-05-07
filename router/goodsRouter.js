const express = require('express');
const router = express.Router();
const goodsModel=require('../db/model/goodsModel')

//往数据库写数据接口
router.post('/inc', (req, res) => {
    let { name, price, img, buy_Num, sold_Num, discount, address,typename,typeid } = req.body;
    goodsModel.insertMany({ name, price, img, buy_Num, sold_Num, discount, address,typename,typeid })
        .then(() => {
            res.send({err:0,msg:'添加成功'})
        }).catch(() => {
            res.send({err:-1,msg:'添加失败'})
        })
})
//猜你喜欢接口
router.get('/', (req, res) => {
    goodsModel.find().then((data) => {
        res.send({status:0,list:data})
    }).catch(() => {
        res.send({status:-1,msg:'加载商品失败'})
    })
})

module.exports = router;
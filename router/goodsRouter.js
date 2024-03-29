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
//随机获取商品接口
router.get('/', (req, res) => {
    goodsModel.aggregate([{$sample:{size:10}}]).then((data) => {
        res.send({err:0,list:data})
    }).catch(() => {
        res.send({err:-1,msg:'加载商品失败'})
    })
})
//商品详情接口
router.post('/detail', (req, res) => {
    let { _id } = req.body;
    if (_id) {
        goodsModel.findOne({_id}).then((data) => {
            res.send({err:0,data:data})
        })
    }
})
//查询一个数组用$in
router.post('/CartDetail', (req, res) => {
    let { goodsid } = req.body;
    if (goodsid) {
        goodsModel.find({_id:{$in:goodsid}}).then((data) => {
            res.send({err:0,data:data})
        })
    }
})

//分类查询商品
router.post('/category', (req, res) => {
    let { typeid } = req.body;
    goodsModel.find({ typeid }).then((data) => {
        res.send({err:0,data:data})
    }).catch(() => {
        res.send({err:-1,msg:'查询失败！'})
    })
})
//关键字搜索
router.post('/search', (req, res) => {
    let { kw } = req.body;
    let reg = new RegExp(kw);
    goodsModel.find({ $or: [{ name: { $regex: reg } }, { typename: { $regex: reg } }]}).then((data) => {
        res.send({err:0,data:data})
    }).catch(() => {
        res.send({err:-1,msg:'查询失败！'})
    })
})
module.exports = router;
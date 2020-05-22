const express = require('express')
const router = express.Router();
const addressModel = require('../db/model/addressModel')

//获取收货地址列表接口
router.get('/', (req, res) => {
    addressModel.find().then((data) => {
        res.send({err:0,data:data})
    }).catch(() => {
        res.send({err:-2,msg:'获取列表失败！'})
    })
})
//添加收货地址接口
router.post('/add', (req, res) => {
    let { name, phone, address, defaults } = req.body;
    if (defaults) {
        addressModel.updateMany({ defaults: true }, { $set: { defaults: false } })
            .then().catch((err) => {//一定要有.then惨痛的教训
            console.log(err)
        })
    }
    addressModel.insertMany({ name, phone, address,defaults}).then(() => {
        res.send({err:0,msg:'添加成功！'})
    }).catch(() => {
        res.send({err:-1,msg:'添加失败！'})
    })
})
//编辑地址接口
router.get('/edit', (req, res) => {
    let { id } = req.query
    addressModel.find({_id:id}).then((data) => {
        res.send({err:0,data:data})
    }).catch(() => {
        res.send({err:-2,msg:'获取列表失败！'})
    })
})
//保存更改接口
router.post('/editSave', (req, res) => {
    let { _id, name, phone, address, defaults } = req.body;
    if (defaults) {
        addressModel.updateMany({ defaults: true }, { $set: { defaults: false } })
            .then().catch((err) => {//一定要有.then惨痛的教训
            console.log(err)
        })
    }
    addressModel.updateOne({_id}, { name, phone, address, defaults }).then(() => {
        res.send({err:0,msg:'编辑成功！'})
    }).catch(() => {
        res.send({err:-1,msg:'编辑失败！'})
    })
})
//删除收货地址接口
router.post('/del', (req, res) => {
    let { _id } = req.body;
    addressModel.remove({ _id }).then(() => {
        res.send({err:0,msg:'删除成功！'})
    }).catch(() => {
        res.send({err:-1,msg:'删除失败'})
    })
})
module.exports = router;
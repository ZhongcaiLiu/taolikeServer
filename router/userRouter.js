const express = require('express');
const router = express.Router()
const userModel = require('../db/model/userModel');
const {SendEmail}=require('../utils/mail')
//注册接口
router.post('/register',async (req, res) => {
    let { email, password, code } = req.body;
    let a = await userModel.find({ email }).then((data) => {
        if (data.length!==0) {
            res.send({ err:-1,msg: '邮箱号已被注册' })
            return false;
        } else {
            return true;
        }
    }).catch((err) => {
        console.log(err)
    })
    if (!a) {
        return false;
    }
    if (email !== req.session.email || code !== req.session.code) {
        res.send({ msg: '验证码错误' })
        return false;
    }
    userModel.insertMany({ email, password }).then(() => {
        res.send({err:0,msg:'注册成功'})
    }).catch(() => {
        res.send({err:-1,msg:'注册失败'})
    })
})
//发送验证码接口
router.post('/verify', (req, res) => {
    let {email} = req.body;
    let code = Math.random().toString().substring(2, 6)
    req.session.code = code;
    req.session.email = email;
    SendEmail(email, '您的验证码是：' + code+',有效期5分钟').then(() => {
        res.send({err:0,msg:'验证码发送成功'})
    }).catch(() => {
        res.send({err:-1,msg:'验证码发送失败'})
    })
})
//登录接口
router.post('/login', (req, res) => {
    let { email, password } = req.body;
    userModel.findOne({ email }).then((data) => {
        if (password == data.password) {
            req.session.user = email; //用session保存登录状态
            res.send({err:0,msg:'登录成功'})
        } else {
            res.send({err:-1,msg:'邮箱或密码错误'})
        }
    }).catch(() => {
        res.send({err:-2,msg:'登录失败'})
    })
})
//验证码登录
router.post('/loginBycode', (req, res) => {
    let { email, code } = req.body;
    userModel.findOne({ email }).then((data) => {
        if (data.email === req.session.email && code === req.session.code) {
            req.session.user = email; //用session保存登录状态
            res.send({err:0,msg:'登录成功'})
        } else {
            res.send({err:-1,msg:'邮箱或验证码错误'})
        }
    })
})
//获取登录态
router.get('/getUser', (req, res) => {
    if (req.session.user) {
        res.send({err:0,msg:'获取用户信息成功',data:req.session.user})
    } else {
        res.send({err:-1,msg:'获取用户信息失败'})
    }
})
//登出
router.get('/loginOut', (req, res) => {
    req.session.user = '';
    res.send({err:0,msg:'退出成功'})
})
module.exports = router;
const express = require('express');
const db = require('./db/connect.js')
const app = new express()
const bodyParser = require('body-parser');
const session = require('express-session')

//引入bodyParser对post请求体解析
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))
// parse application/json
app.use(bodyParser.json())

app.use(session({ //配置session
    secret: 'vda￥%544%5#sad', //加密字符(越复杂越好)
    name:'sessionID',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 //一小时后过期
    }
}))

const goodsRouter = require('./router/goodsRouter');
const userRouter = require('./router/userRouter');
const addressRouter = require('./router/addressRouter')

app.use('/goods', goodsRouter);
app.use('/user', userRouter);
app.use('/address', addressRouter)

app.listen(3000, () => {
    console.log('serve start')
})
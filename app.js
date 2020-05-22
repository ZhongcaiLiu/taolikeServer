const express = require('express');
const db = require('./db/connect.js')
const app = new express()
const bodyParser = require('body-parser');

//引入bodyParser对post请求体解析
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


const goodsRouter = require('./router/goodsRouter');
const userRouter = require('./router/userRouter');
const addressRouter=require('./router/addressRouter')

app.use('/goods', goodsRouter);
app.use('/user', userRouter);
app.use('/address',addressRouter)

app.listen(3000, () => {
    console.log('serve start')
})
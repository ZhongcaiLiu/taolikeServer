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
const userrouter = require('./router/userRouter');

app.use('/goods', goodsRouter);
app.use('/user', userrouter);

app.listen(3000, () => {
    console.log('serve start')
})
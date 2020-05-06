const mongoose = require('mongoose');

let goodsschema =new mongoose.Schema({
    name: { type: String, required: true },
    price:{type:Number,required:true},
    img: {},
    buy_Num: { type: Number, required: true },
    sold_Num: { type: Number, required: true },
    discount:{type:Number,required:true},
    address:{type:String,required:true}
})

let goods = mongoose.model('goods', goodsschema);

module.exports = goods;
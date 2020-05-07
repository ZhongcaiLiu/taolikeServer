const mongoose = require('mongoose');

let goodsschema =new mongoose.Schema({
    name: { type: String, required: true },
    price:{type:String,required:true},
    img: {type:String,required:true},
    buy_Num: { type: Number, required: true },
    sold_Num: { type: Number, required: true },
    discount:{type:String},
    address: { type: String, required: true },
    typename: { type: String, required: true },
    typeid:{type:Number,required:true}
})

let goods = mongoose.model('goods', goodsschema);

module.exports = goods;
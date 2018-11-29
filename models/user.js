const mongoose = require('mongoose');
// 创建一个骨架 Schema，数据会按照这个骨架格式存储
let UserSchema = new mongoose.Schema({
    username: String,
    password: String
},{versionKey:false})

// 创建一个模型 (第三个参数很重要 如果不加，mongoose会自动给collection名末尾+ 's')
module.exports = mongoose.model("User", UserSchema, "user")
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({path:"./config.env"}); // 使用環境變數 process.env.Name

// 將 DB 資料及密碼替換成環境參數
const DB = process.env.Database.replace(
    '<password>', process.env.Database_pwd
)

mongoose
.connect(DB)
.then(() => console.log('資料庫連接成功'));

// :27017 是 mongoDB 預設 port
// /testPost 是 mongoDB 資料庫名稱
// mongoose
// .connect("mongodb://localhost:27017/testPost")
// .then(() => console.log('資料庫連接成功'));
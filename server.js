const http = require('http');
const mongoose = require('mongoose');
const Post = require('./models/post');
const dotenv = require('dotenv');

dotenv.config({path:"./config.env"}); // 使用環境變數 process.env.Name

// 將 DB 資料及密碼替換成環境參數
const DB = process.env.Database.replace(
    '<password>', process.env.Database_pwd
)

// :27017 是 mongoDB 預設 port
// /testPost 是 mongoDB 資料庫名稱
mongoose
.connect(DB)
.then(() => console.log('資料庫連接成功'));

const requestListener = async(req, res)=>{
  const headers = {
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'PATCH, POST, GET,OPTIONS,DELETE',
    'Content-Type': 'application/json'
  }
  let body = "";
  req.on('data', chunk=>{
      body+=chunk;
  })

  // http://127.0.0.1:3000/posts
  if(req.url=="/posts" && req.method == "GET"){
      const post = await Post.find();
      res.writeHead(200,headers);
      res.write(JSON.stringify({
          "status": "success",
          "post": post
      }));
      res.end();
  }else if(req.url=="/posts" && req.method == "POST"){
      req.on('end',async()=>{
          try{
              const data = JSON.parse(body);
              // if(data.content !== undefined){ // 判斷 content 是否為空
                  const newPost = await Post.create(
                    // create = insertOne(), insertMany()
                      {
                          name: data.name,
                          content: data.content,
                      }
                  );
                  res.writeHead(200,headers);
                  res.write(JSON.stringify({
                      "status": "success",
                      "data": newPost,
                  }));
                  res.end();
              // }else{
              //     res.writeHead(400,headers);
              //     res.write(JSON.stringify({
              //         "status": "false",
              //         "message": "欄位未填寫正確",
              //     }));
              //     res.end();
              // }
          }catch(error){
              res.writeHead(400,headers);
              res.write(JSON.stringify({
                  "status": "false",
                  "message": error, // 從 schema 定義的錯誤，由 mongoose 套件回傳錯誤
              }));
              res.end();
          }
      })
  }else if(req.url.startsWith("/posts/") && req.method=="DELETE"){
      const id = req.url.split('/').pop(); // 取出前台網址傳來的 id
      await Post.findByIdAndDelete(id); // 找到該 id 的資料並刪除
      res.writeHead(200,headers);
      res.write(JSON.stringify({
          "status": "success",
          "data": null,
      }));
      res.end();
  }else if(req.method == "OPTIONS"){
      res.writeHead(200,headers);
      res.end();
  }else{
      res.writeHead(404,headers);
      res.write(JSON.stringify({
          "status": "false",
          "message": "無此網站路由"
      }));
      res.end();
  }
}

// 開啟伺服器
const server = http.createServer(requestListener);
server.listen(process.env.PORT);
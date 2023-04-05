const Post = require('../models/post');

const routes = async(req, res)=>{
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

module.exports = routes;
const headers = require('../service/headers');
const handleSuccess = require('../service/handleSuccess');
const handleError = require('../service/handleError');
const Post = require('../models/post');

const routes = async(req, res)=>{

  let body = "";
  req.on('data', chunk=>{
      body+=chunk;
  })

  // http://127.0.0.1:3000/posts
  if(req.url=="/posts" && req.method == "GET"){
      const post = await Post.find();
      handleSuccess(res, post);
  }else if(req.url=="/posts" && req.method == "POST"){
      req.on('end',async()=>{
          try{
              const data = JSON.parse(body);
              if(data.content !== undefined){ // 判斷 content 是否為空
                  const newPost = await Post.create(
                    // create = insertOne(), insertMany()
                      {
                          name: data.name,
                          content: data.content,
                      }
                  );
                  handleSuccess(res, newPost);
              }else{
                handleError(res);
              }
          }catch(error){
            // error 是從 schema 定義的錯誤，由 mongoose 套件回傳錯誤
            console.log(error);
            handleError(res, error.message); // 要有 .message 錯誤訊息才會正確送出
          }
      })
  }else if(req.url.startsWith("/posts/") && req.method=="DELETE"){
      const id = req.url.split('/').pop(); // 取出前台網址傳來的 id
      await Post.findByIdAndDelete(id); // 找到該 id 的資料並刪除
      handleSuccess(res, null);
  }else if(req.method == "OPTIONS"){
      res.writeHead(200,headers);
      res.end();
  }else{
    errorRoutes = "無此網站路由"
    handleError(res, errorRoutes);
  }
}

module.exports = routes;
const HttpControllers = require('../controllers/http')
const PostsControllers = require('../controllers/posts')

const routes = async(req, res)=>{
  // const {url, method} = req // 傳入物件的解構 / req.url 可以簡寫成 url

  let body = "";
  req.on('data', chunk=>{
      body+=chunk;
  })

  // http://127.0.0.1:3000/posts
  if(req.url=="/posts" && req.method == "GET"){
    PostsControllers.getPosts({req, res})
  }else if(req.url=="/posts" && req.method == "POST"){
    req.on('end',async()=>{
        PostsControllers.createPosts({body, req, res}) // {body, req, res} 傳入物件的解構，用於傳進去的資料不確定順序時
      })
  }else if(req.url.startsWith("/posts/") && req.method=="DELETE"){
      const id = req.url.split('/').pop(); // 取出前台網址傳來的 id
      await Post.findByIdAndDelete(id); // 找到該 id 的資料並刪除
      handleSuccess(res, null);
  }else if(req.method == "OPTIONS"){ // 預檢
    HttpControllers.cors(req, res);
  }else{
    HttpControllers.notFound(req, res);
  }
}

module.exports = routes;
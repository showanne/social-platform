const handleSuccess = require('../service/handleSuccess');
const handleError = require('../service/handleError');
const Post = require('../models/post');

const posts = {
  async getPosts({req, res}) {
    const post = await Post.find();
    handleSuccess(res, post);
  },
  async createPosts({body, req, res}) {
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
  }
}

module.exports = posts;
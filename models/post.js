const mongoose = require('mongoose');

// 設定資料表欄位，並定義該欄位的限制 (守門員)
const postSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, '貼文姓名未填寫']
    },
    content: {
      type: String,
      required: [true, '貼文內容未填寫']
    },
    image: {
      type: String,
      default: ""
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false
    },
    tags: {
      type: Array,
      default:""
    },
    type: { // 貼文種類[friend(摯友)、group(社團)]
      type: String,
      default: ""
    },
    likes: {
      type: Number,
      default: 0
    },
    comments: {
      type: Number,
      default: 0
    }
  }
);

// 建立 model，設定連接 'Post' 資料庫，並執行要對該資料庫要做的事情
// 如果是 mongoose 幫忙建立資料庫，會將 collection 名稱改為小寫，並加上 's'，所以最終在資料庫會看到 'posts'
const Post = mongoose.model('Post', postSchema);

module.exports = Post
// 引入mongoose
const mongoose = require('mongoose')

// 引入mongoose.Schema模組
const Schema = mongoose.Schema

// 建構新的Schema
const todoSchema = new Schema({
  name: {
    type: String, // 資料型別是字串
    required: true // 這是個必填欄位
  },

  // 新增顯示是否為做完/沒做完
  isDone: {
    type: Boolean,
    default: false
  }
})

// 利用module.exports將Schema輸出並命名為'Todo'
module.exports = mongoose.model('Todo', todoSchema)
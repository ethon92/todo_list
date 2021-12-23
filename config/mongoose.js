// 載入mongoose
const mongoose = require('mongoose')

// 與mongodb連線
mongoose.connect('mongodb://localhost/todo_list')

// 取得資料庫連線狀態
const db = mongoose.connection

// 連線異常時提示訊息
db.on('error', () => {
  console.log('mongodb error!!')
})

// 連線成功時提示訊息
db.once('open', () => {
  console.log('mongodb connected!!')
})

module.exports = db
const mongoose = require('mongoose')
const Todo = require('../todo') // 載入 todo model

mongoose.connect('mongodb://localhost/todo_list')

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')

  // 利用for迴圈產生種子資料
  for (let i=0; i<10; i++) {
    Todo.create({ name: 'name-' + i }) // 利用mongoose中的create產生種子資料
  }

  // 完成時顯示的提示訊息
  console.log('done!')
})
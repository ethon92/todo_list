const Todo = require('../todo') // 載入 todo model
const db = require('../../config/mongoose') // 載入mongoose模組


db.once('open', () => {

  // 利用for迴圈產生種子資料
  for (let i=0; i<10; i++) {
    Todo.create({ name: 'name-' + i }) // 利用mongoose中的create產生種子資料
  }

  // 完成時顯示的提示訊息
  console.log('done!')
})
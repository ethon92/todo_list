// 載入express
const express = require('express')

// 引用express.Router()
const router = express.Router()

// 載入Todo model
const Todo = require('../../models/todo')

router.get('/', (req, res) => {
  Todo.find() // 取出Todo model中所有資料
    .lean() // 將mongoose model物件轉換成javascript陣列
    .sort({ _id: "asc" }) // asc為升冪排序(ascending)，desc為降冪排序(descending)
    .then(todos => res.render('index', { todos })) // 將資料傳入index
    .catch(error => console.error(error)) // 若發生錯誤時提示錯誤訊息
})

// 匯出路由模組
module.exports = router
// 載入express
const express = require('express')

// 引用express.Router()
const router = express.Router()

// 引入home模組
const home = require('./modules/home')

// 引入todos模組
const todos = require('./modules/todos')

// 將網址結構開頭為'/'的request導入home模組
router.use('/', home)

// 將網址結構開頭為'/todos'的request導入home模組
router.use('/todos', todos)

// 匯出路由器
module.exports = router
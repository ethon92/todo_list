const express = require('express')

// 載入mongoose
const mongoose = require('mongoose')

const exphbs = require('express-handlebars')
const { engine } = require('express/lib/application')

const app = express()
const port = 3000

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

// 載入exphs樣板引擎並指定附檔名為.hbs
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(port, () => {
  console.log('app is running on http://localhost:3000')
})
const express = require('express')

// 載入mongoose
const mongoose = require('mongoose')

const exphbs = require('express-handlebars')
// const { engine } = require('express/lib/application')

// 載入 body-parser
const bodyParser = require('body-parser')

// 載入 method-override
const methodOverride = require('method-override')

// 載入routes
const routes = require('./routes')

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

// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))

// 引用methodOverride中的_method
app.use(methodOverride('_method'))

// 引用routes
app.use(routes)

app.listen(port, () => {
  console.log('app is running on http://localhost:3000')
})
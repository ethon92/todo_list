const express = require('express')

// 載入mongoose
const mongoose = require('mongoose')

const exphbs = require('express-handlebars')
// const { engine } = require('express/lib/application')

// 載入 body-parser
const bodyParser = require('body-parser')

// 載入 method-override
const methodOverride = require('method-override')

// 載入Todo model
const Todo = require('./models/todo')

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

app.use(methodOverride('_method'))

app.get('/', (req, res) => {
  Todo.find() // 取出Todo model中所有資料
    .lean() // 將mongoose model物件轉換成javascript陣列
    .sort({ _id: "asc" }) // asc為升冪排序(ascending)，desc為降冪排序(descending)
    .then(todos => res.render('index', { todos }) ) // 將資料傳入index
    .catch(error => console.error(error)) // 若發生錯誤時提示錯誤訊息
})

// 設定新增todo頁面
app.get('/todos/new', (req, res) => {
  return res.render('new')
})

// 設定新增todo後的行為
app.post('/todos', (req, res) => {
  const name = req.body.name       // 從 req.body 拿出表單裡的 name 資料
  return Todo.create({ name })     // 將name存入資料庫
    .then(() => res.redirect('/')) // 新增完成後導回首頁
    .catch(error => console.log(error))
})

// 設定顯示詳細資訊頁面
app.get('/todos/:id', (req, res) => {
  const id = req.params.id // 將id從url中取出動態參數:id
  return Todo.findById(id) // 去資料庫中尋找id
    .lean() // 將資料轉換成JS物件
    .then((todo) => res.render('detail', { todo })) // 將資料渲染至detail頁面
    .catch(error => console.log(error)) // 錯誤提示訊息
})

// 設定顯示修改資料頁面
app.get('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render('edit', { todo }))
    .catch(error => console.log(error))
})

// 設定修改資料後傳送到資料庫的行為
app.put('/todos/:id', (req, res) => {
  const id = req.params.id
  const {name, isDone} = req.body // 利用解構賦值將name/isDone取出
  return Todo.findById(id) // 去資料庫尋找出該筆資料後，再重新覆值並儲存
    .then(todo => {
      todo.name = name
      todo.isDone = isDone === "on" // 當checkbox打勾時回傳值為on
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${id}`)) // 完成後返回詳細頁面
    .catch(error => console.log(error)) // 錯誤提示訊息
})

// 設定刪除資料的行為
app.delete('/todos/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id) // 去資料庫尋找該筆資料
    .then(todo => todo.remove()) // 再將該筆資料刪除
    .then(() => res.redirect('/')) // 刪除後重新導向回首頁
    .catch(error => console.log(error)) // 錯誤提示訊息
})

app.listen(port, () => {
  console.log('app is running on http://localhost:3000')
})
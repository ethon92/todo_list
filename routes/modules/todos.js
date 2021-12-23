const express = require('express')
const router = express.Router()

const Todo = require('../../models/todo')

// 設定新增todo頁面
router.get('/new', (req, res) => {
  return res.render('new')
})

// 設定新增todo後的行為
router.post('/', (req, res) => {
  const name = req.body.name       // 從 req.body 拿出表單裡的 name 資料
  return Todo.create({ name })     // 將name存入資料庫
    .then(() => res.redirect('/')) // 新增完成後導回首頁
    .catch(error => console.log(error))
})

// 設定顯示詳細資訊頁面
router.get('/:id', (req, res) => {
  const id = req.params.id // 將id從url中取出動態參數:id
  return Todo.findById(id) // 去資料庫中尋找id
    .lean() // 將資料轉換成JS物件
    .then((todo) => res.render('detail', { todo })) // 將資料渲染至detail頁面
    .catch(error => console.log(error)) // 錯誤提示訊息
})

// 設定顯示修改資料頁面
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render('edit', { todo }))
    .catch(error => console.log(error))
})

// 設定修改資料後傳送到資料庫的行為
router.put('/:id', (req, res) => {
  const id = req.params.id
  const { name, isDone } = req.body // 利用解構賦值將name/isDone取出
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
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id) // 去資料庫尋找該筆資料
    .then(todo => todo.remove()) // 再將該筆資料刪除
    .then(() => res.redirect('/')) // 刪除後重新導向回首頁
    .catch(error => console.log(error)) // 錯誤提示訊息
})

module.exports = router
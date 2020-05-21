const express = require('express')
const app = express()
const port = 3000
const mysql = require('mysql')

// 解决跨域
app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin','*'); 
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'x-requested-with, content-type'); 
    next();
})
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'beike'
})

connection.connect()
// 首页数据接口
app.get('/index', (req, res) => {
    connection.query('select * from house_secondary', function (err, result) {
        const obj={
            status: 200,
            data: result
        }
        res.json(obj)
    })
})
// 登录数据接口
app.get('/login', (req, res) => {
    // console.log(req.query.phone)
    connection.query("select * from user where phone='"+req.query.phone+"'", function (err, result) {
        const obj={
            status: 200,
            data: result
        }
        res.json(obj)
    })
})
// 注册数据接口
app.get('/registered', (req, res) => {
    // console.log(req.query.phone)
    connection.query("INSERT INTO user (password, phone) VALUES ("+req.query.password+", "+req.query.phone+")", function (err, result) {
        const obj={
            status: 200,
            data: result
        }
        res.json(obj)
    })
})
// 商品办公
app.get('/city', (req, res, next) => {
    connection.query("select * from city_shang where num='" + req.query.num + "'", (err, result) => {
        res.json(result)
    })
})
app.get('/list', (req, res, next) => {
    connection.query("select * from list_shang where num='" + req.query.num + "'", (err, result) => {
        res.json(result)
    })
})
// 二手房
app.get('/ershoufang', (req, res) => {
    connection.query('select * from ershoufang', function (err, result) {
        const obj = {
            status: 200,
            data: result
        }
        res.json(obj)
    })
});
app.get('/details', (req, res) => {
    connection.query("select * from ershoufang where id='"+req.query.id+"'", function (err, result) {
        const obj = {
            status: 200,
            data: result
        }
        res.json(obj)
    })
});
app.get('/xinfang', (req, res) => {
    connection.query("select * from xinfang", function (err, result) {
        const obj = {
            status: 200,
            data: result
        }
        res.json(obj)
    })
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
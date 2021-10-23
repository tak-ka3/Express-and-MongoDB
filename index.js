let express = require("express")
let app = express()
let port = process.env.PORT || 8888
let mongoose = require("mongoose")
let Task = require("./api/models/taskModel") // 作成したModelの読み込み

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://mongo:27017/Tododb")
    .then(() => console.log("connect successfully"))
    .catch((error) => console.log(error))

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let routes = require("./api/routes/taskRoutes"); // Routeのインポート
routes(app); //appにRouteを設定する。

app.listen(port); // appを特定のportでlistenさせる。

console.log("todo list RESTful API server started on: " + port);
// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const User = require('./models/user');

// mongoose.connect('mongodb://127.0.0.1:27017/user', () => {
//     console.log('ok!!!')
// });
// app.use(bodyParser.urlencoded({extended:false}));
// app.use(bodyParser.json());

// app.get('/', (req, res) => {
//   res.send('good')
//   console.log('hello')
// })

// app.post('/api/v1/create-user', (req, res) =>{
//   if (!req.body){
//       return res.status(500).send('reqest body empty.');
//   }

//   const instance = new User();
//   instance.name = req.body.name;
//   instance.age = req.body.age;
//   // MongoDBに保存
//   instance.save((err) => {
//       if(!err) {
//           return res.status(200).send('user create success.');
//       } else {
//           return res.status(500).send('user create faild.');
//       }
//   });
// });

// app.get('/api/v1/get-all-user', (req, res) =>{
//   User.find((err, result) => {
//       if(!err) {
//           return res.json(result);
//       } else {
//           return res.status(500).send('get all user faild.');
//       }
//   });
// });

// app.listen(8888, () => console.log('Listening on port 8888'));
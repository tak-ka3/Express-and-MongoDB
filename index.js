const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/user');

mongoose.connect('mongodb://127.0.0.1:27017/user', () => {
    console.log('ok!!!')
});
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('good')
  console.log('hello')
})

app.post('/api/v1/create-user', (req, res) =>{
  if (!req.body){
      return res.status(500).send('reqest body empty.');
  }

  const instance = new User();
  instance.name = req.body.name;
  instance.age = req.body.age;
  // MongoDBに保存
  instance.save((err) => {
      if(!err) {
          return res.status(200).send('user create success.');
      } else {
          return res.status(500).send('user create faild.');
      }
  });
});

app.get('/api/v1/get-all-user', (req, res) =>{
  User.find((err, result) => {
      if(!err) {
          return res.json(result);
      } else {
          return res.status(500).send('get all user faild.');
      }
  });
});

app.listen(8888, () => console.log('Listening on port 8888'));

// const express = require("express")
// const mongoose = require("mongoose")

// const app = express()

// mongoose.connect('mongodb://localhost:27017/test_db', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// mongoose.Promise = global.Promise

// app.get("/", (req, res) => {
//   res.send("<h2>Hi There</h2>");
// })

// // このportはコンテナ側のポートっぽい
// const port =  process.env.PORT || 3000

// app.listen(port, () => console.log(`listening on port ${port}`))


let express = require("express")
let app = express()
let port = process.env.PORT || 8888
let mongoose = require("mongoose")
// let Task = require("./api/models/taskModel") // 作成したModelの読み込み

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
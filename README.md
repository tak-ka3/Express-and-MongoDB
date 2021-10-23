# Express(Node.js) & MongoDB API using Docker

### How to run
```bash
docker-compose build
docker-compose up -d api
```

### Configure API call
```bash
# GET
$ curl localhost:8888/tasks
# POST
$ curl -X POST -H "Content-Type: application/json" -d '{"name": "test3"}' localhost:8888/tasks 
# PUT
$ curl -X PUT -H "Content-Type: application/json" -d '{"name": "test updated"}' localhost:8888/tasks/61739267ba4b5cfc48dc395a
# DELETE
$ curl -X DELETE -H "Content-Type: application/json" localhost:8888/tasks/61739267ba4b5cfc48dc395a
```

### 初期設定
```bash
npm init
npm install express
touch index.js
```
### dockerの一連の操作
```bash
docker build -t node-app-image .
docker images
# 3000:3000が最初がホストで二つ目がコンテナ
# -v はボリュームを表し、(A):(B)で、Aの変更を自動的にBに反映させてくれる
docker run -v $(pwd):/app -p 3000:3000 -d --name node-app node-app-image
docker exec -it node-app bash // -itはインタラクティブという意味らしい
# コンテナの停止し、イメージも消す
docker rm node-app -f 
```
### Dockerfile
- RUNはビルド時に実行され、CMDは完成したイメージからコンテナを作成する時に実行される。
### docker-compose.yml
- container_name = コンテナの名前で、`docker-compose ps`を実行した時などに表示される。
- restart: always = Dockerデーモンの起動時やホストOSの起動時に自動的にコンテナを開始することができる。
- volumes = コンテナのライフサイクルが終了した後でもデータを保管しておけるデータ領域。今回は`docker-compose.yml`のトップレベルの行で定義しているので、このvolumesは複数のコンテナから参照できる。
### ローカルのファイルがコンテナに自動で反映されるようにする。
```bash
npm install nodemon --save-dev
```
### package.json
- これが表しているのは、`npm run start`もしくは`npm start`で`node index.js`が実行され、`npm run dev`で`nodemon index.js`が実行されるという意味。実際には、startの方は不要なので、消しても良い。
```json
"scripts": {
  "start": "node index.js",
  "dev": "nodemon index.js"
}
```
- "type"はcommonjsだとimportを標準として、moduleだとrequireを標準としている。
- 上に関して補足で、例外的に`npm start`, `npm test`, `npm restart`, `npm stop`は`npm run xxx`と同じ意味。つまり`run`をつける必要がないもの。

### エラー
- `[nodemon] app crashed - waiting for file changes before starting...`というエラーが出たが、この前に`MongooseServerSelectionError: connect ECONNREFUSED 127.0.0.1:27017`というエラーが出ていて、原因は、index.jsのconnectするURLを"mongodb://mongo:27017/Tododb"ではなく、"localhost://mongo:27017/Tododb"にしてしまっていたところにあった。
- `nodeman`使っているのに変更がすぐに反映されない。

### 参照
- [github](https://github.com/webdevjourneyWDJ/Docker_Projects)
- [qiita](https://qiita.com/k-penguin-sato/items/5d0db0116843396946bd)
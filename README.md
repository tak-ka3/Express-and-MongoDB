### 初期設定
```
npm init
npm install express
touch index.js
```
### dockerの一連の操作
```bash
docker build -t node-app-image .
docker images
// 3000:3000が最初がホストで二つ目がコンテナ
// -v はボリュームを表し、(A):(B)で、Aの変更を自動的にBに反映させてくれる
docker run -v $(pwd):/app -p 3000:3000 -d --name node-app node-app-image
docker exec -it node-app bash // -itはインタラクティブという意味らしい
// コンテナの停止し、イメージも消す
docker rm node-app -f 
```
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
- `[nodemon] app crashed - waiting for file changes before starting...`
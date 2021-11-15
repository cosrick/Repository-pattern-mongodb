import * as dotenv from 'dotenv';
import express, { json, urlencoded } from 'express';
dotenv.config({ path: __dirname + '../.env' });

const app = express();

const port = process.env.NODE_DOCKER_PORT || 3000;

// For parsing application/json
app.use(json());

// For parsing application/x-www-form-urlencoded
app.use(urlencoded({ extended: true }));

app.get('/', function (_req, res) {
  res.send('Hello World!!');
});

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
  console.log('wwwww');
});
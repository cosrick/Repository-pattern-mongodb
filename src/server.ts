import * as dotenv from 'dotenv';
import express, { json, urlencoded } from 'express';
dotenv.config({ path: __dirname + '../.env' });
import { adminRouter } from './routers';

const app = express();

const port = process.env.NODE_DOCKER_PORT || 3000;

// For parsing application/json
app.use(json());

// For parsing application/x-www-form-urlencoded
app.use(urlencoded({ extended: true }));

app.use('/api', adminRouter);

app.get('/', function (_req, res) {
  res.send('Hello World!!');
});

app.listen(port, function () {
  console.log(`Server listening on port ${port}!`);
});
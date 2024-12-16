// This file shoudbConnectionld set up the express server as shown in the lecture code
import express from 'express';
const app = express();
import configRoutesFunction from './routes/index.js';
import 'dotenv/config'

app.use(express.json());

//log all request bodies, as well as the url path they are requesting, and the HTTP verb they are using to make the request
app.use(async (req, res, next) => {
  const method = req.method;
  const route = req.originalUrl;
  console.log(`${method} request made at: ${route}`);
  if (req.body && Object.keys(req.body).length > 0) {
    console.log(req.body);
  }
  next();
});

configRoutesFunction(app);
app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000\n');
});
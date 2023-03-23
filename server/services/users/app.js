const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./routers');
const { mongoConnect } = require('./config/mongoConnection');
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(router);

mongoConnect()
  .then(() => app.listen(port, () => console.log('connected to ' + port)))
  .catch(err => console.log(err)); 
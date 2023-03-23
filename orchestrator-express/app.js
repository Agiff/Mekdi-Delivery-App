const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const axios = require('axios');

const entityUrl = 'http://localhost:3000/';
const userUrl = 'http://localhost:3001/';

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/items', async (req, res) => {
  try {
    const { data } = await axios.get(entityUrl + 'items');
    const response = await axios.get(userUrl + 'users');
    const items = data.map(el => {
      response.data.forEach(user => {
        if (el.authorId === user._id) {
          el.User = user;
        }
      });
      return el;
    })
    res.status(200).json(items);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
})

app.get('/items/:id', async (req, res) => {
  try {
    const { data } = await axios.get(entityUrl + 'items/' + req.params.id);
    const response = await axios.get(userUrl + 'users/' + data.authorId);
    data.User = response.data;
    res.status(200).json(data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
})

app.post('/items', async (req, res) => {
  try {
    const { data } = await axios.post(entityUrl + 'items', req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
})

app.listen(port, () => console.log('orchestrator is running on ' + port));
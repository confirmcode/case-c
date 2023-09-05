const express = require('express')
const cors = require('cors')
const app = express()
const port = 3500

app.use(cors());

const habr = require('./habr-rss');

app.get('/', (req, res) => {
  res.send('-');
})

app.get('/habr/', habr.list);
app.get('/habr/:id', habr.get);

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
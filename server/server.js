const path = require('path');
var express = require('express');

const publicPath = path.join(__dirname, '../public')

var app = express();
const port = process.env.PORT || 3000;

app.use(express.static(publicPath)); // map /public on main path

app.get('/', (req, res) => {
  res.send('Hello on the chat server');
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`)
});

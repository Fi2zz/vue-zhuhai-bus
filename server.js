const express = require('express');
const app = express();


const path = require('path')
const cors = require('cors');
const get = require('./server/http.get.js');

const bus = require('./server/api');
app.use(express.static(path.join(__dirname, 'dist')));
//跨域解决方案
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST']
}));


app.get('*', (req, res) => {
  const params = req.params;
  const query = req.query;
  const queryPath = req.path;
  // console.log(req.query,req.path,req.params)
  if (req.path === '/bus/') {

    bus({
      name: query.name,
      from: query.from,
      key: query.type
    }).then(resp => {
      res.send(resp)
    })
  }

});


app.listen(8000, 'localhost', function (err) {
  if (err) {
    console.log(err);
    process.exit();
  }
  console.log(`>Server is running on http://localhost:8000/`)
});

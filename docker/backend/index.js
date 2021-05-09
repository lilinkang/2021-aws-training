const app = require('express')();
const http = require('http').createServer(app);

app.get('/api', (req, res) => {
  res.json({
    version: '1.0.0'
  })
});

http.listen(3001, () => {
  console.log('listening on *:3001');
});


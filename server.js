var server = require('http').createServer()
  , url = require('url')
  , WebSocketServer = require('ws').Server
  , wss = new WebSocketServer({ server: server })
  , express = require('express')
  , app = express()
  , port = 8080;

app.use(function (req, res) {
  res.send({ msg: "hello" });
});

var clients = [];
wss.on('connection', function connection(ws) {
  clients.push(ws);

  ws.on('message', function incoming(message) {
    clients.forEach(function (client) {
      client.send(message);
    })
  });
});

server.on('request', app);
server.listen(port, function () { console.log('Listening on ' + server.address().port) });
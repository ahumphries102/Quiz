const restify = require('restify');
const mongoose = require('mongoose')
const server = restify.createServer({
  name: 'myapp',
  version: '1.0.0'
});
 
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());
 
server.get('/echo/:name', function (req, res, next) {
  res.send(req.body);
  return next();
});

const uri = 'mongodb+srv://foonakie:Cameraball1!@quizcluster-rrgqn.mongodb.net/test?retryWrites=true&w=majority'


mongoose.connect(uri, 
    {useNewUrlParser:true, useUnifiedTopology:true},
    ()=>console.log('we connected'))

let db = mongoose.connection
db.once('open', ()=>console.log('did open work?'))

server.listen(3000, function () {
  console.log('%s listening at %s', server.name, server.url);
});
const restify = require('restify');
const mongoose = require('mongoose')
const db = mongoose.connection
const router = require('./routes')
let PORT = process.env.PORT || process.env.VUE_APP_HOST

require('dotenv').config()

const server = restify.createServer({
    name: 'myapp',
    version: '1.0.0'
})

server.use(restify.plugins.acceptParser(server.acceptable))
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());
router.applyRoutes(server)
const uri = process.env.SERVER

mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex:true
    },
    () => console.log('Database connected'))

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log('mongoose is connected')
})

server.get('/*', restify.plugins.serveStatic({
    directory: './dist',
    default: 'index.html',
  }));

server.listen(PORT, function () {
    console.log('%s listening at %s', server.name, server.url);
});
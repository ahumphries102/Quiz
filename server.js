const restify = require('restify');
const mongoose = require('mongoose')
const db = mongoose.connection
const router = require('./routes')

const server = restify.createServer({
    name: 'myapp',
    version: '1.0.0'
})

server.use(restify.plugins.acceptParser(server.acceptable))
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());
router.applyRoutes(server)
const uri = 'mongodb+srv://foonakie:Cameraball1!@quizcluster-rrgqn.mongodb.net/quizColl?retryWrites=true&w=majority'

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


server.listen(3000, function () {
    console.log('%s listening at %s', server.name, server.url,router);
});
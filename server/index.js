var self = {};
var DataBase = require('./database').DataBase;
var Collection = require('./collection').Collection;
var WebSocketServer = require('websocket').server;

const app = require('express')();
const cors = require('cors');
const http = require('http');

const bodyParser = require('body-parser');

const db = new DataBase('mongodb://mongo:27017/');
const collection = new Collection(db);

app.use(bodyParser.urlencoded(
	{extended: false}
));
app.use(bodyParser.json());

const clientUrl = 'http://localhost:8081';
const corsOptions = cors({
	origin: clientUrl,
	optionsSuccessStatus: 200
});

app.use(cors);
app.all('/*',function(req,res,next) {
	res.header('Access-Control-Allow-Origin',clientUrl);
	res.header('Access-Control-Allow-Headers','X-Requested-With');
	return next();
});

app.listen(3000);

const connections = new Set();
const lastModification = 0;

const server = http.createServer(app);

const socket = new WebSocketServer(
	{httpServer: server}
);

server.listen(8999,function() { return console.log(("Server started on port " + (server.address().port) + " :)")); });

const observerConnections = function(resource) { return connections.forEach(function(connection) { return connection.send(resource); }); };

socket.on('connection',function(request) {
	
	const connection = request;
	connections.add(connection);
	collection.getContent().then(
		function(resource) { return connection.send(self.res().json(resource)); },
		function(err) { return self.res().json('error',err); }
	);
	
	return socket.on('close',function(request) { return connections.delete(connection); });
});

app.get('/elements',corsOptions,function(req,res) {
	return collection.getContent().then(
		function(resource) { return res.json(resource); },
		function(err) { return res.json('error',err); }
	);
});

app.post('/elements',corsOptions,function(req,res) {
	return collection.setContent(req.body().order()).then(
		function(resource) { return observerConnections(JSON.stringify(resource)); },
		function(err) { return res.json('error',err); }
	);
});

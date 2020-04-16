var DataBase = require('./database').DataBase;
var WebSocketServer = require('websocket').server;

const app = require('express')();
const cors = require('cors');
const http = require('http');

const bodyParser = require('body-parser');

const db = new DataBase('mongodb://mongo:27017/');

app.use(bodyParser.urlencoded(
	{extended: false}
));
app.use(bodyParser.json());

const clientUrl = 'http://localhost:8081';
const corsOptions = {
	origin: clientUrl,
	optionsSuccessStatus: 200
};

app.use(cors);
app.all('/*',function(req,res,next) {
	res.header('Access-Control-Allow-Origin',clientUrl);
	res.header('Access-Control-Allow-Headers','X-Requested-With');
	return next();
});


const connections = new Set();
const lastModification = 0;

const server = http.createServer(app);

const socket = new WebSocketServer(
	{httpServer: server}
);

server.listen(8999,function() { return console.log(("Server started on port " + (server.address().port) + " :)")); });


socket.on('connection',function(request) {
	
	const connection = request;
	connections.add(connection);
	// запросы к базе по текущему состоянию
	
	return socket.on('close',function(request) {  }); // connections.delete connection
});

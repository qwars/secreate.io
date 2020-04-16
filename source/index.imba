import DataBase from './database'
import server as WebSocketServer from 'websocket'

const app = require( 'express' )()
const cors = require 'cors'
const http = require 'http'

const bodyParser = require 'body-parser'

const db = DataBase.new 'mongodb://mongo:27017/'

app.use bodyParser.urlencoded
	extended: false
app.use bodyParser.json

const clientUrl = 'http://localhost:8081'
const corsOptions =
	origin: clientUrl
	optionsSuccessStatus: 200

app.use cors
app.all '/*', do |req, res, next|
	res.header 'Access-Control-Allow-Origin', clientUrl
	res.header 'Access-Control-Allow-Headers', 'X-Requested-With'
	next()


const connections = Set.new
const lastModification = 0

const server = http.createServer app

const socket = WebSocketServer.new
	httpServer: server

server.listen 8999, do console.log "Server started on port { server.address:port } :)"


socket.on 'connection', do|request|

	const connection = request
	connections.add connection
	# запросы к базе по текущему состоянию

	socket.on 'close', do|request| # connections.delete connection

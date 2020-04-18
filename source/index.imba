# import DataBase from './database'
import Collection from './collection'
import server as WebSocketServer from 'websocket'

const app = require( 'express' )()
const cors = require 'cors'
const http = require 'http'

const bodyParser = require 'body-parser'

# const db = DataBase.new 'mongodb://mongo:27017/'
const collection = Collection.new null

app.use bodyParser.urlencoded
	extended: false
app.use bodyParser.json

const clientUrl = 'http://localhost:3000'
const corsOptions = cors {
	origin: clientUrl
	optionsSuccessStatus: 200
}

app.use cors()
app.all '/*', do |req, res, next|
	res.header 'Access-Control-Allow-Origin', clientUrl
	res.header 'Access-Control-Allow-Headers', 'X-Requested-With'
	next()

app.listen 3000, do console.log "Server started on port  3000 :)"

const connections = Set.new

const server = http.createServer app

const socket = WebSocketServer.new
	httpServer: server

server.listen 8999, do console.log "Server started on port { server.address:port } :)"

const observerConnections = do|resource| connections.forEach do |connection| connection.send resource

socket.on 'request', do|request|

	const connection = request.accept null, request:origin
	connections.add connection
	collection.getContent.then
		do|resource| connection.send JSON.stringify resource
		do|err| res.json 'error',  err

	socket.on 'close', do|request| connections.delete connection

app.get '/', corsOptions, do|req, res|
	collection.getContent.then
		do|resource| res.json resource
		do|err| res.json 'error', err

app.post '/', corsOptions, do|req, res|
	observerConnections JSON.stringify collection.setContent req:body



import MongoClient, ObjectID from 'mongodb'

export class DataBase

	def initialize url
		MongoClient.connect url, { useNewUrlParser: true, useUnifiedTopology: true }, do | err, client |
			if err then console.log err
			else @client = client.db 'secreate'
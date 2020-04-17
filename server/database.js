
var mongodb$ = require('mongodb'), MongoClient = mongodb$.MongoClient, ObjectID = mongodb$.ObjectID;

function DataBase(url){
	var self = this;
	MongoClient.connect(url,{useNewUrlParser: true,useUnifiedTopology: true},function(err,client) {
		if (err) { return console.log(err) } else {
			return self._client = client.db('secreate');
		};
	});
};
exports.DataBase = DataBase; // export class 



function Collection(dbi){
	this._dbi = dbi;
};
exports.Collection = Collection; // export class 
Collection.prototype.__content = {'default': new Array(20).fill(0).map(function() {
	return new Array(10).fill(0).map(function() {
		return Math.random();
	}).map(function(n) {
		return Math.random() * ((Number(n.toFixed(1)) === 0.5) ? 0 : (((n > 0.5) ? 1 : (-1))));
	});
}),name: 'content'};
Collection.prototype.content = function(v){ return this._content; }
Collection.prototype.setContent = function(v){ this._content = v; return this; }
Collection.prototype._content = new Array(20).fill(0).map(function() {
	return new Array(10).fill(0).map(function() { return Math.random(); }).map(function(n) {
		return Math.random() * ((Number(n.toFixed(1)) === 0.5) ? 0 : (((n > 0.5) ? 1 : (-1))));
	});
});

Collection.prototype.getContent = function (){
	var self = this;
	return new Promise(function(resolve,reject) {
		return resolve(self.content());
	});
};

Collection.prototype.setContent = function (data){
	return this._content = data;
};



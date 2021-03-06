var Term_diff = module.exports = function() {
	this.textArray = [];
};

var Event = require('./lib/Event');

var _ = require('underscore');

Term_diff.prototype = new Event();

Term_diff.prototype.reset = function(text) {
	var isArr = _(text).isArray();
	
	this.textArray = isArr ? text : text.split('');
	this.trigger('reset', isArr ? text.join('') : text);
};

Term_diff.prototype.update = function(text) {
	var diff = [];
	if( _(text).isArray() ) text = text.split('\n');
	_(text).each(function(line, index) {

		//If the line hasn't changed, ignore.
		if(index in this.textArray && this.textArray[index] === line) return;

		//Otherwise, record the new line
		this.textArray[index] = line;

		//And add it to the diff.
		diff.push({
			line: index,
			content: line
		});
	}.bind(this));
	this.trigger('update',diff);
};


Term_diff.prototype.text = function() {
	return this.textArray.join('');
};

var expect = require('chai').expect;
var Term_diff = require('../index');

describe("Term_diff", function() {
	it('exists', function() {
		expect(typeof Term_diff).equal('function');
	});

	var td;

	beforeEach(function() {
		td = new Term_diff();
	});

	describe('text', function() {
		it('returns the current text', function() {
			td.textArray = ['asdf'];
			expect(td.text()).equal('asdf');
		});
	});
			

	describe('reset', function() {
		it('sets the textArray', function() {
			td.reset('asdf');
			expect(td.text()).equal('asdf');
		});
		it('triggers reset event', function() {
			var reset = false;
			td.on('reset', function() {
				reset = true;	
			});
			td.reset('hi');
			expect(reset).equal(true);
		});	
		it('reset event carries text as arg', function() {
			var newText = '';
			td.on('reset', function(text) {
				newText = text;
			});
			td.reset('hi');
			expect(newText).equal('hi');
		});	
	});	
	describe('update', function() {
		it('updates the text', function() {
			td.update('hello');
			expect(td.text()).equal('hello');
		});
		it('triggers an update event', function() {
			var update = false;
			td.on('update', function() {
				update = true;	
			});
			td.update('hello');
			expect(update).equal(true);
		});
		it('update event carries an array with the diff', function() {
			var diff;
			td.on('update', function(newDiff) {
				diff = newDiff;
			});
			td.update('hello');
			expect(diff[0].line).equal(0);
		});

	});


});

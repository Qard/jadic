var assert = require('assert')
	, jadic = require('../')
	, fs = require('fs')

describe('jadic.build', function () {
	var action
	beforeEach(function () {
		action = jadic.build({
			input: __dirname + '/input'
			, output: __dirname + '/output'
		})
	})

	it('should complete build', function (done) {
		action.on('done', done)
	})

	it('should match contents', function (done) {
		action.on('done', function () {
			fs.readFile(__dirname + '/output/index.html', function (err, data) {
				assert.equal('<!DOCTYPE html><html><head><title>Foo</title></head><body>bar</body></html>', data)
				done()
			})
		})
	})

	it('should maintain directory structure', function (done) {
		action.on('done', function () {
			fs.readFile(__dirname + '/output/sub/dir.html', function (err, data) {
				assert.equal('<!DOCTYPE html><html><head><title>Foo</title></head><body>baz</body></html>', data)
				done()
			})
		})
	})
})
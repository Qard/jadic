var jade = require('jade')
	, events = require('events')
	, mkdirp = require('mkdirp')
	, path = require('path')
	, glob = require('glob')
	, fs = require('fs')

// Helper to run a wrapped function after `t` calls
function after (t, fn) {
  if (t <= 0) return fn()
  return function () {
    if (--t < 1) fn()
  }
}

exports.build = function (opts) {
	var emitter = new events.EventEmitter

	// Glob for all jade files in the input path
	glob(opts.input + '/**/*.jade', function (err, files) {
		if (err) return emitter.emit('error', err)

		// Relativize file paths
		files = files.map(function (file) {
			return file.replace(new RegExp('^' + opts.input + '/'), '')
		})

		// If a fileFilter has been supplied, filter paths
		if (opts.fileFilter) {
			files = files.filter(opts.fileFilter)
		}

		// Create a wrapped function to emit the done event when all files are built
		var done = after(files.length, function () {
			emitter.emit('done')
		})

		// Loop through all files
		files.forEach(function (file) {
			var inPath = path.join(opts.input, file)
				, ext = path.extname(file)
				, basename = path.basename(file, ext)

			// Read data in
			fs.readFile(inPath, function (err, data) {
				if (err) return emitter.emit('error', err)

				// Compile jade template
				var fn = jade.compile(data.toString(), {
					filename: inPath
				})

				// Build to output text
				try { var text = fn(opts.locals || {}) }
				catch (e) { return emitter.emit('error', e) }

				// Make path recursively
				var outBase = path.join(opts.output, path.dirname(file))
				mkdirp(outBase, function (err) {
					if (err) return emitter.emit('error', err)

					// Then write to file
					var outPath = path.join(outBase, basename + '.html')
					fs.writeFile(outPath, text, function (err, data) {
						if (err) return emitter.emit('error', err)
						emitter.emit('file', path.join(path.dirname(file), basename + '.html'), text)
						done()
					})
				})
			})
		})
	})

	return emitter
}
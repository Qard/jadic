# Jadic
[![Build Status](https://travis-ci.org/Qard/jadic.png)](https://travis-ci.org/Qard/jadic)

Jadic is a simple build tool to compile a directory full of jade templates to html files.

## Install

    npm install jadic

## Usage
    
    var action = jadic.build({
      input: process.cwd() + '/input'
      , output: process.cwd() + '/output'

      , locals: {
        author: 'Stephen Belanger'
      }
    })

    action.on('file', function (file) {
      console.log('Built', file)
    })

    action.on('done', function () {
      console.log('Build complete')
    })

## API

### jadic.build(opts) returns event emitter
There's not really much to it. Give it an input folder and an output folder, and optionally some locals to pass to every jade template, and it'll do it's thing.

---

### Copyright (c) 2013 Stephen Belanger
#### Licensed under MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
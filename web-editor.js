#!/usr/bin/env node
require('./dist/main.js').handler(__dirname, process.argv[2] || '3000', process.argv[3] || 'localhost')

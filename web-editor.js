#!/usr/bin/env node
const main = require('./dist/main.js').handler
const program = require('commander')

program
    .version('0.0.1')
    .parse(process.argv)

main(__dirname, process.argv[2] || '3000', process.argv[3] || 'localhost')

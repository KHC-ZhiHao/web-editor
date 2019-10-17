"use strict";
exports.__esModule = true;
var fs = require("fs");
var child_process_1 = require("child_process");
var menu_1 = require("./menu");
var server_1 = require("./server");
function handler(filePath, port, ip) {
    var menu = new menu_1["default"]();
    var server = new server_1["default"](filePath, port, ip);
    server.get('menu', function (request, response) {
        response.status(200).send(menu.get());
    });
    server.get('open', function (request, response) {
        var path = request.query.path;
        fs.readFile(path, function (error, result) {
            if (error) {
                response.status(500).send(error);
            }
            else {
                response.status(200).send({ text: result.toString('utf8') });
            }
        });
    });
    server.post('save', function (request, response) {
        var path = request.body.path;
        var data = request.body.data;
        fs.writeFile(path, data, function (error) {
            if (error) {
                response.status(500).send(error);
            }
            else {
                response.status(200).send();
            }
        });
    });
    server.post('command', function (request, response) {
        var command = request.body.command;
        child_process_1.exec(command, function (error, result) {
            if (error) {
                response.status(500).send(error);
            }
            else {
                response.status(200).send(result);
            }
        });
    });
}
exports.handler = handler;

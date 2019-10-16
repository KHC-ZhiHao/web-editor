"use strict";
exports.__esModule = true;
var fs = require("fs");
var menu_1 = require("./menu");
var server_1 = require("./server");
function handler(filePath, port) {
    var menu = new menu_1["default"]();
    var server = new server_1["default"](filePath, port);
    server.get('menu', function (request, response) {
        response.status(200).send(menu.get());
    });
    server.get('open', function (request, response) {
        var path = request.query.path;
        var text = fs.readFileSync(path, 'utf8');
        response.status(200).send({ text: text });
    });
    server.post('save', function (request, response) {
        var path = request.body.path;
        var data = request.body.data;
        fs.writeFileSync(path, data);
        response.status(200).send();
    });
}
exports.handler = handler;

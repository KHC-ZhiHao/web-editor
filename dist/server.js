"use strict";
exports.__esModule = true;
var http = require("http");
var express = require("express");
var bodyParser = require("body-parser");
var Server = /** @class */ (function () {
    function Server(filePath, port, ip) {
        var _this = this;
        if (port === void 0) { port = '3000'; }
        if (ip === void 0) { ip = 'localhost'; }
        this.app = express();
        this.app.use(express.static(filePath + "/static"));
        this.app.use(bodyParser.json());
        this.host = "http://" + ip + ":" + port;
        this.server = http.createServer(this.app);
        this.server.listen(port, ip, function () {
            console.log(_this.host);
        });
    }
    Server.prototype.get = function (path, callback) {
        this.app.get('/apis/' + path, callback);
    };
    Server.prototype.post = function (path, callback) {
        this.app.post('/apis/' + path, callback);
    };
    return Server;
}());
exports["default"] = Server;

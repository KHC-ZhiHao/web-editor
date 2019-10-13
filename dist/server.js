"use strict";
exports.__esModule = true;
var io = require("socket.io");
var http = require("http");
var express = require("express");
var Server = /** @class */ (function () {
    function Server(port, ip) {
        var _this = this;
        if (port === void 0) { port = '3000'; }
        if (ip === void 0) { ip = 'localhost'; }
        this.events = [];
        this.app = express();
        this.app.use(express.static("./static"));
        this.host = "http://" + ip + ":" + port;
        this.server = http.createServer(this.app);
        this.socket = io(this.server);
        this.socket.on('connection', function (socket) {
            for (var _i = 0, _a = this.events; _i < _a.length; _i++) {
                var event_1 = _a[_i];
                socket.on(event_1.channel, event_1.handler);
            }
        });
        this.server.listen(port, ip, function () {
            console.log(_this.host);
        });
    }
    Server.prototype.get = function (path, callback) {
        this.app.get(path, callback);
    };
    Server.prototype.post = function (path, callback) {
        this.app.post(path, callback);
    };
    Server.prototype.on = function (channel, handler) {
        this.events.push({
            channel: channel,
            handler: handler
        });
    };
    Server.prototype.emit = function (channel, data) {
        this.socket.emit(channel, data);
    };
    return Server;
}());
exports["default"] = Server;

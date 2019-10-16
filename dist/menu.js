"use strict";
exports.__esModule = true;
var fs = require("fs");
var pathModule = require("path");
var configs_1 = require("./configs");
var Menu = /** @class */ (function () {
    function Menu(path) {
        if (path === void 0) { path = '.'; }
        this.dirs = [];
        this.files = {};
        this.path = path;
        this.name = pathModule.basename(path.toString());
    }
    Menu.prototype.get = function () {
        this.refresh();
        var dirs = {};
        for (var _i = 0, _a = this.dirs; _i < _a.length; _i++) {
            var dir = _a[_i];
            dirs[dir.name] = dir.get();
        }
        return {
            dirs: dirs,
            files: this.files
        };
    };
    Menu.prototype.refresh = function () {
        var files = fs.readdirSync(this.path);
        this.dirs = [];
        this.files = {};
        for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
            var name_1 = files_1[_i];
            var path = this.path + '/' + name_1;
            var state = fs.statSync(path);
            if (configs_1["default"].ignoreFiles.includes(name_1)) {
                continue;
            }
            if (state.isDirectory()) {
                this.dirs.push(new Menu(path));
            }
            else {
                this.files[name_1] = path;
            }
        }
    };
    return Menu;
}());
exports["default"] = Menu;

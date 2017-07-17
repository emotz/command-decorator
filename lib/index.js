"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./command"));
__export(require("./can-execute"));
__export(require("./execute"));
var deps_1 = require("./deps");
exports.init = deps_1.init;

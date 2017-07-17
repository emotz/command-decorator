"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _deps = {
    make_reactive(obj) {
        return obj;
    },
};
function init(deps) {
    _deps.make_reactive = deps.make_reactive;
}
exports.init = init;
function make_reactive(obj) {
    return _deps.make_reactive(obj);
}
exports.make_reactive = make_reactive;

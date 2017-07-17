"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const deps_1 = require("./deps");
var Status;
(function (Status) {
    Status[Status["Ok"] = 0] = "Ok";
    Status[Status["Failed"] = 1] = "Failed";
    Status[Status["Pending"] = 2] = "Pending";
})(Status = exports.Status || (exports.Status = {}));
class Command {
    constructor() {
        this._reactive = deps_1.make_reactive({
            history: [],
            is_executing: false,
            promise: undefined,
        });
    }
    get history() {
        return this._reactive.history;
    }
    is_executing() {
        return this._reactive.is_executing;
    }
    get promise() {
        return this._reactive.promise;
    }
    _can_execute() {
        if (this.is_executing() === true) {
            return { canExecute: false, reason: 'already executing' };
        }
        return { canExecute: true };
    }
}
exports.Command = Command;

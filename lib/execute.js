"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("./command");
function execute(target, property_key, descriptor) {
    const old_method = descriptor.value;
    descriptor.value = apply_execute(old_method, property_key);
}
exports.execute = execute;
function apply_execute(fn, property_key) {
    return async function (...args) {
        const can_execute = this['can_' + property_key] || this._can_execute;
        const res = can_execute.call(this, ...args);
        if (res.canExecute !== true) {
            throw res;
        }
        this._reactive.history.push({
            cmd: property_key,
            status: command_1.Status.Pending,
        });
        this._reactive.promise = fn.call(this, ...args);
        this._reactive.is_executing = true;
        let status;
        try {
            const result = await this._reactive.promise;
            status = command_1.Status.Ok;
            return result;
        }
        catch (e) {
            status = command_1.Status.Failed;
            throw e;
        }
        finally {
            this._reactive.history.push({
                cmd: property_key,
                status,
            });
            this._reactive.is_executing = false;
        }
    };
}

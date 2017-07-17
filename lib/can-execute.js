"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function can_execute(target, property_key, descriptor) {
    const old_method = descriptor.value;
    descriptor.value = apply_can_execute(old_method, property_key);
}
exports.can_execute = can_execute;
function apply_can_execute(fn, property_key) {
    return function (...args) {
        const base = this._can_execute();
        if (base.canExecute !== true) {
            return base;
        }
        return fn.call(this, ...args);
    };
}

import { CanExecuteResult } from './can-execute';
import { Command, Status } from './command';

/**
 * Decorator.
 * Must be applied to function which returns Promise.
 */
export function execute(target: any, property_key: string, descriptor: PropertyDescriptor) {
    const old_method = descriptor.value;
    descriptor.value = apply_execute(old_method, property_key);
}

/**
 * "Old-fashion" decorator.
 */
function apply_execute(fn: any, property_key: string) {
    return async function(...args: any[]) {
        const can_execute = this['can_' + property_key] || this._can_execute;
        const res = can_execute.call(this, ...args);
        if (res.canExecute !== true) {
            throw res;
        }

        this._reactive.history.push({
            cmd: property_key,
            status: Status.Pending,
        });
        this._reactive.promise = fn.call(this, ...args);
        this._reactive.is_executing = true;
        let status: Status;
        try {
            const result = await this._reactive.promise;
            status = Status.Ok;
            return result;
        } catch (e) {
            status = Status.Failed;
            throw e;
        } finally {
            this._reactive.history.push({
                cmd: property_key,
                status,
            });
            this._reactive.is_executing = false;
        }
    };
}

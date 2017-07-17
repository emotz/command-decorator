import { Command } from './command';

export interface ICanExecuteSuccess {
    canExecute: true;
}
export interface ICanExecuteFailure {
    canExecute: false;
    reason: string;
}
export type CanExecuteResult = ICanExecuteSuccess | ICanExecuteFailure;

/**
 * Decorator.
 * The function to apply must be reactive and return CanExecuteResult
 */
export function can_execute(target: any, property_key: string, descriptor: PropertyDescriptor) {
    const old_method = descriptor.value;
    descriptor.value = apply_can_execute(old_method, property_key);
}

/**
 * "Old-fashion" decorator.
 * The function to apply must be reactive.
 */
function apply_can_execute(fn: any, property_key: string) {
    return function(this: Command, ...args: any[]): CanExecuteResult {
        const base = (this as any)._can_execute();
        if (base.canExecute !== true) {
            return base;
        }
        return fn.call(this, ...args);
    };
}

import { ReactiveValue } from './reactive-value';

export class Command {
    private _is_executing = new ReactiveValue(false);

    public is_executing() {
        return this._is_executing.val;
    }

    /**
     * @returns Function to clear subscription.
     */
    public on_executing(fn: (executing: boolean) => void) {
        return this._is_executing.on_change(fn);
    }
}

/**
 * Decorator.
 */
export function execute(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const old_method = descriptor.value;
    descriptor.value = apply_execute(old_method);
}

/**
 * "Old-fashion" decorator.
 */
function apply_execute(fn: (...args: any[]) => Promise<any>) {
    return async function _execute(...args: any[]) {
        if (this._is_executing.val === true) {
            throw { reason: 'already executi ng' };
        }
        this._is_executing.val = true;
        try {
            return await fn.call(this, ...args);
        } finally {
            this._is_executing.val = false;
        }
    };
}

import { CommandHistoryEntry, Status } from './command-history-entry';
import { ReactiveValue } from './reactive-value';

export class Command {
    public static Status = Status;
    public history: CommandHistoryEntry[] = [];

    private _is_executing = new ReactiveValue(false);
    private _promise: Promise<any>;

    public is_executing() {
        return this._is_executing.val;
    }

    /**
     * @returns Function to clear subscription.
     */
    public on_executing(fn: (executing: boolean, promise: Promise<any>) => void) {
        return this._is_executing.on_change((executing) => {
            return fn(executing, this._promise);
        });
    }
}

/**
 * Decorator.
 */
export function execute(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const old_method = descriptor.value;
    descriptor.value = apply_execute(old_method, propertyKey);
}

/**
 * "Old-fashion" decorator.
 */
function apply_execute(fn: (...args: any[]) => Promise<any>, propertyKey: string) {
    return async function(...args: any[]) {
        if (this._is_executing.val === true) {
            throw { reason: 'already executing' };
        }
        this._promise = fn.call(this, ...args);
        this._is_executing.val = true;
        this.history.push(new CommandHistoryEntry(propertyKey, Status.Pending));
        let status: Status;
        try {
            const result = await this._promise;
            status = Status.Ok;
            return result;
        } catch (e) {
            status = Status.Failed;
        } finally {
            this._is_executing.val = false;
            this.history.push(new CommandHistoryEntry(propertyKey, status));
        }
    };
}

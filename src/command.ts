import { CommandHistoryEntry, Status } from './command-history-entry';
import { ReactiveValue } from './reactive-value';

export class Command {
    public static Status = Status;
    public history: CommandHistoryEntry[] = [];

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
        this._is_executing.val = true;
        this.history.push(new CommandHistoryEntry(propertyKey, Status.Pending));
        let status: Status;
        try {
            const result = await fn.call(this, ...args);
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

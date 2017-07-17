import { CanExecuteResult } from './can-execute';
import { make_reactive } from './deps';

export enum Status {
    Ok,
    Failed,
    Pending,
}

export class Command {
    private _reactive = make_reactive({
        history: [] as Array<{
            cmd: string;
            status: Status;
        }>,
        is_executing: false,
        promise: undefined as Promise<any>,
    });

    /**
     * Reactive
     */
    public get history() {
        return this._reactive.history;
    }
    /**
     * Reactive
     */
    public is_executing() {
        return this._reactive.is_executing;
    }
    /**
     * Reactive
     */
    public get promise() {
        return this._reactive.promise;
    }

    /**
     * Reactive
     */
    private _can_execute(): CanExecuteResult {
        if (this.is_executing() === true) {
            return { canExecute: false, reason: 'already executing' };
        }
        return { canExecute: true };
    }
}

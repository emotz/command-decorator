export interface ICanExecuteSuccess {
    canExecute: true;
}
export interface ICanExecuteFailure {
    canExecute: false;
    reason: string;
}
export declare type CanExecuteResult = ICanExecuteSuccess | ICanExecuteFailure;
export declare function can_execute(target: any, property_key: string, descriptor: PropertyDescriptor): void;

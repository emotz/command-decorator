export interface IDeps {
    make_reactive<T>(obj: T): T;
}
export declare function init(deps: IDeps): void;
export declare function make_reactive<T>(obj: T): T;

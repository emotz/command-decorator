export interface IDeps {
    make_reactive<T>(obj: T): T;
}

const _deps: IDeps = {
    make_reactive<T>(obj: T): T {
        return obj;
    },
};

export function init(deps: IDeps) {
    _deps.make_reactive = deps.make_reactive;
}

export function make_reactive<T>(obj: T): T {
    return _deps.make_reactive(obj);
}

export declare enum Status {
    Ok = 0,
    Failed = 1,
    Pending = 2,
}
export declare class Command {
    private _reactive;
    readonly history: {
        cmd: string;
        status: Status;
    }[];
    is_executing(): boolean;
    readonly promise: Promise<any>;
    private _can_execute();
}

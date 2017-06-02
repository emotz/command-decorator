export enum Status {
    Ok,
    Failed,
    Pending,
}

export class CommandHistoryEntry {
    public cmd: string;
    public status: Status;
    constructor(cmd: string, status: Status) {
        this.cmd = cmd;
        this.status = status;
    }
}

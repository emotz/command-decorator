import { SyncEvent } from 'ts-events';

export class ReactiveValue<T> {
  private _val: T;
  private readonly change_event = new SyncEvent<T>();

  constructor(val: T) {
    this._val = val;
  }

  public get val() {
    return this._val;
  }

  public set val(val: T) {
    if (this._val !== val) {
      this._val = val;
      this.change_event.post(this._val);
    } else {
      this._val = val;
    }
  }

  /**
   * @returns Function to unsubscribe.
   */
  public on_change(fn: (val: T) => void) {
    this.change_event.attach(fn);
    return () => {
      this.change_event.detach(fn);
    };
  }
}

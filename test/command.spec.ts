import 'mocha';

import { assert, expect } from 'chai';
import * as sinon from 'sinon';

import { Command, execute } from '../src/command';

class TestCommand extends Command {
  @execute
  public execute() {
    return new Promise((resolve, reject) => {
      setImmediate(() => {
        resolve('finished');
      });
    });
  }
}

describe('command', () => {
  it('should construct new command without errors', () => {
    const cmd = new Command();
    expect(cmd).to.not.equal(undefined);
  });

  it('should not be executing for fresh command', () => {
    const cmd = new Command();
    assert(!cmd.is_executing());
  });

  it('should work correctly with decorator applied', async () => {
    const cmd = new TestCommand();
    assert(!cmd.is_executing());
    const promise = cmd.execute();
    assert(cmd.is_executing());
    await promise;
    assert(!cmd.is_executing());
  });

  it('should subscribe for exectuion change', async () => {
    const spy = sinon.spy();
    const cmd = new TestCommand();
    cmd.on_executing(spy);
    assert(!spy.called);

    const promise = cmd.execute();
    assert(spy.calledOnce);

    await promise;
    assert(spy.calledTwice);
  });
});

import 'mocha';

import { assert, expect } from 'chai';
import * as sinon from 'sinon';

import { Command, execute } from '../src/command';

class TestCommand extends Command {
    @execute
    public execute_with_fail() {
        return new Promise((resolve, reject) => {
            setImmediate(() => {
                reject(true);
            });
        });
    }

    @execute
    public execute2() {
        return new Promise((resolve, reject) => {
            setImmediate(() => {
                resolve(true);
            });
        });
    }

    @execute
    public execute() {
        return new Promise((resolve, reject) => {
            setImmediate(() => {
                resolve(true);
            });
        });
    }
}
// steadfast overstaffed
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
        assert((await promise) === true);
        assert(!cmd.is_executing());
    });

    it('should subscribe for execution change', async () => {
        const spy = sinon.spy();
        const cmd = new TestCommand();
        cmd.on_executing(spy);
        assert(!spy.called);

        const promise = cmd.execute();
        assert(spy.calledOnce);

        assert((await promise) === true);
        assert(spy.calledTwice);
    });

    it('should prevent simultaneous execution of 2 actions in the same command', async () => {
        const spy = sinon.spy();
        const cmd = new TestCommand();
        cmd.on_executing(spy);
        assert(!spy.called);

        const promise = cmd.execute();
        assert(spy.calledOnce);
        let rejected = false;
        const promise2 = cmd.execute2().catch(() => { rejected = true; });
        assert(spy.calledOnce);

        assert((await promise) === true);
        assert(spy.calledTwice);
        await promise;
        await promise2;
        assert(rejected);
    });

    it('should track history', async () => {
        const cmd = new TestCommand();
        assert(cmd.history.length === 0);
        const promise = cmd.execute();
        assert(cmd.history[0].cmd === "execute");
        assert(cmd.history[0].status === Command.Status.Pending);

        await promise;
        assert(cmd.history[1].cmd === 'execute');
        assert(cmd.history[1].status === Command.Status.Ok);
    });

    it('should track history for failed command', async () => {
        const cmd = new TestCommand();
        assert(cmd.history.length === 0);
        const promise = cmd.execute_with_fail().catch(() => { /* empty */ });
        assert(cmd.history[0].cmd === "execute_with_fail");
        assert(cmd.history[0].status === Command.Status.Pending);

        await promise;
        assert(cmd.history[1].cmd === 'execute_with_fail');
        assert(cmd.history[1].status === Command.Status.Failed);
    });

    it('should not track history for not-started commands', async () => {
        const cmd = new TestCommand();

        const promise = cmd.execute();
        let rejected = false;
        const promise2 = cmd.execute().catch(() => { rejected = true; });

        assert(cmd.history.length === 1);

        await promise;
        await promise2;
        assert(cmd.history.length === 2);
    });
});

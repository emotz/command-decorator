// tslint:disable-next-line:no-reference
/// <reference path="../node_modules/@types/mocha/index.d.ts" />

import { expect } from 'chai';
import * as sinon from 'sinon';

import { ReactiveValue } from '../src/reactive-value';

describe('reactive-value', () => {
  it('should create and change value', () => {
    const res = new ReactiveValue<boolean>(false);

    expect(res.val).to.equal(false);

    res.val = true;

    expect(res.val).to.equal(true);
  });

  it('should notify on change', (done) => {
    const expected = true;
    const res = new ReactiveValue<boolean>(false);
    res.on_change((val) => {
      expect(val).to.equal(expected);
      expect(res.val).to.equal(expected);
      done();
    });

    expect(res.val).to.equal(false);

    res.val = expected;

    expect(res.val).to.equal(true);
  });

  it('should detach event handler', () => {
    const spy = sinon.spy();
    const res = new ReactiveValue<boolean>(false);
    const detach = res.on_change(spy);

    res.val = true;

    expect(spy.calledOnce).to.equal(true);

    detach();
    res.val = false;

    expect(spy.calledOnce).to.equal(true);
  });

  it('should not call handler if the value havent changed on assignment', () => {
    const spy = sinon.spy();
    const res = new ReactiveValue<boolean>(false);
    res.on_change(spy);

    res.val = false;

    expect(spy.called).to.equal(false);
  });
});

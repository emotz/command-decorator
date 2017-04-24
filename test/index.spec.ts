// tslint:disable-next-line:no-reference
/// <reference path="../node_modules/@types/mocha/index.d.ts" />

import { expect } from 'chai';

import * as index from '../src/index';

describe('index', () => {
  it('should provide Command', () => {
    expect(index.Command).to.not.be.an('undefined');
  });
});

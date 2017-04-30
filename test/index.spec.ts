import 'mocha';

import { expect } from 'chai';

import * as index from '../src/index';

describe('index', () => {
  it('should provide Command', () => {
    expect(index.Command).to.not.be.an('undefined');
  });
});

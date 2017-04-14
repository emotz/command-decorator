// tslint:disable-next-line:no-reference
/// <reference path="../node_modules/@types/mocha/index.d.ts" />

import * as chai from "chai";
import { Greeter } from "../src/greeter";

const expect = chai.expect;

describe("greeter", () => {
  it("should greet with message", () => {
    const greeter = new Greeter("friend");
    expect(greeter.greet()).to.equal("Bonjour, friend!");
  });
});

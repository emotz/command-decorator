[![Build Status](https://travis-ci.org/emotz/command-decorator.svg?branch=master)](https://travis-ci.org/emotz/command-decorator.svg?branch=master)
[![Coverage Status](https://coveralls.io/repos/github/emotz/command-decorator/badge.svg?branch=master)](https://coveralls.io/github/emotz/command-decorator?branch=master)
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)

# command-decorator

Incorporates Command Pattern using ES7 decorators.

# Installation

```bat
npm install https://github.com/emotz/command-decorator
```

# Usage

```ts
import { Command, execute } from 'command-decorator';

class TestCommand extends Command {
  @execute
  public async execute() {
    return 10;
  }
}

const cmd = new TestCommand();
cmd.execute();
```

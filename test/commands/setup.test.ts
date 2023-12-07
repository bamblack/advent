import * as inquirer from '@inquirer/prompts'
import {test} from '@oclif/test'

import * as fs from '../../src/wrappers/fs-extra'

describe('setup', () => {
  test
    .stdout({print: true})
    .stub(inquirer, 'input', (stub) => stub.resolves(''))
    .stub(fs, 'ensureFile', (stub) => stub.resolves())
    .stub(fs, 'writeFile', (stub) => stub.resolves())
    .command(['setup'])
    .it('runs setup')
})

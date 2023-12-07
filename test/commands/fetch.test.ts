import {test} from '@oclif/test'

import * as axios from '../../src/wrappers/axios'
import * as fs from '../../src/wrappers/fs-extra'

describe('fetch', () => {
  const stubChain = test
    .stdout({print: true})
    .stub(axios, 'get', (stub) => stub.resolves({data: ''}))
    .stub(fs, 'ensureDir', (stub) => stub.resolves())
    .stub(fs, 'exists', (stub) => stub.resolves(false))
    .stub(fs, 'readdir', (stub) => stub.resolves([]))
    .stub(fs, 'writeFile', (stub) => stub.resolves())

  stubChain.command(['fetch']).it('runs fetch')

  stubChain.command(['fetch', '--year', '2023', '--day', '4']).it('runs fetch --year 99 --day 99')
})

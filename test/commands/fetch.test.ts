import {test} from '@oclif/test'
import sinon from 'sinon'

import * as axios from '../../src/wrappers/axios'
import * as fs from '../../src/wrappers/fs-extra'

describe('fetch', () => {
  const stubChain = test
    .stdout({print: true})
    .stub(axios, 'get', (stub) => stub.resolves({data: ''}))
    .stub(fs, 'ensureDir', (stub) => stub.resolves())
    .stub(fs, 'exists', (stub) => {
      // make it pass config check
      stub.withArgs(sinon.match(/.*config.json$/)).resolves(true)
      // make it fail daily file checks
      stub.resolves(false)
      return stub
    })
    .stub(fs, 'readJSON', (stub) => stub.resolves({repo: 'something'}))
    .stub(fs, 'readdir', (stub) => stub.resolves([]))
    .stub(fs, 'writeFile', (stub) => stub.resolves())

  stubChain.command(['fetch']).it('runs fetch')

  stubChain.command(['fetch', '--year', '2023', '--day', '4']).it('runs fetch --year 99 --day 99')
})

import { expect, test } from '@oclif/test'

describe('config set', () => {
    test
        .nock('fs', api => api.get('').reply)
        .stdout()
        .command(['config:set', 'someKey', 'someValue'])
        .it('runs config set successfully');
})

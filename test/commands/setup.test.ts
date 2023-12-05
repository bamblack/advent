import { expect, test } from '@oclif/test'

describe('setup', () => {
    test
        .stdout()
        .command(['setup'])
        .it('runs setup', ctx => {
        });
})

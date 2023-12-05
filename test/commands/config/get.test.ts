import { expect, test } from '@oclif/test'

describe('config set', () => {
    test
        .stdout()
        .command(['config:get', 'someKey'])
        .it('runs config get', ctx => {
            expect(ctx.stdout).to.contain('someKey');
        });
})

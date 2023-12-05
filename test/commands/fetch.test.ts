import { expect, test } from '@oclif/test'

describe('fetch', () => {
    test.stdout()
        .command(['fetch'])
        .it('runs fetch', ctx => {
            const today = new Date();
            expect(ctx.stdout).to.contain(`${today.getFullYear()} ${today.getDate()}`);
        });

    test.stdout()
        .command(['fetch', '--year', '2023', '--day', '4'])
        .it('runs fetch --year 2023 --day 4', ctx => {
            expect(ctx.stdout).to.contain('2023 4');
        });
});

import { Args } from '@oclif/core'
import { BaseCommand } from '../../base-command';

export default class ConfigSet extends BaseCommand<typeof ConfigSet> {
    static description = 'modify a config value'
    static args = {
        key: Args.string({
            required: true,
            description: 'key of setting being modified'
        }),
        value: Args.string({
            required: true,
            description: 'value for setting'
        })
    }

    public async run(): Promise<void> {
        const { args } = await this.parse(ConfigSet)
        process.stdout.write(`${args.key} ${args.value}`);
    }
}

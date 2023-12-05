import { Args } from '@oclif/core'
import { BaseCommand } from '../../base-command'

export default class ConfigGet extends BaseCommand<typeof ConfigGet> {
    static description = 'retrieve a config value'
    static args = {
        key: Args.string({
            required: true,
            description: 'key of setting being retrieved',
            options: ['session', 'repo']
        })
    }

    public async run(): Promise<void> {
        const { args } = await this.parse(ConfigGet);
        process.stdout.write(this.cliConfig[args.key] as string);
    }
}

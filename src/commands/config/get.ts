import {Args} from '@oclif/core'

import {BaseCommand} from '../../base-command'

export default class ConfigGet extends BaseCommand<typeof ConfigGet> {
  static args = {
    key: Args.string({
      description: 'key of setting being retrieved',
      options: ['session', 'repo'],
      required: true,
    }),
  }

  static description = 'retrieve a config value'

  public async run(): Promise<void> {
    const {args} = await this.parse(ConfigGet)
    process.stdout.write(this.cliConfig[args.key] as string)
  }
}

import {Args} from '@oclif/core'

import {BaseCommand} from '../../base-command'

export default class ConfigSet extends BaseCommand<typeof ConfigSet> {
  static args = {
    key: Args.string({
      description: 'key of setting being modified',
      required: true,
    }),
    value: Args.string({
      description: 'value for setting',
      required: true,
    }),
  }

  static description = 'modify a config value'

  public async run(): Promise<void> {
    const {args} = await this.parse(ConfigSet)
    process.stdout.write(`${args.key} ${args.value}`)
  }
}

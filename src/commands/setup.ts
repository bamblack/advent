import * as inquirer from '@inquirer/prompts'
import {Command} from '@oclif/core'
import * as path from 'node:path'

import {ensureFile, writeFile} from '../wrappers/fs-extra'

export default class Setup extends Command {
  static description = 'set up the configuration file for advent'

  public async run(): Promise<void> {
    inquirer
    const session = await inquirer.input({
      message: 'What is your AoC session key?',
    })
    const repo = await inquirer.input({
      message: 'Where is your code directory located?',
    })

    const configContents = JSON.stringify({repo, session})
    const configFile = path.join(this.config.configDir, 'config.json')
    await ensureFile(configFile)
    await writeFile(configFile, configContents, 'utf8')
  }
}

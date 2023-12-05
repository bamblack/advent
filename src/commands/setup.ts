import {Command} from '@oclif/core'
// eslint-disable-next-line node/no-extraneous-import
import * as fs from 'fs-extra'
import * as path from 'node:path'

export default class Setup extends Command {
  static description = 'set up the configuration file for advent'

  public async run(): Promise<void> {
    const {default: inquirer} = await import('inquirer')
    inquirer.registerPrompt('directory', require('inquirer-select-directory'))
    const reponse: {repo: string; session: string} = await inquirer.prompt([
      {
        message: 'What is your AoC session key?',
        name: 'session',
        type: 'input',
      },
      {
        basePath: 'C:/Projects',
        message: 'Where is your code repo located?',
        name: 'repo',
        options: {
          displayFiles: false,
        },
        type: 'directory',
      },
    ])
    const configContents = JSON.stringify({...reponse})

    const configFile = path.join(this.config.configDir, 'config.json')
    await fs.ensureFile(configFile)
    await fs.writeFile(configFile, configContents, 'utf8')
  }
}

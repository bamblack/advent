import { Command } from '@oclif/core';
import * as fs from 'fs-extra';
import * as path from 'path';

export default class Setup extends Command {
    static description = 'set up the configuration file for advent'

    public async run(): Promise<void> {
        const { default: inquirer } = await import("inquirer");
        inquirer.registerPrompt('directory', require('inquirer-select-directory'));
        const responses = await inquirer.prompt([{
            type: 'input',
            name: 'session',
            message: 'What is your AoC session key?'
        }, {
            type: 'directory',
            basePath: 'C:/Projects',
            options: {
                displayFiles: false
            },
            name: 'repo',
            message: 'Where is your code repo located?'
        }]);

        const configFile = path.join(this.config.configDir, 'config.json');
        await fs.ensureFile(configFile);
        await fs.writeFile(configFile, JSON.stringify(responses), 'utf8');
    }
}

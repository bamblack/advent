import { Flags } from '@oclif/core'
import { BaseCommand } from '../base-command'

export default class Fetch extends BaseCommand<typeof Fetch> {
    static description = 'fetch your puzzle and the input for the day'

    static examples = [
        '<%= config.bin %> <%= command.id %>',
    ]

    static flags = {
        year: Flags.integer({ description: 'Specific year' }),
        day: Flags.integer({ description: 'Specific day' })
    }

    public async run(): Promise<void> {
        const { args, flags } = await this.parse(Fetch);

        const today = new Date();
        const year = flags.year ?? today.getFullYear();
        const day = flags.day ?? today.getDate();

        console.log(year, day);
    }
}

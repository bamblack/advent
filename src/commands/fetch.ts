/* eslint-disable no-await-in-loop */
import {Flags} from '@oclif/core'
import axios from 'axios'
// eslint-disable-next-line node/no-extraneous-import
import * as fs from 'fs-extra'
import * as path from 'node:path'

import {BaseCommand} from '../base-command'

export default class Fetch extends BaseCommand<typeof Fetch> {
  static description = 'fetch your puzzle and the input for the day'

  static examples = ['<%= config.bin %> <%= command.id %>']

  static flags = {
    day: Flags.integer({description: 'Specific day'}),
    year: Flags.integer({description: 'Specific year'}),
  }

  public async run(): Promise<void> {
    const {flags} = await this.parse(Fetch)

    const today = new Date()
    const year = flags.year ?? today.getFullYear()
    const day = flags.day ?? today.getDate()
    const dirPath = path.join(this.cliConfig.repo, 'src', year.toString(), day.toString())

    await fs.ensureDir(dirPath)
    await this.getCodeFile(dirPath)
    await this.getExampleFile(dirPath, year, day)
    await this.getInputFile(dirPath, year, day)
  }

  /**
   * Copy any template files from the repository base into a daily directory
   * @param {string} dirPath    Repository path to look for template files
   * @returns {void}
   */
  private async getCodeFile(dirPath: string): Promise<void> {
    const codeFile = path.join(dirPath, 'index.*')
    if (!(await fs.exists(codeFile))) {
      const repoDirContents = await fs.readdir(this.cliConfig.repo)
      const templateFiles = repoDirContents
        .filter((x) => x.match(/template/))
        .map((x) => path.join(this.cliConfig.repo, x))
        .filter(async (path) => {
          const stat = await fs.stat(path)
          return stat.isFile()
        })

      if (templateFiles.length === 0) {
        process.stdout.write(`No template files found\n`)
        return
      }

      for (const template of templateFiles) {
        const templateName = template.split('\\').at(-1) as string
        const [, templateExt] = templateName.split('.')
        const destFile = path.join(dirPath, `code.${templateExt}`)

        if (!(await fs.exists(destFile))) {
          process.stdout.write(`Copying template file to ${destFile}\n`)
          await fs.copyFile(template, destFile)
        }
      }
    }
  }

  /**
   * Retrieve the example from the puzzle page on the AOC website and save it to a file within a daily directory in the configured repo
   * @param {string} dirPath    Repository path to look for template files
   * @param {number} year       Year for AoC URL
   * @param {number} day        Day for AoC URL
   * @returns {void}
   */
  private async getExampleFile(dirPath: string, year: number, day: number): Promise<void> {
    const testFile = path.join(dirPath, 'example.txt')
    if (!(await fs.exists(testFile))) {
      const puzzlePageUrl = `https://adventofcode.com/${year}/day/${day}`
      process.stdout.write(`Retrieving puzzle example from ${puzzlePageUrl} and storing at ${testFile}\n`)

      const puzzlePage = await axios.get(puzzlePageUrl, {
        headers: {
          Cookie: this.cliConfig.session,
        },
      })

      const puzzleExample = puzzlePage.data.match(/For example:.*$\n.*>((.|\n)*?)</m)[1]
      await fs.writeFile(testFile, puzzleExample)
    }
  }

  /**
   * Retrieve the puzzle input from the AoC API and save it to a file within a daily directory in the configured repo
   * @param {string} dirPath    Repository path to look for template files
   * @param {number} year       Year for AoC URL
   * @param {number} day        Day for AoC URL
   * @returns {void}
   */
  private async getInputFile(dirPath: string, year: number, day: number): Promise<void> {
    const inputFile = path.join(dirPath, 'input.txt')
    if (!(await fs.exists(inputFile))) {
      const inputUrl = `https://adventofcode.com/${year}/day/${day}/input`
      process.stdout.write(`Retrieving puzzle input from ${inputUrl} and storing at ${inputFile}\n`)

      const input = await axios.get(inputUrl, {
        headers: {
          Cookie: this.cliConfig.session,
        },
      })

      await fs.writeFile(inputFile, input.data)
    }
  }
}

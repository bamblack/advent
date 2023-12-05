import {Command, Flags, Interfaces} from '@oclif/core'
// eslint-disable-next-line node/no-extraneous-import
import * as fs from 'fs-extra'
import * as path from 'node:path'

import {ERROR_CODES} from './constants/error-codes'
import {CliConfig} from './types/cli-config'

enum LogLevel {
  debug = 'debug',
  error = 'error',
  info = 'info',
  warn = 'warn',
}

export type Flags<T extends typeof Command> = Interfaces.InferredFlags<(typeof BaseCommand)['baseFlags'] & T['flags']>
export type Args<T extends typeof Command> = Interfaces.InferredArgs<T['args']>

export abstract class BaseCommand<T extends typeof Command> extends Command {
  // define flags that can be inherited by any command that extends BaseCommand
  static baseFlags = {
    'log-level': Flags.custom<LogLevel>({
      helpGroup: 'GLOBAL',
      options: Object.values(LogLevel),
      summary: 'Specify level for logging.',
    })(),
  }

  // add the --json flag
  static enableJsonFlag = true

  protected args!: Args<T>
  protected cliConfig!: CliConfig
  protected flags!: Flags<T>

  protected async catch(err: Error & {exitCode?: number}): Promise<unknown> {
    // add any custom logic to handle errors from the command
    // or simply return the parent class error handling
    return super.catch(err)
  }

  protected async finally(_: Error | undefined): Promise<unknown> {
    // called after run and catch regardless of whether or not the command errored
    return super.finally(_)
  }

  public async init(): Promise<void> {
    await super.init()

    const configFile = path.join(this.config.configDir, 'config.json')
    if (!(await fs.exists(configFile))) {
      this.error(new Error('This command cannot be run until configuration is complete'), {
        code: ERROR_CODES.ConfigNotRun,
        exit: 2,
        suggestions: ['advent setup'],
      })
    }

    const {args, flags} = await this.parse({
      args: this.ctor.args,
      baseFlags: (super.ctor as typeof BaseCommand).baseFlags,
      enableJsonFlag: this.ctor.enableJsonFlag,
      flags: this.ctor.flags,
      strict: this.ctor.strict,
    })
    const cliConfig = await fs.readJSON(configFile)

    this.flags = flags as Flags<T>
    this.args = args as Args<T>
    this.cliConfig = cliConfig
  }
}

import { Command, Flags, Interfaces } from '@oclif/core'
import * as fs from 'fs-extra'
import * as path from 'path'
import { ERROR_CODES } from './constants/ERROR_CODES';
import { CliConfig } from './types/CliConfig';

enum LogLevel {
    debug = 'debug',
    info = 'info',
    warn = 'warn',
    error = 'error',
}

export type Flags<T extends typeof Command> = Interfaces.InferredFlags<typeof BaseCommand['baseFlags'] & T['flags']>;
export type Args<T extends typeof Command> = Interfaces.InferredArgs<T['args']>;

export abstract class BaseCommand<T extends typeof Command> extends Command {
    // add the --json flag
    static enableJsonFlag = true

    // define flags that can be inherited by any command that extends BaseCommand
    static baseFlags = {
        'log-level': Flags.custom<LogLevel>({
            summary: 'Specify level for logging.',
            options: Object.values(LogLevel),
            helpGroup: 'GLOBAL',
        })(),
    }

    protected flags!: Flags<T>;
    protected args!: Args<T>;
    protected cliConfig!: CliConfig;

    public async init(): Promise<void> {
        await super.init();

        const configFile = path.join(this.config.configDir, 'config.json');
        if (!(await fs.exists(configFile))) {
            this.error(
                new Error('This command cannot be run until configuration is complete'),
                { exit: 2, code: ERROR_CODES.ConfigNotRun, suggestions: ['advent setup'] }
            );
        }

        const { args, flags } = await this.parse({
            flags: this.ctor.flags,
            baseFlags: (super.ctor as typeof BaseCommand).baseFlags,
            enableJsonFlag: this.ctor.enableJsonFlag,
            args: this.ctor.args,
            strict: this.ctor.strict,
        });
        const cliConfig = await fs.readJSON(configFile);

        this.flags = flags as Flags<T>;
        this.args = args as Args<T>;
        this.cliConfig = cliConfig;
    }

    protected async catch(err: Error & { exitCode?: number }): Promise<any> {
        // add any custom logic to handle errors from the command
        // or simply return the parent class error handling
        return super.catch(err)
    }

    protected async finally(_: Error | undefined): Promise<any> {
        // called after run and catch regardless of whether or not the command errored
        return super.finally(_)
    }
}

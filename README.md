# advent

A CLI to interact with Advent of Code, built with oclif.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![GitHub license](https://img.shields.io/github/license/oclif/hello-world)](https://github.com/oclif/hello-world/blob/main/LICENSE)

<!-- toc -->

- [Install and Setup](#install-and-setup)
- [Usage](#usage)
- [Commands](#commands)
<!-- tocstop -->

# Install and Setup

Before running anything in the CLI you need to do a few things:

1. [Retrieve your Advent of Code session cookie](https://github.com/wimglenn/advent-of-code-wim/issues/1)
   - This should be the full cokie starting with `session=`
2. Have your code directory set up
   - This should be a directory that looks something like the code block below. (You don't need to worry about manually creating the `src/`, `{year}/` or `{day}/` folders, the CLI handles that for you).
   - Template files are used to quickly give you a running start with coding for the puzzle and can be whatever type of file you want and have any contents you want. They (there can be one or more) just need to be named `template.{extension}`

```
my-directory
├── src
│   ├── {year}
│   │   ├── {day}
├── template.js
└── template.cs
```

Once that has been done run the below commands

```sh-session
$ npm install -g advent
$ advent setup
```

Running `advent setup` will walk you through some prompts for configuring the CLI where you input the session cookie retrieve in step 1 above and tell it where your code directory from step 2 above is. Once you have done this you can being using the CLI

# Usage

<!-- usage -->

```sh-session
$ npm install -g advent
$ advent COMMAND
running command...
$ advent (--version)
advent/0.0.0 win32-x64 node-v16.19.0
$ advent --help [COMMAND]
USAGE
  $ advent COMMAND
...
```

<!-- usagestop -->

# Commands

<!-- commands -->

- [`advent fetch`](#advent-fetch)
- [`advent help [COMMANDS]`](#advent-help-commands)
- [`advent setup`](#advent-setup)

## `advent fetch`

fetch your puzzle and the input for the day

```
USAGE
  $ advent fetch [--day <value>] [--year <value>]

FLAGS
  --day=<value>   Specific day
  --year=<value>  Specific year

DESCRIPTION
  fetch your puzzle and the input for the day

EXAMPLES
  $ advent fetch
```

_See code: [dist/commands/fetch.ts](https://github.com/bamblack/advent/blob/v0.0.0/dist/commands/fetch.ts)_

## `advent help [COMMANDS]`

Display help for advent.

```
USAGE
  $ advent help [COMMANDS] [-n]

ARGUMENTS
  COMMANDS  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for advent.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v6.0.7/lib/commands/help.ts)_

## `advent setup`

set up the configuration file for advent

```
USAGE
  $ advent setup

DESCRIPTION
  set up the configuration file for advent
```

_See code: [dist/commands/setup.ts](https://github.com/bamblack/advent/blob/v0.0.0/dist/commands/setup.ts)_

<!-- commandsstop -->

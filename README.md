oclif-hello-world
=================

oclif example Hello World CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![GitHub license](https://img.shields.io/github/license/oclif/hello-world)](https://github.com/oclif/hello-world/blob/main/LICENSE)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g advent
$ advent COMMAND
running command...
$ advent (--version)
advent/0.0.0 win32-x64 node-v18.19.0
$ advent --help [COMMAND]
USAGE
  $ advent COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`advent config get KEY`](#advent-config-get-key)
* [`advent config set KEY VALUE`](#advent-config-set-key-value)
* [`advent fetch`](#advent-fetch)
* [`advent help [COMMANDS]`](#advent-help-commands)

## `advent config get KEY`

retrieve a config value

```
USAGE
  $ advent config get KEY

ARGUMENTS
  KEY  key of setting being retrieved

DESCRIPTION
  retrieve a config value
```

_See code: [dist/commands/config/get.ts](https://github.com/bamblack/advent/blob/v0.0.0/dist/commands/config/get.ts)_

## `advent config set KEY VALUE`

modify a config value

```
USAGE
  $ advent config set KEY VALUE

ARGUMENTS
  KEY    key of setting being modified
  VALUE  value for setting

DESCRIPTION
  modify a config value
```

_See code: [dist/commands/config/set.ts](https://github.com/bamblack/advent/blob/v0.0.0/dist/commands/config/set.ts)_

## `advent fetch`

fetch your puzzle and the input for the day

```
USAGE
  $ advent fetch [--year <value>] [--day <value>]

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
<!-- commandsstop -->

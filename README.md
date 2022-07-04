## Installation

`npm install -g`

## Configuration

1. create an API key at https://defender.openzeppelin.com/#/api-keys
2. `cp .env-example .env`
3. set the `API_KEY` and `API_SECRET` values in `.env`

## Usage

```sh
$ ./ozd-relay.js --help

Usage: ozd-relay [options] [command]

Options:
  -h, --help                     display help for command

Commands:
  list [field]                   list relayers, or optionally only display a specific field like `address` or `name`
  get <relayerId>                gets a relayer info
  listKeys <relayerId>           lists the API keys for a relayer
  createKey <relayerId>          creates an API key for a relayer
  deleteKey <relayerId> <keyId>  deletes an API key for a relayer. Note: second argument to deleteKey is the keyId (contains hyphens), not the apiKey
  delete <relayerId>             would delete a relayer if deleting a relayer was supported)
  help [command]                 display help for command
```

> to list all the relayers:

```sh
ozd-relay list
```

> to list only the addresses of the relayers:

```sh
ozd-relay list address
```

## Troubleshooting

> `command not found: ozd-relay`

Try running `sudo npm link`

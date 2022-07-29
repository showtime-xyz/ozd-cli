## Installation

```sh
npm install
npm install -g
```

## Configuration

1. create an API key at https://defender.openzeppelin.com/#/api-keys
2. `cp .env-example .env`
3. set the `API_KEY` and `API_SECRET` values in `.env`

Additionally, some commands require the API key and secret for a specific relayer. You can configure these with:

```
relayer-name1_API_KEY=...
relayer-name1_API_SECRET=...

relayer-name2_API_KEY=...
relayer-name2_API_SECRET=...
```

## Usage

```sh
$ ./ozd-relay.js --help

Usage: ozd-relay [options] [command]

Options:
  -h, --help                                             display help for command

Commands:
  list [field]                                           list relayers, or optionally only display a specific field like `address` or `name`
  get <relayerId>                                        gets a relayer info
  listKeys <relayerId>                                   lists the API keys for a relayer
  createKey <relayerId>                                  creates an API key for a relayer
  deleteKey <relayerId> <keyId>                          deletes an API key for a relayer. Note: second argument to deleteKey is the keyId (contains hyphens), not the apiKey
  delete <relayerId>                                     would delete a relayer if deleting a relayer was supported)
  gasPriceCap <relayerId> <newGasCapGwei>                sets the gas cap in gwei for a particular relayer
  EIP1559Pricing <relayerId> <true|false>                enable or disable EIP1559Pricing for a particular relayer
  listTransactions <relayerName> <pending|mined|failed>  list transactions for this relayer name (not the relayerId)
  help [command]                                         display help for command

```

> to list all the relayers:

```sh
ozd-relay list
```

> to list only the addresses of the relayers:

```sh
ozd-relay list address
```

## Cookbook

> Filter all relayers by network:

```sh
ozd-relay list | jq 'map(select(.network == "matic"))' | tee polygon-relayers.json
```

> List all relayer ids on a specific network:

```sh
ozd-relay list | jq 'map(select(.network == "matic")) | map(.relayerId)'
```

> Bulk update the gas price cap on a network:

```sh
for relayerId in $(jq --raw-output '.[] | .relayerId' polygon-relayers.json) ; do
  ozd-relay updateGasPriceCap $relayerId 500 ;
done
```


## Troubleshooting

> `command not found: ozd-relay`

Try running `sudo npm link`

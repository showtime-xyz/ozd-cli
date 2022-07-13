#! /usr/bin/env node

import { RelayClient } from 'defender-relay-client';
import { config } from 'dotenv';
import { program } from 'commander';

config();

const relayClient = new RelayClient({ apiKey: process.env.API_KEY, apiSecret: process.env.API_SECRET });

program
    .command('list [field]')
    .description('list relayers, or optionally only display a specific field like `address` or `name`')
    .action(async (arg) => {
        const list = await relayClient.list();
        const relayers = list.items;

        if (arg) {
            const fieldOnly = relayers.map(relayer => relayer[arg]);
            console.log(JSON.stringify(fieldOnly));
        } else {
            console.log(JSON.stringify(relayers));
        }
    });

program
    .command('get <relayerId>')
    .description('gets a relayer info')
    .action(async (relayerId) => {
        const relayer = await relayClient.get(relayerId);
        console.log(relayer);
    });

program
    .command('listKeys <relayerId>')
    .description('lists the API keys for a relayer')
    .action(async (relayerId) => {
        const keys = await relayClient.listKeys(relayerId);
        console.log(keys);
    });

program
    .command('createKey <relayerId>')
    .description('creates an API key for a relayer')
    .action(async (relayerId) => {
        const keys = await relayClient.createKey(relayerId);
        console.log(keys);
    });

program
    .command('deleteKey <relayerId> <keyId>')
    .description('deletes an API key for a relayer. Note: second argument to deleteKey is the keyId (contains hyphens), not the apiKey')
    .action(async (relayerId, keyId) => {
        const keys = await relayClient.deleteKey(relayerId, keyId);
        console.log(keys);
    });

program
    .command('delete <relayerId>')
    .description('would delete a relayer if deleting a relayer was supported)')
    .action(async (relayerId, keyId) => {
        console.error("Deleting relayers is only supported in the console");
    });

program
    .command('gasPriceCap <relayerId> <newGasCapGwei>')
    .description('sets the gas cap in gwei for a particular relayer')
    .action(async (relayerId, newGasCapGwei) => {
        const newGasCapWei = newGasCapGwei + "000000000";
        console.debug(`Setting gas cap to ${newGasCapWei} wei for relayer ${relayerId}`);
        try {
            await relayClient.update(relayerId, { policies: { gasPriceCap: newGasCapWei } });
        } catch (e) {
            console.error(e);
        }
    })

program
    .command('EIP1559Pricing <relayerId> <true|false>')
    .description('enable or disable EIP1559Pricing for a particular relayer')
    .action(async (relayerId, enabled) => {
        const enabledBool = enabled === "true";
        console.debug(`Setting EIP1559Pricing to ${enabledBool} for relayer ${relayerId}`);
        try {
            await relayClient.update(relayerId, { policies: { EIP1559Pricing: enabledBool } });
        } catch (e) {
            console.error(e);
        }
    })

program.parse();

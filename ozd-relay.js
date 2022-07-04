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
            console.log(fieldOnly);
        } else {
            console.log(relayers);
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


program.parse();
const fs = require('fs');
const {Keyring} = require('@polkadot/keyring');
let {ConcurrencyCount} = require("./config");

const keyring = new Keyring({type: 'sr25519'});

function validateMnemonic(mnemonic) {
    const words = mnemonic.split(' ');
    if (words.length !== 12) {
        throw new Error;
    }
    const wordPattern = /^\w+$/;
    for (const word of words) {
        if (!wordPattern.test(word)) {
            throw new Error;
        }
    }
    return true;
}

async function getAccountsFromMnemonics(filePath) {
    let accounts = [];
    let mnemonics = fs.readFileSync(filePath, 'utf-8').split('\n').filter(Boolean);
    let slice = ConcurrencyCount < mnemonics.length ? ConcurrencyCount : mnemonics.length;
    for (let i = 0; i < slice; i++) {
        validateMnemonic(mnemonics[i]);
        let account = keyring.addFromMnemonic(mnemonics[i]);
        accounts.push(account.address);
    }
    accounts = accounts.slice(0, slice)
    console.log(`Loaded ${accounts.length} accounts from ${filePath}`);
    return accounts;
}

module.exports = {
    getAccountsFromMnemonics
};

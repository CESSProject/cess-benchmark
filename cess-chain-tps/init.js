const {MnemonicAccountFilePath, TargetAccountFilePath, GenerateAccountCount} = require('./config');

const fs = require('fs');
const {mnemonicGenerate, cryptoWaitReady} = require('@polkadot/util-crypto');
const {getAccountsFromMnemonics} = require("./util");

async function generateAccountIfAbsent() {
    const mnemonicList = [];
    if (!fs.existsSync(MnemonicAccountFilePath)) {
        for (let i = 0; i < GenerateAccountCount; i++) {
            const mnemonic = mnemonicGenerate();
            mnemonicList.push(mnemonic);
        }
        try {
            fs.writeFileSync(
                MnemonicAccountFilePath,
                mnemonicList.join('\n') + '\n',
                'utf-8'
            );
            console.log('save mnemonic success');
        } catch (error) {
            console.error('save mnemonic error:', error);
            throw error;
        }
    }
    if (!fs.existsSync(TargetAccountFilePath)) {
        await cryptoWaitReady();
        let targetAccounts = await getAccountsFromMnemonics(MnemonicAccountFilePath);
        try {
            fs.writeFileSync(
                TargetAccountFilePath,
                targetAccounts.join('\n') + '\n',
                'utf-8'
            );
            console.log('save account success');
        } catch (error) {
            console.error('save account error:', error);
            throw error;
        }
    }
}

generateAccountIfAbsent().then()
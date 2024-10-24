const {TargetAccountFilePath, AccountCount} = require('./config');

const fs = require('fs');
const {mnemonicGenerate} = require('@polkadot/util-crypto');

function generateAccountIfAbsent() {
    const mnemonicList = [];
    const mnemonicsFilePath = TargetAccountFilePath;

    if (!fs.existsSync(mnemonicsFilePath)) {
        for (let i = 0; i < AccountCount; i++) {
            const mnemonic = mnemonicGenerate();
            mnemonicList.push(mnemonic);
        }
        try {
            fs.writeFileSync(
                mnemonicsFilePath,
                mnemonicList.join('\n') + '\n',
                'utf-8'
            );
            console.log('save mnemonic success');
        } catch (error) {
            console.error('save mnemonic error:', error);
            throw error;
        }
    }
}

generateAccountIfAbsent()
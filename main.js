const {ChainURL, SourceAccountMnemonic, TransferAmount, TargetAccountFilePath, RequestCount} = require('./config');
const {ApiPromise, WsProvider} = require('@polkadot/api');
const {Keyring} = require('@polkadot/keyring');
const {cryptoWaitReady} = require('@polkadot/util-crypto');
const fs = require("fs");


async function singleTransfer(api, paymentAccount, targetAccount, amount, nonce) {
    return new Promise((resolve, reject) => {
        api.tx.balances.transferKeepAlive(targetAccount, amount)
            .signAndSend(paymentAccount, {nonce}, ({status, dispatchError}) => {
                if (status.isInBlock) {
                    resolve();
                } else if (status.isFinalized) {
                    resolve();
                } else if (dispatchError) {
                    console.error(`Transfer to ${targetAccount} failed with error: ${dispatchError}`);
                    reject(dispatchError);
                }
            })
            .catch(error => {
                console.error(`Error sending transfer to ${targetAccount}:`, error);
                reject(error);
            });
    });
}

async function transfer(targetAccounts, amount) {
    const api = await ApiPromise.create({provider: wsProvider});
    const paymentAccount = keyring.addFromMnemonic(SourceAccountMnemonic);
    try {
        let {nonce} = await api.query.system.account(paymentAccount.address);
        console.log("Task start time:", new Date().toISOString());
        let transferResults = await Promise.allSettled(
            targetAccounts.map((targetAccount, index) => {
                console.log(`${index + 1},start to transfer to ${targetAccount}, amount: ${amount / BigInt(1000000000000000000)} TCESS`);
                return api.tx.balances.transferKeepAlive(targetAccount, amount)
                    .paymentInfo(paymentAccount)
                    .then(() => {
                        return singleTransfer(api, paymentAccount, targetAccount, amount, nonce.addn(index));
                    });
            })
        );
        console.log("Task end time:", new Date().toISOString());
        let successfulTransactions = transferResults.filter(result => result.status === 'fulfilled').length;
        let failedTransactions = transferResults.filter(result => result.status === 'rejected').length;
        console.log(`Successful txs count: ${successfulTransactions}`);
        console.log(`Failed txs count: ${failedTransactions}`);
        console.log('All txs done!');
        process.exit(0);
    } catch (error) {
        console.error('Something went wrong when sending txs:', error);
        process.exit(1);
    }
}

async function main() {
    await cryptoWaitReady();
    let targetAccounts = fs.readFileSync(TargetAccountFilePath, 'utf-8').split('\n').filter(Boolean).slice(0, RequestCount);
    await transfer(targetAccounts, TransferAmount).catch(console.error);
}

const keyring = new Keyring({type: 'sr25519'});
const wsProvider = new WsProvider(ChainURL);
main().then();
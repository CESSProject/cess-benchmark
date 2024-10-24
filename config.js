const ChainURL = 'wss://devnet-rpc.cess.network/ws/';
const ChainID = 11330;
const MaxConcurrencyCount = 5;
const TargetAccountFilePath = 'mnemonics.txt';
const SourceAccountMnemonic = '';
const TransferAmount = BigInt(1000000000000000000)
const AccountCount = 1000
const ConcurrencyCount = 800

module.exports = {
    ChainURL,
    ChainID,
    MaxConcurrencyCount,
    TargetAccountFilePath,
    SourceAccountMnemonic,
    TransferAmount,
    AccountCount,
    ConcurrencyCount
};
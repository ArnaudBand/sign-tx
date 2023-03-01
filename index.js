const { Alchemy, Network, Wallet, Utils } = require('alchemy-sdk');

require('dotenv').config();

const { TEST_API_KEY, TEST_PRIVATE_KEY } = process.env;

const settings = { 
  apiKey: TEST_API_KEY,
  network: Network.ETH_GOERLI
}

console.log('Setings', settings);

const alchemy = new Alchemy(settings);
// console.log("Alchemy", alchemy)

let wallet = new Wallet(TEST_PRIVATE_KEY);

// console.log('Wallet', wallet);

const main = async() => {
  const nonce = await alchemy.core.getTransactionCount(wallet.address, 'latest');

  let transaction = {
    to: '0x09e3be0507a5aa1e6e892e36b27e7256b3d9818a',
    value: Utils.parseEther('0.1'),
    gasLimit: '21000',
    maxPriorityFeePerGas: Utils.parseUnits('5', 'gwei'),
    maxFeePerGas: Utils.parseUnits('20', 'gwei'),
    nonce: nonce,
    type: 2,
    chainId: 5
  };

  let rawTransaction = await wallet.signTransaction(transaction);
  console.log('Raw tx:', rawTransaction);
  let tx = await alchemy.core.sendTransaction(rawTransaction);

  console.log(`https://goerli.etherscan.io/tx/${tx.hash}`)
}

main();
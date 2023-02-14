const Web3 = require('web3');
const BridgeEth = require('../build/contracts/BridgeEth.json');
const BridgeBsc = require('../build/contracts/BridgeBsc.json');

const web3Eth = new Web3('https://sepolia.infura.io/v3/4adff567c1b74855beac780489dad6c8');
// const web3Bsc = new Web3('https://data-seed-prebsc-2-s1.binance.org:8545'); //binance
const web3Bsc = new Web3('https://avalanche-fuji.infura.io/v3/4adff567c1b74855beac780489dad6c8'); //avalanche
const adminPrivKey = '4f7e52dc22e4251bc474a03bd3295440df29e2852bfb509471a4c3b84eaa6f9a';
const { address: admin } = web3Bsc.eth.accounts.wallet.add(adminPrivKey);


const bridgeEth = new web3Eth.eth.Contract(
  BridgeEth.abi,
  BridgeEth.networks['5'].address
);

const bridgeBsc = new web3Bsc.eth.Contract(
  BridgeBsc.abi,
  BridgeBsc.networks['43113'].address
);

bridgeEth.events.Transfer(
  {fromBlock: 0, step: 0}
)
.on('data', async event => {
  const { from, to, amount, date, nonce, signature } = event.returnValues;
  console.log( { from, to, amount, date, nonce, signature });
  const tx = bridgeBsc.methods.mint(from, to, amount, nonce, signature);
  const [gasPrice, gasCost] = await Promise.all([
    web3Bsc.eth.getGasPrice(),
    tx.estimateGas({from: admin}),
  ]);
  const data = tx.encodeABI();
  const txData = {
    from: admin,
    to: bridgeBsc.options.address,
    data,
    gas: gasCost,
    gasPrice
  };
  const receipt = await web3Bsc.eth.sendTransaction(txData);
  console.log(`Transaction hash: ${receipt.transactionHash}`);
  console.log(`
    Processed transfer:
    - from ${from} 
    - to ${to} 
    - amount ${amount} tokens
    - date ${date}
    - nonce ${nonce}
  `);
});
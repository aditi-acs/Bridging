// const { artifacts } = require('truffle');
const BridgeEth = artifacts.require('./BridgeEth.sol');

const privKey = '4f7e52dc22e4251bc474a03bd3295440df29e2852bfb509471a4c3b84eaa6f9a';

module.exports = async done => {

  const nonce = 1; //Need to increment this for each new transfer
  const accounts = await web3.eth.getAccounts();
  const bridgeEth = await BridgeEth.deployed();
  const amount = 1000;
  const message = web3.utils.soliditySha3(
    {t: 'address', v: accounts[0]},
    {t: 'address', v: accounts[0]},
    {t: 'uint256', v: amount},
    {t: 'uint256', v: nonce},
  ).toString('hex');
  // signing the message using private key of sender
  const { signature } = web3.eth.accounts.sign(
    message, 
    privKey
  ); 
  await bridgeEth.burn(accounts[0], amount, nonce, signature);
  done();
}
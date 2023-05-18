const { JsonRpcProvider, Wallet, ethers } = require('ethers')
const fs = require('fs')
require('dotenv').config()

module.exports = async function sendEther(reciever) {

    const provider = new JsonRpcProvider(process.env.RPC_URL)
    const { gasPrice, maxFeePerGas } = await provider.getFeeData()

    const wallet = new Wallet('0xcbfef217032858e9d419dc6c600592d5592b89341e4c4bee354646a5be541b63')
    const signer = wallet.connect(provider)

    const reciepent = reciever
    const tx = {
        from: wallet.address,
        to: reciepent,
        value: ethers.parseUnits("2", "ether"),
        gasPrice,
        gasLimit: 6721975,
        nonce: await provider.getTransactionCount(wallet.address)
    }
    const transaction = await signer.sendTransaction(tx);
    console.log("Ether Sent!");
}
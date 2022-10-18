# AAVE DAI Escrow

This is an AAVE DAI Escrow Dapp built with:
 - React
 - Hardhat
 - Nest

## Concept behind the Dapp

An escrow agreement often used when transferring funds in exchange for a good or service. Funds can be held in escrow and a third party can be chosen to "arbitrate" or approve the transfer when the service or good is provided. To make it interesting, we will be using DAI as the underlying asset that will earn interest using AAVE!

We'll have three parties involved in the Escrow:

 - `Depositor` - The payer of the Escrow, makes the initial deposit that will eventually go to the beneficiary.
 - `Beneficiary` - The receiver of the funds. They will provide some service or good to the depositor before the funds are transferred by the arbiter.
 - `Arbiter` - The approver of the transaction. They alone can move the funds when the goods/services have been provided

Here is the complete deployed functional Dapp [Dai-EScrow](https://dai-escrow.netlify.app/)

## Project Layout

There are three top-level folders:

1. `/frontend` - contains the front-end application
2. `/contracts` - contains the solidity contract
3. `/server` - contains the nest server that keeps track of our smart contracts details.


### Using the Dapp

To use the Dapp, first install [Metamask](metamask.io) to your browser of choice.

Once you have metamask installed, connect to your wallet with the **Goerli** network. The Dapp is currently setup to work **only on Goerli**. You can switch to Goerli by clicking on the metamask browser extension.

Once you have switched to Goerli, you will need some Goerli ether to perform any transactions.

When you have your Goerli Ether, the next step is to get some Goerli DAI. After all, this is a **DAI Escrow**! One way to do this would be to borrow some from [AAVE](https://testnet.aave.com/dashboard). If you deposit some Goerli ether you can borrow DAI. Then you can use this DAI to create and fund the Escrow contract!

Fill in the **New Contract** fields and then click **Approve DAI & Deploy**. This will have you approve the Escrow to spend your DAI, and then deploy the contract once that transaction has been completed (this may take a moment).

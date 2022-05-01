## Escrow Contracts REST API

Holds details of smart contracts that have been deployed on a Dai-Escrow web3.0 frontend. 

### This is a server connected to MongoDB with 4 methods end points:

- /GET - All Contracts
- /PATCH - Updates the approve state of a smart contract
- /DELETE - Deletes a contract has already been approved
- /POST - Stores details of a newly created smart contract.

# Built with:
- Nest Typescript
- MOngoDB
- Hosted on Heroku

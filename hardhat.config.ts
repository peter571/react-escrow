import * as dotenv from "dotenv";

import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";

dotenv.config();

let networks = { hardhat: {}}
if(process.env.FORK_URL) {
  networks.hardhat = {
    forking: {
      url: process.env.FORK_URL,
      blockNumber: 11395144
    }
  }
}

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  solidity: "0.7.5",
  networks: {
    ...networks,
  },
  paths: {
    artifacts: "./front-end/src/artifacts",
  },
};

export default config;

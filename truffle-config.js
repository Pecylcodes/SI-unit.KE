const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config();

module.exports = {
  networks: {
    development: {
      host: '127.0.0.1',
      port: 7545,
      network_id: '*',
    },
    testnet: {
      provider: () =>
        new HDWalletProvider(
          process.env.PRIVATE_KEY,
          'https://testnet.infura.io/v3/' + process.env.INFURA_PROJECT_ID
        ),
      network_id: 3,
      gas: 5500000,
    },
  },
  compilers: {
    solc: {
      version: '0.8.4',
    },
  },
};

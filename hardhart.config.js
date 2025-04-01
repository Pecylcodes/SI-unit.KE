require('@nomiclabs/hardhat-waffle');
require('dotenv').config();

module.exports = {
  solidity: '0.8.4',
  networks: {
    testnet: {
      url: 'https://testnet.infura.io/v3/' + process.env.INFURA_PROJECT_ID,
      accounts: [process.env.PRIVATE_KEY].filter(Boolean),
    },
  },
};

#Crypto Chess
Crypto Chess can be used to play chess over the Ethereum blockchain network

# Information

This is loosely based on [ethereum-webpack-example-dapp](https://githb.com/uzyn/ethereum-webpack-example-dapp).

## How to run

1. Run a local Ethereum node with JSON-RPC listening at port 8545 _(default)_. [testrpc](https://github.com/ethereumjs/testrpc) would be the most straight-forward method.

  ```bash
  # Using testrpc or ganache(recommended)
  testrpc

  # -----------OR-----------

  # If you are running Geth, 
  # make sure to run in testnet or private net and enable rpc
  geth --testnet --rpc
  ```

1. Install dependencies

  ```bash
  npm install
  ```

1. Run, during development

  ```bash
  npm start
  ```

  This starts the build process and also a local dev server. Open the given URL in your favorite web browser.

  Webpack is now started in `watch` mode, any changes done at JavaScript or Solidity files will automatically rebuild the affected modules.

1. Build, for deployment

  ```bash
  npm run build
  ```

  Only `index.html` and `bundle.js` are required to be hosted and served.

1. Run tests

  ```bash
  npm run test
  ```

1. You can run only one test file if you like: `npm test -- test/test_elo.js`

## FAQ

- _Deployment fails with out-of-gas_  
  When using testrpc, try raising the gas limit. Install any version newer than this:
  `npm install -g git://github.com/ethereumjs/testrpc.git#b3ec03eb8e2615453adcea7a93188ceb578a4094`
  and then run with `testrpc -l 4000000`, for example.

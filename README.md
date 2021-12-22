# Crypto Chess


Crypto Chess can be used to play chess over the Ethereum blockchain network.

## How to run

1. You can run on a local Ethereum node with JSON-RPC listening at port 8545 using testrpc or ganache.
2. USE in incognito Window or disable Metamask to use it because there is some bug in my codes that giving error with metamask result in blank screen on website.

  ```bash
  # Using testrpc or ganache(recommended as Metamask giving some problem on some contracts)
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
  When using testrpc / ganache, try raising the gas limit.

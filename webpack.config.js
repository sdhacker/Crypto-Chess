var path = require('path'); 
const Web3 = require("web3")

var rpcport = process.env.TESTRPC_PORT || '8545';
var web3provider = process.env.WEB3_PROVIDER || 'http://localhost:'+ rpcport;
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

// Use https://rpc-mumbai.matic.today as web3 provider for polygon Mumbai testnet

web3.eth.getBalance("0x5A0b54D5dc17e0AadC383d2db43B0a0D3E029c4c", function(err, result) {
  if (err) {
    console.log(err)
  } else {
    console.log(web3.fromWei(result, "ether") + " ETH")
  }
})
var block = web3.eth.getBlock("latest");
console.log("gasLimit: " + block.gasLimit);



console.log('Building with web3 provider: ', web3provider);

var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: ['./index'],
  output: {
    path: path.resolve('./static/'),
    publicPath: '/bundles/',
    filename: '[name].js'
  },
  web3Loader: {
    provider: web3provider,
    //gas: 8000000
    //gasLimit: 400000,

    constructorParams: {
      Chess: [true] // Enable debugging
    }
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        exclude: [/node_modules/, /\.tmp/],
        loader: 'jshint-loader'
      }
    ],
    loaders: [
      {
        test: /\.sol$/,
        loaders: ['web3', 'solc']
      },
      {
        test: /\.json$/,
        loaders: ['json']
      },
      {
        test: /\.js$/,
        loaders: ['babel'],
        exclude: /node_modules/,
        include: __dirname
      },
      {
        test: /\.(png)|(jpg)|(gif)|(otf)|(eot)|(ttf)|(woff)|(svg)$/,
        loaders: ['file-loader']
      },
      {
        test: [/\.less$/,/\.css$/],
        loader: ExtractTextPlugin.extract('style-loader',
                'css?sourceMap!' +
                'less?sourceMap'
                )
      }

    ]
  },
  jshint: {
    emitErrors: false,
    failOnHint: false
  },
  plugins: [
    new ExtractTextPlugin('styles.css')
  ]
};

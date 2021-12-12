/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/bundles/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(8);


/***/ }),
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(9);
	__webpack_require__(17);
	__webpack_require__(18);
	__webpack_require__(106);
	__webpack_require__(107);
	__webpack_require__(108);
	__webpack_require__(168);
	__webpack_require__(170);
	__webpack_require__(171);
	__webpack_require__(172);
	__webpack_require__(173);
	__webpack_require__(174);

/***/ }),
/* 9 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */
/***/ (function(module, exports) {

	'use strict';
	
	/* global angular */
	
	angular.module('dappChess', ['ngRoute', 'ngAnimate']);

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _Chess = __webpack_require__(19);
	
	angular.module('dappChess').factory('accounts', function () {
	  var accounts = {
	    // Use the first 5 accounts for mist or firefox and the last 5 for other browsers
	    availableAccounts: typeof mist !== 'undefined' || window.navigator.userAgent.indexOf('Firefox') !== -1 ? _Chess.web3.eth.accounts.slice(0, Math.floor(_Chess.web3.eth.accounts.length / 2)) : _Chess.web3.eth.accounts.slice(Math.floor(_Chess.web3.eth.accounts.length / 2), _Chess.web3.eth.accounts.length),
	
	    defaultAccount: _Chess.web3.eth.defaultAccount, selectedAccount: null,
	    selectedAccountName: null,
	
	    // Get ether balance with 4 digit precision
	    getBalance: function getBalance(account) {
	      if (_Chess.web3.eth.accounts.indexOf(account) !== -1) {
	        return _Chess.web3.fromWei(_Chess.web3.eth.getBalance(account), 'ether').toDigits(20, 3).toString(10);
	      }
	
	      return false;
	    },
	
	    getEloScore: function getEloScore(account) {
	      if (typeof account !== 'undefined' && account !== null) {
	        try {
	          return _Chess.Chess.getEloScore(account).toNumber();
	        } catch (e) {
	          return 100;
	        }
	      }
	      return 0;
	    },
	    getBlockie: function getBlockie(account) {
	      if (account) {
	        return {
	          'background-image': 'url(\'' + blockies.create({
	            seed: account
	          }).toDataURL() + '\')'
	        };
	      } else {
	        return {};
	      }
	    }
	  };
	  accounts.isSelectedAccount = function (account) {
	    return accounts.selectedAccount === account;
	  };
	  accounts.setSelectedAccount = function (account, name) {
	    accounts.selectedAccount = account;
	    if (name) {
	      accounts.selectedAccountName = name;
	    } else {
	      accounts.selectedAccountName = accounts.selectedAccount.substr(0, 7) + '...' + accounts.selectedAccount.substr(-7, 7);
	    }
	  };
	  accounts.selectOrCreateAccount = function ($event) {
	    $event.preventDefault();
	
	    if (typeof mist !== 'undefined') {
	      accounts.setSelectedAccount(mist.requestAccount());
	    } else {
	      jQuery('#overlay').show();
	      jQuery('#selectAccountLayer').show();
	    }
	  };
	  accounts.selectAccount = function (account, name) {
	    if (name) {
	      accounts.setSelectedAccount(account, name);
	    } else {
	      accounts.setSelectedAccount(account);
	    }
	    $('#selectAccountLayer').fadeOut();
	    $('#overlay').fadeOut();
	  };
	  return accounts;
	}).controller('accountsCtrl', function (accounts, $scope) {
	  $scope.accounts = accounts;
	}); /* global angular, mist, blockies */
	
	
	jQuery(document).ready(function ($) {
	  $('#overlay').click(function () {
	    $('#layers  div.layer').fadeOut();
	    $('#overlay').fadeOut();
	  });
	});

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Web3 Helper
	 * Returns initialized web3 instance
	 *
	 * @author: U-Zyn Chua <chua@uzyn.com>
	 */
	var Web3 = __webpack_require__(20);
	var web3;
	if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
	 web3 = new Web3(window.web3.currentProvider);
	} else {
	 web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
	}
	
	module.exports = {
	"Auth": web3.eth.contract([{"constant":true,"inputs":[{"name":"hash","type":"bytes32"},{"name":"v","type":"uint8"},{"name":"r","type":"bytes32"},{"name":"s","type":"bytes32"}],"name":"getAddress","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":true,"inputs":[{"name":"account","type":"address"},{"name":"hash","type":"bytes32"},{"name":"v","type":"uint8"},{"name":"r","type":"bytes32"},{"name":"s","type":"bytes32"}],"name":"verify","outputs":[{"name":"","type":"bool"}],"type":"function"},{"constant":true,"inputs":[{"name":"account","type":"address"},{"name":"hash","type":"bytes32"},{"name":"sig","type":"bytes"}],"name":"verifySig","outputs":[{"name":"","type":"bool"}],"type":"function"}]).at("0x12fcefd7bbcf9cd32ceb70d28c2f15e826bc77cb"),
	"ELO": web3.eth.contract([{"constant":false,"inputs":[{"name":"value","type":"int256"}],"name":"abs","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"self","type":"ELO.Scores storage"},{"name":"player","type":"address"},{"name":"score","type":"uint256"}],"name":"setScore","outputs":[],"type":"function"},{"constant":true,"inputs":[{"name":"self","type":"ELO.Scores storage"},{"name":"player","type":"address"}],"name":"getScore","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"self","type":"ELO.Scores storage"},{"name":"player1","type":"address"},{"name":"player2","type":"address"},{"name":"winner","type":"address"}],"name":"recordResult","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"difference","type":"int256"},{"name":"resultA","type":"int256"}],"name":"getScoreChange","outputs":[{"name":"","type":"int256"},{"name":"","type":"int256"}],"type":"function"}]).at("0x97eb9d9a2c3c9d44397a4e938f49055b4dce8844"),
	"ChessLogic": web3.eth.contract([{"constant":false,"inputs":[{"name":"self","type":"ChessLogic.State storage"},{"name":"newState","type":"int8[128]"},{"name":"nextPlayerColor","type":"int8"}],"name":"setState","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"value","type":"int256"}],"name":"abs","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"self","type":"ChessLogic.State storage"},{"name":"nextPlayerColor","type":"int8"}],"name":"setupState","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"value","type":"bool"}],"name":"boolToInt","outputs":[{"name":"","type":"int256"}],"type":"function"},{"constant":false,"inputs":[{"name":"self","type":"ChessLogic.State storage"},{"name":"fromIndex","type":"uint256"},{"name":"toIndex","type":"uint256"},{"name":"fromFigure","type":"int8"},{"name":"toFigure","type":"int8"},{"name":"movingPlayerColor","type":"int8"}],"name":"validateMove","outputs":[{"name":"","type":"bool"}],"type":"function"},{"constant":false,"inputs":[{"name":"self","type":"ChessLogic.State storage"},{"name":"direction","type":"int8"},{"name":"start","type":"int8"}],"name":"getFirstFigure","outputs":[{"name":"","type":"int8"}],"type":"function"},{"constant":false,"inputs":[{"name":"self","type":"ChessLogic.State storage"},{"name":"movingPlayerColor","type":"int8"}],"name":"getOwnKing","outputs":[{"name":"","type":"int8"}],"type":"function"},{"constant":false,"inputs":[{"name":"self","type":"ChessLogic.State storage"},{"name":"fromIndex","type":"uint256"},{"name":"toIndex","type":"uint256"},{"name":"isWhite","type":"bool"}],"name":"move","outputs":[],"type":"function"}]).at("0xdbbe6d957cbdb463303ea940a3d4e8d69a2f25f3"),
	"Chess": web3.eth.contract([{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"openGameIds","outputs":[{"name":"","type":"bytes32"}],"type":"function"},{"constant":false,"inputs":[{"name":"gameId","type":"bytes32"}],"name":"claimWin","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"gameId","type":"bytes32"}],"name":"rejectCurrentPlayerDraw","outputs":[],"type":"function"},{"constant":true,"inputs":[{"name":"hash","type":"bytes32"},{"name":"v","type":"uint8"},{"name":"r","type":"bytes32"},{"name":"s","type":"bytes32"}],"name":"getAddress","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":true,"inputs":[{"name":"account","type":"address"},{"name":"hash","type":"bytes32"},{"name":"v","type":"uint8"},{"name":"r","type":"bytes32"},{"name":"s","type":"bytes32"}],"name":"verify","outputs":[{"name":"","type":"bool"}],"type":"function"},{"constant":true,"inputs":[{"name":"player","type":"address"}],"name":"getEloScore","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[{"name":"gameId","type":"bytes32"}],"name":"isGameEnded","outputs":[{"name":"","type":"bool"}],"type":"function"},{"constant":false,"inputs":[{"name":"gameId","type":"bytes32"},{"name":"state","type":"int8[128]"},{"name":"fromIndex","type":"uint256"},{"name":"toIndex","type":"uint256"},{"name":"sigState","type":"bytes"}],"name":"moveFromState","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"player1Alias","type":"string"},{"name":"playAsWhite","type":"bool"},{"name":"turnTime","type":"uint256"}],"name":"initGame","outputs":[{"name":"","type":"bytes32"}],"type":"function"},{"constant":true,"inputs":[{"name":"gameId","type":"bytes32"}],"name":"getCurrentGameState","outputs":[{"name":"","type":"int8[128]"}],"type":"function"},{"constant":false,"inputs":[{"name":"gameId","type":"bytes32"},{"name":"state","type":"int8[128]"},{"name":"nextPlayer","type":"address"}],"name":"setGameState","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"gameId","type":"bytes32"}],"name":"withdraw","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"head","outputs":[{"name":"","type":"bytes32"}],"type":"function"},{"constant":false,"inputs":[{"name":"gameId","type":"bytes32"}],"name":"confirmGameEnded","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"gameId","type":"bytes32"}],"name":"claimTimeoutEnded","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"gameId","type":"bytes32"},{"name":"fromIndex","type":"uint256"},{"name":"toIndex","type":"uint256"}],"name":"move","outputs":[],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"bytes32"}],"name":"gamesOfPlayers","outputs":[{"name":"","type":"bytes32"}],"type":"function"},{"constant":false,"inputs":[{"name":"gameId","type":"bytes32"}],"name":"claimTimeout","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"gameId","type":"bytes32"}],"name":"surrender","outputs":[],"type":"function"},{"constant":true,"inputs":[{"name":"gameId","type":"bytes32"}],"name":"getWhitePlayer","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":false,"inputs":[{"name":"gameId","type":"bytes32"},{"name":"fromIndex","type":"uint256"},{"name":"toIndex","type":"uint256"}],"name":"claimTimeoutEndedWithMove","outputs":[],"type":"function"},{"constant":true,"inputs":[{"name":"account","type":"address"},{"name":"hash","type":"bytes32"},{"name":"sig","type":"bytes"}],"name":"verifySig","outputs":[{"name":"","type":"bool"}],"type":"function"},{"constant":true,"inputs":[],"name":"getOpenGameIds","outputs":[{"name":"","type":"bytes32[]"}],"type":"function"},{"constant":false,"inputs":[{"name":"gameId","type":"bytes32"}],"name":"offerDraw","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"gameId","type":"bytes32"},{"name":"player2Alias","type":"string"}],"name":"joinGame","outputs":[],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"gamesOfPlayersHeads","outputs":[{"name":"","type":"bytes32"}],"type":"function"},{"constant":true,"inputs":[{"name":"player","type":"address"}],"name":"getGamesOfPlayer","outputs":[{"name":"","type":"bytes32[]"}],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"games","outputs":[{"name":"player1","type":"address"},{"name":"player2","type":"address"},{"name":"player1Alias","type":"string"},{"name":"player2Alias","type":"string"},{"name":"nextPlayer","type":"address"},{"name":"winner","type":"address"},{"name":"ended","type":"bool"},{"name":"pot","type":"uint256"},{"name":"player1Winnings","type":"uint256"},{"name":"player2Winnings","type":"uint256"},{"name":"turnTime","type":"uint256"},{"name":"timeoutStarted","type":"uint256"},{"name":"timeoutState","type":"int8"}],"type":"function"},{"constant":false,"inputs":[{"name":"gameId","type":"bytes32"}],"name":"closePlayerGame","outputs":[],"type":"function"},{"inputs":[{"name":"enableDebugging","type":"bool"}],"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"gameId","type":"bytes32"},{"indexed":true,"name":"player1","type":"address"},{"indexed":false,"name":"player1Alias","type":"string"},{"indexed":false,"name":"playerWhite","type":"address"},{"indexed":false,"name":"turnTime","type":"uint256"},{"indexed":false,"name":"pot","type":"uint256"}],"name":"GameInitialized","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"gameId","type":"bytes32"},{"indexed":true,"name":"player1","type":"address"},{"indexed":false,"name":"player1Alias","type":"string"},{"indexed":true,"name":"player2","type":"address"},{"indexed":false,"name":"player2Alias","type":"string"},{"indexed":false,"name":"playerWhite","type":"address"},{"indexed":false,"name":"pot","type":"uint256"}],"name":"GameJoined","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"gameId","type":"bytes32"},{"indexed":false,"name":"state","type":"int8[128]"}],"name":"GameStateChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"gameId","type":"bytes32"},{"indexed":true,"name":"player","type":"address"},{"indexed":false,"name":"fromIndex","type":"uint256"},{"indexed":false,"name":"toIndex","type":"uint256"}],"name":"Move","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"player","type":"address"},{"indexed":false,"name":"score","type":"uint256"}],"name":"EloScoreUpdate","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"gameId","type":"bytes32"}],"name":"GameEnded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"gameId","type":"bytes32"},{"indexed":true,"name":"player","type":"address"}],"name":"GameClosed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"gameId","type":"bytes32"},{"indexed":false,"name":"timeoutStarted","type":"uint256"},{"indexed":false,"name":"timeoutState","type":"int8"}],"name":"GameTimeoutStarted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"gameId","type":"bytes32"}],"name":"GameDrawOfferRejected","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"message","type":"string"},{"indexed":false,"name":"value1","type":"uint256"},{"indexed":false,"name":"value2","type":"uint256"},{"indexed":false,"name":"value3","type":"uint256"}],"name":"DebugInts","type":"event"}]).at("0x05ecc071d977b6201731082c3bbc5b835c2e6e78"),
	"TurnBasedGame": web3.eth.contract([{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"openGameIds","outputs":[{"name":"","type":"bytes32"}],"type":"function"},{"constant":false,"inputs":[{"name":"gameId","type":"bytes32"}],"name":"claimWin","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"gameId","type":"bytes32"}],"name":"rejectCurrentPlayerDraw","outputs":[],"type":"function"},{"constant":true,"inputs":[{"name":"gameId","type":"bytes32"}],"name":"isGameEnded","outputs":[{"name":"","type":"bool"}],"type":"function"},{"constant":false,"inputs":[{"name":"player1Alias","type":"string"},{"name":"playAsWhite","type":"bool"},{"name":"turnTime","type":"uint256"}],"name":"initGame","outputs":[{"name":"","type":"bytes32"}],"type":"function"},{"constant":false,"inputs":[{"name":"gameId","type":"bytes32"}],"name":"withdraw","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"head","outputs":[{"name":"","type":"bytes32"}],"type":"function"},{"constant":false,"inputs":[{"name":"gameId","type":"bytes32"}],"name":"confirmGameEnded","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"gameId","type":"bytes32"}],"name":"claimTimeoutEnded","outputs":[],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"bytes32"}],"name":"gamesOfPlayers","outputs":[{"name":"","type":"bytes32"}],"type":"function"},{"constant":false,"inputs":[{"name":"gameId","type":"bytes32"}],"name":"claimTimeout","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"gameId","type":"bytes32"}],"name":"surrender","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"getOpenGameIds","outputs":[{"name":"","type":"bytes32[]"}],"type":"function"},{"constant":false,"inputs":[{"name":"gameId","type":"bytes32"}],"name":"offerDraw","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"gameId","type":"bytes32"},{"name":"player2Alias","type":"string"}],"name":"joinGame","outputs":[],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"gamesOfPlayersHeads","outputs":[{"name":"","type":"bytes32"}],"type":"function"},{"constant":true,"inputs":[{"name":"player","type":"address"}],"name":"getGamesOfPlayer","outputs":[{"name":"","type":"bytes32[]"}],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"games","outputs":[{"name":"player1","type":"address"},{"name":"player2","type":"address"},{"name":"player1Alias","type":"string"},{"name":"player2Alias","type":"string"},{"name":"nextPlayer","type":"address"},{"name":"winner","type":"address"},{"name":"ended","type":"bool"},{"name":"pot","type":"uint256"},{"name":"player1Winnings","type":"uint256"},{"name":"player2Winnings","type":"uint256"},{"name":"turnTime","type":"uint256"},{"name":"timeoutStarted","type":"uint256"},{"name":"timeoutState","type":"int8"}],"type":"function"},{"constant":false,"inputs":[{"name":"gameId","type":"bytes32"}],"name":"closePlayerGame","outputs":[],"type":"function"},{"inputs":[{"name":"enableDebugging","type":"bool"}],"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"gameId","type":"bytes32"}],"name":"GameEnded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"gameId","type":"bytes32"},{"indexed":true,"name":"player","type":"address"}],"name":"GameClosed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"gameId","type":"bytes32"},{"indexed":false,"name":"timeoutStarted","type":"uint256"},{"indexed":false,"name":"timeoutState","type":"int8"}],"name":"GameTimeoutStarted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"gameId","type":"bytes32"}],"name":"GameDrawOfferRejected","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"message","type":"string"},{"indexed":false,"name":"value1","type":"uint256"},{"indexed":false,"name":"value2","type":"uint256"},{"indexed":false,"name":"value3","type":"uint256"}],"name":"DebugInts","type":"event"}]).at("0x830656c6793452b9962e1e8612fc2c461850d7e9"),
	web3: web3
	};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	var Web3 = __webpack_require__(21);
	
	// dont override global variable
	if (typeof window !== 'undefined' && typeof window.Web3 === 'undefined') {
	    window.Web3 = Web3;
	}
	
	module.exports = Web3;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	/*
	    This file is part of web3.js.
	
	    web3.js is free software: you can redistribute it and/or modify
	    it under the terms of the GNU Lesser General Public License as published by
	    the Free Software Foundation, either version 3 of the License, or
	    (at your option) any later version.
	
	    web3.js is distributed in the hope that it will be useful,
	    but WITHOUT ANY WARRANTY; without even the implied warranty of
	    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	    GNU Lesser General Public License for more details.
	
	    You should have received a copy of the GNU Lesser General Public License
	    along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
	*/
	/**
	 * @file web3.js
	 * @authors:
	 *   Jeffrey Wilcke <jeff@ethdev.com>
	 *   Marek Kotewicz <marek@ethdev.com>
	 *   Marian Oancea <marian@ethdev.com>
	 *   Fabian Vogelsteller <fabian@ethdev.com>
	 *   Gav Wood <g@ethdev.com>
	 * @date 2014
	 */
	
	var RequestManager = __webpack_require__(22);
	var Iban = __webpack_require__(65);
	var Eth = __webpack_require__(66);
	var DB = __webpack_require__(95);
	var Shh = __webpack_require__(96);
	var Net = __webpack_require__(97);
	var Personal = __webpack_require__(98);
	var Settings = __webpack_require__(99);
	var version = __webpack_require__(100);
	var utils = __webpack_require__(24);
	var sha3 = __webpack_require__(26);
	var extend = __webpack_require__(101);
	var Batch = __webpack_require__(102);
	var Property = __webpack_require__(69);
	var HttpProvider = __webpack_require__(103);
	var IpcProvider = __webpack_require__(105);
	
	
	
	function Web3 (provider) {
	    this._requestManager = new RequestManager(provider);
	    this.currentProvider = provider;
	    this.eth = new Eth(this);
	    this.db = new DB(this);
	    this.shh = new Shh(this);
	    this.net = new Net(this);
	    this.personal = new Personal(this);
	    this.settings = new Settings();
	    this.version = {
	        api: version.version
	    };
	    this.providers = {
	        HttpProvider: HttpProvider,
	        IpcProvider: IpcProvider
	    };
	    this._extend = extend(this);
	    this._extend({
	        properties: properties()
	    });
	}
	
	// expose providers on the class
	Web3.providers = {
	    HttpProvider: HttpProvider,
	    IpcProvider: IpcProvider
	};
	
	Web3.prototype.setProvider = function (provider) {
	    this._requestManager.setProvider(provider);
	    this.currentProvider = provider;
	};
	
	Web3.prototype.reset = function (keepIsSyncing) {
	    this._requestManager.reset(keepIsSyncing);
	    this.settings = new Settings();
	};
	
	Web3.prototype.toHex = utils.toHex;
	Web3.prototype.toAscii = utils.toAscii;
	Web3.prototype.toUtf8 = utils.toUtf8;
	Web3.prototype.fromAscii = utils.fromAscii;
	Web3.prototype.fromUtf8 = utils.fromUtf8;
	Web3.prototype.toDecimal = utils.toDecimal;
	Web3.prototype.fromDecimal = utils.fromDecimal;
	Web3.prototype.toBigNumber = utils.toBigNumber;
	Web3.prototype.toWei = utils.toWei;
	Web3.prototype.fromWei = utils.fromWei;
	Web3.prototype.isAddress = utils.isAddress;
	Web3.prototype.isChecksumAddress = utils.isChecksumAddress;
	Web3.prototype.toChecksumAddress = utils.toChecksumAddress;
	Web3.prototype.isIBAN = utils.isIBAN;
	Web3.prototype.sha3 = sha3;
	
	/**
	 * Transforms direct icap to address
	 */
	Web3.prototype.fromICAP = function (icap) {
	    var iban = new Iban(icap);
	    return iban.address();
	};
	
	var properties = function () {
	    return [
	        new Property({
	            name: 'version.node',
	            getter: 'web3_clientVersion'
	        }),
	        new Property({
	            name: 'version.network',
	            getter: 'net_version',
	            inputFormatter: utils.toDecimal
	        }),
	        new Property({
	            name: 'version.ethereum',
	            getter: 'eth_protocolVersion',
	            inputFormatter: utils.toDecimal
	        }),
	        new Property({
	            name: 'version.whisper',
	            getter: 'shh_version',
	            inputFormatter: utils.toDecimal
	        })
	    ];
	};
	
	Web3.prototype.isConnected = function(){
	    return (this.currentProvider && this.currentProvider.isConnected());
	};
	
	Web3.prototype.createBatch = function () {
	    return new Batch(this);
	};
	
	module.exports = Web3;
	


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	/*
	    This file is part of web3.js.
	
	    web3.js is free software: you can redistribute it and/or modify
	    it under the terms of the GNU Lesser General Public License as published by
	    the Free Software Foundation, either version 3 of the License, or
	    (at your option) any later version.
	
	    web3.js is distributed in the hope that it will be useful,
	    but WITHOUT ANY WARRANTY; without even the implied warranty of
	    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	    GNU Lesser General Public License for more details.
	
	    You should have received a copy of the GNU Lesser General Public License
	    along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
	*/
	/** 
	 * @file requestmanager.js
	 * @author Jeffrey Wilcke <jeff@ethdev.com>
	 * @author Marek Kotewicz <marek@ethdev.com>
	 * @author Marian Oancea <marian@ethdev.com>
	 * @author Fabian Vogelsteller <fabian@ethdev.com>
	 * @author Gav Wood <g@ethdev.com>
	 * @date 2014
	 */
	
	var Jsonrpc = __webpack_require__(23);
	var utils = __webpack_require__(24);
	var c = __webpack_require__(63);
	var errors = __webpack_require__(64);
	
	/**
	 * It's responsible for passing messages to providers
	 * It's also responsible for polling the ethereum node for incoming messages
	 * Default poll timeout is 1 second
	 * Singleton
	 */
	var RequestManager = function (provider) {
	    this.provider = provider;
	    this.polls = {};
	    this.timeout = null;
	};
	
	/**
	 * Should be used to synchronously send request
	 *
	 * @method send
	 * @param {Object} data
	 * @return {Object}
	 */
	RequestManager.prototype.send = function (data) {
	    if (!this.provider) {
	        console.error(errors.InvalidProvider());
	        return null;
	    }
	
	    var payload = Jsonrpc.getInstance().toPayload(data.method, data.params);
	    var result = this.provider.send(payload);
	
	    if (!Jsonrpc.getInstance().isValidResponse(result)) {
	        throw errors.InvalidResponse(result);
	    }
	
	    return result.result;
	};
	
	/**
	 * Should be used to asynchronously send request
	 *
	 * @method sendAsync
	 * @param {Object} data
	 * @param {Function} callback
	 */
	RequestManager.prototype.sendAsync = function (data, callback) {
	    if (!this.provider) {
	        return callback(errors.InvalidProvider());
	    }
	
	    var payload = Jsonrpc.getInstance().toPayload(data.method, data.params);
	    this.provider.sendAsync(payload, function (err, result) {
	        if (err) {
	            return callback(err);
	        }
	        
	        if (!Jsonrpc.getInstance().isValidResponse(result)) {
	            return callback(errors.InvalidResponse(result));
	        }
	
	        callback(null, result.result);
	    });
	};
	
	/**
	 * Should be called to asynchronously send batch request
	 *
	 * @method sendBatch
	 * @param {Array} batch data
	 * @param {Function} callback
	 */
	RequestManager.prototype.sendBatch = function (data, callback) {
	    if (!this.provider) {
	        return callback(errors.InvalidProvider());
	    }
	
	    var payload = Jsonrpc.getInstance().toBatchPayload(data);
	
	    this.provider.sendAsync(payload, function (err, results) {
	        if (err) {
	            return callback(err);
	        }
	
	        if (!utils.isArray(results)) {
	            return callback(errors.InvalidResponse(results));
	        }
	
	        callback(err, results);
	    }); 
	};
	
	/**
	 * Should be used to set provider of request manager
	 *
	 * @method setProvider
	 * @param {Object}
	 */
	RequestManager.prototype.setProvider = function (p) {
	    this.provider = p;
	};
	
	/**
	 * Should be used to start polling
	 *
	 * @method startPolling
	 * @param {Object} data
	 * @param {Number} pollId
	 * @param {Function} callback
	 * @param {Function} uninstall
	 *
	 * @todo cleanup number of params
	 */
	RequestManager.prototype.startPolling = function (data, pollId, callback, uninstall) {
	    this.polls[pollId] = {data: data, id: pollId, callback: callback, uninstall: uninstall};
	
	
	    // start polling
	    if (!this.timeout) {
	        this.poll();
	    }
	};
	
	/**
	 * Should be used to stop polling for filter with given id
	 *
	 * @method stopPolling
	 * @param {Number} pollId
	 */
	RequestManager.prototype.stopPolling = function (pollId) {
	    delete this.polls[pollId];
	
	    // stop polling
	    if(Object.keys(this.polls).length === 0 && this.timeout) {
	        clearTimeout(this.timeout);
	        this.timeout = null;
	    }
	};
	
	/**
	 * Should be called to reset the polling mechanism of the request manager
	 *
	 * @method reset
	 */
	RequestManager.prototype.reset = function (keepIsSyncing) {
	    /*jshint maxcomplexity:5 */
	
	    for (var key in this.polls) {
	        // remove all polls, except sync polls,
	        // they need to be removed manually by calling syncing.stopWatching()
	        if(!keepIsSyncing || key.indexOf('syncPoll_') === -1) {
	            this.polls[key].uninstall();
	            delete this.polls[key];
	        }
	    }
	
	    // stop polling
	    if(Object.keys(this.polls).length === 0 && this.timeout) {
	        clearTimeout(this.timeout);
	        this.timeout = null;
	    }
	};
	
	/**
	 * Should be called to poll for changes on filter with given id
	 *
	 * @method poll
	 */
	RequestManager.prototype.poll = function () {
	    /*jshint maxcomplexity: 6 */
	    this.timeout = setTimeout(this.poll.bind(this), c.ETH_POLLING_TIMEOUT);
	
	    if (Object.keys(this.polls).length === 0) {
	        return;
	    }
	
	    if (!this.provider) {
	        console.error(errors.InvalidProvider());
	        return;
	    }
	
	    var pollsData = [];
	    var pollsIds = [];
	    for (var key in this.polls) {
	        pollsData.push(this.polls[key].data);
	        pollsIds.push(key);
	    }
	
	    if (pollsData.length === 0) {
	        return;
	    }
	
	    var payload = Jsonrpc.getInstance().toBatchPayload(pollsData);
	    
	    // map the request id to they poll id
	    var pollsIdMap = {};
	    payload.forEach(function(load, index){
	        pollsIdMap[load.id] = pollsIds[index];
	    });
	
	
	    var self = this;
	    this.provider.sendAsync(payload, function (error, results) {
	
	
	        // TODO: console log?
	        if (error) {
	            return;
	        }
	
	        if (!utils.isArray(results)) {
	            throw errors.InvalidResponse(results);
	        }
	        results.map(function (result) {
	            var id = pollsIdMap[result.id];
	
	            // make sure the filter is still installed after arrival of the request
	            if (self.polls[id]) {
	                result.callback = self.polls[id].callback;
	                return result;
	            } else
	                return false;
	        }).filter(function (result) {
	            return !!result; 
	        }).filter(function (result) {
	            var valid = Jsonrpc.getInstance().isValidResponse(result);
	            if (!valid) {
	                result.callback(errors.InvalidResponse(result));
	            }
	            return valid;
	        }).forEach(function (result) {
	            result.callback(null, result.result);
	        });
	    });
	};
	
	module.exports = RequestManager;
	


/***/ }),
/* 23 */
/***/ (function(module, exports) {

	/*
	    This file is part of web3.js.
	
	    web3.js is free software: you can redistribute it and/or modify
	    it under the terms of the GNU Lesser General Public License as published by
	    the Free Software Foundation, either version 3 of the License, or
	    (at your option) any later version.
	
	    web3.js is distributed in the hope that it will be useful,
	    but WITHOUT ANY WARRANTY; without even the implied warranty of
	    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	    GNU Lesser General Public License for more details.
	
	    You should have received a copy of the GNU Lesser General Public License
	    along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
	*/
	/** @file jsonrpc.js
	 * @authors:
	 *   Marek Kotewicz <marek@ethdev.com>
	 * @date 2015
	 */
	
	var Jsonrpc = function () {
	    // singleton pattern
	    if (arguments.callee._singletonInstance) {
	        return arguments.callee._singletonInstance;
	    }
	    arguments.callee._singletonInstance = this;
	
	    this.messageId = 1;
	};
	
	/**
	 * @return {Jsonrpc} singleton
	 */
	Jsonrpc.getInstance = function () {
	    var instance = new Jsonrpc();
	    return instance;
	};
	
	/**
	 * Should be called to valid json create payload object
	 *
	 * @method toPayload
	 * @param {Function} method of jsonrpc call, required
	 * @param {Array} params, an array of method params, optional
	 * @returns {Object} valid jsonrpc payload object
	 */
	Jsonrpc.prototype.toPayload = function (method, params) {
	    if (!method)
	        console.error('jsonrpc method should be specified!');
	
	    return {
	        jsonrpc: '2.0',
	        method: method,
	        params: params || [],
	        id: this.messageId++
	    };
	};
	
	/**
	 * Should be called to check if jsonrpc response is valid
	 *
	 * @method isValidResponse
	 * @param {Object}
	 * @returns {Boolean} true if response is valid, otherwise false
	 */
	Jsonrpc.prototype.isValidResponse = function (response) {
	    return !!response &&
	        !response.error &&
	        response.jsonrpc === '2.0' &&
	        typeof response.id === 'number' &&
	        response.result !== undefined; // only undefined is not valid json object
	};
	
	/**
	 * Should be called to create batch payload object
	 *
	 * @method toBatchPayload
	 * @param {Array} messages, an array of objects with method (required) and params (optional) fields
	 * @returns {Array} batch payload
	 */
	Jsonrpc.prototype.toBatchPayload = function (messages) {
	    var self = this;
	    return messages.map(function (message) {
	        return self.toPayload(message.method, message.params);
	    });
	};
	
	module.exports = Jsonrpc;
	


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

	/*
	    This file is part of web3.js.
	
	    web3.js is free software: you can redistribute it and/or modify
	    it under the terms of the GNU Lesser General Public License as published by
	    the Free Software Foundation, either version 3 of the License, or
	    (at your option) any later version.
	
	    web3.js is distributed in the hope that it will be useful,
	    but WITHOUT ANY WARRANTY; without even the implied warranty of
	    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	    GNU Lesser General Public License for more details.
	
	    You should have received a copy of the GNU Lesser General Public License
	    along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
	*/
	/**
	 * @file utils.js
	 * @author Marek Kotewicz <marek@ethdev.com>
	 * @date 2015
	 */
	
	/**
	 * Utils
	 *
	 * @module utils
	 */
	
	/**
	 * Utility functions
	 *
	 * @class [utils] utils
	 * @constructor
	 */
	
	
	var BigNumber = __webpack_require__(25);
	var sha3 = __webpack_require__(26);
	var utf8 = __webpack_require__(61);
	
	var unitMap = {
	    'noether':      '0',    
	    'wei':          '1',
	    'kwei':         '1000',
	    'Kwei':         '1000',
	    'babbage':      '1000',
	    'femtoether':   '1000',
	    'mwei':         '1000000',
	    'Mwei':         '1000000',
	    'lovelace':     '1000000',
	    'picoether':    '1000000',
	    'gwei':         '1000000000',
	    'Gwei':         '1000000000',
	    'shannon':      '1000000000',
	    'nanoether':    '1000000000',
	    'nano':         '1000000000',
	    'szabo':        '1000000000000',
	    'microether':   '1000000000000',
	    'micro':        '1000000000000',
	    'finney':       '1000000000000000',
	    'milliether':    '1000000000000000',
	    'milli':         '1000000000000000',
	    'ether':        '1000000000000000000',
	    'kether':       '1000000000000000000000',
	    'grand':        '1000000000000000000000',
	    'mether':       '1000000000000000000000000',
	    'gether':       '1000000000000000000000000000',
	    'tether':       '1000000000000000000000000000000'
	};
	
	/**
	 * Should be called to pad string to expected length
	 *
	 * @method padLeft
	 * @param {String} string to be padded
	 * @param {Number} characters that result string should have
	 * @param {String} sign, by default 0
	 * @returns {String} right aligned string
	 */
	var padLeft = function (string, chars, sign) {
	    return new Array(chars - string.length + 1).join(sign ? sign : "0") + string;
	};
	
	/**
	 * Should be called to pad string to expected length
	 *
	 * @method padRight
	 * @param {String} string to be padded
	 * @param {Number} characters that result string should have
	 * @param {String} sign, by default 0
	 * @returns {String} right aligned string
	 */
	var padRight = function (string, chars, sign) {
	    return string + (new Array(chars - string.length + 1).join(sign ? sign : "0"));
	};
	
	/**
	 * Should be called to get utf8 from it's hex representation
	 *
	 * @method toUtf8
	 * @param {String} string in hex
	 * @returns {String} ascii string representation of hex value
	 */
	var toUtf8 = function(hex) {
	// Find termination
	    var str = "";
	    var i = 0, l = hex.length;
	    if (hex.substring(0, 2) === '0x') {
	        i = 2;
	    }
	    for (; i < l; i+=2) {
	        var code = parseInt(hex.substr(i, 2), 16);
	        if (code === 0)
	            break;
	        str += String.fromCharCode(code);
	    }
	
	    return utf8.decode(str);
	};
	
	/**
	 * Should be called to get ascii from it's hex representation
	 *
	 * @method toAscii
	 * @param {String} string in hex
	 * @returns {String} ascii string representation of hex value
	 */
	var toAscii = function(hex) {
	// Find termination
	    var str = "";
	    var i = 0, l = hex.length;
	    if (hex.substring(0, 2) === '0x') {
	        i = 2;
	    }
	    for (; i < l; i+=2) {
	        var code = parseInt(hex.substr(i, 2), 16);
	        str += String.fromCharCode(code);
	    }
	
	    return str;
	};
	
	/**
	 * Should be called to get hex representation (prefixed by 0x) of utf8 string
	 *
	 * @method fromUtf8
	 * @param {String} string
	 * @param {Number} optional padding
	 * @returns {String} hex representation of input string
	 */
	var fromUtf8 = function(str) {
	    str = utf8.encode(str);
	    var hex = "";
	    for(var i = 0; i < str.length; i++) {
	        var code = str.charCodeAt(i);
	        if (code === 0)
	            break;
	        var n = code.toString(16);
	        hex += n.length < 2 ? '0' + n : n;
	    }
	
	    return "0x" + hex;
	};
	
	/**
	 * Should be called to get hex representation (prefixed by 0x) of ascii string
	 *
	 * @method fromAscii
	 * @param {String} string
	 * @param {Number} optional padding
	 * @returns {String} hex representation of input string
	 */
	var fromAscii = function(str) {
	    var hex = "";
	    for(var i = 0; i < str.length; i++) {
	        var code = str.charCodeAt(i);
	        var n = code.toString(16);
	        hex += n.length < 2 ? '0' + n : n;
	    }
	
	    return "0x" + hex;
	};
	
	/**
	 * Should be used to create full function/event name from json abi
	 *
	 * @method transformToFullName
	 * @param {Object} json-abi
	 * @return {String} full fnction/event name
	 */
	var transformToFullName = function (json) {
	    if (json.name.indexOf('(') !== -1) {
	        return json.name;
	    }
	
	    var typeName = json.inputs.map(function(i){return i.type; }).join();
	    return json.name + '(' + typeName + ')';
	};
	
	/**
	 * Should be called to get display name of contract function
	 *
	 * @method extractDisplayName
	 * @param {String} name of function/event
	 * @returns {String} display name for function/event eg. multiply(uint256) -> multiply
	 */
	var extractDisplayName = function (name) {
	    var length = name.indexOf('(');
	    return length !== -1 ? name.substr(0, length) : name;
	};
	
	/// @returns overloaded part of function/event name
	var extractTypeName = function (name) {
	    /// TODO: make it invulnerable
	    var length = name.indexOf('(');
	    return length !== -1 ? name.substr(length + 1, name.length - 1 - (length + 1)).replace(' ', '') : "";
	};
	
	/**
	 * Converts value to it's decimal representation in string
	 *
	 * @method toDecimal
	 * @param {String|Number|BigNumber}
	 * @return {String}
	 */
	var toDecimal = function (value) {
	    return toBigNumber(value).toNumber();
	};
	
	/**
	 * Converts value to it's hex representation
	 *
	 * @method fromDecimal
	 * @param {String|Number|BigNumber}
	 * @return {String}
	 */
	var fromDecimal = function (value) {
	    var number = toBigNumber(value);
	    var result = number.toString(16);
	
	    return number.lessThan(0) ? '-0x' + result.substr(1) : '0x' + result;
	};
	
	/**
	 * Auto converts any given value into it's hex representation.
	 *
	 * And even stringifys objects before.
	 *
	 * @method toHex
	 * @param {String|Number|BigNumber|Object}
	 * @return {String}
	 */
	var toHex = function (val) {
	    /*jshint maxcomplexity: 8 */
	
	    if (isBoolean(val))
	        return fromDecimal(+val);
	
	    if (isBigNumber(val))
	        return fromDecimal(val);
	
	    if (isObject(val))
	        return fromUtf8(JSON.stringify(val));
	
	    // if its a negative number, pass it through fromDecimal
	    if (isString(val)) {
	        if (val.indexOf('-0x') === 0)
	            return fromDecimal(val);
	        else if(val.indexOf('0x') === 0)
	            return val;
	        else if (!isFinite(val))
	            return fromAscii(val);
	    }
	
	    return fromDecimal(val);
	};
	
	/**
	 * Returns value of unit in Wei
	 *
	 * @method getValueOfUnit
	 * @param {String} unit the unit to convert to, default ether
	 * @returns {BigNumber} value of the unit (in Wei)
	 * @throws error if the unit is not correct:w
	 */
	var getValueOfUnit = function (unit) {
	    unit = unit ? unit.toLowerCase() : 'ether';
	    var unitValue = unitMap[unit];
	    if (unitValue === undefined) {
	        throw new Error('This unit doesn\'t exists, please use the one of the following units' + JSON.stringify(unitMap, null, 2));
	    }
	    return new BigNumber(unitValue, 10);
	};
	
	/**
	 * Takes a number of wei and converts it to any other ether unit.
	 *
	 * Possible units are:
	 *   SI Short   SI Full        Effigy       Other
	 * - kwei       femtoether     babbage
	 * - mwei       picoether      lovelace
	 * - gwei       nanoether      shannon      nano
	 * - --         microether     szabo        micro
	 * - --         milliether     finney       milli
	 * - ether      --             --
	 * - kether                    --           grand
	 * - mether
	 * - gether
	 * - tether
	 *
	 * @method fromWei
	 * @param {Number|String} number can be a number, number string or a HEX of a decimal
	 * @param {String} unit the unit to convert to, default ether
	 * @return {String|Object} When given a BigNumber object it returns one as well, otherwise a number
	*/
	var fromWei = function(number, unit) {
	    var returnValue = toBigNumber(number).dividedBy(getValueOfUnit(unit));
	
	    return isBigNumber(number) ? returnValue : returnValue.toString(10);
	};
	
	/**
	 * Takes a number of a unit and converts it to wei.
	 *
	 * Possible units are:
	 *   SI Short   SI Full        Effigy       Other
	 * - kwei       femtoether     babbage
	 * - mwei       picoether      lovelace
	 * - gwei       nanoether      shannon      nano
	 * - --         microether     szabo        micro
	 * - --         microether     szabo        micro
	 * - --         milliether     finney       milli
	 * - ether      --             --
	 * - kether                    --           grand
	 * - mether
	 * - gether
	 * - tether
	 *
	 * @method toWei
	 * @param {Number|String|BigNumber} number can be a number, number string or a HEX of a decimal
	 * @param {String} unit the unit to convert from, default ether
	 * @return {String|Object} When given a BigNumber object it returns one as well, otherwise a number
	*/
	var toWei = function(number, unit) {
	    var returnValue = toBigNumber(number).times(getValueOfUnit(unit));
	
	    return isBigNumber(number) ? returnValue : returnValue.toString(10);
	};
	
	/**
	 * Takes an input and transforms it into an bignumber
	 *
	 * @method toBigNumber
	 * @param {Number|String|BigNumber} a number, string, HEX string or BigNumber
	 * @return {BigNumber} BigNumber
	*/
	var toBigNumber = function(number) {
	    /*jshint maxcomplexity:5 */
	    number = number || 0;
	    if (isBigNumber(number))
	        return number;
	
	    if (isString(number) && (number.indexOf('0x') === 0 || number.indexOf('-0x') === 0)) {
	        return new BigNumber(number.replace('0x',''), 16);
	    }
	
	    return new BigNumber(number.toString(10), 10);
	};
	
	/**
	 * Takes and input transforms it into bignumber and if it is negative value, into two's complement
	 *
	 * @method toTwosComplement
	 * @param {Number|String|BigNumber}
	 * @return {BigNumber}
	 */
	var toTwosComplement = function (number) {
	    var bigNumber = toBigNumber(number);
	    if (bigNumber.lessThan(0)) {
	        return new BigNumber("ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff", 16).plus(bigNumber).plus(1);
	    }
	    return bigNumber;
	};
	
	/**
	 * Checks if the given string is strictly an address
	 *
	 * @method isStrictAddress
	 * @param {String} address the given HEX adress
	 * @return {Boolean}
	*/
	var isStrictAddress = function (address) {
	    return /^0x[0-9a-f]{40}$/i.test(address);
	};
	
	/**
	 * Checks if the given string is an address
	 *
	 * @method isAddress
	 * @param {String} address the given HEX adress
	 * @return {Boolean}
	*/
	var isAddress = function (address) {
	    if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
	        // check if it has the basic requirements of an address
	        return false;
	    } else if (/^(0x)?[0-9a-f]{40}$/.test(address) || /^(0x)?[0-9A-F]{40}$/.test(address)) {
	        // If it's all small caps or all all caps, return true
	        return true;
	    } else {
	        // Otherwise check each case
	        return isChecksumAddress(address);
	    }
	};
	
	
	
	/**
	 * Checks if the given string is a checksummed address
	 *
	 * @method isChecksumAddress
	 * @param {String} address the given HEX adress
	 * @return {Boolean}
	*/
	var isChecksumAddress = function (address) {    
	    // Check each case
	    address = address.replace('0x','');
	    var addressHash = sha3(address.toLowerCase());
	
	    for (var i = 0; i < 40; i++ ) { 
	        // the nth letter should be uppercase if the nth digit of casemap is 1
	        if ((parseInt(addressHash[i], 16) > 7 && address[i].toUpperCase() !== address[i]) || (parseInt(addressHash[i], 16) <= 7 && address[i].toLowerCase() !== address[i])) {
	            return false;
	        }
	    }
	    return true;    
	};
	
	
	
	/**
	 * Makes a checksum address
	 *
	 * @method toChecksumAddress
	 * @param {String} address the given HEX adress
	 * @return {String}
	*/
	var toChecksumAddress = function (address) { 
	    if (typeof address === 'undefined') return '';
	
	    address = address.toLowerCase().replace('0x','');
	    var addressHash = sha3(address);
	    var checksumAddress = '0x';
	
	    for (var i = 0; i < address.length; i++ ) { 
	        // If ith character is 9 to f then make it uppercase 
	        if (parseInt(addressHash[i], 16) > 7) {
	          checksumAddress += address[i].toUpperCase();
	        } else {
	            checksumAddress += address[i];
	        }
	    }
	    return checksumAddress;
	};
	
	/**
	 * Transforms given string to valid 20 bytes-length addres with 0x prefix
	 *
	 * @method toAddress
	 * @param {String} address
	 * @return {String} formatted address
	 */
	var toAddress = function (address) {
	    if (isStrictAddress(address)) {
	        return address;
	    }
	
	    if (/^[0-9a-f]{40}$/.test(address)) {
	        return '0x' + address;
	    }
	
	    return '0x' + padLeft(toHex(address).substr(2), 40);
	};
	
	/**
	 * Returns true if object is BigNumber, otherwise false
	 *
	 * @method isBigNumber
	 * @param {Object}
	 * @return {Boolean}
	 */
	var isBigNumber = function (object) {
	    return object instanceof BigNumber ||
	        (object && object.constructor && object.constructor.name === 'BigNumber');
	};
	
	/**
	 * Returns true if object is string, otherwise false
	 *
	 * @method isString
	 * @param {Object}
	 * @return {Boolean}
	 */
	var isString = function (object) {
	    return typeof object === 'string' ||
	        (object && object.constructor && object.constructor.name === 'String');
	};
	
	/**
	 * Returns true if object is function, otherwise false
	 *
	 * @method isFunction
	 * @param {Object}
	 * @return {Boolean}
	 */
	var isFunction = function (object) {
	    return typeof object === 'function';
	};
	
	/**
	 * Returns true if object is Objet, otherwise false
	 *
	 * @method isObject
	 * @param {Object}
	 * @return {Boolean}
	 */
	var isObject = function (object) {
	    return typeof object === 'object';
	};
	
	/**
	 * Returns true if object is boolean, otherwise false
	 *
	 * @method isBoolean
	 * @param {Object}
	 * @return {Boolean}
	 */
	var isBoolean = function (object) {
	    return typeof object === 'boolean';
	};
	
	/**
	 * Returns true if object is array, otherwise false
	 *
	 * @method isArray
	 * @param {Object}
	 * @return {Boolean}
	 */
	var isArray = function (object) {
	    return object instanceof Array;
	};
	
	/**
	 * Returns true if given string is valid json object
	 *
	 * @method isJson
	 * @param {String}
	 * @return {Boolean}
	 */
	var isJson = function (str) {
	    try {
	        return !!JSON.parse(str);
	    } catch (e) {
	        return false;
	    }
	};
	
	module.exports = {
	    padLeft: padLeft,
	    padRight: padRight,
	    toHex: toHex,
	    toDecimal: toDecimal,
	    fromDecimal: fromDecimal,
	    toUtf8: toUtf8,
	    toAscii: toAscii,
	    fromUtf8: fromUtf8,
	    fromAscii: fromAscii,
	    transformToFullName: transformToFullName,
	    extractDisplayName: extractDisplayName,
	    extractTypeName: extractTypeName,
	    toWei: toWei,
	    fromWei: fromWei,
	    toBigNumber: toBigNumber,
	    toTwosComplement: toTwosComplement,
	    toAddress: toAddress,
	    isBigNumber: isBigNumber,
	    isStrictAddress: isStrictAddress,
	    isAddress: isAddress,
	    isChecksumAddress: isChecksumAddress,
	    toChecksumAddress: toChecksumAddress,
	    isFunction: isFunction,
	    isString: isString,
	    isObject: isObject,
	    isBoolean: isBoolean,
	    isArray: isArray,
	    isJson: isJson
	};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*! bignumber.js v2.0.7 https://github.com/MikeMcl/bignumber.js/LICENCE */
	
	;(function (global) {
	    'use strict';
	
	    /*
	      bignumber.js v2.0.7
	      A JavaScript library for arbitrary-precision arithmetic.
	      https://github.com/MikeMcl/bignumber.js
	      Copyright (c) 2015 Michael Mclaughlin <M8ch88l@gmail.com>
	      MIT Expat Licence
	    */
	
	
	    var BigNumber, crypto, parseNumeric,
	        isNumeric = /^-?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,
	        mathceil = Math.ceil,
	        mathfloor = Math.floor,
	        notBool = ' not a boolean or binary digit',
	        roundingMode = 'rounding mode',
	        tooManyDigits = 'number type has more than 15 significant digits',
	        ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$_',
	        BASE = 1e14,
	        LOG_BASE = 14,
	        MAX_SAFE_INTEGER = 0x1fffffffffffff,         // 2^53 - 1
	        // MAX_INT32 = 0x7fffffff,                   // 2^31 - 1
	        POWS_TEN = [1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13],
	        SQRT_BASE = 1e7,
	
	        /*
	         * The limit on the value of DECIMAL_PLACES, TO_EXP_NEG, TO_EXP_POS, MIN_EXP, MAX_EXP, and
	         * the arguments to toExponential, toFixed, toFormat, and toPrecision, beyond which an
	         * exception is thrown (if ERRORS is true).
	         */
	        MAX = 1E9;                                   // 0 to MAX_INT32
	
	
	    /*
	     * Create and return a BigNumber constructor.
	     */
	    function another(configObj) {
	        var div,
	
	            // id tracks the caller function, so its name can be included in error messages.
	            id = 0,
	            P = BigNumber.prototype,
	            ONE = new BigNumber(1),
	
	
	            /********************************* EDITABLE DEFAULTS **********************************/
	
	
	            /*
	             * The default values below must be integers within the inclusive ranges stated.
	             * The values can also be changed at run-time using BigNumber.config.
	             */
	
	            // The maximum number of decimal places for operations involving division.
	            DECIMAL_PLACES = 20,                     // 0 to MAX
	
	            /*
	             * The rounding mode used when rounding to the above decimal places, and when using
	             * toExponential, toFixed, toFormat and toPrecision, and round (default value).
	             * UP         0 Away from zero.
	             * DOWN       1 Towards zero.
	             * CEIL       2 Towards +Infinity.
	             * FLOOR      3 Towards -Infinity.
	             * HALF_UP    4 Towards nearest neighbour. If equidistant, up.
	             * HALF_DOWN  5 Towards nearest neighbour. If equidistant, down.
	             * HALF_EVEN  6 Towards nearest neighbour. If equidistant, towards even neighbour.
	             * HALF_CEIL  7 Towards nearest neighbour. If equidistant, towards +Infinity.
	             * HALF_FLOOR 8 Towards nearest neighbour. If equidistant, towards -Infinity.
	             */
	            ROUNDING_MODE = 4,                       // 0 to 8
	
	            // EXPONENTIAL_AT : [TO_EXP_NEG , TO_EXP_POS]
	
	            // The exponent value at and beneath which toString returns exponential notation.
	            // Number type: -7
	            TO_EXP_NEG = -7,                         // 0 to -MAX
	
	            // The exponent value at and above which toString returns exponential notation.
	            // Number type: 21
	            TO_EXP_POS = 21,                         // 0 to MAX
	
	            // RANGE : [MIN_EXP, MAX_EXP]
	
	            // The minimum exponent value, beneath which underflow to zero occurs.
	            // Number type: -324  (5e-324)
	            MIN_EXP = -1e7,                          // -1 to -MAX
	
	            // The maximum exponent value, above which overflow to Infinity occurs.
	            // Number type:  308  (1.7976931348623157e+308)
	            // For MAX_EXP > 1e7, e.g. new BigNumber('1e100000000').plus(1) may be slow.
	            MAX_EXP = 1e7,                           // 1 to MAX
	
	            // Whether BigNumber Errors are ever thrown.
	            ERRORS = true,                           // true or false
	
	            // Change to intValidatorNoErrors if ERRORS is false.
	            isValidInt = intValidatorWithErrors,     // intValidatorWithErrors/intValidatorNoErrors
	
	            // Whether to use cryptographically-secure random number generation, if available.
	            CRYPTO = false,                          // true or false
	
	            /*
	             * The modulo mode used when calculating the modulus: a mod n.
	             * The quotient (q = a / n) is calculated according to the corresponding rounding mode.
	             * The remainder (r) is calculated as: r = a - n * q.
	             *
	             * UP        0 The remainder is positive if the dividend is negative, else is negative.
	             * DOWN      1 The remainder has the same sign as the dividend.
	             *             This modulo mode is commonly known as 'truncated division' and is
	             *             equivalent to (a % n) in JavaScript.
	             * FLOOR     3 The remainder has the same sign as the divisor (Python %).
	             * HALF_EVEN 6 This modulo mode implements the IEEE 754 remainder function.
	             * EUCLID    9 Euclidian division. q = sign(n) * floor(a / abs(n)).
	             *             The remainder is always positive.
	             *
	             * The truncated division, floored division, Euclidian division and IEEE 754 remainder
	             * modes are commonly used for the modulus operation.
	             * Although the other rounding modes can also be used, they may not give useful results.
	             */
	            MODULO_MODE = 1,                         // 0 to 9
	
	            // The maximum number of significant digits of the result of the toPower operation.
	            // If POW_PRECISION is 0, there will be unlimited significant digits.
	            POW_PRECISION = 100,                     // 0 to MAX
	
	            // The format specification used by the BigNumber.prototype.toFormat method.
	            FORMAT = {
	                decimalSeparator: '.',
	                groupSeparator: ',',
	                groupSize: 3,
	                secondaryGroupSize: 0,
	                fractionGroupSeparator: '\xA0',      // non-breaking space
	                fractionGroupSize: 0
	            };
	
	
	        /******************************************************************************************/
	
	
	        // CONSTRUCTOR
	
	
	        /*
	         * The BigNumber constructor and exported function.
	         * Create and return a new instance of a BigNumber object.
	         *
	         * n {number|string|BigNumber} A numeric value.
	         * [b] {number} The base of n. Integer, 2 to 64 inclusive.
	         */
	        function BigNumber( n, b ) {
	            var c, e, i, num, len, str,
	                x = this;
	
	            // Enable constructor usage without new.
	            if ( !( x instanceof BigNumber ) ) {
	
	                // 'BigNumber() constructor call without new: {n}'
	                if (ERRORS) raise( 26, 'constructor call without new', n );
	                return new BigNumber( n, b );
	            }
	
	            // 'new BigNumber() base not an integer: {b}'
	            // 'new BigNumber() base out of range: {b}'
	            if ( b == null || !isValidInt( b, 2, 64, id, 'base' ) ) {
	
	                // Duplicate.
	                if ( n instanceof BigNumber ) {
	                    x.s = n.s;
	                    x.e = n.e;
	                    x.c = ( n = n.c ) ? n.slice() : n;
	                    id = 0;
	                    return;
	                }
	
	                if ( ( num = typeof n == 'number' ) && n * 0 == 0 ) {
	                    x.s = 1 / n < 0 ? ( n = -n, -1 ) : 1;
	
	                    // Fast path for integers.
	                    if ( n === ~~n ) {
	                        for ( e = 0, i = n; i >= 10; i /= 10, e++ );
	                        x.e = e;
	                        x.c = [n];
	                        id = 0;
	                        return;
	                    }
	
	                    str = n + '';
	                } else {
	                    if ( !isNumeric.test( str = n + '' ) ) return parseNumeric( x, str, num );
	                    x.s = str.charCodeAt(0) === 45 ? ( str = str.slice(1), -1 ) : 1;
	                }
	            } else {
	                b = b | 0;
	                str = n + '';
	
	                // Ensure return value is rounded to DECIMAL_PLACES as with other bases.
	                // Allow exponential notation to be used with base 10 argument.
	                if ( b == 10 ) {
	                    x = new BigNumber( n instanceof BigNumber ? n : str );
	                    return round( x, DECIMAL_PLACES + x.e + 1, ROUNDING_MODE );
	                }
	
	                // Avoid potential interpretation of Infinity and NaN as base 44+ values.
	                // Any number in exponential form will fail due to the [Ee][+-].
	                if ( ( num = typeof n == 'number' ) && n * 0 != 0 ||
	                  !( new RegExp( '^-?' + ( c = '[' + ALPHABET.slice( 0, b ) + ']+' ) +
	                    '(?:\\.' + c + ')?$',b < 37 ? 'i' : '' ) ).test(str) ) {
	                    return parseNumeric( x, str, num, b );
	                }
	
	                if (num) {
	                    x.s = 1 / n < 0 ? ( str = str.slice(1), -1 ) : 1;
	
	                    if ( ERRORS && str.replace( /^0\.0*|\./, '' ).length > 15 ) {
	
	                        // 'new BigNumber() number type has more than 15 significant digits: {n}'
	                        raise( id, tooManyDigits, n );
	                    }
	
	                    // Prevent later check for length on converted number.
	                    num = false;
	                } else {
	                    x.s = str.charCodeAt(0) === 45 ? ( str = str.slice(1), -1 ) : 1;
	                }
	
	                str = convertBase( str, 10, b, x.s );
	            }
	
	            // Decimal point?
	            if ( ( e = str.indexOf('.') ) > -1 ) str = str.replace( '.', '' );
	
	            // Exponential form?
	            if ( ( i = str.search( /e/i ) ) > 0 ) {
	
	                // Determine exponent.
	                if ( e < 0 ) e = i;
	                e += +str.slice( i + 1 );
	                str = str.substring( 0, i );
	            } else if ( e < 0 ) {
	
	                // Integer.
	                e = str.length;
	            }
	
	            // Determine leading zeros.
	            for ( i = 0; str.charCodeAt(i) === 48; i++ );
	
	            // Determine trailing zeros.
	            for ( len = str.length; str.charCodeAt(--len) === 48; );
	            str = str.slice( i, len + 1 );
	
	            if (str) {
	                len = str.length;
	
	                // Disallow numbers with over 15 significant digits if number type.
	                // 'new BigNumber() number type has more than 15 significant digits: {n}'
	                if ( num && ERRORS && len > 15 ) raise( id, tooManyDigits, x.s * n );
	
	                e = e - i - 1;
	
	                 // Overflow?
	                if ( e > MAX_EXP ) {
	
	                    // Infinity.
	                    x.c = x.e = null;
	
	                // Underflow?
	                } else if ( e < MIN_EXP ) {
	
	                    // Zero.
	                    x.c = [ x.e = 0 ];
	                } else {
	                    x.e = e;
	                    x.c = [];
	
	                    // Transform base
	
	                    // e is the base 10 exponent.
	                    // i is where to slice str to get the first element of the coefficient array.
	                    i = ( e + 1 ) % LOG_BASE;
	                    if ( e < 0 ) i += LOG_BASE;
	
	                    if ( i < len ) {
	                        if (i) x.c.push( +str.slice( 0, i ) );
	
	                        for ( len -= LOG_BASE; i < len; ) {
	                            x.c.push( +str.slice( i, i += LOG_BASE ) );
	                        }
	
	                        str = str.slice(i);
	                        i = LOG_BASE - str.length;
	                    } else {
	                        i -= len;
	                    }
	
	                    for ( ; i--; str += '0' );
	                    x.c.push( +str );
	                }
	            } else {
	
	                // Zero.
	                x.c = [ x.e = 0 ];
	            }
	
	            id = 0;
	        }
	
	
	        // CONSTRUCTOR PROPERTIES
	
	
	        BigNumber.another = another;
	
	        BigNumber.ROUND_UP = 0;
	        BigNumber.ROUND_DOWN = 1;
	        BigNumber.ROUND_CEIL = 2;
	        BigNumber.ROUND_FLOOR = 3;
	        BigNumber.ROUND_HALF_UP = 4;
	        BigNumber.ROUND_HALF_DOWN = 5;
	        BigNumber.ROUND_HALF_EVEN = 6;
	        BigNumber.ROUND_HALF_CEIL = 7;
	        BigNumber.ROUND_HALF_FLOOR = 8;
	        BigNumber.EUCLID = 9;
	
	
	        /*
	         * Configure infrequently-changing library-wide settings.
	         *
	         * Accept an object or an argument list, with one or many of the following properties or
	         * parameters respectively:
	         *
	         *   DECIMAL_PLACES  {number}  Integer, 0 to MAX inclusive
	         *   ROUNDING_MODE   {number}  Integer, 0 to 8 inclusive
	         *   EXPONENTIAL_AT  {number|number[]}  Integer, -MAX to MAX inclusive or
	         *                                      [integer -MAX to 0 incl., 0 to MAX incl.]
	         *   RANGE           {number|number[]}  Non-zero integer, -MAX to MAX inclusive or
	         *                                      [integer -MAX to -1 incl., integer 1 to MAX incl.]
	         *   ERRORS          {boolean|number}   true, false, 1 or 0
	         *   CRYPTO          {boolean|number}   true, false, 1 or 0
	         *   MODULO_MODE     {number}           0 to 9 inclusive
	         *   POW_PRECISION   {number}           0 to MAX inclusive
	         *   FORMAT          {object}           See BigNumber.prototype.toFormat
	         *      decimalSeparator       {string}
	         *      groupSeparator         {string}
	         *      groupSize              {number}
	         *      secondaryGroupSize     {number}
	         *      fractionGroupSeparator {string}
	         *      fractionGroupSize      {number}
	         *
	         * (The values assigned to the above FORMAT object properties are not checked for validity.)
	         *
	         * E.g.
	         * BigNumber.config(20, 4) is equivalent to
	         * BigNumber.config({ DECIMAL_PLACES : 20, ROUNDING_MODE : 4 })
	         *
	         * Ignore properties/parameters set to null or undefined.
	         * Return an object with the properties current values.
	         */
	        BigNumber.config = function () {
	            var v, p,
	                i = 0,
	                r = {},
	                a = arguments,
	                o = a[0],
	                has = o && typeof o == 'object'
	                  ? function () { if ( o.hasOwnProperty(p) ) return ( v = o[p] ) != null; }
	                  : function () { if ( a.length > i ) return ( v = a[i++] ) != null; };
	
	            // DECIMAL_PLACES {number} Integer, 0 to MAX inclusive.
	            // 'config() DECIMAL_PLACES not an integer: {v}'
	            // 'config() DECIMAL_PLACES out of range: {v}'
	            if ( has( p = 'DECIMAL_PLACES' ) && isValidInt( v, 0, MAX, 2, p ) ) {
	                DECIMAL_PLACES = v | 0;
	            }
	            r[p] = DECIMAL_PLACES;
	
	            // ROUNDING_MODE {number} Integer, 0 to 8 inclusive.
	            // 'config() ROUNDING_MODE not an integer: {v}'
	            // 'config() ROUNDING_MODE out of range: {v}'
	            if ( has( p = 'ROUNDING_MODE' ) && isValidInt( v, 0, 8, 2, p ) ) {
	                ROUNDING_MODE = v | 0;
	            }
	            r[p] = ROUNDING_MODE;
	
	            // EXPONENTIAL_AT {number|number[]}
	            // Integer, -MAX to MAX inclusive or [integer -MAX to 0 inclusive, 0 to MAX inclusive].
	            // 'config() EXPONENTIAL_AT not an integer: {v}'
	            // 'config() EXPONENTIAL_AT out of range: {v}'
	            if ( has( p = 'EXPONENTIAL_AT' ) ) {
	
	                if ( isArray(v) ) {
	                    if ( isValidInt( v[0], -MAX, 0, 2, p ) && isValidInt( v[1], 0, MAX, 2, p ) ) {
	                        TO_EXP_NEG = v[0] | 0;
	                        TO_EXP_POS = v[1] | 0;
	                    }
	                } else if ( isValidInt( v, -MAX, MAX, 2, p ) ) {
	                    TO_EXP_NEG = -( TO_EXP_POS = ( v < 0 ? -v : v ) | 0 );
	                }
	            }
	            r[p] = [ TO_EXP_NEG, TO_EXP_POS ];
	
	            // RANGE {number|number[]} Non-zero integer, -MAX to MAX inclusive or
	            // [integer -MAX to -1 inclusive, integer 1 to MAX inclusive].
	            // 'config() RANGE not an integer: {v}'
	            // 'config() RANGE cannot be zero: {v}'
	            // 'config() RANGE out of range: {v}'
	            if ( has( p = 'RANGE' ) ) {
	
	                if ( isArray(v) ) {
	                    if ( isValidInt( v[0], -MAX, -1, 2, p ) && isValidInt( v[1], 1, MAX, 2, p ) ) {
	                        MIN_EXP = v[0] | 0;
	                        MAX_EXP = v[1] | 0;
	                    }
	                } else if ( isValidInt( v, -MAX, MAX, 2, p ) ) {
	                    if ( v | 0 ) MIN_EXP = -( MAX_EXP = ( v < 0 ? -v : v ) | 0 );
	                    else if (ERRORS) raise( 2, p + ' cannot be zero', v );
	                }
	            }
	            r[p] = [ MIN_EXP, MAX_EXP ];
	
	            // ERRORS {boolean|number} true, false, 1 or 0.
	            // 'config() ERRORS not a boolean or binary digit: {v}'
	            if ( has( p = 'ERRORS' ) ) {
	
	                if ( v === !!v || v === 1 || v === 0 ) {
	                    id = 0;
	                    isValidInt = ( ERRORS = !!v ) ? intValidatorWithErrors : intValidatorNoErrors;
	                } else if (ERRORS) {
	                    raise( 2, p + notBool, v );
	                }
	            }
	            r[p] = ERRORS;
	
	            // CRYPTO {boolean|number} true, false, 1 or 0.
	            // 'config() CRYPTO not a boolean or binary digit: {v}'
	            // 'config() crypto unavailable: {crypto}'
	            if ( has( p = 'CRYPTO' ) ) {
	
	                if ( v === !!v || v === 1 || v === 0 ) {
	                    CRYPTO = !!( v && crypto && typeof crypto == 'object' );
	                    if ( v && !CRYPTO && ERRORS ) raise( 2, 'crypto unavailable', crypto );
	                } else if (ERRORS) {
	                    raise( 2, p + notBool, v );
	                }
	            }
	            r[p] = CRYPTO;
	
	            // MODULO_MODE {number} Integer, 0 to 9 inclusive.
	            // 'config() MODULO_MODE not an integer: {v}'
	            // 'config() MODULO_MODE out of range: {v}'
	            if ( has( p = 'MODULO_MODE' ) && isValidInt( v, 0, 9, 2, p ) ) {
	                MODULO_MODE = v | 0;
	            }
	            r[p] = MODULO_MODE;
	
	            // POW_PRECISION {number} Integer, 0 to MAX inclusive.
	            // 'config() POW_PRECISION not an integer: {v}'
	            // 'config() POW_PRECISION out of range: {v}'
	            if ( has( p = 'POW_PRECISION' ) && isValidInt( v, 0, MAX, 2, p ) ) {
	                POW_PRECISION = v | 0;
	            }
	            r[p] = POW_PRECISION;
	
	            // FORMAT {object}
	            // 'config() FORMAT not an object: {v}'
	            if ( has( p = 'FORMAT' ) ) {
	
	                if ( typeof v == 'object' ) {
	                    FORMAT = v;
	                } else if (ERRORS) {
	                    raise( 2, p + ' not an object', v );
	                }
	            }
	            r[p] = FORMAT;
	
	            return r;
	        };
	
	
	        /*
	         * Return a new BigNumber whose value is the maximum of the arguments.
	         *
	         * arguments {number|string|BigNumber}
	         */
	        BigNumber.max = function () { return maxOrMin( arguments, P.lt ); };
	
	
	        /*
	         * Return a new BigNumber whose value is the minimum of the arguments.
	         *
	         * arguments {number|string|BigNumber}
	         */
	        BigNumber.min = function () { return maxOrMin( arguments, P.gt ); };
	
	
	        /*
	         * Return a new BigNumber with a random value equal to or greater than 0 and less than 1,
	         * and with dp, or DECIMAL_PLACES if dp is omitted, decimal places (or less if trailing
	         * zeros are produced).
	         *
	         * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
	         *
	         * 'random() decimal places not an integer: {dp}'
	         * 'random() decimal places out of range: {dp}'
	         * 'random() crypto unavailable: {crypto}'
	         */
	        BigNumber.random = (function () {
	            var pow2_53 = 0x20000000000000;
	
	            // Return a 53 bit integer n, where 0 <= n < 9007199254740992.
	            // Check if Math.random() produces more than 32 bits of randomness.
	            // If it does, assume at least 53 bits are produced, otherwise assume at least 30 bits.
	            // 0x40000000 is 2^30, 0x800000 is 2^23, 0x1fffff is 2^21 - 1.
	            var random53bitInt = (Math.random() * pow2_53) & 0x1fffff
	              ? function () { return mathfloor( Math.random() * pow2_53 ); }
	              : function () { return ((Math.random() * 0x40000000 | 0) * 0x800000) +
	                  (Math.random() * 0x800000 | 0); };
	
	            return function (dp) {
	                var a, b, e, k, v,
	                    i = 0,
	                    c = [],
	                    rand = new BigNumber(ONE);
	
	                dp = dp == null || !isValidInt( dp, 0, MAX, 14 ) ? DECIMAL_PLACES : dp | 0;
	                k = mathceil( dp / LOG_BASE );
	
	                if (CRYPTO) {
	
	                    // Browsers supporting crypto.getRandomValues.
	                    if ( crypto && crypto.getRandomValues ) {
	
	                        a = crypto.getRandomValues( new Uint32Array( k *= 2 ) );
	
	                        for ( ; i < k; ) {
	
	                            // 53 bits:
	                            // ((Math.pow(2, 32) - 1) * Math.pow(2, 21)).toString(2)
	                            // 11111 11111111 11111111 11111111 11100000 00000000 00000000
	                            // ((Math.pow(2, 32) - 1) >>> 11).toString(2)
	                            //                                     11111 11111111 11111111
	                            // 0x20000 is 2^21.
	                            v = a[i] * 0x20000 + (a[i + 1] >>> 11);
	
	                            // Rejection sampling:
	                            // 0 <= v < 9007199254740992
	                            // Probability that v >= 9e15, is
	                            // 7199254740992 / 9007199254740992 ~= 0.0008, i.e. 1 in 1251
	                            if ( v >= 9e15 ) {
	                                b = crypto.getRandomValues( new Uint32Array(2) );
	                                a[i] = b[0];
	                                a[i + 1] = b[1];
	                            } else {
	
	                                // 0 <= v <= 8999999999999999
	                                // 0 <= (v % 1e14) <= 99999999999999
	                                c.push( v % 1e14 );
	                                i += 2;
	                            }
	                        }
	                        i = k / 2;
	
	                    // Node.js supporting crypto.randomBytes.
	                    } else if ( crypto && crypto.randomBytes ) {
	
	                        // buffer
	                        a = crypto.randomBytes( k *= 7 );
	
	                        for ( ; i < k; ) {
	
	                            // 0x1000000000000 is 2^48, 0x10000000000 is 2^40
	                            // 0x100000000 is 2^32, 0x1000000 is 2^24
	                            // 11111 11111111 11111111 11111111 11111111 11111111 11111111
	                            // 0 <= v < 9007199254740992
	                            v = ( ( a[i] & 31 ) * 0x1000000000000 ) + ( a[i + 1] * 0x10000000000 ) +
	                                  ( a[i + 2] * 0x100000000 ) + ( a[i + 3] * 0x1000000 ) +
	                                  ( a[i + 4] << 16 ) + ( a[i + 5] << 8 ) + a[i + 6];
	
	                            if ( v >= 9e15 ) {
	                                crypto.randomBytes(7).copy( a, i );
	                            } else {
	
	                                // 0 <= (v % 1e14) <= 99999999999999
	                                c.push( v % 1e14 );
	                                i += 7;
	                            }
	                        }
	                        i = k / 7;
	                    } else if (ERRORS) {
	                        raise( 14, 'crypto unavailable', crypto );
	                    }
	                }
	
	                // Use Math.random: CRYPTO is false or crypto is unavailable and ERRORS is false.
	                if (!i) {
	
	                    for ( ; i < k; ) {
	                        v = random53bitInt();
	                        if ( v < 9e15 ) c[i++] = v % 1e14;
	                    }
	                }
	
	                k = c[--i];
	                dp %= LOG_BASE;
	
	                // Convert trailing digits to zeros according to dp.
	                if ( k && dp ) {
	                    v = POWS_TEN[LOG_BASE - dp];
	                    c[i] = mathfloor( k / v ) * v;
	                }
	
	                // Remove trailing elements which are zero.
	                for ( ; c[i] === 0; c.pop(), i-- );
	
	                // Zero?
	                if ( i < 0 ) {
	                    c = [ e = 0 ];
	                } else {
	
	                    // Remove leading elements which are zero and adjust exponent accordingly.
	                    for ( e = -1 ; c[0] === 0; c.shift(), e -= LOG_BASE);
	
	                    // Count the digits of the first element of c to determine leading zeros, and...
	                    for ( i = 1, v = c[0]; v >= 10; v /= 10, i++);
	
	                    // adjust the exponent accordingly.
	                    if ( i < LOG_BASE ) e -= LOG_BASE - i;
	                }
	
	                rand.e = e;
	                rand.c = c;
	                return rand;
	            };
	        })();
	
	
	        // PRIVATE FUNCTIONS
	
	
	        // Convert a numeric string of baseIn to a numeric string of baseOut.
	        function convertBase( str, baseOut, baseIn, sign ) {
	            var d, e, k, r, x, xc, y,
	                i = str.indexOf( '.' ),
	                dp = DECIMAL_PLACES,
	                rm = ROUNDING_MODE;
	
	            if ( baseIn < 37 ) str = str.toLowerCase();
	
	            // Non-integer.
	            if ( i >= 0 ) {
	                k = POW_PRECISION;
	
	                // Unlimited precision.
	                POW_PRECISION = 0;
	                str = str.replace( '.', '' );
	                y = new BigNumber(baseIn);
	                x = y.pow( str.length - i );
	                POW_PRECISION = k;
	
	                // Convert str as if an integer, then restore the fraction part by dividing the
	                // result by its base raised to a power.
	                y.c = toBaseOut( toFixedPoint( coeffToString( x.c ), x.e ), 10, baseOut );
	                y.e = y.c.length;
	            }
	
	            // Convert the number as integer.
	            xc = toBaseOut( str, baseIn, baseOut );
	            e = k = xc.length;
	
	            // Remove trailing zeros.
	            for ( ; xc[--k] == 0; xc.pop() );
	            if ( !xc[0] ) return '0';
	
	            if ( i < 0 ) {
	                --e;
	            } else {
	                x.c = xc;
	                x.e = e;
	
	                // sign is needed for correct rounding.
	                x.s = sign;
	                x = div( x, y, dp, rm, baseOut );
	                xc = x.c;
	                r = x.r;
	                e = x.e;
	            }
	
	            d = e + dp + 1;
	
	            // The rounding digit, i.e. the digit to the right of the digit that may be rounded up.
	            i = xc[d];
	            k = baseOut / 2;
	            r = r || d < 0 || xc[d + 1] != null;
	
	            r = rm < 4 ? ( i != null || r ) && ( rm == 0 || rm == ( x.s < 0 ? 3 : 2 ) )
	                       : i > k || i == k &&( rm == 4 || r || rm == 6 && xc[d - 1] & 1 ||
	                         rm == ( x.s < 0 ? 8 : 7 ) );
	
	            if ( d < 1 || !xc[0] ) {
	
	                // 1^-dp or 0.
	                str = r ? toFixedPoint( '1', -dp ) : '0';
	            } else {
	                xc.length = d;
	
	                if (r) {
	
	                    // Rounding up may mean the previous digit has to be rounded up and so on.
	                    for ( --baseOut; ++xc[--d] > baseOut; ) {
	                        xc[d] = 0;
	
	                        if ( !d ) {
	                            ++e;
	                            xc.unshift(1);
	                        }
	                    }
	                }
	
	                // Determine trailing zeros.
	                for ( k = xc.length; !xc[--k]; );
	
	                // E.g. [4, 11, 15] becomes 4bf.
	                for ( i = 0, str = ''; i <= k; str += ALPHABET.charAt( xc[i++] ) );
	                str = toFixedPoint( str, e );
	            }
	
	            // The caller will add the sign.
	            return str;
	        }
	
	
	        // Perform division in the specified base. Called by div and convertBase.
	        div = (function () {
	
	            // Assume non-zero x and k.
	            function multiply( x, k, base ) {
	                var m, temp, xlo, xhi,
	                    carry = 0,
	                    i = x.length,
	                    klo = k % SQRT_BASE,
	                    khi = k / SQRT_BASE | 0;
	
	                for ( x = x.slice(); i--; ) {
	                    xlo = x[i] % SQRT_BASE;
	                    xhi = x[i] / SQRT_BASE | 0;
	                    m = khi * xlo + xhi * klo;
	                    temp = klo * xlo + ( ( m % SQRT_BASE ) * SQRT_BASE ) + carry;
	                    carry = ( temp / base | 0 ) + ( m / SQRT_BASE | 0 ) + khi * xhi;
	                    x[i] = temp % base;
	                }
	
	                if (carry) x.unshift(carry);
	
	                return x;
	            }
	
	            function compare( a, b, aL, bL ) {
	                var i, cmp;
	
	                if ( aL != bL ) {
	                    cmp = aL > bL ? 1 : -1;
	                } else {
	
	                    for ( i = cmp = 0; i < aL; i++ ) {
	
	                        if ( a[i] != b[i] ) {
	                            cmp = a[i] > b[i] ? 1 : -1;
	                            break;
	                        }
	                    }
	                }
	                return cmp;
	            }
	
	            function subtract( a, b, aL, base ) {
	                var i = 0;
	
	                // Subtract b from a.
	                for ( ; aL--; ) {
	                    a[aL] -= i;
	                    i = a[aL] < b[aL] ? 1 : 0;
	                    a[aL] = i * base + a[aL] - b[aL];
	                }
	
	                // Remove leading zeros.
	                for ( ; !a[0] && a.length > 1; a.shift() );
	            }
	
	            // x: dividend, y: divisor.
	            return function ( x, y, dp, rm, base ) {
	                var cmp, e, i, more, n, prod, prodL, q, qc, rem, remL, rem0, xi, xL, yc0,
	                    yL, yz,
	                    s = x.s == y.s ? 1 : -1,
	                    xc = x.c,
	                    yc = y.c;
	
	                // Either NaN, Infinity or 0?
	                if ( !xc || !xc[0] || !yc || !yc[0] ) {
	
	                    return new BigNumber(
	
	                      // Return NaN if either NaN, or both Infinity or 0.
	                      !x.s || !y.s || ( xc ? yc && xc[0] == yc[0] : !yc ) ? NaN :
	
	                        // Return ±0 if x is ±0 or y is ±Infinity, or return ±Infinity as y is ±0.
	                        xc && xc[0] == 0 || !yc ? s * 0 : s / 0
	                    );
	                }
	
	                q = new BigNumber(s);
	                qc = q.c = [];
	                e = x.e - y.e;
	                s = dp + e + 1;
	
	                if ( !base ) {
	                    base = BASE;
	                    e = bitFloor( x.e / LOG_BASE ) - bitFloor( y.e / LOG_BASE );
	                    s = s / LOG_BASE | 0;
	                }
	
	                // Result exponent may be one less then the current value of e.
	                // The coefficients of the BigNumbers from convertBase may have trailing zeros.
	                for ( i = 0; yc[i] == ( xc[i] || 0 ); i++ );
	                if ( yc[i] > ( xc[i] || 0 ) ) e--;
	
	                if ( s < 0 ) {
	                    qc.push(1);
	                    more = true;
	                } else {
	                    xL = xc.length;
	                    yL = yc.length;
	                    i = 0;
	                    s += 2;
	
	                    // Normalise xc and yc so highest order digit of yc is >= base / 2.
	
	                    n = mathfloor( base / ( yc[0] + 1 ) );
	
	                    // Not necessary, but to handle odd bases where yc[0] == ( base / 2 ) - 1.
	                    // if ( n > 1 || n++ == 1 && yc[0] < base / 2 ) {
	                    if ( n > 1 ) {
	                        yc = multiply( yc, n, base );
	                        xc = multiply( xc, n, base );
	                        yL = yc.length;
	                        xL = xc.length;
	                    }
	
	                    xi = yL;
	                    rem = xc.slice( 0, yL );
	                    remL = rem.length;
	
	                    // Add zeros to make remainder as long as divisor.
	                    for ( ; remL < yL; rem[remL++] = 0 );
	                    yz = yc.slice();
	                    yz.unshift(0);
	                    yc0 = yc[0];
	                    if ( yc[1] >= base / 2 ) yc0++;
	                    // Not necessary, but to prevent trial digit n > base, when using base 3.
	                    // else if ( base == 3 && yc0 == 1 ) yc0 = 1 + 1e-15;
	
	                    do {
	                        n = 0;
	
	                        // Compare divisor and remainder.
	                        cmp = compare( yc, rem, yL, remL );
	
	                        // If divisor < remainder.
	                        if ( cmp < 0 ) {
	
	                            // Calculate trial digit, n.
	
	                            rem0 = rem[0];
	                            if ( yL != remL ) rem0 = rem0 * base + ( rem[1] || 0 );
	
	                            // n is how many times the divisor goes into the current remainder.
	                            n = mathfloor( rem0 / yc0 );
	
	                            //  Algorithm:
	                            //  1. product = divisor * trial digit (n)
	                            //  2. if product > remainder: product -= divisor, n--
	                            //  3. remainder -= product
	                            //  4. if product was < remainder at 2:
	                            //    5. compare new remainder and divisor
	                            //    6. If remainder > divisor: remainder -= divisor, n++
	
	                            if ( n > 1 ) {
	
	                                // n may be > base only when base is 3.
	                                if (n >= base) n = base - 1;
	
	                                // product = divisor * trial digit.
	                                prod = multiply( yc, n, base );
	                                prodL = prod.length;
	                                remL = rem.length;
	
	                                // Compare product and remainder.
	                                // If product > remainder.
	                                // Trial digit n too high.
	                                // n is 1 too high about 5% of the time, and is not known to have
	                                // ever been more than 1 too high.
	                                while ( compare( prod, rem, prodL, remL ) == 1 ) {
	                                    n--;
	
	                                    // Subtract divisor from product.
	                                    subtract( prod, yL < prodL ? yz : yc, prodL, base );
	                                    prodL = prod.length;
	                                    cmp = 1;
	                                }
	                            } else {
	
	                                // n is 0 or 1, cmp is -1.
	                                // If n is 0, there is no need to compare yc and rem again below,
	                                // so change cmp to 1 to avoid it.
	                                // If n is 1, leave cmp as -1, so yc and rem are compared again.
	                                if ( n == 0 ) {
	
	                                    // divisor < remainder, so n must be at least 1.
	                                    cmp = n = 1;
	                                }
	
	                                // product = divisor
	                                prod = yc.slice();
	                                prodL = prod.length;
	                            }
	
	                            if ( prodL < remL ) prod.unshift(0);
	
	                            // Subtract product from remainder.
	                            subtract( rem, prod, remL, base );
	                            remL = rem.length;
	
	                             // If product was < remainder.
	                            if ( cmp == -1 ) {
	
	                                // Compare divisor and new remainder.
	                                // If divisor < new remainder, subtract divisor from remainder.
	                                // Trial digit n too low.
	                                // n is 1 too low about 5% of the time, and very rarely 2 too low.
	                                while ( compare( yc, rem, yL, remL ) < 1 ) {
	                                    n++;
	
	                                    // Subtract divisor from remainder.
	                                    subtract( rem, yL < remL ? yz : yc, remL, base );
	                                    remL = rem.length;
	                                }
	                            }
	                        } else if ( cmp === 0 ) {
	                            n++;
	                            rem = [0];
	                        } // else cmp === 1 and n will be 0
	
	                        // Add the next digit, n, to the result array.
	                        qc[i++] = n;
	
	                        // Update the remainder.
	                        if ( rem[0] ) {
	                            rem.push(xc[xi] || 0);
	                            remL = remL + 1;
	                        } else {
	                            rem = [ xc[xi] ];
	                            remL = 1;
	                        }
	                    } while ( ( xi++ < xL || rem[0] != null ) && s-- );
	
	                    more = rem[0] != null;
	
	                    // Leading zero?
	                    if ( !qc[0] ) qc.shift();
	                }
	
	                if ( base == BASE ) {
	
	                    // To calculate q.e, first get the number of digits of qc[0].
	                    for ( i = 1, s = qc[0]; s >= 10; s /= 10, i++ );
	                    round( q, dp + ( q.e = i + e * LOG_BASE - 1 ) + 1, rm, more );
	
	                // Caller is convertBase.
	                } else {
	                    q.e = e;
	                    q.r = +more;
	                }
	
	                return q;
	            };
	        })();
	
	
	        /*
	         * Return a string representing the value of BigNumber n in fixed-point or exponential
	         * notation rounded to the specified decimal places or significant digits.
	         *
	         * n is a BigNumber.
	         * i is the index of the last digit required (i.e. the digit that may be rounded up).
	         * rm is the rounding mode.
	         * caller is caller id: toExponential 19, toFixed 20, toFormat 21, toPrecision 24.
	         */
	        function format( n, i, rm, caller ) {
	            var c0, e, ne, len, str;
	
	            rm = rm != null && isValidInt( rm, 0, 8, caller, roundingMode )
	              ? rm | 0 : ROUNDING_MODE;
	
	            if ( !n.c ) return n.toString();
	            c0 = n.c[0];
	            ne = n.e;
	
	            if ( i == null ) {
	                str = coeffToString( n.c );
	                str = caller == 19 || caller == 24 && ne <= TO_EXP_NEG
	                  ? toExponential( str, ne )
	                  : toFixedPoint( str, ne );
	            } else {
	                n = round( new BigNumber(n), i, rm );
	
	                // n.e may have changed if the value was rounded up.
	                e = n.e;
	
	                str = coeffToString( n.c );
	                len = str.length;
	
	                // toPrecision returns exponential notation if the number of significant digits
	                // specified is less than the number of digits necessary to represent the integer
	                // part of the value in fixed-point notation.
	
	                // Exponential notation.
	                if ( caller == 19 || caller == 24 && ( i <= e || e <= TO_EXP_NEG ) ) {
	
	                    // Append zeros?
	                    for ( ; len < i; str += '0', len++ );
	                    str = toExponential( str, e );
	
	                // Fixed-point notation.
	                } else {
	                    i -= ne;
	                    str = toFixedPoint( str, e );
	
	                    // Append zeros?
	                    if ( e + 1 > len ) {
	                        if ( --i > 0 ) for ( str += '.'; i--; str += '0' );
	                    } else {
	                        i += e - len;
	                        if ( i > 0 ) {
	                            if ( e + 1 == len ) str += '.';
	                            for ( ; i--; str += '0' );
	                        }
	                    }
	                }
	            }
	
	            return n.s < 0 && c0 ? '-' + str : str;
	        }
	
	
	        // Handle BigNumber.max and BigNumber.min.
	        function maxOrMin( args, method ) {
	            var m, n,
	                i = 0;
	
	            if ( isArray( args[0] ) ) args = args[0];
	            m = new BigNumber( args[0] );
	
	            for ( ; ++i < args.length; ) {
	                n = new BigNumber( args[i] );
	
	                // If any number is NaN, return NaN.
	                if ( !n.s ) {
	                    m = n;
	                    break;
	                } else if ( method.call( m, n ) ) {
	                    m = n;
	                }
	            }
	
	            return m;
	        }
	
	
	        /*
	         * Return true if n is an integer in range, otherwise throw.
	         * Use for argument validation when ERRORS is true.
	         */
	        function intValidatorWithErrors( n, min, max, caller, name ) {
	            if ( n < min || n > max || n != truncate(n) ) {
	                raise( caller, ( name || 'decimal places' ) +
	                  ( n < min || n > max ? ' out of range' : ' not an integer' ), n );
	            }
	
	            return true;
	        }
	
	
	        /*
	         * Strip trailing zeros, calculate base 10 exponent and check against MIN_EXP and MAX_EXP.
	         * Called by minus, plus and times.
	         */
	        function normalise( n, c, e ) {
	            var i = 1,
	                j = c.length;
	
	             // Remove trailing zeros.
	            for ( ; !c[--j]; c.pop() );
	
	            // Calculate the base 10 exponent. First get the number of digits of c[0].
	            for ( j = c[0]; j >= 10; j /= 10, i++ );
	
	            // Overflow?
	            if ( ( e = i + e * LOG_BASE - 1 ) > MAX_EXP ) {
	
	                // Infinity.
	                n.c = n.e = null;
	
	            // Underflow?
	            } else if ( e < MIN_EXP ) {
	
	                // Zero.
	                n.c = [ n.e = 0 ];
	            } else {
	                n.e = e;
	                n.c = c;
	            }
	
	            return n;
	        }
	
	
	        // Handle values that fail the validity test in BigNumber.
	        parseNumeric = (function () {
	            var basePrefix = /^(-?)0([xbo])/i,
	                dotAfter = /^([^.]+)\.$/,
	                dotBefore = /^\.([^.]+)$/,
	                isInfinityOrNaN = /^-?(Infinity|NaN)$/,
	                whitespaceOrPlus = /^\s*\+|^\s+|\s+$/g;
	
	            return function ( x, str, num, b ) {
	                var base,
	                    s = num ? str : str.replace( whitespaceOrPlus, '' );
	
	                // No exception on ±Infinity or NaN.
	                if ( isInfinityOrNaN.test(s) ) {
	                    x.s = isNaN(s) ? null : s < 0 ? -1 : 1;
	                } else {
	                    if ( !num ) {
	
	                        // basePrefix = /^(-?)0([xbo])(?=\w[\w.]*$)/i
	                        s = s.replace( basePrefix, function ( m, p1, p2 ) {
	                            base = ( p2 = p2.toLowerCase() ) == 'x' ? 16 : p2 == 'b' ? 2 : 8;
	                            return !b || b == base ? p1 : m;
	                        });
	
	                        if (b) {
	                            base = b;
	
	                            // E.g. '1.' to '1', '.1' to '0.1'
	                            s = s.replace( dotAfter, '$1' ).replace( dotBefore, '0.$1' );
	                        }
	
	                        if ( str != s ) return new BigNumber( s, base );
	                    }
	
	                    // 'new BigNumber() not a number: {n}'
	                    // 'new BigNumber() not a base {b} number: {n}'
	                    if (ERRORS) raise( id, 'not a' + ( b ? ' base ' + b : '' ) + ' number', str );
	                    x.s = null;
	                }
	
	                x.c = x.e = null;
	                id = 0;
	            }
	        })();
	
	
	        // Throw a BigNumber Error.
	        function raise( caller, msg, val ) {
	            var error = new Error( [
	                'new BigNumber',     // 0
	                'cmp',               // 1
	                'config',            // 2
	                'div',               // 3
	                'divToInt',          // 4
	                'eq',                // 5
	                'gt',                // 6
	                'gte',               // 7
	                'lt',                // 8
	                'lte',               // 9
	                'minus',             // 10
	                'mod',               // 11
	                'plus',              // 12
	                'precision',         // 13
	                'random',            // 14
	                'round',             // 15
	                'shift',             // 16
	                'times',             // 17
	                'toDigits',          // 18
	                'toExponential',     // 19
	                'toFixed',           // 20
	                'toFormat',          // 21
	                'toFraction',        // 22
	                'pow',               // 23
	                'toPrecision',       // 24
	                'toString',          // 25
	                'BigNumber'          // 26
	            ][caller] + '() ' + msg + ': ' + val );
	
	            error.name = 'BigNumber Error';
	            id = 0;
	            throw error;
	        }
	
	
	        /*
	         * Round x to sd significant digits using rounding mode rm. Check for over/under-flow.
	         * If r is truthy, it is known that there are more digits after the rounding digit.
	         */
	        function round( x, sd, rm, r ) {
	            var d, i, j, k, n, ni, rd,
	                xc = x.c,
	                pows10 = POWS_TEN;
	
	            // if x is not Infinity or NaN...
	            if (xc) {
	
	                // rd is the rounding digit, i.e. the digit after the digit that may be rounded up.
	                // n is a base 1e14 number, the value of the element of array x.c containing rd.
	                // ni is the index of n within x.c.
	                // d is the number of digits of n.
	                // i is the index of rd within n including leading zeros.
	                // j is the actual index of rd within n (if < 0, rd is a leading zero).
	                out: {
	
	                    // Get the number of digits of the first element of xc.
	                    for ( d = 1, k = xc[0]; k >= 10; k /= 10, d++ );
	                    i = sd - d;
	
	                    // If the rounding digit is in the first element of xc...
	                    if ( i < 0 ) {
	                        i += LOG_BASE;
	                        j = sd;
	                        n = xc[ ni = 0 ];
	
	                        // Get the rounding digit at index j of n.
	                        rd = n / pows10[ d - j - 1 ] % 10 | 0;
	                    } else {
	                        ni = mathceil( ( i + 1 ) / LOG_BASE );
	
	                        if ( ni >= xc.length ) {
	
	                            if (r) {
	
	                                // Needed by sqrt.
	                                for ( ; xc.length <= ni; xc.push(0) );
	                                n = rd = 0;
	                                d = 1;
	                                i %= LOG_BASE;
	                                j = i - LOG_BASE + 1;
	                            } else {
	                                break out;
	                            }
	                        } else {
	                            n = k = xc[ni];
	
	                            // Get the number of digits of n.
	                            for ( d = 1; k >= 10; k /= 10, d++ );
	
	                            // Get the index of rd within n.
	                            i %= LOG_BASE;
	
	                            // Get the index of rd within n, adjusted for leading zeros.
	                            // The number of leading zeros of n is given by LOG_BASE - d.
	                            j = i - LOG_BASE + d;
	
	                            // Get the rounding digit at index j of n.
	                            rd = j < 0 ? 0 : n / pows10[ d - j - 1 ] % 10 | 0;
	                        }
	                    }
	
	                    r = r || sd < 0 ||
	
	                    // Are there any non-zero digits after the rounding digit?
	                    // The expression  n % pows10[ d - j - 1 ]  returns all digits of n to the right
	                    // of the digit at j, e.g. if n is 908714 and j is 2, the expression gives 714.
	                      xc[ni + 1] != null || ( j < 0 ? n : n % pows10[ d - j - 1 ] );
	
	                    r = rm < 4
	                      ? ( rd || r ) && ( rm == 0 || rm == ( x.s < 0 ? 3 : 2 ) )
	                      : rd > 5 || rd == 5 && ( rm == 4 || r || rm == 6 &&
	
	                        // Check whether the digit to the left of the rounding digit is odd.
	                        ( ( i > 0 ? j > 0 ? n / pows10[ d - j ] : 0 : xc[ni - 1] ) % 10 ) & 1 ||
	                          rm == ( x.s < 0 ? 8 : 7 ) );
	
	                    if ( sd < 1 || !xc[0] ) {
	                        xc.length = 0;
	
	                        if (r) {
	
	                            // Convert sd to decimal places.
	                            sd -= x.e + 1;
	
	                            // 1, 0.1, 0.01, 0.001, 0.0001 etc.
	                            xc[0] = pows10[ sd % LOG_BASE ];
	                            x.e = -sd || 0;
	                        } else {
	
	                            // Zero.
	                            xc[0] = x.e = 0;
	                        }
	
	                        return x;
	                    }
	
	                    // Remove excess digits.
	                    if ( i == 0 ) {
	                        xc.length = ni;
	                        k = 1;
	                        ni--;
	                    } else {
	                        xc.length = ni + 1;
	                        k = pows10[ LOG_BASE - i ];
	
	                        // E.g. 56700 becomes 56000 if 7 is the rounding digit.
	                        // j > 0 means i > number of leading zeros of n.
	                        xc[ni] = j > 0 ? mathfloor( n / pows10[ d - j ] % pows10[j] ) * k : 0;
	                    }
	
	                    // Round up?
	                    if (r) {
	
	                        for ( ; ; ) {
	
	                            // If the digit to be rounded up is in the first element of xc...
	                            if ( ni == 0 ) {
	
	                                // i will be the length of xc[0] before k is added.
	                                for ( i = 1, j = xc[0]; j >= 10; j /= 10, i++ );
	                                j = xc[0] += k;
	                                for ( k = 1; j >= 10; j /= 10, k++ );
	
	                                // if i != k the length has increased.
	                                if ( i != k ) {
	                                    x.e++;
	                                    if ( xc[0] == BASE ) xc[0] = 1;
	                                }
	
	                                break;
	                            } else {
	                                xc[ni] += k;
	                                if ( xc[ni] != BASE ) break;
	                                xc[ni--] = 0;
	                                k = 1;
	                            }
	                        }
	                    }
	
	                    // Remove trailing zeros.
	                    for ( i = xc.length; xc[--i] === 0; xc.pop() );
	                }
	
	                // Overflow? Infinity.
	                if ( x.e > MAX_EXP ) {
	                    x.c = x.e = null;
	
	                // Underflow? Zero.
	                } else if ( x.e < MIN_EXP ) {
	                    x.c = [ x.e = 0 ];
	                }
	            }
	
	            return x;
	        }
	
	
	        // PROTOTYPE/INSTANCE METHODS
	
	
	        /*
	         * Return a new BigNumber whose value is the absolute value of this BigNumber.
	         */
	        P.absoluteValue = P.abs = function () {
	            var x = new BigNumber(this);
	            if ( x.s < 0 ) x.s = 1;
	            return x;
	        };
	
	
	        /*
	         * Return a new BigNumber whose value is the value of this BigNumber rounded to a whole
	         * number in the direction of Infinity.
	         */
	        P.ceil = function () {
	            return round( new BigNumber(this), this.e + 1, 2 );
	        };
	
	
	        /*
	         * Return
	         * 1 if the value of this BigNumber is greater than the value of BigNumber(y, b),
	         * -1 if the value of this BigNumber is less than the value of BigNumber(y, b),
	         * 0 if they have the same value,
	         * or null if the value of either is NaN.
	         */
	        P.comparedTo = P.cmp = function ( y, b ) {
	            id = 1;
	            return compare( this, new BigNumber( y, b ) );
	        };
	
	
	        /*
	         * Return the number of decimal places of the value of this BigNumber, or null if the value
	         * of this BigNumber is ±Infinity or NaN.
	         */
	        P.decimalPlaces = P.dp = function () {
	            var n, v,
	                c = this.c;
	
	            if ( !c ) return null;
	            n = ( ( v = c.length - 1 ) - bitFloor( this.e / LOG_BASE ) ) * LOG_BASE;
	
	            // Subtract the number of trailing zeros of the last number.
	            if ( v = c[v] ) for ( ; v % 10 == 0; v /= 10, n-- );
	            if ( n < 0 ) n = 0;
	
	            return n;
	        };
	
	
	        /*
	         *  n / 0 = I
	         *  n / N = N
	         *  n / I = 0
	         *  0 / n = 0
	         *  0 / 0 = N
	         *  0 / N = N
	         *  0 / I = 0
	         *  N / n = N
	         *  N / 0 = N
	         *  N / N = N
	         *  N / I = N
	         *  I / n = I
	         *  I / 0 = I
	         *  I / N = N
	         *  I / I = N
	         *
	         * Return a new BigNumber whose value is the value of this BigNumber divided by the value of
	         * BigNumber(y, b), rounded according to DECIMAL_PLACES and ROUNDING_MODE.
	         */
	        P.dividedBy = P.div = function ( y, b ) {
	            id = 3;
	            return div( this, new BigNumber( y, b ), DECIMAL_PLACES, ROUNDING_MODE );
	        };
	
	
	        /*
	         * Return a new BigNumber whose value is the integer part of dividing the value of this
	         * BigNumber by the value of BigNumber(y, b).
	         */
	        P.dividedToIntegerBy = P.divToInt = function ( y, b ) {
	            id = 4;
	            return div( this, new BigNumber( y, b ), 0, 1 );
	        };
	
	
	        /*
	         * Return true if the value of this BigNumber is equal to the value of BigNumber(y, b),
	         * otherwise returns false.
	         */
	        P.equals = P.eq = function ( y, b ) {
	            id = 5;
	            return compare( this, new BigNumber( y, b ) ) === 0;
	        };
	
	
	        /*
	         * Return a new BigNumber whose value is the value of this BigNumber rounded to a whole
	         * number in the direction of -Infinity.
	         */
	        P.floor = function () {
	            return round( new BigNumber(this), this.e + 1, 3 );
	        };
	
	
	        /*
	         * Return true if the value of this BigNumber is greater than the value of BigNumber(y, b),
	         * otherwise returns false.
	         */
	        P.greaterThan = P.gt = function ( y, b ) {
	            id = 6;
	            return compare( this, new BigNumber( y, b ) ) > 0;
	        };
	
	
	        /*
	         * Return true if the value of this BigNumber is greater than or equal to the value of
	         * BigNumber(y, b), otherwise returns false.
	         */
	        P.greaterThanOrEqualTo = P.gte = function ( y, b ) {
	            id = 7;
	            return ( b = compare( this, new BigNumber( y, b ) ) ) === 1 || b === 0;
	
	        };
	
	
	        /*
	         * Return true if the value of this BigNumber is a finite number, otherwise returns false.
	         */
	        P.isFinite = function () {
	            return !!this.c;
	        };
	
	
	        /*
	         * Return true if the value of this BigNumber is an integer, otherwise return false.
	         */
	        P.isInteger = P.isInt = function () {
	            return !!this.c && bitFloor( this.e / LOG_BASE ) > this.c.length - 2;
	        };
	
	
	        /*
	         * Return true if the value of this BigNumber is NaN, otherwise returns false.
	         */
	        P.isNaN = function () {
	            return !this.s;
	        };
	
	
	        /*
	         * Return true if the value of this BigNumber is negative, otherwise returns false.
	         */
	        P.isNegative = P.isNeg = function () {
	            return this.s < 0;
	        };
	
	
	        /*
	         * Return true if the value of this BigNumber is 0 or -0, otherwise returns false.
	         */
	        P.isZero = function () {
	            return !!this.c && this.c[0] == 0;
	        };
	
	
	        /*
	         * Return true if the value of this BigNumber is less than the value of BigNumber(y, b),
	         * otherwise returns false.
	         */
	        P.lessThan = P.lt = function ( y, b ) {
	            id = 8;
	            return compare( this, new BigNumber( y, b ) ) < 0;
	        };
	
	
	        /*
	         * Return true if the value of this BigNumber is less than or equal to the value of
	         * BigNumber(y, b), otherwise returns false.
	         */
	        P.lessThanOrEqualTo = P.lte = function ( y, b ) {
	            id = 9;
	            return ( b = compare( this, new BigNumber( y, b ) ) ) === -1 || b === 0;
	        };
	
	
	        /*
	         *  n - 0 = n
	         *  n - N = N
	         *  n - I = -I
	         *  0 - n = -n
	         *  0 - 0 = 0
	         *  0 - N = N
	         *  0 - I = -I
	         *  N - n = N
	         *  N - 0 = N
	         *  N - N = N
	         *  N - I = N
	         *  I - n = I
	         *  I - 0 = I
	         *  I - N = N
	         *  I - I = N
	         *
	         * Return a new BigNumber whose value is the value of this BigNumber minus the value of
	         * BigNumber(y, b).
	         */
	        P.minus = P.sub = function ( y, b ) {
	            var i, j, t, xLTy,
	                x = this,
	                a = x.s;
	
	            id = 10;
	            y = new BigNumber( y, b );
	            b = y.s;
	
	            // Either NaN?
	            if ( !a || !b ) return new BigNumber(NaN);
	
	            // Signs differ?
	            if ( a != b ) {
	                y.s = -b;
	                return x.plus(y);
	            }
	
	            var xe = x.e / LOG_BASE,
	                ye = y.e / LOG_BASE,
	                xc = x.c,
	                yc = y.c;
	
	            if ( !xe || !ye ) {
	
	                // Either Infinity?
	                if ( !xc || !yc ) return xc ? ( y.s = -b, y ) : new BigNumber( yc ? x : NaN );
	
	                // Either zero?
	                if ( !xc[0] || !yc[0] ) {
	
	                    // Return y if y is non-zero, x if x is non-zero, or zero if both are zero.
	                    return yc[0] ? ( y.s = -b, y ) : new BigNumber( xc[0] ? x :
	
	                      // IEEE 754 (2008) 6.3: n - n = -0 when rounding to -Infinity
	                      ROUNDING_MODE == 3 ? -0 : 0 );
	                }
	            }
	
	            xe = bitFloor(xe);
	            ye = bitFloor(ye);
	            xc = xc.slice();
	
	            // Determine which is the bigger number.
	            if ( a = xe - ye ) {
	
	                if ( xLTy = a < 0 ) {
	                    a = -a;
	                    t = xc;
	                } else {
	                    ye = xe;
	                    t = yc;
	                }
	
	                t.reverse();
	
	                // Prepend zeros to equalise exponents.
	                for ( b = a; b--; t.push(0) );
	                t.reverse();
	            } else {
	
	                // Exponents equal. Check digit by digit.
	                j = ( xLTy = ( a = xc.length ) < ( b = yc.length ) ) ? a : b;
	
	                for ( a = b = 0; b < j; b++ ) {
	
	                    if ( xc[b] != yc[b] ) {
	                        xLTy = xc[b] < yc[b];
	                        break;
	                    }
	                }
	            }
	
	            // x < y? Point xc to the array of the bigger number.
	            if (xLTy) t = xc, xc = yc, yc = t, y.s = -y.s;
	
	            b = ( j = yc.length ) - ( i = xc.length );
	
	            // Append zeros to xc if shorter.
	            // No need to add zeros to yc if shorter as subtract only needs to start at yc.length.
	            if ( b > 0 ) for ( ; b--; xc[i++] = 0 );
	            b = BASE - 1;
	
	            // Subtract yc from xc.
	            for ( ; j > a; ) {
	
	                if ( xc[--j] < yc[j] ) {
	                    for ( i = j; i && !xc[--i]; xc[i] = b );
	                    --xc[i];
	                    xc[j] += BASE;
	                }
	
	                xc[j] -= yc[j];
	            }
	
	            // Remove leading zeros and adjust exponent accordingly.
	            for ( ; xc[0] == 0; xc.shift(), --ye );
	
	            // Zero?
	            if ( !xc[0] ) {
	
	                // Following IEEE 754 (2008) 6.3,
	                // n - n = +0  but  n - n = -0  when rounding towards -Infinity.
	                y.s = ROUNDING_MODE == 3 ? -1 : 1;
	                y.c = [ y.e = 0 ];
	                return y;
	            }
	
	            // No need to check for Infinity as +x - +y != Infinity && -x - -y != Infinity
	            // for finite x and y.
	            return normalise( y, xc, ye );
	        };
	
	
	        /*
	         *   n % 0 =  N
	         *   n % N =  N
	         *   n % I =  n
	         *   0 % n =  0
	         *  -0 % n = -0
	         *   0 % 0 =  N
	         *   0 % N =  N
	         *   0 % I =  0
	         *   N % n =  N
	         *   N % 0 =  N
	         *   N % N =  N
	         *   N % I =  N
	         *   I % n =  N
	         *   I % 0 =  N
	         *   I % N =  N
	         *   I % I =  N
	         *
	         * Return a new BigNumber whose value is the value of this BigNumber modulo the value of
	         * BigNumber(y, b). The result depends on the value of MODULO_MODE.
	         */
	        P.modulo = P.mod = function ( y, b ) {
	            var q, s,
	                x = this;
	
	            id = 11;
	            y = new BigNumber( y, b );
	
	            // Return NaN if x is Infinity or NaN, or y is NaN or zero.
	            if ( !x.c || !y.s || y.c && !y.c[0] ) {
	                return new BigNumber(NaN);
	
	            // Return x if y is Infinity or x is zero.
	            } else if ( !y.c || x.c && !x.c[0] ) {
	                return new BigNumber(x);
	            }
	
	            if ( MODULO_MODE == 9 ) {
	
	                // Euclidian division: q = sign(y) * floor(x / abs(y))
	                // r = x - qy    where  0 <= r < abs(y)
	                s = y.s;
	                y.s = 1;
	                q = div( x, y, 0, 3 );
	                y.s = s;
	                q.s *= s;
	            } else {
	                q = div( x, y, 0, MODULO_MODE );
	            }
	
	            return x.minus( q.times(y) );
	        };
	
	
	        /*
	         * Return a new BigNumber whose value is the value of this BigNumber negated,
	         * i.e. multiplied by -1.
	         */
	        P.negated = P.neg = function () {
	            var x = new BigNumber(this);
	            x.s = -x.s || null;
	            return x;
	        };
	
	
	        /*
	         *  n + 0 = n
	         *  n + N = N
	         *  n + I = I
	         *  0 + n = n
	         *  0 + 0 = 0
	         *  0 + N = N
	         *  0 + I = I
	         *  N + n = N
	         *  N + 0 = N
	         *  N + N = N
	         *  N + I = N
	         *  I + n = I
	         *  I + 0 = I
	         *  I + N = N
	         *  I + I = I
	         *
	         * Return a new BigNumber whose value is the value of this BigNumber plus the value of
	         * BigNumber(y, b).
	         */
	        P.plus = P.add = function ( y, b ) {
	            var t,
	                x = this,
	                a = x.s;
	
	            id = 12;
	            y = new BigNumber( y, b );
	            b = y.s;
	
	            // Either NaN?
	            if ( !a || !b ) return new BigNumber(NaN);
	
	            // Signs differ?
	             if ( a != b ) {
	                y.s = -b;
	                return x.minus(y);
	            }
	
	            var xe = x.e / LOG_BASE,
	                ye = y.e / LOG_BASE,
	                xc = x.c,
	                yc = y.c;
	
	            if ( !xe || !ye ) {
	
	                // Return ±Infinity if either ±Infinity.
	                if ( !xc || !yc ) return new BigNumber( a / 0 );
	
	                // Either zero?
	                // Return y if y is non-zero, x if x is non-zero, or zero if both are zero.
	                if ( !xc[0] || !yc[0] ) return yc[0] ? y : new BigNumber( xc[0] ? x : a * 0 );
	            }
	
	            xe = bitFloor(xe);
	            ye = bitFloor(ye);
	            xc = xc.slice();
	
	            // Prepend zeros to equalise exponents. Faster to use reverse then do unshifts.
	            if ( a = xe - ye ) {
	                if ( a > 0 ) {
	                    ye = xe;
	                    t = yc;
	                } else {
	                    a = -a;
	                    t = xc;
	                }
	
	                t.reverse();
	                for ( ; a--; t.push(0) );
	                t.reverse();
	            }
	
	            a = xc.length;
	            b = yc.length;
	
	            // Point xc to the longer array, and b to the shorter length.
	            if ( a - b < 0 ) t = yc, yc = xc, xc = t, b = a;
	
	            // Only start adding at yc.length - 1 as the further digits of xc can be ignored.
	            for ( a = 0; b; ) {
	                a = ( xc[--b] = xc[b] + yc[b] + a ) / BASE | 0;
	                xc[b] %= BASE;
	            }
	
	            if (a) {
	                xc.unshift(a);
	                ++ye;
	            }
	
	            // No need to check for zero, as +x + +y != 0 && -x + -y != 0
	            // ye = MAX_EXP + 1 possible
	            return normalise( y, xc, ye );
	        };
	
	
	        /*
	         * Return the number of significant digits of the value of this BigNumber.
	         *
	         * [z] {boolean|number} Whether to count integer-part trailing zeros: true, false, 1 or 0.
	         */
	        P.precision = P.sd = function (z) {
	            var n, v,
	                x = this,
	                c = x.c;
	
	            // 'precision() argument not a boolean or binary digit: {z}'
	            if ( z != null && z !== !!z && z !== 1 && z !== 0 ) {
	                if (ERRORS) raise( 13, 'argument' + notBool, z );
	                if ( z != !!z ) z = null;
	            }
	
	            if ( !c ) return null;
	            v = c.length - 1;
	            n = v * LOG_BASE + 1;
	
	            if ( v = c[v] ) {
	
	                // Subtract the number of trailing zeros of the last element.
	                for ( ; v % 10 == 0; v /= 10, n-- );
	
	                // Add the number of digits of the first element.
	                for ( v = c[0]; v >= 10; v /= 10, n++ );
	            }
	
	            if ( z && x.e + 1 > n ) n = x.e + 1;
	
	            return n;
	        };
	
	
	        /*
	         * Return a new BigNumber whose value is the value of this BigNumber rounded to a maximum of
	         * dp decimal places using rounding mode rm, or to 0 and ROUNDING_MODE respectively if
	         * omitted.
	         *
	         * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
	         * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
	         *
	         * 'round() decimal places out of range: {dp}'
	         * 'round() decimal places not an integer: {dp}'
	         * 'round() rounding mode not an integer: {rm}'
	         * 'round() rounding mode out of range: {rm}'
	         */
	        P.round = function ( dp, rm ) {
	            var n = new BigNumber(this);
	
	            if ( dp == null || isValidInt( dp, 0, MAX, 15 ) ) {
	                round( n, ~~dp + this.e + 1, rm == null ||
	                  !isValidInt( rm, 0, 8, 15, roundingMode ) ? ROUNDING_MODE : rm | 0 );
	            }
	
	            return n;
	        };
	
	
	        /*
	         * Return a new BigNumber whose value is the value of this BigNumber shifted by k places
	         * (powers of 10). Shift to the right if n > 0, and to the left if n < 0.
	         *
	         * k {number} Integer, -MAX_SAFE_INTEGER to MAX_SAFE_INTEGER inclusive.
	         *
	         * If k is out of range and ERRORS is false, the result will be ±0 if k < 0, or ±Infinity
	         * otherwise.
	         *
	         * 'shift() argument not an integer: {k}'
	         * 'shift() argument out of range: {k}'
	         */
	        P.shift = function (k) {
	            var n = this;
	            return isValidInt( k, -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER, 16, 'argument' )
	
	              // k < 1e+21, or truncate(k) will produce exponential notation.
	              ? n.times( '1e' + truncate(k) )
	              : new BigNumber( n.c && n.c[0] && ( k < -MAX_SAFE_INTEGER || k > MAX_SAFE_INTEGER )
	                ? n.s * ( k < 0 ? 0 : 1 / 0 )
	                : n );
	        };
	
	
	        /*
	         *  sqrt(-n) =  N
	         *  sqrt( N) =  N
	         *  sqrt(-I) =  N
	         *  sqrt( I) =  I
	         *  sqrt( 0) =  0
	         *  sqrt(-0) = -0
	         *
	         * Return a new BigNumber whose value is the square root of the value of this BigNumber,
	         * rounded according to DECIMAL_PLACES and ROUNDING_MODE.
	         */
	        P.squareRoot = P.sqrt = function () {
	            var m, n, r, rep, t,
	                x = this,
	                c = x.c,
	                s = x.s,
	                e = x.e,
	                dp = DECIMAL_PLACES + 4,
	                half = new BigNumber('0.5');
	
	            // Negative/NaN/Infinity/zero?
	            if ( s !== 1 || !c || !c[0] ) {
	                return new BigNumber( !s || s < 0 && ( !c || c[0] ) ? NaN : c ? x : 1 / 0 );
	            }
	
	            // Initial estimate.
	            s = Math.sqrt( +x );
	
	            // Math.sqrt underflow/overflow?
	            // Pass x to Math.sqrt as integer, then adjust the exponent of the result.
	            if ( s == 0 || s == 1 / 0 ) {
	                n = coeffToString(c);
	                if ( ( n.length + e ) % 2 == 0 ) n += '0';
	                s = Math.sqrt(n);
	                e = bitFloor( ( e + 1 ) / 2 ) - ( e < 0 || e % 2 );
	
	                if ( s == 1 / 0 ) {
	                    n = '1e' + e;
	                } else {
	                    n = s.toExponential();
	                    n = n.slice( 0, n.indexOf('e') + 1 ) + e;
	                }
	
	                r = new BigNumber(n);
	            } else {
	                r = new BigNumber( s + '' );
	            }
	
	            // Check for zero.
	            // r could be zero if MIN_EXP is changed after the this value was created.
	            // This would cause a division by zero (x/t) and hence Infinity below, which would cause
	            // coeffToString to throw.
	            if ( r.c[0] ) {
	                e = r.e;
	                s = e + dp;
	                if ( s < 3 ) s = 0;
	
	                // Newton-Raphson iteration.
	                for ( ; ; ) {
	                    t = r;
	                    r = half.times( t.plus( div( x, t, dp, 1 ) ) );
	
	                    if ( coeffToString( t.c   ).slice( 0, s ) === ( n =
	                         coeffToString( r.c ) ).slice( 0, s ) ) {
	
	                        // The exponent of r may here be one less than the final result exponent,
	                        // e.g 0.0009999 (e-4) --> 0.001 (e-3), so adjust s so the rounding digits
	                        // are indexed correctly.
	                        if ( r.e < e ) --s;
	                        n = n.slice( s - 3, s + 1 );
	
	                        // The 4th rounding digit may be in error by -1 so if the 4 rounding digits
	                        // are 9999 or 4999 (i.e. approaching a rounding boundary) continue the
	                        // iteration.
	                        if ( n == '9999' || !rep && n == '4999' ) {
	
	                            // On the first iteration only, check to see if rounding up gives the
	                            // exact result as the nines may infinitely repeat.
	                            if ( !rep ) {
	                                round( t, t.e + DECIMAL_PLACES + 2, 0 );
	
	                                if ( t.times(t).eq(x) ) {
	                                    r = t;
	                                    break;
	                                }
	                            }
	
	                            dp += 4;
	                            s += 4;
	                            rep = 1;
	                        } else {
	
	                            // If rounding digits are null, 0{0,4} or 50{0,3}, check for exact
	                            // result. If not, then there are further digits and m will be truthy.
	                            if ( !+n || !+n.slice(1) && n.charAt(0) == '5' ) {
	
	                                // Truncate to the first rounding digit.
	                                round( r, r.e + DECIMAL_PLACES + 2, 1 );
	                                m = !r.times(r).eq(x);
	                            }
	
	                            break;
	                        }
	                    }
	                }
	            }
	
	            return round( r, r.e + DECIMAL_PLACES + 1, ROUNDING_MODE, m );
	        };
	
	
	        /*
	         *  n * 0 = 0
	         *  n * N = N
	         *  n * I = I
	         *  0 * n = 0
	         *  0 * 0 = 0
	         *  0 * N = N
	         *  0 * I = N
	         *  N * n = N
	         *  N * 0 = N
	         *  N * N = N
	         *  N * I = N
	         *  I * n = I
	         *  I * 0 = N
	         *  I * N = N
	         *  I * I = I
	         *
	         * Return a new BigNumber whose value is the value of this BigNumber times the value of
	         * BigNumber(y, b).
	         */
	        P.times = P.mul = function ( y, b ) {
	            var c, e, i, j, k, m, xcL, xlo, xhi, ycL, ylo, yhi, zc,
	                base, sqrtBase,
	                x = this,
	                xc = x.c,
	                yc = ( id = 17, y = new BigNumber( y, b ) ).c;
	
	            // Either NaN, ±Infinity or ±0?
	            if ( !xc || !yc || !xc[0] || !yc[0] ) {
	
	                // Return NaN if either is NaN, or one is 0 and the other is Infinity.
	                if ( !x.s || !y.s || xc && !xc[0] && !yc || yc && !yc[0] && !xc ) {
	                    y.c = y.e = y.s = null;
	                } else {
	                    y.s *= x.s;
	
	                    // Return ±Infinity if either is ±Infinity.
	                    if ( !xc || !yc ) {
	                        y.c = y.e = null;
	
	                    // Return ±0 if either is ±0.
	                    } else {
	                        y.c = [0];
	                        y.e = 0;
	                    }
	                }
	
	                return y;
	            }
	
	            e = bitFloor( x.e / LOG_BASE ) + bitFloor( y.e / LOG_BASE );
	            y.s *= x.s;
	            xcL = xc.length;
	            ycL = yc.length;
	
	            // Ensure xc points to longer array and xcL to its length.
	            if ( xcL < ycL ) zc = xc, xc = yc, yc = zc, i = xcL, xcL = ycL, ycL = i;
	
	            // Initialise the result array with zeros.
	            for ( i = xcL + ycL, zc = []; i--; zc.push(0) );
	
	            base = BASE;
	            sqrtBase = SQRT_BASE;
	
	            for ( i = ycL; --i >= 0; ) {
	                c = 0;
	                ylo = yc[i] % sqrtBase;
	                yhi = yc[i] / sqrtBase | 0;
	
	                for ( k = xcL, j = i + k; j > i; ) {
	                    xlo = xc[--k] % sqrtBase;
	                    xhi = xc[k] / sqrtBase | 0;
	                    m = yhi * xlo + xhi * ylo;
	                    xlo = ylo * xlo + ( ( m % sqrtBase ) * sqrtBase ) + zc[j] + c;
	                    c = ( xlo / base | 0 ) + ( m / sqrtBase | 0 ) + yhi * xhi;
	                    zc[j--] = xlo % base;
	                }
	
	                zc[j] = c;
	            }
	
	            if (c) {
	                ++e;
	            } else {
	                zc.shift();
	            }
	
	            return normalise( y, zc, e );
	        };
	
	
	        /*
	         * Return a new BigNumber whose value is the value of this BigNumber rounded to a maximum of
	         * sd significant digits using rounding mode rm, or ROUNDING_MODE if rm is omitted.
	         *
	         * [sd] {number} Significant digits. Integer, 1 to MAX inclusive.
	         * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
	         *
	         * 'toDigits() precision out of range: {sd}'
	         * 'toDigits() precision not an integer: {sd}'
	         * 'toDigits() rounding mode not an integer: {rm}'
	         * 'toDigits() rounding mode out of range: {rm}'
	         */
	        P.toDigits = function ( sd, rm ) {
	            var n = new BigNumber(this);
	            sd = sd == null || !isValidInt( sd, 1, MAX, 18, 'precision' ) ? null : sd | 0;
	            rm = rm == null || !isValidInt( rm, 0, 8, 18, roundingMode ) ? ROUNDING_MODE : rm | 0;
	            return sd ? round( n, sd, rm ) : n;
	        };
	
	
	        /*
	         * Return a string representing the value of this BigNumber in exponential notation and
	         * rounded using ROUNDING_MODE to dp fixed decimal places.
	         *
	         * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
	         * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
	         *
	         * 'toExponential() decimal places not an integer: {dp}'
	         * 'toExponential() decimal places out of range: {dp}'
	         * 'toExponential() rounding mode not an integer: {rm}'
	         * 'toExponential() rounding mode out of range: {rm}'
	         */
	        P.toExponential = function ( dp, rm ) {
	            return format( this,
	              dp != null && isValidInt( dp, 0, MAX, 19 ) ? ~~dp + 1 : null, rm, 19 );
	        };
	
	
	        /*
	         * Return a string representing the value of this BigNumber in fixed-point notation rounding
	         * to dp fixed decimal places using rounding mode rm, or ROUNDING_MODE if rm is omitted.
	         *
	         * Note: as with JavaScript's number type, (-0).toFixed(0) is '0',
	         * but e.g. (-0.00001).toFixed(0) is '-0'.
	         *
	         * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
	         * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
	         *
	         * 'toFixed() decimal places not an integer: {dp}'
	         * 'toFixed() decimal places out of range: {dp}'
	         * 'toFixed() rounding mode not an integer: {rm}'
	         * 'toFixed() rounding mode out of range: {rm}'
	         */
	        P.toFixed = function ( dp, rm ) {
	            return format( this, dp != null && isValidInt( dp, 0, MAX, 20 )
	              ? ~~dp + this.e + 1 : null, rm, 20 );
	        };
	
	
	        /*
	         * Return a string representing the value of this BigNumber in fixed-point notation rounded
	         * using rm or ROUNDING_MODE to dp decimal places, and formatted according to the properties
	         * of the FORMAT object (see BigNumber.config).
	         *
	         * FORMAT = {
	         *      decimalSeparator : '.',
	         *      groupSeparator : ',',
	         *      groupSize : 3,
	         *      secondaryGroupSize : 0,
	         *      fractionGroupSeparator : '\xA0',    // non-breaking space
	         *      fractionGroupSize : 0
	         * };
	         *
	         * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
	         * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
	         *
	         * 'toFormat() decimal places not an integer: {dp}'
	         * 'toFormat() decimal places out of range: {dp}'
	         * 'toFormat() rounding mode not an integer: {rm}'
	         * 'toFormat() rounding mode out of range: {rm}'
	         */
	        P.toFormat = function ( dp, rm ) {
	            var str = format( this, dp != null && isValidInt( dp, 0, MAX, 21 )
	              ? ~~dp + this.e + 1 : null, rm, 21 );
	
	            if ( this.c ) {
	                var i,
	                    arr = str.split('.'),
	                    g1 = +FORMAT.groupSize,
	                    g2 = +FORMAT.secondaryGroupSize,
	                    groupSeparator = FORMAT.groupSeparator,
	                    intPart = arr[0],
	                    fractionPart = arr[1],
	                    isNeg = this.s < 0,
	                    intDigits = isNeg ? intPart.slice(1) : intPart,
	                    len = intDigits.length;
	
	                if (g2) i = g1, g1 = g2, g2 = i, len -= i;
	
	                if ( g1 > 0 && len > 0 ) {
	                    i = len % g1 || g1;
	                    intPart = intDigits.substr( 0, i );
	
	                    for ( ; i < len; i += g1 ) {
	                        intPart += groupSeparator + intDigits.substr( i, g1 );
	                    }
	
	                    if ( g2 > 0 ) intPart += groupSeparator + intDigits.slice(i);
	                    if (isNeg) intPart = '-' + intPart;
	                }
	
	                str = fractionPart
	                  ? intPart + FORMAT.decimalSeparator + ( ( g2 = +FORMAT.fractionGroupSize )
	                    ? fractionPart.replace( new RegExp( '\\d{' + g2 + '}\\B', 'g' ),
	                      '$&' + FORMAT.fractionGroupSeparator )
	                    : fractionPart )
	                  : intPart;
	            }
	
	            return str;
	        };
	
	
	        /*
	         * Return a string array representing the value of this BigNumber as a simple fraction with
	         * an integer numerator and an integer denominator. The denominator will be a positive
	         * non-zero value less than or equal to the specified maximum denominator. If a maximum
	         * denominator is not specified, the denominator will be the lowest value necessary to
	         * represent the number exactly.
	         *
	         * [md] {number|string|BigNumber} Integer >= 1 and < Infinity. The maximum denominator.
	         *
	         * 'toFraction() max denominator not an integer: {md}'
	         * 'toFraction() max denominator out of range: {md}'
	         */
	        P.toFraction = function (md) {
	            var arr, d0, d2, e, exp, n, n0, q, s,
	                k = ERRORS,
	                x = this,
	                xc = x.c,
	                d = new BigNumber(ONE),
	                n1 = d0 = new BigNumber(ONE),
	                d1 = n0 = new BigNumber(ONE);
	
	            if ( md != null ) {
	                ERRORS = false;
	                n = new BigNumber(md);
	                ERRORS = k;
	
	                if ( !( k = n.isInt() ) || n.lt(ONE) ) {
	
	                    if (ERRORS) {
	                        raise( 22,
	                          'max denominator ' + ( k ? 'out of range' : 'not an integer' ), md );
	                    }
	
	                    // ERRORS is false:
	                    // If md is a finite non-integer >= 1, round it to an integer and use it.
	                    md = !k && n.c && round( n, n.e + 1, 1 ).gte(ONE) ? n : null;
	                }
	            }
	
	            if ( !xc ) return x.toString();
	            s = coeffToString(xc);
	
	            // Determine initial denominator.
	            // d is a power of 10 and the minimum max denominator that specifies the value exactly.
	            e = d.e = s.length - x.e - 1;
	            d.c[0] = POWS_TEN[ ( exp = e % LOG_BASE ) < 0 ? LOG_BASE + exp : exp ];
	            md = !md || n.cmp(d) > 0 ? ( e > 0 ? d : n1 ) : n;
	
	            exp = MAX_EXP;
	            MAX_EXP = 1 / 0;
	            n = new BigNumber(s);
	
	            // n0 = d1 = 0
	            n0.c[0] = 0;
	
	            for ( ; ; )  {
	                q = div( n, d, 0, 1 );
	                d2 = d0.plus( q.times(d1) );
	                if ( d2.cmp(md) == 1 ) break;
	                d0 = d1;
	                d1 = d2;
	                n1 = n0.plus( q.times( d2 = n1 ) );
	                n0 = d2;
	                d = n.minus( q.times( d2 = d ) );
	                n = d2;
	            }
	
	            d2 = div( md.minus(d0), d1, 0, 1 );
	            n0 = n0.plus( d2.times(n1) );
	            d0 = d0.plus( d2.times(d1) );
	            n0.s = n1.s = x.s;
	            e *= 2;
	
	            // Determine which fraction is closer to x, n0/d0 or n1/d1
	            arr = div( n1, d1, e, ROUNDING_MODE ).minus(x).abs().cmp(
	                  div( n0, d0, e, ROUNDING_MODE ).minus(x).abs() ) < 1
	                    ? [ n1.toString(), d1.toString() ]
	                    : [ n0.toString(), d0.toString() ];
	
	            MAX_EXP = exp;
	            return arr;
	        };
	
	
	        /*
	         * Return the value of this BigNumber converted to a number primitive.
	         */
	        P.toNumber = function () {
	            var x = this;
	
	            // Ensure zero has correct sign.
	            return +x || ( x.s ? x.s * 0 : NaN );
	        };
	
	
	        /*
	         * Return a BigNumber whose value is the value of this BigNumber raised to the power n.
	         * If n is negative round according to DECIMAL_PLACES and ROUNDING_MODE.
	         * If POW_PRECISION is not 0, round to POW_PRECISION using ROUNDING_MODE.
	         *
	         * n {number} Integer, -9007199254740992 to 9007199254740992 inclusive.
	         * (Performs 54 loop iterations for n of 9007199254740992.)
	         *
	         * 'pow() exponent not an integer: {n}'
	         * 'pow() exponent out of range: {n}'
	         */
	        P.toPower = P.pow = function (n) {
	            var k, y,
	                i = mathfloor( n < 0 ? -n : +n ),
	                x = this;
	
	            // Pass ±Infinity to Math.pow if exponent is out of range.
	            if ( !isValidInt( n, -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER, 23, 'exponent' ) &&
	              ( !isFinite(n) || i > MAX_SAFE_INTEGER && ( n /= 0 ) ||
	                parseFloat(n) != n && !( n = NaN ) ) ) {
	                return new BigNumber( Math.pow( +x, n ) );
	            }
	
	            // Truncating each coefficient array to a length of k after each multiplication equates
	            // to truncating significant digits to POW_PRECISION + [28, 41], i.e. there will be a
	            // minimum of 28 guard digits retained. (Using + 1.5 would give [9, 21] guard digits.)
	            k = POW_PRECISION ? mathceil( POW_PRECISION / LOG_BASE + 2 ) : 0;
	            y = new BigNumber(ONE);
	
	            for ( ; ; ) {
	
	                if ( i % 2 ) {
	                    y = y.times(x);
	                    if ( !y.c ) break;
	                    if ( k && y.c.length > k ) y.c.length = k;
	                }
	
	                i = mathfloor( i / 2 );
	                if ( !i ) break;
	
	                x = x.times(x);
	                if ( k && x.c && x.c.length > k ) x.c.length = k;
	            }
	
	            if ( n < 0 ) y = ONE.div(y);
	            return k ? round( y, POW_PRECISION, ROUNDING_MODE ) : y;
	        };
	
	
	        /*
	         * Return a string representing the value of this BigNumber rounded to sd significant digits
	         * using rounding mode rm or ROUNDING_MODE. If sd is less than the number of digits
	         * necessary to represent the integer part of the value in fixed-point notation, then use
	         * exponential notation.
	         *
	         * [sd] {number} Significant digits. Integer, 1 to MAX inclusive.
	         * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
	         *
	         * 'toPrecision() precision not an integer: {sd}'
	         * 'toPrecision() precision out of range: {sd}'
	         * 'toPrecision() rounding mode not an integer: {rm}'
	         * 'toPrecision() rounding mode out of range: {rm}'
	         */
	        P.toPrecision = function ( sd, rm ) {
	            return format( this, sd != null && isValidInt( sd, 1, MAX, 24, 'precision' )
	              ? sd | 0 : null, rm, 24 );
	        };
	
	
	        /*
	         * Return a string representing the value of this BigNumber in base b, or base 10 if b is
	         * omitted. If a base is specified, including base 10, round according to DECIMAL_PLACES and
	         * ROUNDING_MODE. If a base is not specified, and this BigNumber has a positive exponent
	         * that is equal to or greater than TO_EXP_POS, or a negative exponent equal to or less than
	         * TO_EXP_NEG, return exponential notation.
	         *
	         * [b] {number} Integer, 2 to 64 inclusive.
	         *
	         * 'toString() base not an integer: {b}'
	         * 'toString() base out of range: {b}'
	         */
	        P.toString = function (b) {
	            var str,
	                n = this,
	                s = n.s,
	                e = n.e;
	
	            // Infinity or NaN?
	            if ( e === null ) {
	
	                if (s) {
	                    str = 'Infinity';
	                    if ( s < 0 ) str = '-' + str;
	                } else {
	                    str = 'NaN';
	                }
	            } else {
	                str = coeffToString( n.c );
	
	                if ( b == null || !isValidInt( b, 2, 64, 25, 'base' ) ) {
	                    str = e <= TO_EXP_NEG || e >= TO_EXP_POS
	                      ? toExponential( str, e )
	                      : toFixedPoint( str, e );
	                } else {
	                    str = convertBase( toFixedPoint( str, e ), b | 0, 10, s );
	                }
	
	                if ( s < 0 && n.c[0] ) str = '-' + str;
	            }
	
	            return str;
	        };
	
	
	        /*
	         * Return a new BigNumber whose value is the value of this BigNumber truncated to a whole
	         * number.
	         */
	        P.truncated = P.trunc = function () {
	            return round( new BigNumber(this), this.e + 1, 1 );
	        };
	
	
	
	        /*
	         * Return as toString, but do not accept a base argument.
	         */
	        P.valueOf = P.toJSON = function () {
	            return this.toString();
	        };
	
	
	        // Aliases for BigDecimal methods.
	        //P.add = P.plus;         // P.add included above
	        //P.subtract = P.minus;   // P.sub included above
	        //P.multiply = P.times;   // P.mul included above
	        //P.divide = P.div;
	        //P.remainder = P.mod;
	        //P.compareTo = P.cmp;
	        //P.negate = P.neg;
	
	
	        if ( configObj != null ) BigNumber.config(configObj);
	
	        return BigNumber;
	    }
	
	
	    // PRIVATE HELPER FUNCTIONS
	
	
	    function bitFloor(n) {
	        var i = n | 0;
	        return n > 0 || n === i ? i : i - 1;
	    }
	
	
	    // Return a coefficient array as a string of base 10 digits.
	    function coeffToString(a) {
	        var s, z,
	            i = 1,
	            j = a.length,
	            r = a[0] + '';
	
	        for ( ; i < j; ) {
	            s = a[i++] + '';
	            z = LOG_BASE - s.length;
	            for ( ; z--; s = '0' + s );
	            r += s;
	        }
	
	        // Determine trailing zeros.
	        for ( j = r.length; r.charCodeAt(--j) === 48; );
	        return r.slice( 0, j + 1 || 1 );
	    }
	
	
	    // Compare the value of BigNumbers x and y.
	    function compare( x, y ) {
	        var a, b,
	            xc = x.c,
	            yc = y.c,
	            i = x.s,
	            j = y.s,
	            k = x.e,
	            l = y.e;
	
	        // Either NaN?
	        if ( !i || !j ) return null;
	
	        a = xc && !xc[0];
	        b = yc && !yc[0];
	
	        // Either zero?
	        if ( a || b ) return a ? b ? 0 : -j : i;
	
	        // Signs differ?
	        if ( i != j ) return i;
	
	        a = i < 0;
	        b = k == l;
	
	        // Either Infinity?
	        if ( !xc || !yc ) return b ? 0 : !xc ^ a ? 1 : -1;
	
	        // Compare exponents.
	        if ( !b ) return k > l ^ a ? 1 : -1;
	
	        j = ( k = xc.length ) < ( l = yc.length ) ? k : l;
	
	        // Compare digit by digit.
	        for ( i = 0; i < j; i++ ) if ( xc[i] != yc[i] ) return xc[i] > yc[i] ^ a ? 1 : -1;
	
	        // Compare lengths.
	        return k == l ? 0 : k > l ^ a ? 1 : -1;
	    }
	
	
	    /*
	     * Return true if n is a valid number in range, otherwise false.
	     * Use for argument validation when ERRORS is false.
	     * Note: parseInt('1e+1') == 1 but parseFloat('1e+1') == 10.
	     */
	    function intValidatorNoErrors( n, min, max ) {
	        return ( n = truncate(n) ) >= min && n <= max;
	    }
	
	
	    function isArray(obj) {
	        return Object.prototype.toString.call(obj) == '[object Array]';
	    }
	
	
	    /*
	     * Convert string of baseIn to an array of numbers of baseOut.
	     * Eg. convertBase('255', 10, 16) returns [15, 15].
	     * Eg. convertBase('ff', 16, 10) returns [2, 5, 5].
	     */
	    function toBaseOut( str, baseIn, baseOut ) {
	        var j,
	            arr = [0],
	            arrL,
	            i = 0,
	            len = str.length;
	
	        for ( ; i < len; ) {
	            for ( arrL = arr.length; arrL--; arr[arrL] *= baseIn );
	            arr[ j = 0 ] += ALPHABET.indexOf( str.charAt( i++ ) );
	
	            for ( ; j < arr.length; j++ ) {
	
	                if ( arr[j] > baseOut - 1 ) {
	                    if ( arr[j + 1] == null ) arr[j + 1] = 0;
	                    arr[j + 1] += arr[j] / baseOut | 0;
	                    arr[j] %= baseOut;
	                }
	            }
	        }
	
	        return arr.reverse();
	    }
	
	
	    function toExponential( str, e ) {
	        return ( str.length > 1 ? str.charAt(0) + '.' + str.slice(1) : str ) +
	          ( e < 0 ? 'e' : 'e+' ) + e;
	    }
	
	
	    function toFixedPoint( str, e ) {
	        var len, z;
	
	        // Negative exponent?
	        if ( e < 0 ) {
	
	            // Prepend zeros.
	            for ( z = '0.'; ++e; z += '0' );
	            str = z + str;
	
	        // Positive exponent
	        } else {
	            len = str.length;
	
	            // Append zeros.
	            if ( ++e > len ) {
	                for ( z = '0', e -= len; --e; z += '0' );
	                str += z;
	            } else if ( e < len ) {
	                str = str.slice( 0, e ) + '.' + str.slice(e);
	            }
	        }
	
	        return str;
	    }
	
	
	    function truncate(n) {
	        n = parseFloat(n);
	        return n < 0 ? mathceil(n) : mathfloor(n);
	    }
	
	
	    // EXPORT
	
	
	    BigNumber = another();
	
	    // AMD.
	    if ( true ) {
	        !(__WEBPACK_AMD_DEFINE_RESULT__ = function () { return BigNumber; }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	
	    // Node and other environments that support module.exports.
	    } else if ( typeof module != 'undefined' && module.exports ) {
	        module.exports = BigNumber;
	        if ( !crypto ) try { crypto = require('crypto'); } catch (e) {}
	
	    // Browser.
	    } else {
	        global.BigNumber = BigNumber;
	    }
	})(this);


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

	/*
	    This file is part of web3.js.
	
	    web3.js is free software: you can redistribute it and/or modify
	    it under the terms of the GNU Lesser General Public License as published by
	    the Free Software Foundation, either version 3 of the License, or
	    (at your option) any later version.
	
	    web3.js is distributed in the hope that it will be useful,
	    but WITHOUT ANY WARRANTY; without even the implied warranty of
	    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	    GNU Lesser General Public License for more details.
	
	    You should have received a copy of the GNU Lesser General Public License
	    along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
	*/
	/** 
	 * @file sha3.js
	 * @author Marek Kotewicz <marek@ethdev.com>
	 * @date 2015
	 */
	
	var CryptoJS = __webpack_require__(27);
	var sha3 = __webpack_require__(39);
	
	module.exports = function (value, options) {
	    if (options && options.encoding === 'hex') {
	        if (value.length > 2 && value.substr(0, 2) === '0x') {
	            value = value.substr(2);
	        }
	        value = CryptoJS.enc.Hex.parse(value);
	    }
	
	    return sha3(value, {
	        outputLength: 256
	    }).toString();
	};
	


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

	;(function (root, factory, undef) {
		if (true) {
			// CommonJS
			module.exports = exports = factory(__webpack_require__(28), __webpack_require__(29), __webpack_require__(30), __webpack_require__(31), __webpack_require__(32), __webpack_require__(33), __webpack_require__(34), __webpack_require__(35), __webpack_require__(36), __webpack_require__(37), __webpack_require__(38), __webpack_require__(39), __webpack_require__(40), __webpack_require__(41), __webpack_require__(42), __webpack_require__(43), __webpack_require__(44), __webpack_require__(45), __webpack_require__(46), __webpack_require__(47), __webpack_require__(48), __webpack_require__(49), __webpack_require__(50), __webpack_require__(51), __webpack_require__(52), __webpack_require__(53), __webpack_require__(54), __webpack_require__(55), __webpack_require__(56), __webpack_require__(57), __webpack_require__(58), __webpack_require__(59), __webpack_require__(60));
		}
		else if (typeof define === "function" && define.amd) {
			// AMD
			define(["./core", "./x64-core", "./lib-typedarrays", "./enc-utf16", "./enc-base64", "./md5", "./sha1", "./sha256", "./sha224", "./sha512", "./sha384", "./sha3", "./ripemd160", "./hmac", "./pbkdf2", "./evpkdf", "./cipher-core", "./mode-cfb", "./mode-ctr", "./mode-ctr-gladman", "./mode-ofb", "./mode-ecb", "./pad-ansix923", "./pad-iso10126", "./pad-iso97971", "./pad-zeropadding", "./pad-nopadding", "./format-hex", "./aes", "./tripledes", "./rc4", "./rabbit", "./rabbit-legacy"], factory);
		}
		else {
			// Global (browser)
			root.CryptoJS = factory(root.CryptoJS);
		}
	}(this, function (CryptoJS) {
	
		return CryptoJS;
	
	}));

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

	;(function (root, factory) {
		if (true) {
			// CommonJS
			module.exports = exports = factory();
		}
		else if (typeof define === "function" && define.amd) {
			// AMD
			define([], factory);
		}
		else {
			// Global (browser)
			root.CryptoJS = factory();
		}
	}(this, function () {
	
		/**
		 * CryptoJS core components.
		 */
		var CryptoJS = CryptoJS || (function (Math, undefined) {
		    /*
		     * Local polyfil of Object.create
		     */
		    var create = Object.create || (function () {
		        function F() {};
	
		        return function (obj) {
		            var subtype;
	
		            F.prototype = obj;
	
		            subtype = new F();
	
		            F.prototype = null;
	
		            return subtype;
		        };
		    }())
	
		    /**
		     * CryptoJS namespace.
		     */
		    var C = {};
	
		    /**
		     * Library namespace.
		     */
		    var C_lib = C.lib = {};
	
		    /**
		     * Base object for prototypal inheritance.
		     */
		    var Base = C_lib.Base = (function () {
	
	
		        return {
		            /**
		             * Creates a new object that inherits from this object.
		             *
		             * @param {Object} overrides Properties to copy into the new object.
		             *
		             * @return {Object} The new object.
		             *
		             * @static
		             *
		             * @example
		             *
		             *     var MyType = CryptoJS.lib.Base.extend({
		             *         field: 'value',
		             *
		             *         method: function () {
		             *         }
		             *     });
		             */
		            extend: function (overrides) {
		                // Spawn
		                var subtype = create(this);
	
		                // Augment
		                if (overrides) {
		                    subtype.mixIn(overrides);
		                }
	
		                // Create default initializer
		                if (!subtype.hasOwnProperty('init') || this.init === subtype.init) {
		                    subtype.init = function () {
		                        subtype.$super.init.apply(this, arguments);
		                    };
		                }
	
		                // Initializer's prototype is the subtype object
		                subtype.init.prototype = subtype;
	
		                // Reference supertype
		                subtype.$super = this;
	
		                return subtype;
		            },
	
		            /**
		             * Extends this object and runs the init method.
		             * Arguments to create() will be passed to init().
		             *
		             * @return {Object} The new object.
		             *
		             * @static
		             *
		             * @example
		             *
		             *     var instance = MyType.create();
		             */
		            create: function () {
		                var instance = this.extend();
		                instance.init.apply(instance, arguments);
	
		                return instance;
		            },
	
		            /**
		             * Initializes a newly created object.
		             * Override this method to add some logic when your objects are created.
		             *
		             * @example
		             *
		             *     var MyType = CryptoJS.lib.Base.extend({
		             *         init: function () {
		             *             // ...
		             *         }
		             *     });
		             */
		            init: function () {
		            },
	
		            /**
		             * Copies properties into this object.
		             *
		             * @param {Object} properties The properties to mix in.
		             *
		             * @example
		             *
		             *     MyType.mixIn({
		             *         field: 'value'
		             *     });
		             */
		            mixIn: function (properties) {
		                for (var propertyName in properties) {
		                    if (properties.hasOwnProperty(propertyName)) {
		                        this[propertyName] = properties[propertyName];
		                    }
		                }
	
		                // IE won't copy toString using the loop above
		                if (properties.hasOwnProperty('toString')) {
		                    this.toString = properties.toString;
		                }
		            },
	
		            /**
		             * Creates a copy of this object.
		             *
		             * @return {Object} The clone.
		             *
		             * @example
		             *
		             *     var clone = instance.clone();
		             */
		            clone: function () {
		                return this.init.prototype.extend(this);
		            }
		        };
		    }());
	
		    /**
		     * An array of 32-bit words.
		     *
		     * @property {Array} words The array of 32-bit words.
		     * @property {number} sigBytes The number of significant bytes in this word array.
		     */
		    var WordArray = C_lib.WordArray = Base.extend({
		        /**
		         * Initializes a newly created word array.
		         *
		         * @param {Array} words (Optional) An array of 32-bit words.
		         * @param {number} sigBytes (Optional) The number of significant bytes in the words.
		         *
		         * @example
		         *
		         *     var wordArray = CryptoJS.lib.WordArray.create();
		         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607]);
		         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607], 6);
		         */
		        init: function (words, sigBytes) {
		            words = this.words = words || [];
	
		            if (sigBytes != undefined) {
		                this.sigBytes = sigBytes;
		            } else {
		                this.sigBytes = words.length * 4;
		            }
		        },
	
		        /**
		         * Converts this word array to a string.
		         *
		         * @param {Encoder} encoder (Optional) The encoding strategy to use. Default: CryptoJS.enc.Hex
		         *
		         * @return {string} The stringified word array.
		         *
		         * @example
		         *
		         *     var string = wordArray + '';
		         *     var string = wordArray.toString();
		         *     var string = wordArray.toString(CryptoJS.enc.Utf8);
		         */
		        toString: function (encoder) {
		            return (encoder || Hex).stringify(this);
		        },
	
		        /**
		         * Concatenates a word array to this word array.
		         *
		         * @param {WordArray} wordArray The word array to append.
		         *
		         * @return {WordArray} This word array.
		         *
		         * @example
		         *
		         *     wordArray1.concat(wordArray2);
		         */
		        concat: function (wordArray) {
		            // Shortcuts
		            var thisWords = this.words;
		            var thatWords = wordArray.words;
		            var thisSigBytes = this.sigBytes;
		            var thatSigBytes = wordArray.sigBytes;
	
		            // Clamp excess bits
		            this.clamp();
	
		            // Concat
		            if (thisSigBytes % 4) {
		                // Copy one byte at a time
		                for (var i = 0; i < thatSigBytes; i++) {
		                    var thatByte = (thatWords[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
		                    thisWords[(thisSigBytes + i) >>> 2] |= thatByte << (24 - ((thisSigBytes + i) % 4) * 8);
		                }
		            } else {
		                // Copy one word at a time
		                for (var i = 0; i < thatSigBytes; i += 4) {
		                    thisWords[(thisSigBytes + i) >>> 2] = thatWords[i >>> 2];
		                }
		            }
		            this.sigBytes += thatSigBytes;
	
		            // Chainable
		            return this;
		        },
	
		        /**
		         * Removes insignificant bits.
		         *
		         * @example
		         *
		         *     wordArray.clamp();
		         */
		        clamp: function () {
		            // Shortcuts
		            var words = this.words;
		            var sigBytes = this.sigBytes;
	
		            // Clamp
		            words[sigBytes >>> 2] &= 0xffffffff << (32 - (sigBytes % 4) * 8);
		            words.length = Math.ceil(sigBytes / 4);
		        },
	
		        /**
		         * Creates a copy of this word array.
		         *
		         * @return {WordArray} The clone.
		         *
		         * @example
		         *
		         *     var clone = wordArray.clone();
		         */
		        clone: function () {
		            var clone = Base.clone.call(this);
		            clone.words = this.words.slice(0);
	
		            return clone;
		        },
	
		        /**
		         * Creates a word array filled with random bytes.
		         *
		         * @param {number} nBytes The number of random bytes to generate.
		         *
		         * @return {WordArray} The random word array.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var wordArray = CryptoJS.lib.WordArray.random(16);
		         */
		        random: function (nBytes) {
		            var words = [];
	
		            var r = (function (m_w) {
		                var m_w = m_w;
		                var m_z = 0x3ade68b1;
		                var mask = 0xffffffff;
	
		                return function () {
		                    m_z = (0x9069 * (m_z & 0xFFFF) + (m_z >> 0x10)) & mask;
		                    m_w = (0x4650 * (m_w & 0xFFFF) + (m_w >> 0x10)) & mask;
		                    var result = ((m_z << 0x10) + m_w) & mask;
		                    result /= 0x100000000;
		                    result += 0.5;
		                    return result * (Math.random() > .5 ? 1 : -1);
		                }
		            });
	
		            for (var i = 0, rcache; i < nBytes; i += 4) {
		                var _r = r((rcache || Math.random()) * 0x100000000);
	
		                rcache = _r() * 0x3ade67b7;
		                words.push((_r() * 0x100000000) | 0);
		            }
	
		            return new WordArray.init(words, nBytes);
		        }
		    });
	
		    /**
		     * Encoder namespace.
		     */
		    var C_enc = C.enc = {};
	
		    /**
		     * Hex encoding strategy.
		     */
		    var Hex = C_enc.Hex = {
		        /**
		         * Converts a word array to a hex string.
		         *
		         * @param {WordArray} wordArray The word array.
		         *
		         * @return {string} The hex string.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var hexString = CryptoJS.enc.Hex.stringify(wordArray);
		         */
		        stringify: function (wordArray) {
		            // Shortcuts
		            var words = wordArray.words;
		            var sigBytes = wordArray.sigBytes;
	
		            // Convert
		            var hexChars = [];
		            for (var i = 0; i < sigBytes; i++) {
		                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
		                hexChars.push((bite >>> 4).toString(16));
		                hexChars.push((bite & 0x0f).toString(16));
		            }
	
		            return hexChars.join('');
		        },
	
		        /**
		         * Converts a hex string to a word array.
		         *
		         * @param {string} hexStr The hex string.
		         *
		         * @return {WordArray} The word array.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var wordArray = CryptoJS.enc.Hex.parse(hexString);
		         */
		        parse: function (hexStr) {
		            // Shortcut
		            var hexStrLength = hexStr.length;
	
		            // Convert
		            var words = [];
		            for (var i = 0; i < hexStrLength; i += 2) {
		                words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << (24 - (i % 8) * 4);
		            }
	
		            return new WordArray.init(words, hexStrLength / 2);
		        }
		    };
	
		    /**
		     * Latin1 encoding strategy.
		     */
		    var Latin1 = C_enc.Latin1 = {
		        /**
		         * Converts a word array to a Latin1 string.
		         *
		         * @param {WordArray} wordArray The word array.
		         *
		         * @return {string} The Latin1 string.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var latin1String = CryptoJS.enc.Latin1.stringify(wordArray);
		         */
		        stringify: function (wordArray) {
		            // Shortcuts
		            var words = wordArray.words;
		            var sigBytes = wordArray.sigBytes;
	
		            // Convert
		            var latin1Chars = [];
		            for (var i = 0; i < sigBytes; i++) {
		                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
		                latin1Chars.push(String.fromCharCode(bite));
		            }
	
		            return latin1Chars.join('');
		        },
	
		        /**
		         * Converts a Latin1 string to a word array.
		         *
		         * @param {string} latin1Str The Latin1 string.
		         *
		         * @return {WordArray} The word array.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var wordArray = CryptoJS.enc.Latin1.parse(latin1String);
		         */
		        parse: function (latin1Str) {
		            // Shortcut
		            var latin1StrLength = latin1Str.length;
	
		            // Convert
		            var words = [];
		            for (var i = 0; i < latin1StrLength; i++) {
		                words[i >>> 2] |= (latin1Str.charCodeAt(i) & 0xff) << (24 - (i % 4) * 8);
		            }
	
		            return new WordArray.init(words, latin1StrLength);
		        }
		    };
	
		    /**
		     * UTF-8 encoding strategy.
		     */
		    var Utf8 = C_enc.Utf8 = {
		        /**
		         * Converts a word array to a UTF-8 string.
		         *
		         * @param {WordArray} wordArray The word array.
		         *
		         * @return {string} The UTF-8 string.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var utf8String = CryptoJS.enc.Utf8.stringify(wordArray);
		         */
		        stringify: function (wordArray) {
		            try {
		                return decodeURIComponent(escape(Latin1.stringify(wordArray)));
		            } catch (e) {
		                throw new Error('Malformed UTF-8 data');
		            }
		        },
	
		        /**
		         * Converts a UTF-8 string to a word array.
		         *
		         * @param {string} utf8Str The UTF-8 string.
		         *
		         * @return {WordArray} The word array.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var wordArray = CryptoJS.enc.Utf8.parse(utf8String);
		         */
		        parse: function (utf8Str) {
		            return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
		        }
		    };
	
		    /**
		     * Abstract buffered block algorithm template.
		     *
		     * The property blockSize must be implemented in a concrete subtype.
		     *
		     * @property {number} _minBufferSize The number of blocks that should be kept unprocessed in the buffer. Default: 0
		     */
		    var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({
		        /**
		         * Resets this block algorithm's data buffer to its initial state.
		         *
		         * @example
		         *
		         *     bufferedBlockAlgorithm.reset();
		         */
		        reset: function () {
		            // Initial values
		            this._data = new WordArray.init();
		            this._nDataBytes = 0;
		        },
	
		        /**
		         * Adds new data to this block algorithm's buffer.
		         *
		         * @param {WordArray|string} data The data to append. Strings are converted to a WordArray using UTF-8.
		         *
		         * @example
		         *
		         *     bufferedBlockAlgorithm._append('data');
		         *     bufferedBlockAlgorithm._append(wordArray);
		         */
		        _append: function (data) {
		            // Convert string to WordArray, else assume WordArray already
		            if (typeof data == 'string') {
		                data = Utf8.parse(data);
		            }
	
		            // Append
		            this._data.concat(data);
		            this._nDataBytes += data.sigBytes;
		        },
	
		        /**
		         * Processes available data blocks.
		         *
		         * This method invokes _doProcessBlock(offset), which must be implemented by a concrete subtype.
		         *
		         * @param {boolean} doFlush Whether all blocks and partial blocks should be processed.
		         *
		         * @return {WordArray} The processed data.
		         *
		         * @example
		         *
		         *     var processedData = bufferedBlockAlgorithm._process();
		         *     var processedData = bufferedBlockAlgorithm._process(!!'flush');
		         */
		        _process: function (doFlush) {
		            // Shortcuts
		            var data = this._data;
		            var dataWords = data.words;
		            var dataSigBytes = data.sigBytes;
		            var blockSize = this.blockSize;
		            var blockSizeBytes = blockSize * 4;
	
		            // Count blocks ready
		            var nBlocksReady = dataSigBytes / blockSizeBytes;
		            if (doFlush) {
		                // Round up to include partial blocks
		                nBlocksReady = Math.ceil(nBlocksReady);
		            } else {
		                // Round down to include only full blocks,
		                // less the number of blocks that must remain in the buffer
		                nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
		            }
	
		            // Count words ready
		            var nWordsReady = nBlocksReady * blockSize;
	
		            // Count bytes ready
		            var nBytesReady = Math.min(nWordsReady * 4, dataSigBytes);
	
		            // Process blocks
		            if (nWordsReady) {
		                for (var offset = 0; offset < nWordsReady; offset += blockSize) {
		                    // Perform concrete-algorithm logic
		                    this._doProcessBlock(dataWords, offset);
		                }
	
		                // Remove processed words
		                var processedWords = dataWords.splice(0, nWordsReady);
		                data.sigBytes -= nBytesReady;
		            }
	
		            // Return processed words
		            return new WordArray.init(processedWords, nBytesReady);
		        },
	
		        /**
		         * Creates a copy of this object.
		         *
		         * @return {Object} The clone.
		         *
		         * @example
		         *
		         *     var clone = bufferedBlockAlgorithm.clone();
		         */
		        clone: function () {
		            var clone = Base.clone.call(this);
		            clone._data = this._data.clone();
	
		            return clone;
		        },
	
		        _minBufferSize: 0
		    });
	
		    /**
		     * Abstract hasher template.
		     *
		     * @property {number} blockSize The number of 32-bit words this hasher operates on. Default: 16 (512 bits)
		     */
		    var Hasher = C_lib.Hasher = BufferedBlockAlgorithm.extend({
		        /**
		         * Configuration options.
		         */
		        cfg: Base.extend(),
	
		        /**
		         * Initializes a newly created hasher.
		         *
		         * @param {Object} cfg (Optional) The configuration options to use for this hash computation.
		         *
		         * @example
		         *
		         *     var hasher = CryptoJS.algo.SHA256.create();
		         */
		        init: function (cfg) {
		            // Apply config defaults
		            this.cfg = this.cfg.extend(cfg);
	
		            // Set initial values
		            this.reset();
		        },
	
		        /**
		         * Resets this hasher to its initial state.
		         *
		         * @example
		         *
		         *     hasher.reset();
		         */
		        reset: function () {
		            // Reset data buffer
		            BufferedBlockAlgorithm.reset.call(this);
	
		            // Perform concrete-hasher logic
		            this._doReset();
		        },
	
		        /**
		         * Updates this hasher with a message.
		         *
		         * @param {WordArray|string} messageUpdate The message to append.
		         *
		         * @return {Hasher} This hasher.
		         *
		         * @example
		         *
		         *     hasher.update('message');
		         *     hasher.update(wordArray);
		         */
		        update: function (messageUpdate) {
		            // Append
		            this._append(messageUpdate);
	
		            // Update the hash
		            this._process();
	
		            // Chainable
		            return this;
		        },
	
		        /**
		         * Finalizes the hash computation.
		         * Note that the finalize operation is effectively a destructive, read-once operation.
		         *
		         * @param {WordArray|string} messageUpdate (Optional) A final message update.
		         *
		         * @return {WordArray} The hash.
		         *
		         * @example
		         *
		         *     var hash = hasher.finalize();
		         *     var hash = hasher.finalize('message');
		         *     var hash = hasher.finalize(wordArray);
		         */
		        finalize: function (messageUpdate) {
		            // Final message update
		            if (messageUpdate) {
		                this._append(messageUpdate);
		            }
	
		            // Perform concrete-hasher logic
		            var hash = this._doFinalize();
	
		            return hash;
		        },
	
		        blockSize: 512/32,
	
		        /**
		         * Creates a shortcut function to a hasher's object interface.
		         *
		         * @param {Hasher} hasher The hasher to create a helper for.
		         *
		         * @return {Function} The shortcut function.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var SHA256 = CryptoJS.lib.Hasher._createHelper(CryptoJS.algo.SHA256);
		         */
		        _createHelper: function (hasher) {
		            return function (message, cfg) {
		                return new hasher.init(cfg).finalize(message);
		            };
		        },
	
		        /**
		         * Creates a shortcut function to the HMAC's object interface.
		         *
		         * @param {Hasher} hasher The hasher to use in this HMAC helper.
		         *
		         * @return {Function} The shortcut function.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var HmacSHA256 = CryptoJS.lib.Hasher._createHmacHelper(CryptoJS.algo.SHA256);
		         */
		        _createHmacHelper: function (hasher) {
		            return function (message, key) {
		                return new C_algo.HMAC.init(hasher, key).finalize(message);
		            };
		        }
		    });
	
		    /**
		     * Algorithm namespace.
		     */
		    var C_algo = C.algo = {};
	
		    return C;
		}(Math));
	
	
		return CryptoJS;
	
	}));

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

	;(function (root, factory) {
		if (true) {
			// CommonJS
			module.exports = exports = factory(__webpack_require__(28));
		}
		else if (typeof define === "function" && define.amd) {
			// AMD
			define(["./core"], factory);
		}
		else {
			// Global (browser)
			factory(root.CryptoJS);
		}
	}(this, function (CryptoJS) {
	
		(function (undefined) {
		    // Shortcuts
		    var C = CryptoJS;
		    var C_lib = C.lib;
		    var Base = C_lib.Base;
		    var X32WordArray = C_lib.WordArray;
	
		    /**
		     * x64 namespace.
		     */
		    var C_x64 = C.x64 = {};
	
		    /**
		     * A 64-bit word.
		     */
		    var X64Word = C_x64.Word = Base.extend({
		        /**
		         * Initializes a newly created 64-bit word.
		         *
		         * @param {number} high The high 32 bits.
		         * @param {number} low The low 32 bits.
		         *
		         * @example
		         *
		         *     var x64Word = CryptoJS.x64.Word.create(0x00010203, 0x04050607);
		         */
		        init: function (high, low) {
		            this.high = high;
		            this.low = low;
		        }
	
		        /**
		         * Bitwise NOTs this word.
		         *
		         * @return {X64Word} A new x64-Word object after negating.
		         *
		         * @example
		         *
		         *     var negated = x64Word.not();
		         */
		        // not: function () {
		            // var high = ~this.high;
		            // var low = ~this.low;
	
		            // return X64Word.create(high, low);
		        // },
	
		        /**
		         * Bitwise ANDs this word with the passed word.
		         *
		         * @param {X64Word} word The x64-Word to AND with this word.
		         *
		         * @return {X64Word} A new x64-Word object after ANDing.
		         *
		         * @example
		         *
		         *     var anded = x64Word.and(anotherX64Word);
		         */
		        // and: function (word) {
		            // var high = this.high & word.high;
		            // var low = this.low & word.low;
	
		            // return X64Word.create(high, low);
		        // },
	
		        /**
		         * Bitwise ORs this word with the passed word.
		         *
		         * @param {X64Word} word The x64-Word to OR with this word.
		         *
		         * @return {X64Word} A new x64-Word object after ORing.
		         *
		         * @example
		         *
		         *     var ored = x64Word.or(anotherX64Word);
		         */
		        // or: function (word) {
		            // var high = this.high | word.high;
		            // var low = this.low | word.low;
	
		            // return X64Word.create(high, low);
		        // },
	
		        /**
		         * Bitwise XORs this word with the passed word.
		         *
		         * @param {X64Word} word The x64-Word to XOR with this word.
		         *
		         * @return {X64Word} A new x64-Word object after XORing.
		         *
		         * @example
		         *
		         *     var xored = x64Word.xor(anotherX64Word);
		         */
		        // xor: function (word) {
		            // var high = this.high ^ word.high;
		            // var low = this.low ^ word.low;
	
		            // return X64Word.create(high, low);
		        // },
	
		        /**
		         * Shifts this word n bits to the left.
		         *
		         * @param {number} n The number of bits to shift.
		         *
		         * @return {X64Word} A new x64-Word object after shifting.
		         *
		         * @example
		         *
		         *     var shifted = x64Word.shiftL(25);
		         */
		        // shiftL: function (n) {
		            // if (n < 32) {
		                // var high = (this.high << n) | (this.low >>> (32 - n));
		                // var low = this.low << n;
		            // } else {
		                // var high = this.low << (n - 32);
		                // var low = 0;
		            // }
	
		            // return X64Word.create(high, low);
		        // },
	
		        /**
		         * Shifts this word n bits to the right.
		         *
		         * @param {number} n The number of bits to shift.
		         *
		         * @return {X64Word} A new x64-Word object after shifting.
		         *
		         * @example
		         *
		         *     var shifted = x64Word.shiftR(7);
		         */
		        // shiftR: function (n) {
		            // if (n < 32) {
		                // var low = (this.low >>> n) | (this.high << (32 - n));
		                // var high = this.high >>> n;
		            // } else {
		                // var low = this.high >>> (n - 32);
		                // var high = 0;
		            // }
	
		            // return X64Word.create(high, low);
		        // },
	
		        /**
		         * Rotates this word n bits to the left.
		         *
		         * @param {number} n The number of bits to rotate.
		         *
		         * @return {X64Word} A new x64-Word object after rotating.
		         *
		         * @example
		         *
		         *     var rotated = x64Word.rotL(25);
		         */
		        // rotL: function (n) {
		            // return this.shiftL(n).or(this.shiftR(64 - n));
		        // },
	
		        /**
		         * Rotates this word n bits to the right.
		         *
		         * @param {number} n The number of bits to rotate.
		         *
		         * @return {X64Word} A new x64-Word object after rotating.
		         *
		         * @example
		         *
		         *     var rotated = x64Word.rotR(7);
		         */
		        // rotR: function (n) {
		            // return this.shiftR(n).or(this.shiftL(64 - n));
		        // },
	
		        /**
		         * Adds this word with the passed word.
		         *
		         * @param {X64Word} word The x64-Word to add with this word.
		         *
		         * @return {X64Word} A new x64-Word object after adding.
		         *
		         * @example
		         *
		         *     var added = x64Word.add(anotherX64Word);
		         */
		        // add: function (word) {
		            // var low = (this.low + word.low) | 0;
		            // var carry = (low >>> 0) < (this.low >>> 0) ? 1 : 0;
		            // var high = (this.high + word.high + carry) | 0;
	
		            // return X64Word.create(high, low);
		        // }
		    });
	
		    /**
		     * An array of 64-bit words.
		     *
		     * @property {Array} words The array of CryptoJS.x64.Word objects.
		     * @property {number} sigBytes The number of significant bytes in this word array.
		     */
		    var X64WordArray = C_x64.WordArray = Base.extend({
		        /**
		         * Initializes a newly created word array.
		         *
		         * @param {Array} words (Optional) An array of CryptoJS.x64.Word objects.
		         * @param {number} sigBytes (Optional) The number of significant bytes in the words.
		         *
		         * @example
		         *
		         *     var wordArray = CryptoJS.x64.WordArray.create();
		         *
		         *     var wordArray = CryptoJS.x64.WordArray.create([
		         *         CryptoJS.x64.Word.create(0x00010203, 0x04050607),
		         *         CryptoJS.x64.Word.create(0x18191a1b, 0x1c1d1e1f)
		         *     ]);
		         *
		         *     var wordArray = CryptoJS.x64.WordArray.create([
		         *         CryptoJS.x64.Word.create(0x00010203, 0x04050607),
		         *         CryptoJS.x64.Word.create(0x18191a1b, 0x1c1d1e1f)
		         *     ], 10);
		         */
		        init: function (words, sigBytes) {
		            words = this.words = words || [];
	
		            if (sigBytes != undefined) {
		                this.sigBytes = sigBytes;
		            } else {
		                this.sigBytes = words.length * 8;
		            }
		        },
	
		        /**
		         * Converts this 64-bit word array to a 32-bit word array.
		         *
		         * @return {CryptoJS.lib.WordArray} This word array's data as a 32-bit word array.
		         *
		         * @example
		         *
		         *     var x32WordArray = x64WordArray.toX32();
		         */
		        toX32: function () {
		            // Shortcuts
		            var x64Words = this.words;
		            var x64WordsLength = x64Words.length;
	
		            // Convert
		            var x32Words = [];
		            for (var i = 0; i < x64WordsLength; i++) {
		                var x64Word = x64Words[i];
		                x32Words.push(x64Word.high);
		                x32Words.push(x64Word.low);
		            }
	
		            return X32WordArray.create(x32Words, this.sigBytes);
		        },
	
		        /**
		         * Creates a copy of this word array.
		         *
		         * @return {X64WordArray} The clone.
		         *
		         * @example
		         *
		         *     var clone = x64WordArray.clone();
		         */
		        clone: function () {
		            var clone = Base.clone.call(this);
	
		            // Clone "words" array
		            var words = clone.words = this.words.slice(0);
	
		            // Clone each X64Word object
		            var wordsLength = words.length;
		            for (var i = 0; i < wordsLength; i++) {
		                words[i] = words[i].clone();
		            }
	
		            return clone;
		        }
		    });
		}());
	
	
		return CryptoJS;
	
	}));

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

	;(function (root, factory) {
		if (true) {
			// CommonJS
			module.exports = exports = factory(__webpack_require__(28));
		}
		else if (typeof define === "function" && define.amd) {
			// AMD
			define(["./core"], factory);
		}
		else {
			// Global (browser)
			factory(root.CryptoJS);
		}
	}(this, function (CryptoJS) {
	
		(function () {
		    // Check if typed arrays are supported
		    if (typeof ArrayBuffer != 'function') {
		        return;
		    }
	
		    // Shortcuts
		    var C = CryptoJS;
		    var C_lib = C.lib;
		    var WordArray = C_lib.WordArray;
	
		    // Reference original init
		    var superInit = WordArray.init;
	
		    // Augment WordArray.init to handle typed arrays
		    var subInit = WordArray.init = function (typedArray) {
		        // Convert buffers to uint8
		        if (typedArray instanceof ArrayBuffer) {
		            typedArray = new Uint8Array(typedArray);
		        }
	
		        // Convert other array views to uint8
		        if (
		            typedArray instanceof Int8Array ||
		            (typeof Uint8ClampedArray !== "undefined" && typedArray instanceof Uint8ClampedArray) ||
		            typedArray instanceof Int16Array ||
		            typedArray instanceof Uint16Array ||
		            typedArray instanceof Int32Array ||
		            typedArray instanceof Uint32Array ||
		            typedArray instanceof Float32Array ||
		            typedArray instanceof Float64Array
		        ) {
		            typedArray = new Uint8Array(typedArray.buffer, typedArray.byteOffset, typedArray.byteLength);
		        }
	
		        // Handle Uint8Array
		        if (typedArray instanceof Uint8Array) {
		            // Shortcut
		            var typedArrayByteLength = typedArray.byteLength;
	
		            // Extract bytes
		            var words = [];
		            for (var i = 0; i < typedArrayByteLength; i++) {
		                words[i >>> 2] |= typedArray[i] << (24 - (i % 4) * 8);
		            }
	
		            // Initialize this word array
		            superInit.call(this, words, typedArrayByteLength);
		        } else {
		            // Else call normal init
		            superInit.apply(this, arguments);
		        }
		    };
	
		    subInit.prototype = WordArray;
		}());
	
	
		return CryptoJS.lib.WordArray;
	
	}));

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

	;(function (root, factory) {
		if (true) {
			// CommonJS
			module.exports = exports = factory(__webpack_require__(28));
		}
		else if (typeof define === "function" && define.amd) {
			// AMD
			define(["./core"], factory);
		}
		else {
			// Global (browser)
			factory(root.CryptoJS);
		}
	}(this, function (CryptoJS) {
	
		(function () {
		    // Shortcuts
		    var C = CryptoJS;
		    var C_lib = C.lib;
		    var WordArray = C_lib.WordArray;
		    var C_enc = C.enc;
	
		    /**
		     * UTF-16 BE encoding strategy.
		     */
		    var Utf16BE = C_enc.Utf16 = C_enc.Utf16BE = {
		        /**
		         * Converts a word array to a UTF-16 BE string.
		         *
		         * @param {WordArray} wordArray The word array.
		         *
		         * @return {string} The UTF-16 BE string.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var utf16String = CryptoJS.enc.Utf16.stringify(wordArray);
		         */
		        stringify: function (wordArray) {
		            // Shortcuts
		            var words = wordArray.words;
		            var sigBytes = wordArray.sigBytes;
	
		            // Convert
		            var utf16Chars = [];
		            for (var i = 0; i < sigBytes; i += 2) {
		                var codePoint = (words[i >>> 2] >>> (16 - (i % 4) * 8)) & 0xffff;
		                utf16Chars.push(String.fromCharCode(codePoint));
		            }
	
		            return utf16Chars.join('');
		        },
	
		        /**
		         * Converts a UTF-16 BE string to a word array.
		         *
		         * @param {string} utf16Str The UTF-16 BE string.
		         *
		         * @return {WordArray} The word array.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var wordArray = CryptoJS.enc.Utf16.parse(utf16String);
		         */
		        parse: function (utf16Str) {
		            // Shortcut
		            var utf16StrLength = utf16Str.length;
	
		            // Convert
		            var words = [];
		            for (var i = 0; i < utf16StrLength; i++) {
		                words[i >>> 1] |= utf16Str.charCodeAt(i) << (16 - (i % 2) * 16);
		            }
	
		            return WordArray.create(words, utf16StrLength * 2);
		        }
		    };
	
		    /**
		     * UTF-16 LE encoding strategy.
		     */
		    C_enc.Utf16LE = {
		        /**
		         * Converts a word array to a UTF-16 LE string.
		         *
		         * @param {WordArray} wordArray The word array.
		         *
		         * @return {string} The UTF-16 LE string.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var utf16Str = CryptoJS.enc.Utf16LE.stringify(wordArray);
		         */
		        stringify: function (wordArray) {
		            // Shortcuts
		            var words = wordArray.words;
		            var sigBytes = wordArray.sigBytes;
	
		            // Convert
		            var utf16Chars = [];
		            for (var i = 0; i < sigBytes; i += 2) {
		                var codePoint = swapEndian((words[i >>> 2] >>> (16 - (i % 4) * 8)) & 0xffff);
		                utf16Chars.push(String.fromCharCode(codePoint));
		            }
	
		            return utf16Chars.join('');
		        },
	
		        /**
		         * Converts a UTF-16 LE string to a word array.
		         *
		         * @param {string} utf16Str The UTF-16 LE string.
		         *
		         * @return {WordArray} The word array.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var wordArray = CryptoJS.enc.Utf16LE.parse(utf16Str);
		         */
		        parse: function (utf16Str) {
		            // Shortcut
		            var utf16StrLength = utf16Str.length;
	
		            // Convert
		            var words = [];
		            for (var i = 0; i < utf16StrLength; i++) {
		                words[i >>> 1] |= swapEndian(utf16Str.charCodeAt(i) << (16 - (i % 2) * 16));
		            }
	
		            return WordArray.create(words, utf16StrLength * 2);
		        }
		    };
	
		    function swapEndian(word) {
		        return ((word << 8) & 0xff00ff00) | ((word >>> 8) & 0x00ff00ff);
		    }
		}());
	
	
		return CryptoJS.enc.Utf16;
	
	}));

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

	;(function (root, factory) {
		if (true) {
			// CommonJS
			module.exports = exports = factory(__webpack_require__(28));
		}
		else if (typeof define === "function" && define.amd) {
			// AMD
			define(["./core"], factory);
		}
		else {
			// Global (browser)
			factory(root.CryptoJS);
		}
	}(this, function (CryptoJS) {
	
		(function () {
		    // Shortcuts
		    var C = CryptoJS;
		    var C_lib = C.lib;
		    var WordArray = C_lib.WordArray;
		    var C_enc = C.enc;
	
		    /**
		     * Base64 encoding strategy.
		     */
		    var Base64 = C_enc.Base64 = {
		        /**
		         * Converts a word array to a Base64 string.
		         *
		         * @param {WordArray} wordArray The word array.
		         *
		         * @return {string} The Base64 string.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var base64String = CryptoJS.enc.Base64.stringify(wordArray);
		         */
		        stringify: function (wordArray) {
		            // Shortcuts
		            var words = wordArray.words;
		            var sigBytes = wordArray.sigBytes;
		            var map = this._map;
	
		            // Clamp excess bits
		            wordArray.clamp();
	
		            // Convert
		            var base64Chars = [];
		            for (var i = 0; i < sigBytes; i += 3) {
		                var byte1 = (words[i >>> 2]       >>> (24 - (i % 4) * 8))       & 0xff;
		                var byte2 = (words[(i + 1) >>> 2] >>> (24 - ((i + 1) % 4) * 8)) & 0xff;
		                var byte3 = (words[(i + 2) >>> 2] >>> (24 - ((i + 2) % 4) * 8)) & 0xff;
	
		                var triplet = (byte1 << 16) | (byte2 << 8) | byte3;
	
		                for (var j = 0; (j < 4) && (i + j * 0.75 < sigBytes); j++) {
		                    base64Chars.push(map.charAt((triplet >>> (6 * (3 - j))) & 0x3f));
		                }
		            }
	
		            // Add padding
		            var paddingChar = map.charAt(64);
		            if (paddingChar) {
		                while (base64Chars.length % 4) {
		                    base64Chars.push(paddingChar);
		                }
		            }
	
		            return base64Chars.join('');
		        },
	
		        /**
		         * Converts a Base64 string to a word array.
		         *
		         * @param {string} base64Str The Base64 string.
		         *
		         * @return {WordArray} The word array.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var wordArray = CryptoJS.enc.Base64.parse(base64String);
		         */
		        parse: function (base64Str) {
		            // Shortcuts
		            var base64StrLength = base64Str.length;
		            var map = this._map;
		            var reverseMap = this._reverseMap;
	
		            if (!reverseMap) {
		                    reverseMap = this._reverseMap = [];
		                    for (var j = 0; j < map.length; j++) {
		                        reverseMap[map.charCodeAt(j)] = j;
		                    }
		            }
	
		            // Ignore padding
		            var paddingChar = map.charAt(64);
		            if (paddingChar) {
		                var paddingIndex = base64Str.indexOf(paddingChar);
		                if (paddingIndex !== -1) {
		                    base64StrLength = paddingIndex;
		                }
		            }
	
		            // Convert
		            return parseLoop(base64Str, base64StrLength, reverseMap);
	
		        },
	
		        _map: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
		    };
	
		    function parseLoop(base64Str, base64StrLength, reverseMap) {
		      var words = [];
		      var nBytes = 0;
		      for (var i = 0; i < base64StrLength; i++) {
		          if (i % 4) {
		              var bits1 = reverseMap[base64Str.charCodeAt(i - 1)] << ((i % 4) * 2);
		              var bits2 = reverseMap[base64Str.charCodeAt(i)] >>> (6 - (i % 4) * 2);
		              words[nBytes >>> 2] |= (bits1 | bits2) << (24 - (nBytes % 4) * 8);
		              nBytes++;
		          }
		      }
		      return WordArray.create(words, nBytes);
		    }
		}());
	
	
		return CryptoJS.enc.Base64;
	
	}));

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

	;(function (root, factory) {
		if (true) {
			// CommonJS
			module.exports = exports = factory(__webpack_require__(28));
		}
		else if (typeof define === "function" && define.amd) {
			// AMD
			define(["./core"], factory);
		}
		else {
			// Global (browser)
			factory(root.CryptoJS);
		}
	}(this, function (CryptoJS) {
	
		(function (Math) {
		    // Shortcuts
		    var C = CryptoJS;
		    var C_lib = C.lib;
		    var WordArray = C_lib.WordArray;
		    var Hasher = C_lib.Hasher;
		    var C_algo = C.algo;
	
		    // Constants table
		    var T = [];
	
		    // Compute constants
		    (function () {
		        for (var i = 0; i < 64; i++) {
		            T[i] = (Math.abs(Math.sin(i + 1)) * 0x100000000) | 0;
		        }
		    }());
	
		    /**
		     * MD5 hash algorithm.
		     */
		    var MD5 = C_algo.MD5 = Hasher.extend({
		        _doReset: function () {
		            this._hash = new WordArray.init([
		                0x67452301, 0xefcdab89,
		                0x98badcfe, 0x10325476
		            ]);
		        },
	
		        _doProcessBlock: function (M, offset) {
		            // Swap endian
		            for (var i = 0; i < 16; i++) {
		                // Shortcuts
		                var offset_i = offset + i;
		                var M_offset_i = M[offset_i];
	
		                M[offset_i] = (
		                    (((M_offset_i << 8)  | (M_offset_i >>> 24)) & 0x00ff00ff) |
		                    (((M_offset_i << 24) | (M_offset_i >>> 8))  & 0xff00ff00)
		                );
		            }
	
		            // Shortcuts
		            var H = this._hash.words;
	
		            var M_offset_0  = M[offset + 0];
		            var M_offset_1  = M[offset + 1];
		            var M_offset_2  = M[offset + 2];
		            var M_offset_3  = M[offset + 3];
		            var M_offset_4  = M[offset + 4];
		            var M_offset_5  = M[offset + 5];
		            var M_offset_6  = M[offset + 6];
		            var M_offset_7  = M[offset + 7];
		            var M_offset_8  = M[offset + 8];
		            var M_offset_9  = M[offset + 9];
		            var M_offset_10 = M[offset + 10];
		            var M_offset_11 = M[offset + 11];
		            var M_offset_12 = M[offset + 12];
		            var M_offset_13 = M[offset + 13];
		            var M_offset_14 = M[offset + 14];
		            var M_offset_15 = M[offset + 15];
	
		            // Working varialbes
		            var a = H[0];
		            var b = H[1];
		            var c = H[2];
		            var d = H[3];
	
		            // Computation
		            a = FF(a, b, c, d, M_offset_0,  7,  T[0]);
		            d = FF(d, a, b, c, M_offset_1,  12, T[1]);
		            c = FF(c, d, a, b, M_offset_2,  17, T[2]);
		            b = FF(b, c, d, a, M_offset_3,  22, T[3]);
		            a = FF(a, b, c, d, M_offset_4,  7,  T[4]);
		            d = FF(d, a, b, c, M_offset_5,  12, T[5]);
		            c = FF(c, d, a, b, M_offset_6,  17, T[6]);
		            b = FF(b, c, d, a, M_offset_7,  22, T[7]);
		            a = FF(a, b, c, d, M_offset_8,  7,  T[8]);
		            d = FF(d, a, b, c, M_offset_9,  12, T[9]);
		            c = FF(c, d, a, b, M_offset_10, 17, T[10]);
		            b = FF(b, c, d, a, M_offset_11, 22, T[11]);
		            a = FF(a, b, c, d, M_offset_12, 7,  T[12]);
		            d = FF(d, a, b, c, M_offset_13, 12, T[13]);
		            c = FF(c, d, a, b, M_offset_14, 17, T[14]);
		            b = FF(b, c, d, a, M_offset_15, 22, T[15]);
	
		            a = GG(a, b, c, d, M_offset_1,  5,  T[16]);
		            d = GG(d, a, b, c, M_offset_6,  9,  T[17]);
		            c = GG(c, d, a, b, M_offset_11, 14, T[18]);
		            b = GG(b, c, d, a, M_offset_0,  20, T[19]);
		            a = GG(a, b, c, d, M_offset_5,  5,  T[20]);
		            d = GG(d, a, b, c, M_offset_10, 9,  T[21]);
		            c = GG(c, d, a, b, M_offset_15, 14, T[22]);
		            b = GG(b, c, d, a, M_offset_4,  20, T[23]);
		            a = GG(a, b, c, d, M_offset_9,  5,  T[24]);
		            d = GG(d, a, b, c, M_offset_14, 9,  T[25]);
		            c = GG(c, d, a, b, M_offset_3,  14, T[26]);
		            b = GG(b, c, d, a, M_offset_8,  20, T[27]);
		            a = GG(a, b, c, d, M_offset_13, 5,  T[28]);
		            d = GG(d, a, b, c, M_offset_2,  9,  T[29]);
		            c = GG(c, d, a, b, M_offset_7,  14, T[30]);
		            b = GG(b, c, d, a, M_offset_12, 20, T[31]);
	
		            a = HH(a, b, c, d, M_offset_5,  4,  T[32]);
		            d = HH(d, a, b, c, M_offset_8,  11, T[33]);
		            c = HH(c, d, a, b, M_offset_11, 16, T[34]);
		            b = HH(b, c, d, a, M_offset_14, 23, T[35]);
		            a = HH(a, b, c, d, M_offset_1,  4,  T[36]);
		            d = HH(d, a, b, c, M_offset_4,  11, T[37]);
		            c = HH(c, d, a, b, M_offset_7,  16, T[38]);
		            b = HH(b, c, d, a, M_offset_10, 23, T[39]);
		            a = HH(a, b, c, d, M_offset_13, 4,  T[40]);
		            d = HH(d, a, b, c, M_offset_0,  11, T[41]);
		            c = HH(c, d, a, b, M_offset_3,  16, T[42]);
		            b = HH(b, c, d, a, M_offset_6,  23, T[43]);
		            a = HH(a, b, c, d, M_offset_9,  4,  T[44]);
		            d = HH(d, a, b, c, M_offset_12, 11, T[45]);
		            c = HH(c, d, a, b, M_offset_15, 16, T[46]);
		            b = HH(b, c, d, a, M_offset_2,  23, T[47]);
	
		            a = II(a, b, c, d, M_offset_0,  6,  T[48]);
		            d = II(d, a, b, c, M_offset_7,  10, T[49]);
		            c = II(c, d, a, b, M_offset_14, 15, T[50]);
		            b = II(b, c, d, a, M_offset_5,  21, T[51]);
		            a = II(a, b, c, d, M_offset_12, 6,  T[52]);
		            d = II(d, a, b, c, M_offset_3,  10, T[53]);
		            c = II(c, d, a, b, M_offset_10, 15, T[54]);
		            b = II(b, c, d, a, M_offset_1,  21, T[55]);
		            a = II(a, b, c, d, M_offset_8,  6,  T[56]);
		            d = II(d, a, b, c, M_offset_15, 10, T[57]);
		            c = II(c, d, a, b, M_offset_6,  15, T[58]);
		            b = II(b, c, d, a, M_offset_13, 21, T[59]);
		            a = II(a, b, c, d, M_offset_4,  6,  T[60]);
		            d = II(d, a, b, c, M_offset_11, 10, T[61]);
		            c = II(c, d, a, b, M_offset_2,  15, T[62]);
		            b = II(b, c, d, a, M_offset_9,  21, T[63]);
	
		            // Intermediate hash value
		            H[0] = (H[0] + a) | 0;
		            H[1] = (H[1] + b) | 0;
		            H[2] = (H[2] + c) | 0;
		            H[3] = (H[3] + d) | 0;
		        },
	
		        _doFinalize: function () {
		            // Shortcuts
		            var data = this._data;
		            var dataWords = data.words;
	
		            var nBitsTotal = this._nDataBytes * 8;
		            var nBitsLeft = data.sigBytes * 8;
	
		            // Add padding
		            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
	
		            var nBitsTotalH = Math.floor(nBitsTotal / 0x100000000);
		            var nBitsTotalL = nBitsTotal;
		            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = (
		                (((nBitsTotalH << 8)  | (nBitsTotalH >>> 24)) & 0x00ff00ff) |
		                (((nBitsTotalH << 24) | (nBitsTotalH >>> 8))  & 0xff00ff00)
		            );
		            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = (
		                (((nBitsTotalL << 8)  | (nBitsTotalL >>> 24)) & 0x00ff00ff) |
		                (((nBitsTotalL << 24) | (nBitsTotalL >>> 8))  & 0xff00ff00)
		            );
	
		            data.sigBytes = (dataWords.length + 1) * 4;
	
		            // Hash final blocks
		            this._process();
	
		            // Shortcuts
		            var hash = this._hash;
		            var H = hash.words;
	
		            // Swap endian
		            for (var i = 0; i < 4; i++) {
		                // Shortcut
		                var H_i = H[i];
	
		                H[i] = (((H_i << 8)  | (H_i >>> 24)) & 0x00ff00ff) |
		                       (((H_i << 24) | (H_i >>> 8))  & 0xff00ff00);
		            }
	
		            // Return final computed hash
		            return hash;
		        },
	
		        clone: function () {
		            var clone = Hasher.clone.call(this);
		            clone._hash = this._hash.clone();
	
		            return clone;
		        }
		    });
	
		    function FF(a, b, c, d, x, s, t) {
		        var n = a + ((b & c) | (~b & d)) + x + t;
		        return ((n << s) | (n >>> (32 - s))) + b;
		    }
	
		    function GG(a, b, c, d, x, s, t) {
		        var n = a + ((b & d) | (c & ~d)) + x + t;
		        return ((n << s) | (n >>> (32 - s))) + b;
		    }
	
		    function HH(a, b, c, d, x, s, t) {
		        var n = a + (b ^ c ^ d) + x + t;
		        return ((n << s) | (n >>> (32 - s))) + b;
		    }
	
		    function II(a, b, c, d, x, s, t) {
		        var n = a + (c ^ (b | ~d)) + x + t;
		        return ((n << s) | (n >>> (32 - s))) + b;
		    }
	
		    /**
		     * Shortcut function to the hasher's object interface.
		     *
		     * @param {WordArray|string} message The message to hash.
		     *
		     * @return {WordArray} The hash.
		     *
		     * @static
		     *
		     * @example
		     *
		     *     var hash = CryptoJS.MD5('message');
		     *     var hash = CryptoJS.MD5(wordArray);
		     */
		    C.MD5 = Hasher._createHelper(MD5);
	
		    /**
		     * Shortcut function to the HMAC's object interface.
		     *
		     * @param {WordArray|string} message The message to hash.
		     * @param {WordArray|string} key The secret key.
		     *
		     * @return {WordArray} The HMAC.
		     *
		     * @static
		     *
		     * @example
		     *
		     *     var hmac = CryptoJS.HmacMD5(message, key);
		     */
		    C.HmacMD5 = Hasher._createHmacHelper(MD5);
		}(Math));
	
	
		return CryptoJS.MD5;
	
	}));

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

	;(function (root, factory) {
		if (true) {
			// CommonJS
			module.exports = exports = factory(__webpack_require__(28));
		}
		else if (typeof define === "function" && define.amd) {
			// AMD
			define(["./core"], factory);
		}
		else {
			// Global (browser)
			factory(root.CryptoJS);
		}
	}(this, function (CryptoJS) {
	
		(function () {
		    // Shortcuts
		    var C = CryptoJS;
		    var C_lib = C.lib;
		    var WordArray = C_lib.WordArray;
		    var Hasher = C_lib.Hasher;
		    var C_algo = C.algo;
	
		    // Reusable object
		    var W = [];
	
		    /**
		     * SHA-1 hash algorithm.
		     */
		    var SHA1 = C_algo.SHA1 = Hasher.extend({
		        _doReset: function () {
		            this._hash = new WordArray.init([
		                0x67452301, 0xefcdab89,
		                0x98badcfe, 0x10325476,
		                0xc3d2e1f0
		            ]);
		        },
	
		        _doProcessBlock: function (M, offset) {
		            // Shortcut
		            var H = this._hash.words;
	
		            // Working variables
		            var a = H[0];
		            var b = H[1];
		            var c = H[2];
		            var d = H[3];
		            var e = H[4];
	
		            // Computation
		            for (var i = 0; i < 80; i++) {
		                if (i < 16) {
		                    W[i] = M[offset + i] | 0;
		                } else {
		                    var n = W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16];
		                    W[i] = (n << 1) | (n >>> 31);
		                }
	
		                var t = ((a << 5) | (a >>> 27)) + e + W[i];
		                if (i < 20) {
		                    t += ((b & c) | (~b & d)) + 0x5a827999;
		                } else if (i < 40) {
		                    t += (b ^ c ^ d) + 0x6ed9eba1;
		                } else if (i < 60) {
		                    t += ((b & c) | (b & d) | (c & d)) - 0x70e44324;
		                } else /* if (i < 80) */ {
		                    t += (b ^ c ^ d) - 0x359d3e2a;
		                }
	
		                e = d;
		                d = c;
		                c = (b << 30) | (b >>> 2);
		                b = a;
		                a = t;
		            }
	
		            // Intermediate hash value
		            H[0] = (H[0] + a) | 0;
		            H[1] = (H[1] + b) | 0;
		            H[2] = (H[2] + c) | 0;
		            H[3] = (H[3] + d) | 0;
		            H[4] = (H[4] + e) | 0;
		        },
	
		        _doFinalize: function () {
		            // Shortcuts
		            var data = this._data;
		            var dataWords = data.words;
	
		            var nBitsTotal = this._nDataBytes * 8;
		            var nBitsLeft = data.sigBytes * 8;
	
		            // Add padding
		            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
		            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = Math.floor(nBitsTotal / 0x100000000);
		            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = nBitsTotal;
		            data.sigBytes = dataWords.length * 4;
	
		            // Hash final blocks
		            this._process();
	
		            // Return final computed hash
		            return this._hash;
		        },
	
		        clone: function () {
		            var clone = Hasher.clone.call(this);
		            clone._hash = this._hash.clone();
	
		            return clone;
		        }
		    });
	
		    /**
		     * Shortcut function to the hasher's object interface.
		     *
		     * @param {WordArray|string} message The message to hash.
		     *
		     * @return {WordArray} The hash.
		     *
		     * @static
		     *
		     * @example
		     *
		     *     var hash = CryptoJS.SHA1('message');
		     *     var hash = CryptoJS.SHA1(wordArray);
		     */
		    C.SHA1 = Hasher._createHelper(SHA1);
	
		    /**
		     * Shortcut function to the HMAC's object interface.
		     *
		     * @param {WordArray|string} message The message to hash.
		     * @param {WordArray|string} key The secret key.
		     *
		     * @return {WordArray} The HMAC.
		     *
		     * @static
		     *
		     * @example
		     *
		     *     var hmac = CryptoJS.HmacSHA1(message, key);
		     */
		    C.HmacSHA1 = Hasher._createHmacHelper(SHA1);
		}());
	
	
		return CryptoJS.SHA1;
	
	}));

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

	;(function (root, factory) {
		if (true) {
			// CommonJS
			module.exports = exports = factory(__webpack_require__(28));
		}
		else if (typeof define === "function" && define.amd) {
			// AMD
			define(["./core"], factory);
		}
		else {
			// Global (browser)
			factory(root.CryptoJS);
		}
	}(this, function (CryptoJS) {
	
		(function (Math) {
		    // Shortcuts
		    var C = CryptoJS;
		    var C_lib = C.lib;
		    var WordArray = C_lib.WordArray;
		    var Hasher = C_lib.Hasher;
		    var C_algo = C.algo;
	
		    // Initialization and round constants tables
		    var H = [];
		    var K = [];
	
		    // Compute constants
		    (function () {
		        function isPrime(n) {
		            var sqrtN = Math.sqrt(n);
		            for (var factor = 2; factor <= sqrtN; factor++) {
		                if (!(n % factor)) {
		                    return false;
		                }
		            }
	
		            return true;
		        }
	
		        function getFractionalBits(n) {
		            return ((n - (n | 0)) * 0x100000000) | 0;
		        }
	
		        var n = 2;
		        var nPrime = 0;
		        while (nPrime < 64) {
		            if (isPrime(n)) {
		                if (nPrime < 8) {
		                    H[nPrime] = getFractionalBits(Math.pow(n, 1 / 2));
		                }
		                K[nPrime] = getFractionalBits(Math.pow(n, 1 / 3));
	
		                nPrime++;
		            }
	
		            n++;
		        }
		    }());
	
		    // Reusable object
		    var W = [];
	
		    /**
		     * SHA-256 hash algorithm.
		     */
		    var SHA256 = C_algo.SHA256 = Hasher.extend({
		        _doReset: function () {
		            this._hash = new WordArray.init(H.slice(0));
		        },
	
		        _doProcessBlock: function (M, offset) {
		            // Shortcut
		            var H = this._hash.words;
	
		            // Working variables
		            var a = H[0];
		            var b = H[1];
		            var c = H[2];
		            var d = H[3];
		            var e = H[4];
		            var f = H[5];
		            var g = H[6];
		            var h = H[7];
	
		            // Computation
		            for (var i = 0; i < 64; i++) {
		                if (i < 16) {
		                    W[i] = M[offset + i] | 0;
		                } else {
		                    var gamma0x = W[i - 15];
		                    var gamma0  = ((gamma0x << 25) | (gamma0x >>> 7))  ^
		                                  ((gamma0x << 14) | (gamma0x >>> 18)) ^
		                                   (gamma0x >>> 3);
	
		                    var gamma1x = W[i - 2];
		                    var gamma1  = ((gamma1x << 15) | (gamma1x >>> 17)) ^
		                                  ((gamma1x << 13) | (gamma1x >>> 19)) ^
		                                   (gamma1x >>> 10);
	
		                    W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];
		                }
	
		                var ch  = (e & f) ^ (~e & g);
		                var maj = (a & b) ^ (a & c) ^ (b & c);
	
		                var sigma0 = ((a << 30) | (a >>> 2)) ^ ((a << 19) | (a >>> 13)) ^ ((a << 10) | (a >>> 22));
		                var sigma1 = ((e << 26) | (e >>> 6)) ^ ((e << 21) | (e >>> 11)) ^ ((e << 7)  | (e >>> 25));
	
		                var t1 = h + sigma1 + ch + K[i] + W[i];
		                var t2 = sigma0 + maj;
	
		                h = g;
		                g = f;
		                f = e;
		                e = (d + t1) | 0;
		                d = c;
		                c = b;
		                b = a;
		                a = (t1 + t2) | 0;
		            }
	
		            // Intermediate hash value
		            H[0] = (H[0] + a) | 0;
		            H[1] = (H[1] + b) | 0;
		            H[2] = (H[2] + c) | 0;
		            H[3] = (H[3] + d) | 0;
		            H[4] = (H[4] + e) | 0;
		            H[5] = (H[5] + f) | 0;
		            H[6] = (H[6] + g) | 0;
		            H[7] = (H[7] + h) | 0;
		        },
	
		        _doFinalize: function () {
		            // Shortcuts
		            var data = this._data;
		            var dataWords = data.words;
	
		            var nBitsTotal = this._nDataBytes * 8;
		            var nBitsLeft = data.sigBytes * 8;
	
		            // Add padding
		            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
		            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = Math.floor(nBitsTotal / 0x100000000);
		            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = nBitsTotal;
		            data.sigBytes = dataWords.length * 4;
	
		            // Hash final blocks
		            this._process();
	
		            // Return final computed hash
		            return this._hash;
		        },
	
		        clone: function () {
		            var clone = Hasher.clone.call(this);
		            clone._hash = this._hash.clone();
	
		            return clone;
		        }
		    });
	
		    /**
		     * Shortcut function to the hasher's object interface.
		     *
		     * @param {WordArray|string} message The message to hash.
		     *
		     * @return {WordArray} The hash.
		     *
		     * @static
		     *
		     * @example
		     *
		     *     var hash = CryptoJS.SHA256('message');
		     *     var hash = CryptoJS.SHA256(wordArray);
		     */
		    C.SHA256 = Hasher._createHelper(SHA256);
	
		    /**
		     * Shortcut function to the HMAC's object interface.
		     *
		     * @param {WordArray|string} message The message to hash.
		     * @param {WordArray|string} key The secret key.
		     *
		     * @return {WordArray} The HMAC.
		     *
		     * @static
		     *
		     * @example
		     *
		     *     var hmac = CryptoJS.HmacSHA256(message, key);
		     */
		    C.HmacSHA256 = Hasher._createHmacHelper(SHA256);
		}(Math));
	
	
		return CryptoJS.SHA256;
	
	}));

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

	;(function (root, factory, undef) {
		if (true) {
			// CommonJS
			module.exports = exports = factory(__webpack_require__(28), __webpack_require__(35));
		}
		else if (typeof define === "function" && define.amd) {
			// AMD
			define(["./core", "./sha256"], factory);
		}
		else {
			// Global (browser)
			factory(root.CryptoJS);
		}
	}(this, function (CryptoJS) {
	
		(function () {
		    // Shortcuts
		    var C = CryptoJS;
		    var C_lib = C.lib;
		    var WordArray = C_lib.WordArray;
		    var C_algo = C.algo;
		    var SHA256 = C_algo.SHA256;
	
		    /**
		     * SHA-224 hash algorithm.
		     */
		    var SHA224 = C_algo.SHA224 = SHA256.extend({
		        _doReset: function () {
		            this._hash = new WordArray.init([
		                0xc1059ed8, 0x367cd507, 0x3070dd17, 0xf70e5939,
		                0xffc00b31, 0x68581511, 0x64f98fa7, 0xbefa4fa4
		            ]);
		        },
	
		        _doFinalize: function () {
		            var hash = SHA256._doFinalize.call(this);
	
		            hash.sigBytes -= 4;
	
		            return hash;
		        }
		    });
	
		    /**
		     * Shortcut function to the hasher's object interface.
		     *
		     * @param {WordArray|string} message The message to hash.
		     *
		     * @return {WordArray} The hash.
		     *
		     * @static
		     *
		     * @example
		     *
		     *     var hash = CryptoJS.SHA224('message');
		     *     var hash = CryptoJS.SHA224(wordArray);
		     */
		    C.SHA224 = SHA256._createHelper(SHA224);
	
		    /**
		     * Shortcut function to the HMAC's object interface.
		     *
		     * @param {WordArray|string} message The message to hash.
		     * @param {WordArray|string} key The secret key.
		     *
		     * @return {WordArray} The HMAC.
		     *
		     * @static
		     *
		     * @example
		     *
		     *     var hmac = CryptoJS.HmacSHA224(message, key);
		     */
		    C.HmacSHA224 = SHA256._createHmacHelper(SHA224);
		}());
	
	
		return CryptoJS.SHA224;
	
	}));

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

	;(function (root, factory, undef) {
		if (true) {
			// CommonJS
			module.exports = exports = factory(__webpack_require__(28), __webpack_require__(29));
		}
		else if (typeof define === "function" && define.amd) {
			// AMD
			define(["./core", "./x64-core"], factory);
		}
		else {
			// Global (browser)
			factory(root.CryptoJS);
		}
	}(this, function (CryptoJS) {
	
		(function () {
		    // Shortcuts
		    var C = CryptoJS;
		    var C_lib = C.lib;
		    var Hasher = C_lib.Hasher;
		    var C_x64 = C.x64;
		    var X64Word = C_x64.Word;
		    var X64WordArray = C_x64.WordArray;
		    var C_algo = C.algo;
	
		    function X64Word_create() {
		        return X64Word.create.apply(X64Word, arguments);
		    }
	
		    // Constants
		    var K = [
		        X64Word_create(0x428a2f98, 0xd728ae22), X64Word_create(0x71374491, 0x23ef65cd),
		        X64Word_create(0xb5c0fbcf, 0xec4d3b2f), X64Word_create(0xe9b5dba5, 0x8189dbbc),
		        X64Word_create(0x3956c25b, 0xf348b538), X64Word_create(0x59f111f1, 0xb605d019),
		        X64Word_create(0x923f82a4, 0xaf194f9b), X64Word_create(0xab1c5ed5, 0xda6d8118),
		        X64Word_create(0xd807aa98, 0xa3030242), X64Word_create(0x12835b01, 0x45706fbe),
		        X64Word_create(0x243185be, 0x4ee4b28c), X64Word_create(0x550c7dc3, 0xd5ffb4e2),
		        X64Word_create(0x72be5d74, 0xf27b896f), X64Word_create(0x80deb1fe, 0x3b1696b1),
		        X64Word_create(0x9bdc06a7, 0x25c71235), X64Word_create(0xc19bf174, 0xcf692694),
		        X64Word_create(0xe49b69c1, 0x9ef14ad2), X64Word_create(0xefbe4786, 0x384f25e3),
		        X64Word_create(0x0fc19dc6, 0x8b8cd5b5), X64Word_create(0x240ca1cc, 0x77ac9c65),
		        X64Word_create(0x2de92c6f, 0x592b0275), X64Word_create(0x4a7484aa, 0x6ea6e483),
		        X64Word_create(0x5cb0a9dc, 0xbd41fbd4), X64Word_create(0x76f988da, 0x831153b5),
		        X64Word_create(0x983e5152, 0xee66dfab), X64Word_create(0xa831c66d, 0x2db43210),
		        X64Word_create(0xb00327c8, 0x98fb213f), X64Word_create(0xbf597fc7, 0xbeef0ee4),
		        X64Word_create(0xc6e00bf3, 0x3da88fc2), X64Word_create(0xd5a79147, 0x930aa725),
		        X64Word_create(0x06ca6351, 0xe003826f), X64Word_create(0x14292967, 0x0a0e6e70),
		        X64Word_create(0x27b70a85, 0x46d22ffc), X64Word_create(0x2e1b2138, 0x5c26c926),
		        X64Word_create(0x4d2c6dfc, 0x5ac42aed), X64Word_create(0x53380d13, 0x9d95b3df),
		        X64Word_create(0x650a7354, 0x8baf63de), X64Word_create(0x766a0abb, 0x3c77b2a8),
		        X64Word_create(0x81c2c92e, 0x47edaee6), X64Word_create(0x92722c85, 0x1482353b),
		        X64Word_create(0xa2bfe8a1, 0x4cf10364), X64Word_create(0xa81a664b, 0xbc423001),
		        X64Word_create(0xc24b8b70, 0xd0f89791), X64Word_create(0xc76c51a3, 0x0654be30),
		        X64Word_create(0xd192e819, 0xd6ef5218), X64Word_create(0xd6990624, 0x5565a910),
		        X64Word_create(0xf40e3585, 0x5771202a), X64Word_create(0x106aa070, 0x32bbd1b8),
		        X64Word_create(0x19a4c116, 0xb8d2d0c8), X64Word_create(0x1e376c08, 0x5141ab53),
		        X64Word_create(0x2748774c, 0xdf8eeb99), X64Word_create(0x34b0bcb5, 0xe19b48a8),
		        X64Word_create(0x391c0cb3, 0xc5c95a63), X64Word_create(0x4ed8aa4a, 0xe3418acb),
		        X64Word_create(0x5b9cca4f, 0x7763e373), X64Word_create(0x682e6ff3, 0xd6b2b8a3),
		        X64Word_create(0x748f82ee, 0x5defb2fc), X64Word_create(0x78a5636f, 0x43172f60),
		        X64Word_create(0x84c87814, 0xa1f0ab72), X64Word_create(0x8cc70208, 0x1a6439ec),
		        X64Word_create(0x90befffa, 0x23631e28), X64Word_create(0xa4506ceb, 0xde82bde9),
		        X64Word_create(0xbef9a3f7, 0xb2c67915), X64Word_create(0xc67178f2, 0xe372532b),
		        X64Word_create(0xca273ece, 0xea26619c), X64Word_create(0xd186b8c7, 0x21c0c207),
		        X64Word_create(0xeada7dd6, 0xcde0eb1e), X64Word_create(0xf57d4f7f, 0xee6ed178),
		        X64Word_create(0x06f067aa, 0x72176fba), X64Word_create(0x0a637dc5, 0xa2c898a6),
		        X64Word_create(0x113f9804, 0xbef90dae), X64Word_create(0x1b710b35, 0x131c471b),
		        X64Word_create(0x28db77f5, 0x23047d84), X64Word_create(0x32caab7b, 0x40c72493),
		        X64Word_create(0x3c9ebe0a, 0x15c9bebc), X64Word_create(0x431d67c4, 0x9c100d4c),
		        X64Word_create(0x4cc5d4be, 0xcb3e42b6), X64Word_create(0x597f299c, 0xfc657e2a),
		        X64Word_create(0x5fcb6fab, 0x3ad6faec), X64Word_create(0x6c44198c, 0x4a475817)
		    ];
	
		    // Reusable objects
		    var W = [];
		    (function () {
		        for (var i = 0; i < 80; i++) {
		            W[i] = X64Word_create();
		        }
		    }());
	
		    /**
		     * SHA-512 hash algorithm.
		     */
		    var SHA512 = C_algo.SHA512 = Hasher.extend({
		        _doReset: function () {
		            this._hash = new X64WordArray.init([
		                new X64Word.init(0x6a09e667, 0xf3bcc908), new X64Word.init(0xbb67ae85, 0x84caa73b),
		                new X64Word.init(0x3c6ef372, 0xfe94f82b), new X64Word.init(0xa54ff53a, 0x5f1d36f1),
		                new X64Word.init(0x510e527f, 0xade682d1), new X64Word.init(0x9b05688c, 0x2b3e6c1f),
		                new X64Word.init(0x1f83d9ab, 0xfb41bd6b), new X64Word.init(0x5be0cd19, 0x137e2179)
		            ]);
		        },
	
		        _doProcessBlock: function (M, offset) {
		            // Shortcuts
		            var H = this._hash.words;
	
		            var H0 = H[0];
		            var H1 = H[1];
		            var H2 = H[2];
		            var H3 = H[3];
		            var H4 = H[4];
		            var H5 = H[5];
		            var H6 = H[6];
		            var H7 = H[7];
	
		            var H0h = H0.high;
		            var H0l = H0.low;
		            var H1h = H1.high;
		            var H1l = H1.low;
		            var H2h = H2.high;
		            var H2l = H2.low;
		            var H3h = H3.high;
		            var H3l = H3.low;
		            var H4h = H4.high;
		            var H4l = H4.low;
		            var H5h = H5.high;
		            var H5l = H5.low;
		            var H6h = H6.high;
		            var H6l = H6.low;
		            var H7h = H7.high;
		            var H7l = H7.low;
	
		            // Working variables
		            var ah = H0h;
		            var al = H0l;
		            var bh = H1h;
		            var bl = H1l;
		            var ch = H2h;
		            var cl = H2l;
		            var dh = H3h;
		            var dl = H3l;
		            var eh = H4h;
		            var el = H4l;
		            var fh = H5h;
		            var fl = H5l;
		            var gh = H6h;
		            var gl = H6l;
		            var hh = H7h;
		            var hl = H7l;
	
		            // Rounds
		            for (var i = 0; i < 80; i++) {
		                // Shortcut
		                var Wi = W[i];
	
		                // Extend message
		                if (i < 16) {
		                    var Wih = Wi.high = M[offset + i * 2]     | 0;
		                    var Wil = Wi.low  = M[offset + i * 2 + 1] | 0;
		                } else {
		                    // Gamma0
		                    var gamma0x  = W[i - 15];
		                    var gamma0xh = gamma0x.high;
		                    var gamma0xl = gamma0x.low;
		                    var gamma0h  = ((gamma0xh >>> 1) | (gamma0xl << 31)) ^ ((gamma0xh >>> 8) | (gamma0xl << 24)) ^ (gamma0xh >>> 7);
		                    var gamma0l  = ((gamma0xl >>> 1) | (gamma0xh << 31)) ^ ((gamma0xl >>> 8) | (gamma0xh << 24)) ^ ((gamma0xl >>> 7) | (gamma0xh << 25));
	
		                    // Gamma1
		                    var gamma1x  = W[i - 2];
		                    var gamma1xh = gamma1x.high;
		                    var gamma1xl = gamma1x.low;
		                    var gamma1h  = ((gamma1xh >>> 19) | (gamma1xl << 13)) ^ ((gamma1xh << 3) | (gamma1xl >>> 29)) ^ (gamma1xh >>> 6);
		                    var gamma1l  = ((gamma1xl >>> 19) | (gamma1xh << 13)) ^ ((gamma1xl << 3) | (gamma1xh >>> 29)) ^ ((gamma1xl >>> 6) | (gamma1xh << 26));
	
		                    // W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16]
		                    var Wi7  = W[i - 7];
		                    var Wi7h = Wi7.high;
		                    var Wi7l = Wi7.low;
	
		                    var Wi16  = W[i - 16];
		                    var Wi16h = Wi16.high;
		                    var Wi16l = Wi16.low;
	
		                    var Wil = gamma0l + Wi7l;
		                    var Wih = gamma0h + Wi7h + ((Wil >>> 0) < (gamma0l >>> 0) ? 1 : 0);
		                    var Wil = Wil + gamma1l;
		                    var Wih = Wih + gamma1h + ((Wil >>> 0) < (gamma1l >>> 0) ? 1 : 0);
		                    var Wil = Wil + Wi16l;
		                    var Wih = Wih + Wi16h + ((Wil >>> 0) < (Wi16l >>> 0) ? 1 : 0);
	
		                    Wi.high = Wih;
		                    Wi.low  = Wil;
		                }
	
		                var chh  = (eh & fh) ^ (~eh & gh);
		                var chl  = (el & fl) ^ (~el & gl);
		                var majh = (ah & bh) ^ (ah & ch) ^ (bh & ch);
		                var majl = (al & bl) ^ (al & cl) ^ (bl & cl);
	
		                var sigma0h = ((ah >>> 28) | (al << 4))  ^ ((ah << 30)  | (al >>> 2)) ^ ((ah << 25) | (al >>> 7));
		                var sigma0l = ((al >>> 28) | (ah << 4))  ^ ((al << 30)  | (ah >>> 2)) ^ ((al << 25) | (ah >>> 7));
		                var sigma1h = ((eh >>> 14) | (el << 18)) ^ ((eh >>> 18) | (el << 14)) ^ ((eh << 23) | (el >>> 9));
		                var sigma1l = ((el >>> 14) | (eh << 18)) ^ ((el >>> 18) | (eh << 14)) ^ ((el << 23) | (eh >>> 9));
	
		                // t1 = h + sigma1 + ch + K[i] + W[i]
		                var Ki  = K[i];
		                var Kih = Ki.high;
		                var Kil = Ki.low;
	
		                var t1l = hl + sigma1l;
		                var t1h = hh + sigma1h + ((t1l >>> 0) < (hl >>> 0) ? 1 : 0);
		                var t1l = t1l + chl;
		                var t1h = t1h + chh + ((t1l >>> 0) < (chl >>> 0) ? 1 : 0);
		                var t1l = t1l + Kil;
		                var t1h = t1h + Kih + ((t1l >>> 0) < (Kil >>> 0) ? 1 : 0);
		                var t1l = t1l + Wil;
		                var t1h = t1h + Wih + ((t1l >>> 0) < (Wil >>> 0) ? 1 : 0);
	
		                // t2 = sigma0 + maj
		                var t2l = sigma0l + majl;
		                var t2h = sigma0h + majh + ((t2l >>> 0) < (sigma0l >>> 0) ? 1 : 0);
	
		                // Update working variables
		                hh = gh;
		                hl = gl;
		                gh = fh;
		                gl = fl;
		                fh = eh;
		                fl = el;
		                el = (dl + t1l) | 0;
		                eh = (dh + t1h + ((el >>> 0) < (dl >>> 0) ? 1 : 0)) | 0;
		                dh = ch;
		                dl = cl;
		                ch = bh;
		                cl = bl;
		                bh = ah;
		                bl = al;
		                al = (t1l + t2l) | 0;
		                ah = (t1h + t2h + ((al >>> 0) < (t1l >>> 0) ? 1 : 0)) | 0;
		            }
	
		            // Intermediate hash value
		            H0l = H0.low  = (H0l + al);
		            H0.high = (H0h + ah + ((H0l >>> 0) < (al >>> 0) ? 1 : 0));
		            H1l = H1.low  = (H1l + bl);
		            H1.high = (H1h + bh + ((H1l >>> 0) < (bl >>> 0) ? 1 : 0));
		            H2l = H2.low  = (H2l + cl);
		            H2.high = (H2h + ch + ((H2l >>> 0) < (cl >>> 0) ? 1 : 0));
		            H3l = H3.low  = (H3l + dl);
		            H3.high = (H3h + dh + ((H3l >>> 0) < (dl >>> 0) ? 1 : 0));
		            H4l = H4.low  = (H4l + el);
		            H4.high = (H4h + eh + ((H4l >>> 0) < (el >>> 0) ? 1 : 0));
		            H5l = H5.low  = (H5l + fl);
		            H5.high = (H5h + fh + ((H5l >>> 0) < (fl >>> 0) ? 1 : 0));
		            H6l = H6.low  = (H6l + gl);
		            H6.high = (H6h + gh + ((H6l >>> 0) < (gl >>> 0) ? 1 : 0));
		            H7l = H7.low  = (H7l + hl);
		            H7.high = (H7h + hh + ((H7l >>> 0) < (hl >>> 0) ? 1 : 0));
		        },
	
		        _doFinalize: function () {
		            // Shortcuts
		            var data = this._data;
		            var dataWords = data.words;
	
		            var nBitsTotal = this._nDataBytes * 8;
		            var nBitsLeft = data.sigBytes * 8;
	
		            // Add padding
		            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
		            dataWords[(((nBitsLeft + 128) >>> 10) << 5) + 30] = Math.floor(nBitsTotal / 0x100000000);
		            dataWords[(((nBitsLeft + 128) >>> 10) << 5) + 31] = nBitsTotal;
		            data.sigBytes = dataWords.length * 4;
	
		            // Hash final blocks
		            this._process();
	
		            // Convert hash to 32-bit word array before returning
		            var hash = this._hash.toX32();
	
		            // Return final computed hash
		            return hash;
		        },
	
		        clone: function () {
		            var clone = Hasher.clone.call(this);
		            clone._hash = this._hash.clone();
	
		            return clone;
		        },
	
		        blockSize: 1024/32
		    });
	
		    /**
		     * Shortcut function to the hasher's object interface.
		     *
		     * @param {WordArray|string} message The message to hash.
		     *
		     * @return {WordArray} The hash.
		     *
		     * @static
		     *
		     * @example
		     *
		     *     var hash = CryptoJS.SHA512('message');
		     *     var hash = CryptoJS.SHA512(wordArray);
		     */
		    C.SHA512 = Hasher._createHelper(SHA512);
	
		    /**
		     * Shortcut function to the HMAC's object interface.
		     *
		     * @param {WordArray|string} message The message to hash.
		     * @param {WordArray|string} key The secret key.
		     *
		     * @return {WordArray} The HMAC.
		     *
		     * @static
		     *
		     * @example
		     *
		     *     var hmac = CryptoJS.HmacSHA512(message, key);
		     */
		    C.HmacSHA512 = Hasher._createHmacHelper(SHA512);
		}());
	
	
		return CryptoJS.SHA512;
	
	}));

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

	;(function (root, factory, undef) {
		if (true) {
			// CommonJS
			module.exports = exports = factory(__webpack_require__(28), __webpack_require__(29), __webpack_require__(37));
		}
		else if (typeof define === "function" && define.amd) {
			// AMD
			define(["./core", "./x64-core", "./sha512"], factory);
		}
		else {
			// Global (browser)
			factory(root.CryptoJS);
		}
	}(this, function (CryptoJS) {
	
		(function () {
		    // Shortcuts
		    var C = CryptoJS;
		    var C_x64 = C.x64;
		    var X64Word = C_x64.Word;
		    var X64WordArray = C_x64.WordArray;
		    var C_algo = C.algo;
		    var SHA512 = C_algo.SHA512;
	
		    /**
		     * SHA-384 hash algorithm.
		     */
		    var SHA384 = C_algo.SHA384 = SHA512.extend({
		        _doReset: function () {
		            this._hash = new X64WordArray.init([
		                new X64Word.init(0xcbbb9d5d, 0xc1059ed8), new X64Word.init(0x629a292a, 0x367cd507),
		                new X64Word.init(0x9159015a, 0x3070dd17), new X64Word.init(0x152fecd8, 0xf70e5939),
		                new X64Word.init(0x67332667, 0xffc00b31), new X64Word.init(0x8eb44a87, 0x68581511),
		                new X64Word.init(0xdb0c2e0d, 0x64f98fa7), new X64Word.init(0x47b5481d, 0xbefa4fa4)
		            ]);
		        },
	
		        _doFinalize: function () {
		            var hash = SHA512._doFinalize.call(this);
	
		            hash.sigBytes -= 16;
	
		            return hash;
		        }
		    });
	
		    /**
		     * Shortcut function to the hasher's object interface.
		     *
		     * @param {WordArray|string} message The message to hash.
		     *
		     * @return {WordArray} The hash.
		     *
		     * @static
		     *
		     * @example
		     *
		     *     var hash = CryptoJS.SHA384('message');
		     *     var hash = CryptoJS.SHA384(wordArray);
		     */
		    C.SHA384 = SHA512._createHelper(SHA384);
	
		    /**
		     * Shortcut function to the HMAC's object interface.
		     *
		     * @param {WordArray|string} message The message to hash.
		     * @param {WordArray|string} key The secret key.
		     *
		     * @return {WordArray} The HMAC.
		     *
		     * @static
		     *
		     * @example
		     *
		     *     var hmac = CryptoJS.HmacSHA384(message, key);
		     */
		    C.HmacSHA384 = SHA512._createHmacHelper(SHA384);
		}());
	
	
		return CryptoJS.SHA384;
	
	}));

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

	;(function (root, factory, undef) {
		if (true) {
			// CommonJS
			module.exports = exports = factory(__webpack_require__(28), __webpack_require__(29));
		}
		else if (typeof define === "function" && define.amd) {
			// AMD
			define(["./core", "./x64-core"], factory);
		}
		else {
			// Global (browser)
			factory(root.CryptoJS);
		}
	}(this, function (CryptoJS) {
	
		(function (Math) {
		    // Shortcuts
		    var C = CryptoJS;
		    var C_lib = C.lib;
		    var WordArray = C_lib.WordArray;
		    var Hasher = C_lib.Hasher;
		    var C_x64 = C.x64;
		    var X64Word = C_x64.Word;
		    var C_algo = C.algo;
	
		    // Constants tables
		    var RHO_OFFSETS = [];
		    var PI_INDEXES  = [];
		    var ROUND_CONSTANTS = [];
	
		    // Compute Constants
		    (function () {
		        // Compute rho offset constants
		        var x = 1, y = 0;
		        for (var t = 0; t < 24; t++) {
		            RHO_OFFSETS[x + 5 * y] = ((t + 1) * (t + 2) / 2) % 64;
	
		            var newX = y % 5;
		            var newY = (2 * x + 3 * y) % 5;
		            x = newX;
		            y = newY;
		        }
	
		        // Compute pi index constants
		        for (var x = 0; x < 5; x++) {
		            for (var y = 0; y < 5; y++) {
		                PI_INDEXES[x + 5 * y] = y + ((2 * x + 3 * y) % 5) * 5;
		            }
		        }
	
		        // Compute round constants
		        var LFSR = 0x01;
		        for (var i = 0; i < 24; i++) {
		            var roundConstantMsw = 0;
		            var roundConstantLsw = 0;
	
		            for (var j = 0; j < 7; j++) {
		                if (LFSR & 0x01) {
		                    var bitPosition = (1 << j) - 1;
		                    if (bitPosition < 32) {
		                        roundConstantLsw ^= 1 << bitPosition;
		                    } else /* if (bitPosition >= 32) */ {
		                        roundConstantMsw ^= 1 << (bitPosition - 32);
		                    }
		                }
	
		                // Compute next LFSR
		                if (LFSR & 0x80) {
		                    // Primitive polynomial over GF(2): x^8 + x^6 + x^5 + x^4 + 1
		                    LFSR = (LFSR << 1) ^ 0x71;
		                } else {
		                    LFSR <<= 1;
		                }
		            }
	
		            ROUND_CONSTANTS[i] = X64Word.create(roundConstantMsw, roundConstantLsw);
		        }
		    }());
	
		    // Reusable objects for temporary values
		    var T = [];
		    (function () {
		        for (var i = 0; i < 25; i++) {
		            T[i] = X64Word.create();
		        }
		    }());
	
		    /**
		     * SHA-3 hash algorithm.
		     */
		    var SHA3 = C_algo.SHA3 = Hasher.extend({
		        /**
		         * Configuration options.
		         *
		         * @property {number} outputLength
		         *   The desired number of bits in the output hash.
		         *   Only values permitted are: 224, 256, 384, 512.
		         *   Default: 512
		         */
		        cfg: Hasher.cfg.extend({
		            outputLength: 512
		        }),
	
		        _doReset: function () {
		            var state = this._state = []
		            for (var i = 0; i < 25; i++) {
		                state[i] = new X64Word.init();
		            }
	
		            this.blockSize = (1600 - 2 * this.cfg.outputLength) / 32;
		        },
	
		        _doProcessBlock: function (M, offset) {
		            // Shortcuts
		            var state = this._state;
		            var nBlockSizeLanes = this.blockSize / 2;
	
		            // Absorb
		            for (var i = 0; i < nBlockSizeLanes; i++) {
		                // Shortcuts
		                var M2i  = M[offset + 2 * i];
		                var M2i1 = M[offset + 2 * i + 1];
	
		                // Swap endian
		                M2i = (
		                    (((M2i << 8)  | (M2i >>> 24)) & 0x00ff00ff) |
		                    (((M2i << 24) | (M2i >>> 8))  & 0xff00ff00)
		                );
		                M2i1 = (
		                    (((M2i1 << 8)  | (M2i1 >>> 24)) & 0x00ff00ff) |
		                    (((M2i1 << 24) | (M2i1 >>> 8))  & 0xff00ff00)
		                );
	
		                // Absorb message into state
		                var lane = state[i];
		                lane.high ^= M2i1;
		                lane.low  ^= M2i;
		            }
	
		            // Rounds
		            for (var round = 0; round < 24; round++) {
		                // Theta
		                for (var x = 0; x < 5; x++) {
		                    // Mix column lanes
		                    var tMsw = 0, tLsw = 0;
		                    for (var y = 0; y < 5; y++) {
		                        var lane = state[x + 5 * y];
		                        tMsw ^= lane.high;
		                        tLsw ^= lane.low;
		                    }
	
		                    // Temporary values
		                    var Tx = T[x];
		                    Tx.high = tMsw;
		                    Tx.low  = tLsw;
		                }
		                for (var x = 0; x < 5; x++) {
		                    // Shortcuts
		                    var Tx4 = T[(x + 4) % 5];
		                    var Tx1 = T[(x + 1) % 5];
		                    var Tx1Msw = Tx1.high;
		                    var Tx1Lsw = Tx1.low;
	
		                    // Mix surrounding columns
		                    var tMsw = Tx4.high ^ ((Tx1Msw << 1) | (Tx1Lsw >>> 31));
		                    var tLsw = Tx4.low  ^ ((Tx1Lsw << 1) | (Tx1Msw >>> 31));
		                    for (var y = 0; y < 5; y++) {
		                        var lane = state[x + 5 * y];
		                        lane.high ^= tMsw;
		                        lane.low  ^= tLsw;
		                    }
		                }
	
		                // Rho Pi
		                for (var laneIndex = 1; laneIndex < 25; laneIndex++) {
		                    // Shortcuts
		                    var lane = state[laneIndex];
		                    var laneMsw = lane.high;
		                    var laneLsw = lane.low;
		                    var rhoOffset = RHO_OFFSETS[laneIndex];
	
		                    // Rotate lanes
		                    if (rhoOffset < 32) {
		                        var tMsw = (laneMsw << rhoOffset) | (laneLsw >>> (32 - rhoOffset));
		                        var tLsw = (laneLsw << rhoOffset) | (laneMsw >>> (32 - rhoOffset));
		                    } else /* if (rhoOffset >= 32) */ {
		                        var tMsw = (laneLsw << (rhoOffset - 32)) | (laneMsw >>> (64 - rhoOffset));
		                        var tLsw = (laneMsw << (rhoOffset - 32)) | (laneLsw >>> (64 - rhoOffset));
		                    }
	
		                    // Transpose lanes
		                    var TPiLane = T[PI_INDEXES[laneIndex]];
		                    TPiLane.high = tMsw;
		                    TPiLane.low  = tLsw;
		                }
	
		                // Rho pi at x = y = 0
		                var T0 = T[0];
		                var state0 = state[0];
		                T0.high = state0.high;
		                T0.low  = state0.low;
	
		                // Chi
		                for (var x = 0; x < 5; x++) {
		                    for (var y = 0; y < 5; y++) {
		                        // Shortcuts
		                        var laneIndex = x + 5 * y;
		                        var lane = state[laneIndex];
		                        var TLane = T[laneIndex];
		                        var Tx1Lane = T[((x + 1) % 5) + 5 * y];
		                        var Tx2Lane = T[((x + 2) % 5) + 5 * y];
	
		                        // Mix rows
		                        lane.high = TLane.high ^ (~Tx1Lane.high & Tx2Lane.high);
		                        lane.low  = TLane.low  ^ (~Tx1Lane.low  & Tx2Lane.low);
		                    }
		                }
	
		                // Iota
		                var lane = state[0];
		                var roundConstant = ROUND_CONSTANTS[round];
		                lane.high ^= roundConstant.high;
		                lane.low  ^= roundConstant.low;;
		            }
		        },
	
		        _doFinalize: function () {
		            // Shortcuts
		            var data = this._data;
		            var dataWords = data.words;
		            var nBitsTotal = this._nDataBytes * 8;
		            var nBitsLeft = data.sigBytes * 8;
		            var blockSizeBits = this.blockSize * 32;
	
		            // Add padding
		            dataWords[nBitsLeft >>> 5] |= 0x1 << (24 - nBitsLeft % 32);
		            dataWords[((Math.ceil((nBitsLeft + 1) / blockSizeBits) * blockSizeBits) >>> 5) - 1] |= 0x80;
		            data.sigBytes = dataWords.length * 4;
	
		            // Hash final blocks
		            this._process();
	
		            // Shortcuts
		            var state = this._state;
		            var outputLengthBytes = this.cfg.outputLength / 8;
		            var outputLengthLanes = outputLengthBytes / 8;
	
		            // Squeeze
		            var hashWords = [];
		            for (var i = 0; i < outputLengthLanes; i++) {
		                // Shortcuts
		                var lane = state[i];
		                var laneMsw = lane.high;
		                var laneLsw = lane.low;
	
		                // Swap endian
		                laneMsw = (
		                    (((laneMsw << 8)  | (laneMsw >>> 24)) & 0x00ff00ff) |
		                    (((laneMsw << 24) | (laneMsw >>> 8))  & 0xff00ff00)
		                );
		                laneLsw = (
		                    (((laneLsw << 8)  | (laneLsw >>> 24)) & 0x00ff00ff) |
		                    (((laneLsw << 24) | (laneLsw >>> 8))  & 0xff00ff00)
		                );
	
		                // Squeeze state to retrieve hash
		                hashWords.push(laneLsw);
		                hashWords.push(laneMsw);
		            }
	
		            // Return final computed hash
		            return new WordArray.init(hashWords, outputLengthBytes);
		        },
	
		        clone: function () {
		            var clone = Hasher.clone.call(this);
	
		            var state = clone._state = this._state.slice(0);
		            for (var i = 0; i < 25; i++) {
		                state[i] = state[i].clone();
		            }
	
		            return clone;
		        }
		    });
	
		    /**
		     * Shortcut function to the hasher's object interface.
		     *
		     * @param {WordArray|string} message The message to hash.
		     *
		     * @return {WordArray} The hash.
		     *
		     * @static
		     *
		     * @example
		     *
		     *     var hash = CryptoJS.SHA3('message');
		     *     var hash = CryptoJS.SHA3(wordArray);
		     */
		    C.SHA3 = Hasher._createHelper(SHA3);
	
		    /**
		     * Shortcut function to the HMAC's object interface.
		     *
		     * @param {WordArray|string} message The message to hash.
		     * @param {WordArray|string} key The secret key.
		     *
		     * @return {WordArray} The HMAC.
		     *
		     * @static
		     *
		     * @example
		     *
		     *     var hmac = CryptoJS.HmacSHA3(message, key);
		     */
		    C.HmacSHA3 = Hasher._createHmacHelper(SHA3);
		}(Math));
	
	
		return CryptoJS.SHA3;
	
	}));

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

	;(function (root, factory) {
		if (true) {
			// CommonJS
			module.exports = exports = factory(__webpack_require__(28));
		}
		else if (typeof define === "function" && define.amd) {
			// AMD
			define(["./core"], factory);
		}
		else {
			// Global (browser)
			factory(root.CryptoJS);
		}
	}(this, function (CryptoJS) {
	
		/** @preserve
		(c) 2012 by Cédric Mesnil. All rights reserved.
	
		Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
	
		    - Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
		    - Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
	
		THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
		*/
	
		(function (Math) {
		    // Shortcuts
		    var C = CryptoJS;
		    var C_lib = C.lib;
		    var WordArray = C_lib.WordArray;
		    var Hasher = C_lib.Hasher;
		    var C_algo = C.algo;
	
		    // Constants table
		    var _zl = WordArray.create([
		        0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14, 15,
		        7,  4, 13,  1, 10,  6, 15,  3, 12,  0,  9,  5,  2, 14, 11,  8,
		        3, 10, 14,  4,  9, 15,  8,  1,  2,  7,  0,  6, 13, 11,  5, 12,
		        1,  9, 11, 10,  0,  8, 12,  4, 13,  3,  7, 15, 14,  5,  6,  2,
		        4,  0,  5,  9,  7, 12,  2, 10, 14,  1,  3,  8, 11,  6, 15, 13]);
		    var _zr = WordArray.create([
		        5, 14,  7,  0,  9,  2, 11,  4, 13,  6, 15,  8,  1, 10,  3, 12,
		        6, 11,  3,  7,  0, 13,  5, 10, 14, 15,  8, 12,  4,  9,  1,  2,
		        15,  5,  1,  3,  7, 14,  6,  9, 11,  8, 12,  2, 10,  0,  4, 13,
		        8,  6,  4,  1,  3, 11, 15,  0,  5, 12,  2, 13,  9,  7, 10, 14,
		        12, 15, 10,  4,  1,  5,  8,  7,  6,  2, 13, 14,  0,  3,  9, 11]);
		    var _sl = WordArray.create([
		         11, 14, 15, 12,  5,  8,  7,  9, 11, 13, 14, 15,  6,  7,  9,  8,
		        7, 6,   8, 13, 11,  9,  7, 15,  7, 12, 15,  9, 11,  7, 13, 12,
		        11, 13,  6,  7, 14,  9, 13, 15, 14,  8, 13,  6,  5, 12,  7,  5,
		          11, 12, 14, 15, 14, 15,  9,  8,  9, 14,  5,  6,  8,  6,  5, 12,
		        9, 15,  5, 11,  6,  8, 13, 12,  5, 12, 13, 14, 11,  8,  5,  6 ]);
		    var _sr = WordArray.create([
		        8,  9,  9, 11, 13, 15, 15,  5,  7,  7,  8, 11, 14, 14, 12,  6,
		        9, 13, 15,  7, 12,  8,  9, 11,  7,  7, 12,  7,  6, 15, 13, 11,
		        9,  7, 15, 11,  8,  6,  6, 14, 12, 13,  5, 14, 13, 13,  7,  5,
		        15,  5,  8, 11, 14, 14,  6, 14,  6,  9, 12,  9, 12,  5, 15,  8,
		        8,  5, 12,  9, 12,  5, 14,  6,  8, 13,  6,  5, 15, 13, 11, 11 ]);
	
		    var _hl =  WordArray.create([ 0x00000000, 0x5A827999, 0x6ED9EBA1, 0x8F1BBCDC, 0xA953FD4E]);
		    var _hr =  WordArray.create([ 0x50A28BE6, 0x5C4DD124, 0x6D703EF3, 0x7A6D76E9, 0x00000000]);
	
		    /**
		     * RIPEMD160 hash algorithm.
		     */
		    var RIPEMD160 = C_algo.RIPEMD160 = Hasher.extend({
		        _doReset: function () {
		            this._hash  = WordArray.create([0x67452301, 0xEFCDAB89, 0x98BADCFE, 0x10325476, 0xC3D2E1F0]);
		        },
	
		        _doProcessBlock: function (M, offset) {
	
		            // Swap endian
		            for (var i = 0; i < 16; i++) {
		                // Shortcuts
		                var offset_i = offset + i;
		                var M_offset_i = M[offset_i];
	
		                // Swap
		                M[offset_i] = (
		                    (((M_offset_i << 8)  | (M_offset_i >>> 24)) & 0x00ff00ff) |
		                    (((M_offset_i << 24) | (M_offset_i >>> 8))  & 0xff00ff00)
		                );
		            }
		            // Shortcut
		            var H  = this._hash.words;
		            var hl = _hl.words;
		            var hr = _hr.words;
		            var zl = _zl.words;
		            var zr = _zr.words;
		            var sl = _sl.words;
		            var sr = _sr.words;
	
		            // Working variables
		            var al, bl, cl, dl, el;
		            var ar, br, cr, dr, er;
	
		            ar = al = H[0];
		            br = bl = H[1];
		            cr = cl = H[2];
		            dr = dl = H[3];
		            er = el = H[4];
		            // Computation
		            var t;
		            for (var i = 0; i < 80; i += 1) {
		                t = (al +  M[offset+zl[i]])|0;
		                if (i<16){
			            t +=  f1(bl,cl,dl) + hl[0];
		                } else if (i<32) {
			            t +=  f2(bl,cl,dl) + hl[1];
		                } else if (i<48) {
			            t +=  f3(bl,cl,dl) + hl[2];
		                } else if (i<64) {
			            t +=  f4(bl,cl,dl) + hl[3];
		                } else {// if (i<80) {
			            t +=  f5(bl,cl,dl) + hl[4];
		                }
		                t = t|0;
		                t =  rotl(t,sl[i]);
		                t = (t+el)|0;
		                al = el;
		                el = dl;
		                dl = rotl(cl, 10);
		                cl = bl;
		                bl = t;
	
		                t = (ar + M[offset+zr[i]])|0;
		                if (i<16){
			            t +=  f5(br,cr,dr) + hr[0];
		                } else if (i<32) {
			            t +=  f4(br,cr,dr) + hr[1];
		                } else if (i<48) {
			            t +=  f3(br,cr,dr) + hr[2];
		                } else if (i<64) {
			            t +=  f2(br,cr,dr) + hr[3];
		                } else {// if (i<80) {
			            t +=  f1(br,cr,dr) + hr[4];
		                }
		                t = t|0;
		                t =  rotl(t,sr[i]) ;
		                t = (t+er)|0;
		                ar = er;
		                er = dr;
		                dr = rotl(cr, 10);
		                cr = br;
		                br = t;
		            }
		            // Intermediate hash value
		            t    = (H[1] + cl + dr)|0;
		            H[1] = (H[2] + dl + er)|0;
		            H[2] = (H[3] + el + ar)|0;
		            H[3] = (H[4] + al + br)|0;
		            H[4] = (H[0] + bl + cr)|0;
		            H[0] =  t;
		        },
	
		        _doFinalize: function () {
		            // Shortcuts
		            var data = this._data;
		            var dataWords = data.words;
	
		            var nBitsTotal = this._nDataBytes * 8;
		            var nBitsLeft = data.sigBytes * 8;
	
		            // Add padding
		            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
		            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = (
		                (((nBitsTotal << 8)  | (nBitsTotal >>> 24)) & 0x00ff00ff) |
		                (((nBitsTotal << 24) | (nBitsTotal >>> 8))  & 0xff00ff00)
		            );
		            data.sigBytes = (dataWords.length + 1) * 4;
	
		            // Hash final blocks
		            this._process();
	
		            // Shortcuts
		            var hash = this._hash;
		            var H = hash.words;
	
		            // Swap endian
		            for (var i = 0; i < 5; i++) {
		                // Shortcut
		                var H_i = H[i];
	
		                // Swap
		                H[i] = (((H_i << 8)  | (H_i >>> 24)) & 0x00ff00ff) |
		                       (((H_i << 24) | (H_i >>> 8))  & 0xff00ff00);
		            }
	
		            // Return final computed hash
		            return hash;
		        },
	
		        clone: function () {
		            var clone = Hasher.clone.call(this);
		            clone._hash = this._hash.clone();
	
		            return clone;
		        }
		    });
	
	
		    function f1(x, y, z) {
		        return ((x) ^ (y) ^ (z));
	
		    }
	
		    function f2(x, y, z) {
		        return (((x)&(y)) | ((~x)&(z)));
		    }
	
		    function f3(x, y, z) {
		        return (((x) | (~(y))) ^ (z));
		    }
	
		    function f4(x, y, z) {
		        return (((x) & (z)) | ((y)&(~(z))));
		    }
	
		    function f5(x, y, z) {
		        return ((x) ^ ((y) |(~(z))));
	
		    }
	
		    function rotl(x,n) {
		        return (x<<n) | (x>>>(32-n));
		    }
	
	
		    /**
		     * Shortcut function to the hasher's object interface.
		     *
		     * @param {WordArray|string} message The message to hash.
		     *
		     * @return {WordArray} The hash.
		     *
		     * @static
		     *
		     * @example
		     *
		     *     var hash = CryptoJS.RIPEMD160('message');
		     *     var hash = CryptoJS.RIPEMD160(wordArray);
		     */
		    C.RIPEMD160 = Hasher._createHelper(RIPEMD160);
	
		    /**
		     * Shortcut function to the HMAC's object interface.
		     *
		     * @param {WordArray|string} message The message to hash.
		     * @param {WordArray|string} key The secret key.
		     *
		     * @return {WordArray} The HMAC.
		     *
		     * @static
		     *
		     * @example
		     *
		     *     var hmac = CryptoJS.HmacRIPEMD160(message, key);
		     */
		    C.HmacRIPEMD160 = Hasher._createHmacHelper(RIPEMD160);
		}(Math));
	
	
		return CryptoJS.RIPEMD160;
	
	}));

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

	;(function (root, factory) {
		if (true) {
			// CommonJS
			module.exports = exports = factory(__webpack_require__(28));
		}
		else if (typeof define === "function" && define.amd) {
			// AMD
			define(["./core"], factory);
		}
		else {
			// Global (browser)
			factory(root.CryptoJS);
		}
	}(this, function (CryptoJS) {
	
		(function () {
		    // Shortcuts
		    var C = CryptoJS;
		    var C_lib = C.lib;
		    var Base = C_lib.Base;
		    var C_enc = C.enc;
		    var Utf8 = C_enc.Utf8;
		    var C_algo = C.algo;
	
		    /**
		     * HMAC algorithm.
		     */
		    var HMAC = C_algo.HMAC = Base.extend({
		        /**
		         * Initializes a newly created HMAC.
		         *
		         * @param {Hasher} hasher The hash algorithm to use.
		         * @param {WordArray|string} key The secret key.
		         *
		         * @example
		         *
		         *     var hmacHasher = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, key);
		         */
		        init: function (hasher, key) {
		            // Init hasher
		            hasher = this._hasher = new hasher.init();
	
		            // Convert string to WordArray, else assume WordArray already
		            if (typeof key == 'string') {
		                key = Utf8.parse(key);
		            }
	
		            // Shortcuts
		            var hasherBlockSize = hasher.blockSize;
		            var hasherBlockSizeBytes = hasherBlockSize * 4;
	
		            // Allow arbitrary length keys
		            if (key.sigBytes > hasherBlockSizeBytes) {
		                key = hasher.finalize(key);
		            }
	
		            // Clamp excess bits
		            key.clamp();
	
		            // Clone key for inner and outer pads
		            var oKey = this._oKey = key.clone();
		            var iKey = this._iKey = key.clone();
	
		            // Shortcuts
		            var oKeyWords = oKey.words;
		            var iKeyWords = iKey.words;
	
		            // XOR keys with pad constants
		            for (var i = 0; i < hasherBlockSize; i++) {
		                oKeyWords[i] ^= 0x5c5c5c5c;
		                iKeyWords[i] ^= 0x36363636;
		            }
		            oKey.sigBytes = iKey.sigBytes = hasherBlockSizeBytes;
	
		            // Set initial values
		            this.reset();
		        },
	
		        /**
		         * Resets this HMAC to its initial state.
		         *
		         * @example
		         *
		         *     hmacHasher.reset();
		         */
		        reset: function () {
		            // Shortcut
		            var hasher = this._hasher;
	
		            // Reset
		            hasher.reset();
		            hasher.update(this._iKey);
		        },
	
		        /**
		         * Updates this HMAC with a message.
		         *
		         * @param {WordArray|string} messageUpdate The message to append.
		         *
		         * @return {HMAC} This HMAC instance.
		         *
		         * @example
		         *
		         *     hmacHasher.update('message');
		         *     hmacHasher.update(wordArray);
		         */
		        update: function (messageUpdate) {
		            this._hasher.update(messageUpdate);
	
		            // Chainable
		            return this;
		        },
	
		        /**
		         * Finalizes the HMAC computation.
		         * Note that the finalize operation is effectively a destructive, read-once operation.
		         *
		         * @param {WordArray|string} messageUpdate (Optional) A final message update.
		         *
		         * @return {WordArray} The HMAC.
		         *
		         * @example
		         *
		         *     var hmac = hmacHasher.finalize();
		         *     var hmac = hmacHasher.finalize('message');
		         *     var hmac = hmacHasher.finalize(wordArray);
		         */
		        finalize: function (messageUpdate) {
		            // Shortcut
		            var hasher = this._hasher;
	
		            // Compute HMAC
		            var innerHash = hasher.finalize(messageUpdate);
		            hasher.reset();
		            var hmac = hasher.finalize(this._oKey.clone().concat(innerHash));
	
		            return hmac;
		        }
		    });
		}());
	
	
	}));

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

	;(function (root, factory, undef) {
		if (true) {
			// CommonJS
			module.exports = exports = factory(__webpack_require__(28), __webpack_require__(34), __webpack_require__(41));
		}
		else if (typeof define === "function" && define.amd) {
			// AMD
			define(["./core", "./sha1", "./hmac"], factory);
		}
		else {
			// Global (browser)
			factory(root.CryptoJS);
		}
	}(this, function (CryptoJS) {
	
		(function () {
		    // Shortcuts
		    var C = CryptoJS;
		    var C_lib = C.lib;
		    var Base = C_lib.Base;
		    var WordArray = C_lib.WordArray;
		    var C_algo = C.algo;
		    var SHA1 = C_algo.SHA1;
		    var HMAC = C_algo.HMAC;
	
		    /**
		     * Password-Based Key Derivation Function 2 algorithm.
		     */
		    var PBKDF2 = C_algo.PBKDF2 = Base.extend({
		        /**
		         * Configuration options.
		         *
		         * @property {number} keySize The key size in words to generate. Default: 4 (128 bits)
		         * @property {Hasher} hasher The hasher to use. Default: SHA1
		         * @property {number} iterations The number of iterations to perform. Default: 1
		         */
		        cfg: Base.extend({
		            keySize: 128/32,
		            hasher: SHA1,
		            iterations: 1
		        }),
	
		        /**
		         * Initializes a newly created key derivation function.
		         *
		         * @param {Object} cfg (Optional) The configuration options to use for the derivation.
		         *
		         * @example
		         *
		         *     var kdf = CryptoJS.algo.PBKDF2.create();
		         *     var kdf = CryptoJS.algo.PBKDF2.create({ keySize: 8 });
		         *     var kdf = CryptoJS.algo.PBKDF2.create({ keySize: 8, iterations: 1000 });
		         */
		        init: function (cfg) {
		            this.cfg = this.cfg.extend(cfg);
		        },
	
		        /**
		         * Computes the Password-Based Key Derivation Function 2.
		         *
		         * @param {WordArray|string} password The password.
		         * @param {WordArray|string} salt A salt.
		         *
		         * @return {WordArray} The derived key.
		         *
		         * @example
		         *
		         *     var key = kdf.compute(password, salt);
		         */
		        compute: function (password, salt) {
		            // Shortcut
		            var cfg = this.cfg;
	
		            // Init HMAC
		            var hmac = HMAC.create(cfg.hasher, password);
	
		            // Initial values
		            var derivedKey = WordArray.create();
		            var blockIndex = WordArray.create([0x00000001]);
	
		            // Shortcuts
		            var derivedKeyWords = derivedKey.words;
		            var blockIndexWords = blockIndex.words;
		            var keySize = cfg.keySize;
		            var iterations = cfg.iterations;
	
		            // Generate key
		            while (derivedKeyWords.length < keySize) {
		                var block = hmac.update(salt).finalize(blockIndex);
		                hmac.reset();
	
		                // Shortcuts
		                var blockWords = block.words;
		                var blockWordsLength = blockWords.length;
	
		                // Iterations
		                var intermediate = block;
		                for (var i = 1; i < iterations; i++) {
		                    intermediate = hmac.finalize(intermediate);
		                    hmac.reset();
	
		                    // Shortcut
		                    var intermediateWords = intermediate.words;
	
		                    // XOR intermediate with block
		                    for (var j = 0; j < blockWordsLength; j++) {
		                        blockWords[j] ^= intermediateWords[j];
		                    }
		                }
	
		                derivedKey.concat(block);
		                blockIndexWords[0]++;
		            }
		            derivedKey.sigBytes = keySize * 4;
	
		            return derivedKey;
		        }
		    });
	
		    /**
		     * Computes the Password-Based Key Derivation Function 2.
		     *
		     * @param {WordArray|string} password The password.
		     * @param {WordArray|string} salt A salt.
		     * @param {Object} cfg (Optional) The configuration options to use for this computation.
		     *
		     * @return {WordArray} The derived key.
		     *
		     * @static
		     *
		     * @example
		     *
		     *     var key = CryptoJS.PBKDF2(password, salt);
		     *     var key = CryptoJS.PBKDF2(password, salt, { keySize: 8 });
		     *     var key = CryptoJS.PBKDF2(password, salt, { keySize: 8, iterations: 1000 });
		     */
		    C.PBKDF2 = function (password, salt, cfg) {
		        return PBKDF2.create(cfg).compute(password, salt);
		    };
		}());
	
	
		return CryptoJS.PBKDF2;
	
	}));

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

	;(function (root, factory, undef) {
		if (true) {
			// CommonJS
			module.exports = exports = factory(__webpack_require__(28), __webpack_require__(34), __webpack_require__(41));
		}
		else if (typeof define === "function" && define.amd) {
			// AMD
			define(["./core", "./sha1", "./hmac"], factory);
		}
		else {
			// Global (browser)
			factory(root.CryptoJS);
		}
	}(this, function (CryptoJS) {
	
		(function () {
		    // Shortcuts
		    var C = CryptoJS;
		    var C_lib = C.lib;
		    var Base = C_lib.Base;
		    var WordArray = C_lib.WordArray;
		    var C_algo = C.algo;
		    var MD5 = C_algo.MD5;
	
		    /**
		     * This key derivation function is meant to conform with EVP_BytesToKey.
		     * www.openssl.org/docs/crypto/EVP_BytesToKey.html
		     */
		    var EvpKDF = C_algo.EvpKDF = Base.extend({
		        /**
		         * Configuration options.
		         *
		         * @property {number} keySize The key size in words to generate. Default: 4 (128 bits)
		         * @property {Hasher} hasher The hash algorithm to use. Default: MD5
		         * @property {number} iterations The number of iterations to perform. Default: 1
		         */
		        cfg: Base.extend({
		            keySize: 128/32,
		            hasher: MD5,
		            iterations: 1
		        }),
	
		        /**
		         * Initializes a newly created key derivation function.
		         *
		         * @param {Object} cfg (Optional) The configuration options to use for the derivation.
		         *
		         * @example
		         *
		         *     var kdf = CryptoJS.algo.EvpKDF.create();
		         *     var kdf = CryptoJS.algo.EvpKDF.create({ keySize: 8 });
		         *     var kdf = CryptoJS.algo.EvpKDF.create({ keySize: 8, iterations: 1000 });
		         */
		        init: function (cfg) {
		            this.cfg = this.cfg.extend(cfg);
		        },
	
		        /**
		         * Derives a key from a password.
		         *
		         * @param {WordArray|string} password The password.
		         * @param {WordArray|string} salt A salt.
		         *
		         * @return {WordArray} The derived key.
		         *
		         * @example
		         *
		         *     var key = kdf.compute(password, salt);
		         */
		        compute: function (password, salt) {
		            // Shortcut
		            var cfg = this.cfg;
	
		            // Init hasher
		            var hasher = cfg.hasher.create();
	
		            // Initial values
		            var derivedKey = WordArray.create();
	
		            // Shortcuts
		            var derivedKeyWords = derivedKey.words;
		            var keySize = cfg.keySize;
		            var iterations = cfg.iterations;
	
		            // Generate key
		            while (derivedKeyWords.length < keySize) {
		                if (block) {
		                    hasher.update(block);
		                }
		                var block = hasher.update(password).finalize(salt);
		                hasher.reset();
	
		                // Iterations
		                for (var i = 1; i < iterations; i++) {
		                    block = hasher.finalize(block);
		                    hasher.reset();
		                }
	
		                derivedKey.concat(block);
		            }
		            derivedKey.sigBytes = keySize * 4;
	
		            return derivedKey;
		        }
		    });
	
		    /**
		     * Derives a key from a password.
		     *
		     * @param {WordArray|string} password The password.
		     * @param {WordArray|string} salt A salt.
		     * @param {Object} cfg (Optional) The configuration options to use for this computation.
		     *
		     * @return {WordArray} The derived key.
		     *
		     * @static
		     *
		     * @example
		     *
		     *     var key = CryptoJS.EvpKDF(password, salt);
		     *     var key = CryptoJS.EvpKDF(password, salt, { keySize: 8 });
		     *     var key = CryptoJS.EvpKDF(password, salt, { keySize: 8, iterations: 1000 });
		     */
		    C.EvpKDF = function (password, salt, cfg) {
		        return EvpKDF.create(cfg).compute(password, salt);
		    };
		}());
	
	
		return CryptoJS.EvpKDF;
	
	}));

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

	;(function (root, factory, undef) {
		if (true) {
			// CommonJS
			module.exports = exports = factory(__webpack_require__(28), __webpack_require__(43));
		}
		else if (typeof define === "function" && define.amd) {
			// AMD
			define(["./core", "./evpkdf"], factory);
		}
		else {
			// Global (browser)
			factory(root.CryptoJS);
		}
	}(this, function (CryptoJS) {
	
		/**
		 * Cipher core components.
		 */
		CryptoJS.lib.Cipher || (function (undefined) {
		    // Shortcuts
		    var C = CryptoJS;
		    var C_lib = C.lib;
		    var Base = C_lib.Base;
		    var WordArray = C_lib.WordArray;
		    var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm;
		    var C_enc = C.enc;
		    var Utf8 = C_enc.Utf8;
		    var Base64 = C_enc.Base64;
		    var C_algo = C.algo;
		    var EvpKDF = C_algo.EvpKDF;
	
		    /**
		     * Abstract base cipher template.
		     *
		     * @property {number} keySize This cipher's key size. Default: 4 (128 bits)
		     * @property {number} ivSize This cipher's IV size. Default: 4 (128 bits)
		     * @property {number} _ENC_XFORM_MODE A constant representing encryption mode.
		     * @property {number} _DEC_XFORM_MODE A constant representing decryption mode.
		     */
		    var Cipher = C_lib.Cipher = BufferedBlockAlgorithm.extend({
		        /**
		         * Configuration options.
		         *
		         * @property {WordArray} iv The IV to use for this operation.
		         */
		        cfg: Base.extend(),
	
		        /**
		         * Creates this cipher in encryption mode.
		         *
		         * @param {WordArray} key The key.
		         * @param {Object} cfg (Optional) The configuration options to use for this operation.
		         *
		         * @return {Cipher} A cipher instance.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var cipher = CryptoJS.algo.AES.createEncryptor(keyWordArray, { iv: ivWordArray });
		         */
		        createEncryptor: function (key, cfg) {
		            return this.create(this._ENC_XFORM_MODE, key, cfg);
		        },
	
		        /**
		         * Creates this cipher in decryption mode.
		         *
		         * @param {WordArray} key The key.
		         * @param {Object} cfg (Optional) The configuration options to use for this operation.
		         *
		         * @return {Cipher} A cipher instance.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var cipher = CryptoJS.algo.AES.createDecryptor(keyWordArray, { iv: ivWordArray });
		         */
		        createDecryptor: function (key, cfg) {
		            return this.create(this._DEC_XFORM_MODE, key, cfg);
		        },
	
		        /**
		         * Initializes a newly created cipher.
		         *
		         * @param {number} xformMode Either the encryption or decryption transormation mode constant.
		         * @param {WordArray} key The key.
		         * @param {Object} cfg (Optional) The configuration options to use for this operation.
		         *
		         * @example
		         *
		         *     var cipher = CryptoJS.algo.AES.create(CryptoJS.algo.AES._ENC_XFORM_MODE, keyWordArray, { iv: ivWordArray });
		         */
		        init: function (xformMode, key, cfg) {
		            // Apply config defaults
		            this.cfg = this.cfg.extend(cfg);
	
		            // Store transform mode and key
		            this._xformMode = xformMode;
		            this._key = key;
	
		            // Set initial values
		            this.reset();
		        },
	
		        /**
		         * Resets this cipher to its initial state.
		         *
		         * @example
		         *
		         *     cipher.reset();
		         */
		        reset: function () {
		            // Reset data buffer
		            BufferedBlockAlgorithm.reset.call(this);
	
		            // Perform concrete-cipher logic
		            this._doReset();
		        },
	
		        /**
		         * Adds data to be encrypted or decrypted.
		         *
		         * @param {WordArray|string} dataUpdate The data to encrypt or decrypt.
		         *
		         * @return {WordArray} The data after processing.
		         *
		         * @example
		         *
		         *     var encrypted = cipher.process('data');
		         *     var encrypted = cipher.process(wordArray);
		         */
		        process: function (dataUpdate) {
		            // Append
		            this._append(dataUpdate);
	
		            // Process available blocks
		            return this._process();
		        },
	
		        /**
		         * Finalizes the encryption or decryption process.
		         * Note that the finalize operation is effectively a destructive, read-once operation.
		         *
		         * @param {WordArray|string} dataUpdate The final data to encrypt or decrypt.
		         *
		         * @return {WordArray} The data after final processing.
		         *
		         * @example
		         *
		         *     var encrypted = cipher.finalize();
		         *     var encrypted = cipher.finalize('data');
		         *     var encrypted = cipher.finalize(wordArray);
		         */
		        finalize: function (dataUpdate) {
		            // Final data update
		            if (dataUpdate) {
		                this._append(dataUpdate);
		            }
	
		            // Perform concrete-cipher logic
		            var finalProcessedData = this._doFinalize();
	
		            return finalProcessedData;
		        },
	
		        keySize: 128/32,
	
		        ivSize: 128/32,
	
		        _ENC_XFORM_MODE: 1,
	
		        _DEC_XFORM_MODE: 2,
	
		        /**
		         * Creates shortcut functions to a cipher's object interface.
		         *
		         * @param {Cipher} cipher The cipher to create a helper for.
		         *
		         * @return {Object} An object with encrypt and decrypt shortcut functions.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var AES = CryptoJS.lib.Cipher._createHelper(CryptoJS.algo.AES);
		         */
		        _createHelper: (function () {
		            function selectCipherStrategy(key) {
		                if (typeof key == 'string') {
		                    return PasswordBasedCipher;
		                } else {
		                    return SerializableCipher;
		                }
		            }
	
		            return function (cipher) {
		                return {
		                    encrypt: function (message, key, cfg) {
		                        return selectCipherStrategy(key).encrypt(cipher, message, key, cfg);
		                    },
	
		                    decrypt: function (ciphertext, key, cfg) {
		                        return selectCipherStrategy(key).decrypt(cipher, ciphertext, key, cfg);
		                    }
		                };
		            };
		        }())
		    });
	
		    /**
		     * Abstract base stream cipher template.
		     *
		     * @property {number} blockSize The number of 32-bit words this cipher operates on. Default: 1 (32 bits)
		     */
		    var StreamCipher = C_lib.StreamCipher = Cipher.extend({
		        _doFinalize: function () {
		            // Process partial blocks
		            var finalProcessedBlocks = this._process(!!'flush');
	
		            return finalProcessedBlocks;
		        },
	
		        blockSize: 1
		    });
	
		    /**
		     * Mode namespace.
		     */
		    var C_mode = C.mode = {};
	
		    /**
		     * Abstract base block cipher mode template.
		     */
		    var BlockCipherMode = C_lib.BlockCipherMode = Base.extend({
		        /**
		         * Creates this mode for encryption.
		         *
		         * @param {Cipher} cipher A block cipher instance.
		         * @param {Array} iv The IV words.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var mode = CryptoJS.mode.CBC.createEncryptor(cipher, iv.words);
		         */
		        createEncryptor: function (cipher, iv) {
		            return this.Encryptor.create(cipher, iv);
		        },
	
		        /**
		         * Creates this mode for decryption.
		         *
		         * @param {Cipher} cipher A block cipher instance.
		         * @param {Array} iv The IV words.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var mode = CryptoJS.mode.CBC.createDecryptor(cipher, iv.words);
		         */
		        createDecryptor: function (cipher, iv) {
		            return this.Decryptor.create(cipher, iv);
		        },
	
		        /**
		         * Initializes a newly created mode.
		         *
		         * @param {Cipher} cipher A block cipher instance.
		         * @param {Array} iv The IV words.
		         *
		         * @example
		         *
		         *     var mode = CryptoJS.mode.CBC.Encryptor.create(cipher, iv.words);
		         */
		        init: function (cipher, iv) {
		            this._cipher = cipher;
		            this._iv = iv;
		        }
		    });
	
		    /**
		     * Cipher Block Chaining mode.
		     */
		    var CBC = C_mode.CBC = (function () {
		        /**
		         * Abstract base CBC mode.
		         */
		        var CBC = BlockCipherMode.extend();
	
		        /**
		         * CBC encryptor.
		         */
		        CBC.Encryptor = CBC.extend({
		            /**
		             * Processes the data block at offset.
		             *
		             * @param {Array} words The data words to operate on.
		             * @param {number} offset The offset where the block starts.
		             *
		             * @example
		             *
		             *     mode.processBlock(data.words, offset);
		             */
		            processBlock: function (words, offset) {
		                // Shortcuts
		                var cipher = this._cipher;
		                var blockSize = cipher.blockSize;
	
		                // XOR and encrypt
		                xorBlock.call(this, words, offset, blockSize);
		                cipher.encryptBlock(words, offset);
	
		                // Remember this block to use with next block
		                this._prevBlock = words.slice(offset, offset + blockSize);
		            }
		        });
	
		        /**
		         * CBC decryptor.
		         */
		        CBC.Decryptor = CBC.extend({
		            /**
		             * Processes the data block at offset.
		             *
		             * @param {Array} words The data words to operate on.
		             * @param {number} offset The offset where the block starts.
		             *
		             * @example
		             *
		             *     mode.processBlock(data.words, offset);
		             */
		            processBlock: function (words, offset) {
		                // Shortcuts
		                var cipher = this._cipher;
		                var blockSize = cipher.blockSize;
	
		                // Remember this block to use with next block
		                var thisBlock = words.slice(offset, offset + blockSize);
	
		                // Decrypt and XOR
		                cipher.decryptBlock(words, offset);
		                xorBlock.call(this, words, offset, blockSize);
	
		                // This block becomes the previous block
		                this._prevBlock = thisBlock;
		            }
		        });
	
		        function xorBlock(words, offset, blockSize) {
		            // Shortcut
		            var iv = this._iv;
	
		            // Choose mixing block
		            if (iv) {
		                var block = iv;
	
		                // Remove IV for subsequent blocks
		                this._iv = undefined;
		            } else {
		                var block = this._prevBlock;
		            }
	
		            // XOR blocks
		            for (var i = 0; i < blockSize; i++) {
		                words[offset + i] ^= block[i];
		            }
		        }
	
		        return CBC;
		    }());
	
		    /**
		     * Padding namespace.
		     */
		    var C_pad = C.pad = {};
	
		    /**
		     * PKCS #5/7 padding strategy.
		     */
		    var Pkcs7 = C_pad.Pkcs7 = {
		        /**
		         * Pads data using the algorithm defined in PKCS #5/7.
		         *
		         * @param {WordArray} data The data to pad.
		         * @param {number} blockSize The multiple that the data should be padded to.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     CryptoJS.pad.Pkcs7.pad(wordArray, 4);
		         */
		        pad: function (data, blockSize) {
		            // Shortcut
		            var blockSizeBytes = blockSize * 4;
	
		            // Count padding bytes
		            var nPaddingBytes = blockSizeBytes - data.sigBytes % blockSizeBytes;
	
		            // Create padding word
		            var paddingWord = (nPaddingBytes << 24) | (nPaddingBytes << 16) | (nPaddingBytes << 8) | nPaddingBytes;
	
		            // Create padding
		            var paddingWords = [];
		            for (var i = 0; i < nPaddingBytes; i += 4) {
		                paddingWords.push(paddingWord);
		            }
		            var padding = WordArray.create(paddingWords, nPaddingBytes);
	
		            // Add padding
		            data.concat(padding);
		        },
	
		        /**
		         * Unpads data that had been padded using the algorithm defined in PKCS #5/7.
		         *
		         * @param {WordArray} data The data to unpad.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     CryptoJS.pad.Pkcs7.unpad(wordArray);
		         */
		        unpad: function (data) {
		            // Get number of padding bytes from last byte
		            var nPaddingBytes = data.words[(data.sigBytes - 1) >>> 2] & 0xff;
	
		            // Remove padding
		            data.sigBytes -= nPaddingBytes;
		        }
		    };
	
		    /**
		     * Abstract base block cipher template.
		     *
		     * @property {number} blockSize The number of 32-bit words this cipher operates on. Default: 4 (128 bits)
		     */
		    var BlockCipher = C_lib.BlockCipher = Cipher.extend({
		        /**
		         * Configuration options.
		         *
		         * @property {Mode} mode The block mode to use. Default: CBC
		         * @property {Padding} padding The padding strategy to use. Default: Pkcs7
		         */
		        cfg: Cipher.cfg.extend({
		            mode: CBC,
		            padding: Pkcs7
		        }),
	
		        reset: function () {
		            // Reset cipher
		            Cipher.reset.call(this);
	
		            // Shortcuts
		            var cfg = this.cfg;
		            var iv = cfg.iv;
		            var mode = cfg.mode;
	
		            // Reset block mode
		            if (this._xformMode == this._ENC_XFORM_MODE) {
		                var modeCreator = mode.createEncryptor;
		            } else /* if (this._xformMode == this._DEC_XFORM_MODE) */ {
		                var modeCreator = mode.createDecryptor;
		                // Keep at least one block in the buffer for unpadding
		                this._minBufferSize = 1;
		            }
	
		            if (this._mode && this._mode.__creator == modeCreator) {
		                this._mode.init(this, iv && iv.words);
		            } else {
		                this._mode = modeCreator.call(mode, this, iv && iv.words);
		                this._mode.__creator = modeCreator;
		            }
		        },
	
		        _doProcessBlock: function (words, offset) {
		            this._mode.processBlock(words, offset);
		        },
	
		        _doFinalize: function () {
		            // Shortcut
		            var padding = this.cfg.padding;
	
		            // Finalize
		            if (this._xformMode == this._ENC_XFORM_MODE) {
		                // Pad data
		                padding.pad(this._data, this.blockSize);
	
		                // Process final blocks
		                var finalProcessedBlocks = this._process(!!'flush');
		            } else /* if (this._xformMode == this._DEC_XFORM_MODE) */ {
		                // Process final blocks
		                var finalProcessedBlocks = this._process(!!'flush');
	
		                // Unpad data
		                padding.unpad(finalProcessedBlocks);
		            }
	
		            return finalProcessedBlocks;
		        },
	
		        blockSize: 128/32
		    });
	
		    /**
		     * A collection of cipher parameters.
		     *
		     * @property {WordArray} ciphertext The raw ciphertext.
		     * @property {WordArray} key The key to this ciphertext.
		     * @property {WordArray} iv The IV used in the ciphering operation.
		     * @property {WordArray} salt The salt used with a key derivation function.
		     * @property {Cipher} algorithm The cipher algorithm.
		     * @property {Mode} mode The block mode used in the ciphering operation.
		     * @property {Padding} padding The padding scheme used in the ciphering operation.
		     * @property {number} blockSize The block size of the cipher.
		     * @property {Format} formatter The default formatting strategy to convert this cipher params object to a string.
		     */
		    var CipherParams = C_lib.CipherParams = Base.extend({
		        /**
		         * Initializes a newly created cipher params object.
		         *
		         * @param {Object} cipherParams An object with any of the possible cipher parameters.
		         *
		         * @example
		         *
		         *     var cipherParams = CryptoJS.lib.CipherParams.create({
		         *         ciphertext: ciphertextWordArray,
		         *         key: keyWordArray,
		         *         iv: ivWordArray,
		         *         salt: saltWordArray,
		         *         algorithm: CryptoJS.algo.AES,
		         *         mode: CryptoJS.mode.CBC,
		         *         padding: CryptoJS.pad.PKCS7,
		         *         blockSize: 4,
		         *         formatter: CryptoJS.format.OpenSSL
		         *     });
		         */
		        init: function (cipherParams) {
		            this.mixIn(cipherParams);
		        },
	
		        /**
		         * Converts this cipher params object to a string.
		         *
		         * @param {Format} formatter (Optional) The formatting strategy to use.
		         *
		         * @return {string} The stringified cipher params.
		         *
		         * @throws Error If neither the formatter nor the default formatter is set.
		         *
		         * @example
		         *
		         *     var string = cipherParams + '';
		         *     var string = cipherParams.toString();
		         *     var string = cipherParams.toString(CryptoJS.format.OpenSSL);
		         */
		        toString: function (formatter) {
		            return (formatter || this.formatter).stringify(this);
		        }
		    });
	
		    /**
		     * Format namespace.
		     */
		    var C_format = C.format = {};
	
		    /**
		     * OpenSSL formatting strategy.
		     */
		    var OpenSSLFormatter = C_format.OpenSSL = {
		        /**
		         * Converts a cipher params object to an OpenSSL-compatible string.
		         *
		         * @param {CipherParams} cipherParams The cipher params object.
		         *
		         * @return {string} The OpenSSL-compatible string.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var openSSLString = CryptoJS.format.OpenSSL.stringify(cipherParams);
		         */
		        stringify: function (cipherParams) {
		            // Shortcuts
		            var ciphertext = cipherParams.ciphertext;
		            var salt = cipherParams.salt;
	
		            // Format
		            if (salt) {
		                var wordArray = WordArray.create([0x53616c74, 0x65645f5f]).concat(salt).concat(ciphertext);
		            } else {
		                var wordArray = ciphertext;
		            }
	
		            return wordArray.toString(Base64);
		        },
	
		        /**
		         * Converts an OpenSSL-compatible string to a cipher params object.
		         *
		         * @param {string} openSSLStr The OpenSSL-compatible string.
		         *
		         * @return {CipherParams} The cipher params object.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var cipherParams = CryptoJS.format.OpenSSL.parse(openSSLString);
		         */
		        parse: function (openSSLStr) {
		            // Parse base64
		            var ciphertext = Base64.parse(openSSLStr);
	
		            // Shortcut
		            var ciphertextWords = ciphertext.words;
	
		            // Test for salt
		            if (ciphertextWords[0] == 0x53616c74 && ciphertextWords[1] == 0x65645f5f) {
		                // Extract salt
		                var salt = WordArray.create(ciphertextWords.slice(2, 4));
	
		                // Remove salt from ciphertext
		                ciphertextWords.splice(0, 4);
		                ciphertext.sigBytes -= 16;
		            }
	
		            return CipherParams.create({ ciphertext: ciphertext, salt: salt });
		        }
		    };
	
		    /**
		     * A cipher wrapper that returns ciphertext as a serializable cipher params object.
		     */
		    var SerializableCipher = C_lib.SerializableCipher = Base.extend({
		        /**
		         * Configuration options.
		         *
		         * @property {Formatter} format The formatting strategy to convert cipher param objects to and from a string. Default: OpenSSL
		         */
		        cfg: Base.extend({
		            format: OpenSSLFormatter
		        }),
	
		        /**
		         * Encrypts a message.
		         *
		         * @param {Cipher} cipher The cipher algorithm to use.
		         * @param {WordArray|string} message The message to encrypt.
		         * @param {WordArray} key The key.
		         * @param {Object} cfg (Optional) The configuration options to use for this operation.
		         *
		         * @return {CipherParams} A cipher params object.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key);
		         *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key, { iv: iv });
		         *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key, { iv: iv, format: CryptoJS.format.OpenSSL });
		         */
		        encrypt: function (cipher, message, key, cfg) {
		            // Apply config defaults
		            cfg = this.cfg.extend(cfg);
	
		            // Encrypt
		            var encryptor = cipher.createEncryptor(key, cfg);
		            var ciphertext = encryptor.finalize(message);
	
		            // Shortcut
		            var cipherCfg = encryptor.cfg;
	
		            // Create and return serializable cipher params
		            return CipherParams.create({
		                ciphertext: ciphertext,
		                key: key,
		                iv: cipherCfg.iv,
		                algorithm: cipher,
		                mode: cipherCfg.mode,
		                padding: cipherCfg.padding,
		                blockSize: cipher.blockSize,
		                formatter: cfg.format
		            });
		        },
	
		        /**
		         * Decrypts serialized ciphertext.
		         *
		         * @param {Cipher} cipher The cipher algorithm to use.
		         * @param {CipherParams|string} ciphertext The ciphertext to decrypt.
		         * @param {WordArray} key The key.
		         * @param {Object} cfg (Optional) The configuration options to use for this operation.
		         *
		         * @return {WordArray} The plaintext.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var plaintext = CryptoJS.lib.SerializableCipher.decrypt(CryptoJS.algo.AES, formattedCiphertext, key, { iv: iv, format: CryptoJS.format.OpenSSL });
		         *     var plaintext = CryptoJS.lib.SerializableCipher.decrypt(CryptoJS.algo.AES, ciphertextParams, key, { iv: iv, format: CryptoJS.format.OpenSSL });
		         */
		        decrypt: function (cipher, ciphertext, key, cfg) {
		            // Apply config defaults
		            cfg = this.cfg.extend(cfg);
	
		            // Convert string to CipherParams
		            ciphertext = this._parse(ciphertext, cfg.format);
	
		            // Decrypt
		            var plaintext = cipher.createDecryptor(key, cfg).finalize(ciphertext.ciphertext);
	
		            return plaintext;
		        },
	
		        /**
		         * Converts serialized ciphertext to CipherParams,
		         * else assumed CipherParams already and returns ciphertext unchanged.
		         *
		         * @param {CipherParams|string} ciphertext The ciphertext.
		         * @param {Formatter} format The formatting strategy to use to parse serialized ciphertext.
		         *
		         * @return {CipherParams} The unserialized ciphertext.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var ciphertextParams = CryptoJS.lib.SerializableCipher._parse(ciphertextStringOrParams, format);
		         */
		        _parse: function (ciphertext, format) {
		            if (typeof ciphertext == 'string') {
		                return format.parse(ciphertext, this);
		            } else {
		                return ciphertext;
		            }
		        }
		    });
	
		    /**
		     * Key derivation function namespace.
		     */
		    var C_kdf = C.kdf = {};
	
		    /**
		     * OpenSSL key derivation function.
		     */
		    var OpenSSLKdf = C_kdf.OpenSSL = {
		        /**
		         * Derives a key and IV from a password.
		         *
		         * @param {string} password The password to derive from.
		         * @param {number} keySize The size in words of the key to generate.
		         * @param {number} ivSize The size in words of the IV to generate.
		         * @param {WordArray|string} salt (Optional) A 64-bit salt to use. If omitted, a salt will be generated randomly.
		         *
		         * @return {CipherParams} A cipher params object with the key, IV, and salt.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var derivedParams = CryptoJS.kdf.OpenSSL.execute('Password', 256/32, 128/32);
		         *     var derivedParams = CryptoJS.kdf.OpenSSL.execute('Password', 256/32, 128/32, 'saltsalt');
		         */
		        execute: function (password, keySize, ivSize, salt) {
		            // Generate random salt
		            if (!salt) {
		                salt = WordArray.random(64/8);
		            }
	
		            // Derive key and IV
		            var key = EvpKDF.create({ keySize: keySize + ivSize }).compute(password, salt);
	
		            // Separate key and IV
		            var iv = WordArray.create(key.words.slice(keySize), ivSize * 4);
		            key.sigBytes = keySize * 4;
	
		            // Return params
		            return CipherParams.create({ key: key, iv: iv, salt: salt });
		        }
		    };
	
		    /**
		     * A serializable cipher wrapper that derives the key from a password,
		     * and returns ciphertext as a serializable cipher params object.
		     */
		    var PasswordBasedCipher = C_lib.PasswordBasedCipher = SerializableCipher.extend({
		        /**
		         * Configuration options.
		         *
		         * @property {KDF} kdf The key derivation function to use to generate a key and IV from a password. Default: OpenSSL
		         */
		        cfg: SerializableCipher.cfg.extend({
		            kdf: OpenSSLKdf
		        }),
	
		        /**
		         * Encrypts a message using a password.
		         *
		         * @param {Cipher} cipher The cipher algorithm to use.
		         * @param {WordArray|string} message The message to encrypt.
		         * @param {string} password The password.
		         * @param {Object} cfg (Optional) The configuration options to use for this operation.
		         *
		         * @return {CipherParams} A cipher params object.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var ciphertextParams = CryptoJS.lib.PasswordBasedCipher.encrypt(CryptoJS.algo.AES, message, 'password');
		         *     var ciphertextParams = CryptoJS.lib.PasswordBasedCipher.encrypt(CryptoJS.algo.AES, message, 'password', { format: CryptoJS.format.OpenSSL });
		         */
		        encrypt: function (cipher, message, password, cfg) {
		            // Apply config defaults
		            cfg = this.cfg.extend(cfg);
	
		            // Derive key and other params
		            var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize);
	
		            // Add IV to config
		            cfg.iv = derivedParams.iv;
	
		            // Encrypt
		            var ciphertext = SerializableCipher.encrypt.call(this, cipher, message, derivedParams.key, cfg);
	
		            // Mix in derived params
		            ciphertext.mixIn(derivedParams);
	
		            return ciphertext;
		        },
	
		        /**
		         * Decrypts serialized ciphertext using a password.
		         *
		         * @param {Cipher} cipher The cipher algorithm to use.
		         * @param {CipherParams|string} ciphertext The ciphertext to decrypt.
		         * @param {string} password The password.
		         * @param {Object} cfg (Optional) The configuration options to use for this operation.
		         *
		         * @return {WordArray} The plaintext.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var plaintext = CryptoJS.lib.PasswordBasedCipher.decrypt(CryptoJS.algo.AES, formattedCiphertext, 'password', { format: CryptoJS.format.OpenSSL });
		         *     var plaintext = CryptoJS.lib.PasswordBasedCipher.decrypt(CryptoJS.algo.AES, ciphertextParams, 'password', { format: CryptoJS.format.OpenSSL });
		         */
		        decrypt: function (cipher, ciphertext, password, cfg) {
		            // Apply config defaults
		            cfg = this.cfg.extend(cfg);
	
		            // Convert string to CipherParams
		            ciphertext = this._parse(ciphertext, cfg.format);
	
		            // Derive key and other params
		            var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize, ciphertext.salt);
	
		            // Add IV to config
		            cfg.iv = derivedParams.iv;
	
		            // Decrypt
		            var plaintext = SerializableCipher.decrypt.call(this, cipher, ciphertext, derivedParams.key, cfg);
	
		            return plaintext;
		        }
		    });
		}());
	
	
	}));

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

	;(function (root, factory, undef) {
		if (true) {
			// CommonJS
			module.exports = exports = factory(__webpack_require__(28), __webpack_require__(44));
		}
		else if (typeof define === "function" && define.amd) {
			// AMD
			define(["./core", "./cipher-core"], factory);
		}
		else {
			// Global (browser)
			factory(root.CryptoJS);
		}
	}(this, function (CryptoJS) {
	
		/**
		 * Cipher Feedback block mode.
		 */
		CryptoJS.mode.CFB = (function () {
		    var CFB = CryptoJS.lib.BlockCipherMode.extend();
	
		    CFB.Encryptor = CFB.extend({
		        processBlock: function (words, offset) {
		            // Shortcuts
		            var cipher = this._cipher;
		            var blockSize = cipher.blockSize;
	
		            generateKeystreamAndEncrypt.call(this, words, offset, blockSize, cipher);
	
		            // Remember this block to use with next block
		            this._prevBlock = words.slice(offset, offset + blockSize);
		        }
		    });
	
		    CFB.Decryptor = CFB.extend({
		        processBlock: function (words, offset) {
		            // Shortcuts
		            var cipher = this._cipher;
		            var blockSize = cipher.blockSize;
	
		            // Remember this block to use with next block
		            var thisBlock = words.slice(offset, offset + blockSize);
	
		            generateKeystreamAndEncrypt.call(this, words, offset, blockSize, cipher);
	
		            // This block becomes the previous block
		            this._prevBlock = thisBlock;
		        }
		    });
	
		    function generateKeystreamAndEncrypt(words, offset, blockSize, cipher) {
		        // Shortcut
		        var iv = this._iv;
	
		        // Generate keystream
		        if (iv) {
		            var keystream = iv.slice(0);
	
		            // Remove IV for subsequent blocks
		            this._iv = undefined;
		        } else {
		            var keystream = this._prevBlock;
		        }
		        cipher.encryptBlock(keystream, 0);
	
		        // Encrypt
		        for (var i = 0; i < blockSize; i++) {
		            words[offset + i] ^= keystream[i];
		        }
		    }
	
		    return CFB;
		}());
	
	
		return CryptoJS.mode.CFB;
	
	}));

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

	;(function (root, factory, undef) {
		if (true) {
			// CommonJS
			module.exports = exports = factory(__webpack_require__(28), __webpack_require__(44));
		}
		else if (typeof define === "function" && define.amd) {
			// AMD
			define(["./core", "./cipher-core"], factory);
		}
		else {
			// Global (browser)
			factory(root.CryptoJS);
		}
	}(this, function (CryptoJS) {
	
		/**
		 * Counter block mode.
		 */
		CryptoJS.mode.CTR = (function () {
		    var CTR = CryptoJS.lib.BlockCipherMode.extend();
	
		    var Encryptor = CTR.Encryptor = CTR.extend({
		        processBlock: function (words, offset) {
		            // Shortcuts
		            var cipher = this._cipher
		            var blockSize = cipher.blockSize;
		            var iv = this._iv;
		            var counter = this._counter;
	
		            // Generate keystream
		            if (iv) {
		                counter = this._counter = iv.slice(0);
	
		                // Remove IV for subsequent blocks
		                this._iv = undefined;
		            }
		            var keystream = counter.slice(0);
		            cipher.encryptBlock(keystream, 0);
	
		            // Increment counter
		            counter[blockSize - 1] = (counter[blockSize - 1] + 1) | 0
	
		            // Encrypt
		            for (var i = 0; i < blockSize; i++) {
		                words[offset + i] ^= keystream[i];
		            }
		        }
		    });
	
		    CTR.Decryptor = Encryptor;
	
		    return CTR;
		}());
	
	
		return CryptoJS.mode.CTR;
	
	}));

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

	;(function (root, factory, undef) {
		if (true) {
			// CommonJS
			module.exports = exports = factory(__webpack_require__(28), __webpack_require__(44));
		}
		else if (typeof define === "function" && define.amd) {
			// AMD
			define(["./core", "./cipher-core"], factory);
		}
		else {
			// Global (browser)
			factory(root.CryptoJS);
		}
	}(this, function (CryptoJS) {
	
		/** @preserve
		 * Counter block mode compatible with  Dr Brian Gladman fileenc.c
		 * derived from CryptoJS.mode.CTR
		 * Jan Hruby jhruby.web@gmail.com
		 */
		CryptoJS.mode.CTRGladman = (function () {
		    var CTRGladman = CryptoJS.lib.BlockCipherMode.extend();
	
			function incWord(word)
			{
				if (((word >> 24) & 0xff) === 0xff) { //overflow
				var b1 = (word >> 16)&0xff;
				var b2 = (word >> 8)&0xff;
				var b3 = word & 0xff;
	
				if (b1 === 0xff) // overflow b1
				{
				b1 = 0;
				if (b2 === 0xff)
				{
					b2 = 0;
					if (b3 === 0xff)
					{
						b3 = 0;
					}
					else
					{
						++b3;
					}
				}
				else
				{
					++b2;
				}
				}
				else
				{
				++b1;
				}
	
				word = 0;
				word += (b1 << 16);
				word += (b2 << 8);
				word += b3;
				}
				else
				{
				word += (0x01 << 24);
				}
				return word;
			}
	
			function incCounter(counter)
			{
				if ((counter[0] = incWord(counter[0])) === 0)
				{
					// encr_data in fileenc.c from  Dr Brian Gladman's counts only with DWORD j < 8
					counter[1] = incWord(counter[1]);
				}
				return counter;
			}
	
		    var Encryptor = CTRGladman.Encryptor = CTRGladman.extend({
		        processBlock: function (words, offset) {
		            // Shortcuts
		            var cipher = this._cipher
		            var blockSize = cipher.blockSize;
		            var iv = this._iv;
		            var counter = this._counter;
	
		            // Generate keystream
		            if (iv) {
		                counter = this._counter = iv.slice(0);
	
		                // Remove IV for subsequent blocks
		                this._iv = undefined;
		            }
	
					incCounter(counter);
	
					var keystream = counter.slice(0);
		            cipher.encryptBlock(keystream, 0);
	
		            // Encrypt
		            for (var i = 0; i < blockSize; i++) {
		                words[offset + i] ^= keystream[i];
		            }
		        }
		    });
	
		    CTRGladman.Decryptor = Encryptor;
	
		    return CTRGladman;
		}());
	
	
	
	
		return CryptoJS.mode.CTRGladman;
	
	}));

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

	;(function (root, factory, undef) {
		if (true) {
			// CommonJS
			module.exports = exports = factory(__webpack_require__(28), __webpack_require__(44));
		}
		else if (typeof define === "function" && define.amd) {
			// AMD
			define(["./core", "./cipher-core"], factory);
		}
		else {
			// Global (browser)
			factory(root.CryptoJS);
		}
	}(this, function (CryptoJS) {
	
		/**
		 * Output Feedback block mode.
		 */
		CryptoJS.mode.OFB = (function () {
		    var OFB = CryptoJS.lib.BlockCipherMode.extend();
	
		    var Encryptor = OFB.Encryptor = OFB.extend({
		        processBlock: function (words, offset) {
		            // Shortcuts
		            var cipher = this._cipher
		            var blockSize = cipher.blockSize;
		            var iv = this._iv;
		            var keystream = this._keystream;
	
		            // Generate keystream
		            if (iv) {
		                keystream = this._keystream = iv.slice(0);
	
		                // Remove IV for subsequent blocks
		                this._iv = undefined;
		            }
		            cipher.encryptBlock(keystream, 0);
	
		            // Encrypt
		            for (var i = 0; i < blockSize; i++) {
		                words[offset + i] ^= keystream[i];
		            }
		        }
		    });
	
		    OFB.Decryptor = Encryptor;
	
		    return OFB;
		}());
	
	
		return CryptoJS.mode.OFB;
	
	}));

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

	;(function (root, factory, undef) {
		if (true) {
			// CommonJS
			module.exports = exports = factory(__webpack_require__(28), __webpack_require__(44));
		}
		else if (typeof define === "function" && define.amd) {
			// AMD
			define(["./core", "./cipher-core"], factory);
		}
		else {
			// Global (browser)
			factory(root.CryptoJS);
		}
	}(this, function (CryptoJS) {
	
		/**
		 * Electronic Codebook block mode.
		 */
		CryptoJS.mode.ECB = (function () {
		    var ECB = CryptoJS.lib.BlockCipherMode.extend();
	
		    ECB.Encryptor = ECB.extend({
		        processBlock: function (words, offset) {
		            this._cipher.encryptBlock(words, offset);
		        }
		    });
	
		    ECB.Decryptor = ECB.extend({
		        processBlock: function (words, offset) {
		            this._cipher.decryptBlock(words, offset);
		        }
		    });
	
		    return ECB;
		}());
	
	
		return CryptoJS.mode.ECB;
	
	}));

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

	;(function (root, factory, undef) {
		if (true) {
			// CommonJS
			module.exports = exports = factory(__webpack_require__(28), __webpack_require__(44));
		}
		else if (typeof define === "function" && define.amd) {
			// AMD
			define(["./core", "./cipher-core"], factory);
		}
		else {
			// Global (browser)
			factory(root.CryptoJS);
		}
	}(this, function (CryptoJS) {
	
		/**
		 * ANSI X.923 padding strategy.
		 */
		CryptoJS.pad.AnsiX923 = {
		    pad: function (data, blockSize) {
		        // Shortcuts
		        var dataSigBytes = data.sigBytes;
		        var blockSizeBytes = blockSize * 4;
	
		        // Count padding bytes
		        var nPaddingBytes = blockSizeBytes - dataSigBytes % blockSizeBytes;
	
		        // Compute last byte position
		        var lastBytePos = dataSigBytes + nPaddingBytes - 1;
	
		        // Pad
		        data.clamp();
		        data.words[lastBytePos >>> 2] |= nPaddingBytes << (24 - (lastBytePos % 4) * 8);
		        data.sigBytes += nPaddingBytes;
		    },
	
		    unpad: function (data) {
		        // Get number of padding bytes from last byte
		        var nPaddingBytes = data.words[(data.sigBytes - 1) >>> 2] & 0xff;
	
		        // Remove padding
		        data.sigBytes -= nPaddingBytes;
		    }
		};
	
	
		return CryptoJS.pad.Ansix923;
	
	}));

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

	;(function (root, factory, undef) {
		if (true) {
			// CommonJS
			module.exports = exports = factory(__webpack_require__(28), __webpack_require__(44));
		}
		else if (typeof define === "function" && define.amd) {
			// AMD
			define(["./core", "./cipher-core"], factory);
		}
		else {
			// Global (browser)
			factory(root.CryptoJS);
		}
	}(this, function (CryptoJS) {
	
		/**
		 * ISO 10126 padding strategy.
		 */
		CryptoJS.pad.Iso10126 = {
		    pad: function (data, blockSize) {
		        // Shortcut
		        var blockSizeBytes = blockSize * 4;
	
		        // Count padding bytes
		        var nPaddingBytes = blockSizeBytes - data.sigBytes % blockSizeBytes;
	
		        // Pad
		        data.concat(CryptoJS.lib.WordArray.random(nPaddingBytes - 1)).
		             concat(CryptoJS.lib.WordArray.create([nPaddingBytes << 24], 1));
		    },
	
		    unpad: function (data) {
		        // Get number of padding bytes from last byte
		        var nPaddingBytes = data.words[(data.sigBytes - 1) >>> 2] & 0xff;
	
		        // Remove padding
		        data.sigBytes -= nPaddingBytes;
		    }
		};
	
	
		return CryptoJS.pad.Iso10126;
	
	}));

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

	;(function (root, factory, undef) {
		if (true) {
			// CommonJS
			module.exports = exports = factory(__webpack_require__(28), __webpack_require__(44));
		}
		else if (typeof define === "function" && define.amd) {
			// AMD
			define(["./core", "./cipher-core"], factory);
		}
		else {
			// Global (browser)
			factory(root.CryptoJS);
		}
	}(this, function (CryptoJS) {
	
		/**
		 * ISO/IEC 9797-1 Padding Method 2.
		 */
		CryptoJS.pad.Iso97971 = {
		    pad: function (data, blockSize) {
		        // Add 0x80 byte
		        data.concat(CryptoJS.lib.WordArray.create([0x80000000], 1));
	
		        // Zero pad the rest
		        CryptoJS.pad.ZeroPadding.pad(data, blockSize);
		    },
	
		    unpad: function (data) {
		        // Remove zero padding
		        CryptoJS.pad.ZeroPadding.unpad(data);
	
		        // Remove one more byte -- the 0x80 byte
		        data.sigBytes--;
		    }
		};
	
	
		return CryptoJS.pad.Iso97971;
	
	}));

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

	;(function (root, factory, undef) {
		if (true) {
			// CommonJS
			module.exports = exports = factory(__webpack_require__(28), __webpack_require__(44));
		}
		else if (typeof define === "function" && define.amd) {
			// AMD
			define(["./core", "./cipher-core"], factory);
		}
		else {
			// Global (browser)
			factory(root.CryptoJS);
		}
	}(this, function (CryptoJS) {
	
		/**
		 * Zero padding strategy.
		 */
		CryptoJS.pad.ZeroPadding = {
		    pad: function (data, blockSize) {
		        // Shortcut
		        var blockSizeBytes = blockSize * 4;
	
		        // Pad
		        data.clamp();
		        data.sigBytes += blockSizeBytes - ((data.sigBytes % blockSizeBytes) || blockSizeBytes);
		    },
	
		    unpad: function (data) {
		        // Shortcut
		        var dataWords = data.words;
	
		        // Unpad
		        var i = data.sigBytes - 1;
		        while (!((dataWords[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff)) {
		            i--;
		        }
		        data.sigBytes = i + 1;
		    }
		};
	
	
		return CryptoJS.pad.ZeroPadding;
	
	}));

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

	;(function (root, factory, undef) {
		if (true) {
			// CommonJS
			module.exports = exports = factory(__webpack_require__(28), __webpack_require__(44));
		}
		else if (typeof define === "function" && define.amd) {
			// AMD
			define(["./core", "./cipher-core"], factory);
		}
		else {
			// Global (browser)
			factory(root.CryptoJS);
		}
	}(this, function (CryptoJS) {
	
		/**
		 * A noop padding strategy.
		 */
		CryptoJS.pad.NoPadding = {
		    pad: function () {
		    },
	
		    unpad: function () {
		    }
		};
	
	
		return CryptoJS.pad.NoPadding;
	
	}));

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

	;(function (root, factory, undef) {
		if (true) {
			// CommonJS
			module.exports = exports = factory(__webpack_require__(28), __webpack_require__(44));
		}
		else if (typeof define === "function" && define.amd) {
			// AMD
			define(["./core", "./cipher-core"], factory);
		}
		else {
			// Global (browser)
			factory(root.CryptoJS);
		}
	}(this, function (CryptoJS) {
	
		(function (undefined) {
		    // Shortcuts
		    var C = CryptoJS;
		    var C_lib = C.lib;
		    var CipherParams = C_lib.CipherParams;
		    var C_enc = C.enc;
		    var Hex = C_enc.Hex;
		    var C_format = C.format;
	
		    var HexFormatter = C_format.Hex = {
		        /**
		         * Converts the ciphertext of a cipher params object to a hexadecimally encoded string.
		         *
		         * @param {CipherParams} cipherParams The cipher params object.
		         *
		         * @return {string} The hexadecimally encoded string.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var hexString = CryptoJS.format.Hex.stringify(cipherParams);
		         */
		        stringify: function (cipherParams) {
		            return cipherParams.ciphertext.toString(Hex);
		        },
	
		        /**
		         * Converts a hexadecimally encoded ciphertext string to a cipher params object.
		         *
		         * @param {string} input The hexadecimally encoded string.
		         *
		         * @return {CipherParams} The cipher params object.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var cipherParams = CryptoJS.format.Hex.parse(hexString);
		         */
		        parse: function (input) {
		            var ciphertext = Hex.parse(input);
		            return CipherParams.create({ ciphertext: ciphertext });
		        }
		    };
		}());
	
	
		return CryptoJS.format.Hex;
	
	}));

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

	;(function (root, factory, undef) {
		if (true) {
			// CommonJS
			module.exports = exports = factory(__webpack_require__(28), __webpack_require__(32), __webpack_require__(33), __webpack_require__(43), __webpack_require__(44));
		}
		else if (typeof define === "function" && define.amd) {
			// AMD
			define(["./core", "./enc-base64", "./md5", "./evpkdf", "./cipher-core"], factory);
		}
		else {
			// Global (browser)
			factory(root.CryptoJS);
		}
	}(this, function (CryptoJS) {
	
		(function () {
		    // Shortcuts
		    var C = CryptoJS;
		    var C_lib = C.lib;
		    var BlockCipher = C_lib.BlockCipher;
		    var C_algo = C.algo;
	
		    // Lookup tables
		    var SBOX = [];
		    var INV_SBOX = [];
		    var SUB_MIX_0 = [];
		    var SUB_MIX_1 = [];
		    var SUB_MIX_2 = [];
		    var SUB_MIX_3 = [];
		    var INV_SUB_MIX_0 = [];
		    var INV_SUB_MIX_1 = [];
		    var INV_SUB_MIX_2 = [];
		    var INV_SUB_MIX_3 = [];
	
		    // Compute lookup tables
		    (function () {
		        // Compute double table
		        var d = [];
		        for (var i = 0; i < 256; i++) {
		            if (i < 128) {
		                d[i] = i << 1;
		            } else {
		                d[i] = (i << 1) ^ 0x11b;
		            }
		        }
	
		        // Walk GF(2^8)
		        var x = 0;
		        var xi = 0;
		        for (var i = 0; i < 256; i++) {
		            // Compute sbox
		            var sx = xi ^ (xi << 1) ^ (xi << 2) ^ (xi << 3) ^ (xi << 4);
		            sx = (sx >>> 8) ^ (sx & 0xff) ^ 0x63;
		            SBOX[x] = sx;
		            INV_SBOX[sx] = x;
	
		            // Compute multiplication
		            var x2 = d[x];
		            var x4 = d[x2];
		            var x8 = d[x4];
	
		            // Compute sub bytes, mix columns tables
		            var t = (d[sx] * 0x101) ^ (sx * 0x1010100);
		            SUB_MIX_0[x] = (t << 24) | (t >>> 8);
		            SUB_MIX_1[x] = (t << 16) | (t >>> 16);
		            SUB_MIX_2[x] = (t << 8)  | (t >>> 24);
		            SUB_MIX_3[x] = t;
	
		            // Compute inv sub bytes, inv mix columns tables
		            var t = (x8 * 0x1010101) ^ (x4 * 0x10001) ^ (x2 * 0x101) ^ (x * 0x1010100);
		            INV_SUB_MIX_0[sx] = (t << 24) | (t >>> 8);
		            INV_SUB_MIX_1[sx] = (t << 16) | (t >>> 16);
		            INV_SUB_MIX_2[sx] = (t << 8)  | (t >>> 24);
		            INV_SUB_MIX_3[sx] = t;
	
		            // Compute next counter
		            if (!x) {
		                x = xi = 1;
		            } else {
		                x = x2 ^ d[d[d[x8 ^ x2]]];
		                xi ^= d[d[xi]];
		            }
		        }
		    }());
	
		    // Precomputed Rcon lookup
		    var RCON = [0x00, 0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36];
	
		    /**
		     * AES block cipher algorithm.
		     */
		    var AES = C_algo.AES = BlockCipher.extend({
		        _doReset: function () {
		            // Skip reset of nRounds has been set before and key did not change
		            if (this._nRounds && this._keyPriorReset === this._key) {
		                return;
		            }
	
		            // Shortcuts
		            var key = this._keyPriorReset = this._key;
		            var keyWords = key.words;
		            var keySize = key.sigBytes / 4;
	
		            // Compute number of rounds
		            var nRounds = this._nRounds = keySize + 6;
	
		            // Compute number of key schedule rows
		            var ksRows = (nRounds + 1) * 4;
	
		            // Compute key schedule
		            var keySchedule = this._keySchedule = [];
		            for (var ksRow = 0; ksRow < ksRows; ksRow++) {
		                if (ksRow < keySize) {
		                    keySchedule[ksRow] = keyWords[ksRow];
		                } else {
		                    var t = keySchedule[ksRow - 1];
	
		                    if (!(ksRow % keySize)) {
		                        // Rot word
		                        t = (t << 8) | (t >>> 24);
	
		                        // Sub word
		                        t = (SBOX[t >>> 24] << 24) | (SBOX[(t >>> 16) & 0xff] << 16) | (SBOX[(t >>> 8) & 0xff] << 8) | SBOX[t & 0xff];
	
		                        // Mix Rcon
		                        t ^= RCON[(ksRow / keySize) | 0] << 24;
		                    } else if (keySize > 6 && ksRow % keySize == 4) {
		                        // Sub word
		                        t = (SBOX[t >>> 24] << 24) | (SBOX[(t >>> 16) & 0xff] << 16) | (SBOX[(t >>> 8) & 0xff] << 8) | SBOX[t & 0xff];
		                    }
	
		                    keySchedule[ksRow] = keySchedule[ksRow - keySize] ^ t;
		                }
		            }
	
		            // Compute inv key schedule
		            var invKeySchedule = this._invKeySchedule = [];
		            for (var invKsRow = 0; invKsRow < ksRows; invKsRow++) {
		                var ksRow = ksRows - invKsRow;
	
		                if (invKsRow % 4) {
		                    var t = keySchedule[ksRow];
		                } else {
		                    var t = keySchedule[ksRow - 4];
		                }
	
		                if (invKsRow < 4 || ksRow <= 4) {
		                    invKeySchedule[invKsRow] = t;
		                } else {
		                    invKeySchedule[invKsRow] = INV_SUB_MIX_0[SBOX[t >>> 24]] ^ INV_SUB_MIX_1[SBOX[(t >>> 16) & 0xff]] ^
		                                               INV_SUB_MIX_2[SBOX[(t >>> 8) & 0xff]] ^ INV_SUB_MIX_3[SBOX[t & 0xff]];
		                }
		            }
		        },
	
		        encryptBlock: function (M, offset) {
		            this._doCryptBlock(M, offset, this._keySchedule, SUB_MIX_0, SUB_MIX_1, SUB_MIX_2, SUB_MIX_3, SBOX);
		        },
	
		        decryptBlock: function (M, offset) {
		            // Swap 2nd and 4th rows
		            var t = M[offset + 1];
		            M[offset + 1] = M[offset + 3];
		            M[offset + 3] = t;
	
		            this._doCryptBlock(M, offset, this._invKeySchedule, INV_SUB_MIX_0, INV_SUB_MIX_1, INV_SUB_MIX_2, INV_SUB_MIX_3, INV_SBOX);
	
		            // Inv swap 2nd and 4th rows
		            var t = M[offset + 1];
		            M[offset + 1] = M[offset + 3];
		            M[offset + 3] = t;
		        },
	
		        _doCryptBlock: function (M, offset, keySchedule, SUB_MIX_0, SUB_MIX_1, SUB_MIX_2, SUB_MIX_3, SBOX) {
		            // Shortcut
		            var nRounds = this._nRounds;
	
		            // Get input, add round key
		            var s0 = M[offset]     ^ keySchedule[0];
		            var s1 = M[offset + 1] ^ keySchedule[1];
		            var s2 = M[offset + 2] ^ keySchedule[2];
		            var s3 = M[offset + 3] ^ keySchedule[3];
	
		            // Key schedule row counter
		            var ksRow = 4;
	
		            // Rounds
		            for (var round = 1; round < nRounds; round++) {
		                // Shift rows, sub bytes, mix columns, add round key
		                var t0 = SUB_MIX_0[s0 >>> 24] ^ SUB_MIX_1[(s1 >>> 16) & 0xff] ^ SUB_MIX_2[(s2 >>> 8) & 0xff] ^ SUB_MIX_3[s3 & 0xff] ^ keySchedule[ksRow++];
		                var t1 = SUB_MIX_0[s1 >>> 24] ^ SUB_MIX_1[(s2 >>> 16) & 0xff] ^ SUB_MIX_2[(s3 >>> 8) & 0xff] ^ SUB_MIX_3[s0 & 0xff] ^ keySchedule[ksRow++];
		                var t2 = SUB_MIX_0[s2 >>> 24] ^ SUB_MIX_1[(s3 >>> 16) & 0xff] ^ SUB_MIX_2[(s0 >>> 8) & 0xff] ^ SUB_MIX_3[s1 & 0xff] ^ keySchedule[ksRow++];
		                var t3 = SUB_MIX_0[s3 >>> 24] ^ SUB_MIX_1[(s0 >>> 16) & 0xff] ^ SUB_MIX_2[(s1 >>> 8) & 0xff] ^ SUB_MIX_3[s2 & 0xff] ^ keySchedule[ksRow++];
	
		                // Update state
		                s0 = t0;
		                s1 = t1;
		                s2 = t2;
		                s3 = t3;
		            }
	
		            // Shift rows, sub bytes, add round key
		            var t0 = ((SBOX[s0 >>> 24] << 24) | (SBOX[(s1 >>> 16) & 0xff] << 16) | (SBOX[(s2 >>> 8) & 0xff] << 8) | SBOX[s3 & 0xff]) ^ keySchedule[ksRow++];
		            var t1 = ((SBOX[s1 >>> 24] << 24) | (SBOX[(s2 >>> 16) & 0xff] << 16) | (SBOX[(s3 >>> 8) & 0xff] << 8) | SBOX[s0 & 0xff]) ^ keySchedule[ksRow++];
		            var t2 = ((SBOX[s2 >>> 24] << 24) | (SBOX[(s3 >>> 16) & 0xff] << 16) | (SBOX[(s0 >>> 8) & 0xff] << 8) | SBOX[s1 & 0xff]) ^ keySchedule[ksRow++];
		            var t3 = ((SBOX[s3 >>> 24] << 24) | (SBOX[(s0 >>> 16) & 0xff] << 16) | (SBOX[(s1 >>> 8) & 0xff] << 8) | SBOX[s2 & 0xff]) ^ keySchedule[ksRow++];
	
		            // Set output
		            M[offset]     = t0;
		            M[offset + 1] = t1;
		            M[offset + 2] = t2;
		            M[offset + 3] = t3;
		        },
	
		        keySize: 256/32
		    });
	
		    /**
		     * Shortcut functions to the cipher's object interface.
		     *
		     * @example
		     *
		     *     var ciphertext = CryptoJS.AES.encrypt(message, key, cfg);
		     *     var plaintext  = CryptoJS.AES.decrypt(ciphertext, key, cfg);
		     */
		    C.AES = BlockCipher._createHelper(AES);
		}());
	
	
		return CryptoJS.AES;
	
	}));

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

	;(function (root, factory, undef) {
		if (true) {
			// CommonJS
			module.exports = exports = factory(__webpack_require__(28), __webpack_require__(32), __webpack_require__(33), __webpack_require__(43), __webpack_require__(44));
		}
		else if (typeof define === "function" && define.amd) {
			// AMD
			define(["./core", "./enc-base64", "./md5", "./evpkdf", "./cipher-core"], factory);
		}
		else {
			// Global (browser)
			factory(root.CryptoJS);
		}
	}(this, function (CryptoJS) {
	
		(function () {
		    // Shortcuts
		    var C = CryptoJS;
		    var C_lib = C.lib;
		    var WordArray = C_lib.WordArray;
		    var BlockCipher = C_lib.BlockCipher;
		    var C_algo = C.algo;
	
		    // Permuted Choice 1 constants
		    var PC1 = [
		        57, 49, 41, 33, 25, 17, 9,  1,
		        58, 50, 42, 34, 26, 18, 10, 2,
		        59, 51, 43, 35, 27, 19, 11, 3,
		        60, 52, 44, 36, 63, 55, 47, 39,
		        31, 23, 15, 7,  62, 54, 46, 38,
		        30, 22, 14, 6,  61, 53, 45, 37,
		        29, 21, 13, 5,  28, 20, 12, 4
		    ];
	
		    // Permuted Choice 2 constants
		    var PC2 = [
		        14, 17, 11, 24, 1,  5,
		        3,  28, 15, 6,  21, 10,
		        23, 19, 12, 4,  26, 8,
		        16, 7,  27, 20, 13, 2,
		        41, 52, 31, 37, 47, 55,
		        30, 40, 51, 45, 33, 48,
		        44, 49, 39, 56, 34, 53,
		        46, 42, 50, 36, 29, 32
		    ];
	
		    // Cumulative bit shift constants
		    var BIT_SHIFTS = [1,  2,  4,  6,  8,  10, 12, 14, 15, 17, 19, 21, 23, 25, 27, 28];
	
		    // SBOXes and round permutation constants
		    var SBOX_P = [
		        {
		            0x0: 0x808200,
		            0x10000000: 0x8000,
		            0x20000000: 0x808002,
		            0x30000000: 0x2,
		            0x40000000: 0x200,
		            0x50000000: 0x808202,
		            0x60000000: 0x800202,
		            0x70000000: 0x800000,
		            0x80000000: 0x202,
		            0x90000000: 0x800200,
		            0xa0000000: 0x8200,
		            0xb0000000: 0x808000,
		            0xc0000000: 0x8002,
		            0xd0000000: 0x800002,
		            0xe0000000: 0x0,
		            0xf0000000: 0x8202,
		            0x8000000: 0x0,
		            0x18000000: 0x808202,
		            0x28000000: 0x8202,
		            0x38000000: 0x8000,
		            0x48000000: 0x808200,
		            0x58000000: 0x200,
		            0x68000000: 0x808002,
		            0x78000000: 0x2,
		            0x88000000: 0x800200,
		            0x98000000: 0x8200,
		            0xa8000000: 0x808000,
		            0xb8000000: 0x800202,
		            0xc8000000: 0x800002,
		            0xd8000000: 0x8002,
		            0xe8000000: 0x202,
		            0xf8000000: 0x800000,
		            0x1: 0x8000,
		            0x10000001: 0x2,
		            0x20000001: 0x808200,
		            0x30000001: 0x800000,
		            0x40000001: 0x808002,
		            0x50000001: 0x8200,
		            0x60000001: 0x200,
		            0x70000001: 0x800202,
		            0x80000001: 0x808202,
		            0x90000001: 0x808000,
		            0xa0000001: 0x800002,
		            0xb0000001: 0x8202,
		            0xc0000001: 0x202,
		            0xd0000001: 0x800200,
		            0xe0000001: 0x8002,
		            0xf0000001: 0x0,
		            0x8000001: 0x808202,
		            0x18000001: 0x808000,
		            0x28000001: 0x800000,
		            0x38000001: 0x200,
		            0x48000001: 0x8000,
		            0x58000001: 0x800002,
		            0x68000001: 0x2,
		            0x78000001: 0x8202,
		            0x88000001: 0x8002,
		            0x98000001: 0x800202,
		            0xa8000001: 0x202,
		            0xb8000001: 0x808200,
		            0xc8000001: 0x800200,
		            0xd8000001: 0x0,
		            0xe8000001: 0x8200,
		            0xf8000001: 0x808002
		        },
		        {
		            0x0: 0x40084010,
		            0x1000000: 0x4000,
		            0x2000000: 0x80000,
		            0x3000000: 0x40080010,
		            0x4000000: 0x40000010,
		            0x5000000: 0x40084000,
		            0x6000000: 0x40004000,
		            0x7000000: 0x10,
		            0x8000000: 0x84000,
		            0x9000000: 0x40004010,
		            0xa000000: 0x40000000,
		            0xb000000: 0x84010,
		            0xc000000: 0x80010,
		            0xd000000: 0x0,
		            0xe000000: 0x4010,
		            0xf000000: 0x40080000,
		            0x800000: 0x40004000,
		            0x1800000: 0x84010,
		            0x2800000: 0x10,
		            0x3800000: 0x40004010,
		            0x4800000: 0x40084010,
		            0x5800000: 0x40000000,
		            0x6800000: 0x80000,
		            0x7800000: 0x40080010,
		            0x8800000: 0x80010,
		            0x9800000: 0x0,
		            0xa800000: 0x4000,
		            0xb800000: 0x40080000,
		            0xc800000: 0x40000010,
		            0xd800000: 0x84000,
		            0xe800000: 0x40084000,
		            0xf800000: 0x4010,
		            0x10000000: 0x0,
		            0x11000000: 0x40080010,
		            0x12000000: 0x40004010,
		            0x13000000: 0x40084000,
		            0x14000000: 0x40080000,
		            0x15000000: 0x10,
		            0x16000000: 0x84010,
		            0x17000000: 0x4000,
		            0x18000000: 0x4010,
		            0x19000000: 0x80000,
		            0x1a000000: 0x80010,
		            0x1b000000: 0x40000010,
		            0x1c000000: 0x84000,
		            0x1d000000: 0x40004000,
		            0x1e000000: 0x40000000,
		            0x1f000000: 0x40084010,
		            0x10800000: 0x84010,
		            0x11800000: 0x80000,
		            0x12800000: 0x40080000,
		            0x13800000: 0x4000,
		            0x14800000: 0x40004000,
		            0x15800000: 0x40084010,
		            0x16800000: 0x10,
		            0x17800000: 0x40000000,
		            0x18800000: 0x40084000,
		            0x19800000: 0x40000010,
		            0x1a800000: 0x40004010,
		            0x1b800000: 0x80010,
		            0x1c800000: 0x0,
		            0x1d800000: 0x4010,
		            0x1e800000: 0x40080010,
		            0x1f800000: 0x84000
		        },
		        {
		            0x0: 0x104,
		            0x100000: 0x0,
		            0x200000: 0x4000100,
		            0x300000: 0x10104,
		            0x400000: 0x10004,
		            0x500000: 0x4000004,
		            0x600000: 0x4010104,
		            0x700000: 0x4010000,
		            0x800000: 0x4000000,
		            0x900000: 0x4010100,
		            0xa00000: 0x10100,
		            0xb00000: 0x4010004,
		            0xc00000: 0x4000104,
		            0xd00000: 0x10000,
		            0xe00000: 0x4,
		            0xf00000: 0x100,
		            0x80000: 0x4010100,
		            0x180000: 0x4010004,
		            0x280000: 0x0,
		            0x380000: 0x4000100,
		            0x480000: 0x4000004,
		            0x580000: 0x10000,
		            0x680000: 0x10004,
		            0x780000: 0x104,
		            0x880000: 0x4,
		            0x980000: 0x100,
		            0xa80000: 0x4010000,
		            0xb80000: 0x10104,
		            0xc80000: 0x10100,
		            0xd80000: 0x4000104,
		            0xe80000: 0x4010104,
		            0xf80000: 0x4000000,
		            0x1000000: 0x4010100,
		            0x1100000: 0x10004,
		            0x1200000: 0x10000,
		            0x1300000: 0x4000100,
		            0x1400000: 0x100,
		            0x1500000: 0x4010104,
		            0x1600000: 0x4000004,
		            0x1700000: 0x0,
		            0x1800000: 0x4000104,
		            0x1900000: 0x4000000,
		            0x1a00000: 0x4,
		            0x1b00000: 0x10100,
		            0x1c00000: 0x4010000,
		            0x1d00000: 0x104,
		            0x1e00000: 0x10104,
		            0x1f00000: 0x4010004,
		            0x1080000: 0x4000000,
		            0x1180000: 0x104,
		            0x1280000: 0x4010100,
		            0x1380000: 0x0,
		            0x1480000: 0x10004,
		            0x1580000: 0x4000100,
		            0x1680000: 0x100,
		            0x1780000: 0x4010004,
		            0x1880000: 0x10000,
		            0x1980000: 0x4010104,
		            0x1a80000: 0x10104,
		            0x1b80000: 0x4000004,
		            0x1c80000: 0x4000104,
		            0x1d80000: 0x4010000,
		            0x1e80000: 0x4,
		            0x1f80000: 0x10100
		        },
		        {
		            0x0: 0x80401000,
		            0x10000: 0x80001040,
		            0x20000: 0x401040,
		            0x30000: 0x80400000,
		            0x40000: 0x0,
		            0x50000: 0x401000,
		            0x60000: 0x80000040,
		            0x70000: 0x400040,
		            0x80000: 0x80000000,
		            0x90000: 0x400000,
		            0xa0000: 0x40,
		            0xb0000: 0x80001000,
		            0xc0000: 0x80400040,
		            0xd0000: 0x1040,
		            0xe0000: 0x1000,
		            0xf0000: 0x80401040,
		            0x8000: 0x80001040,
		            0x18000: 0x40,
		            0x28000: 0x80400040,
		            0x38000: 0x80001000,
		            0x48000: 0x401000,
		            0x58000: 0x80401040,
		            0x68000: 0x0,
		            0x78000: 0x80400000,
		            0x88000: 0x1000,
		            0x98000: 0x80401000,
		            0xa8000: 0x400000,
		            0xb8000: 0x1040,
		            0xc8000: 0x80000000,
		            0xd8000: 0x400040,
		            0xe8000: 0x401040,
		            0xf8000: 0x80000040,
		            0x100000: 0x400040,
		            0x110000: 0x401000,
		            0x120000: 0x80000040,
		            0x130000: 0x0,
		            0x140000: 0x1040,
		            0x150000: 0x80400040,
		            0x160000: 0x80401000,
		            0x170000: 0x80001040,
		            0x180000: 0x80401040,
		            0x190000: 0x80000000,
		            0x1a0000: 0x80400000,
		            0x1b0000: 0x401040,
		            0x1c0000: 0x80001000,
		            0x1d0000: 0x400000,
		            0x1e0000: 0x40,
		            0x1f0000: 0x1000,
		            0x108000: 0x80400000,
		            0x118000: 0x80401040,
		            0x128000: 0x0,
		            0x138000: 0x401000,
		            0x148000: 0x400040,
		            0x158000: 0x80000000,
		            0x168000: 0x80001040,
		            0x178000: 0x40,
		            0x188000: 0x80000040,
		            0x198000: 0x1000,
		            0x1a8000: 0x80001000,
		            0x1b8000: 0x80400040,
		            0x1c8000: 0x1040,
		            0x1d8000: 0x80401000,
		            0x1e8000: 0x400000,
		            0x1f8000: 0x401040
		        },
		        {
		            0x0: 0x80,
		            0x1000: 0x1040000,
		            0x2000: 0x40000,
		            0x3000: 0x20000000,
		            0x4000: 0x20040080,
		            0x5000: 0x1000080,
		            0x6000: 0x21000080,
		            0x7000: 0x40080,
		            0x8000: 0x1000000,
		            0x9000: 0x20040000,
		            0xa000: 0x20000080,
		            0xb000: 0x21040080,
		            0xc000: 0x21040000,
		            0xd000: 0x0,
		            0xe000: 0x1040080,
		            0xf000: 0x21000000,
		            0x800: 0x1040080,
		            0x1800: 0x21000080,
		            0x2800: 0x80,
		            0x3800: 0x1040000,
		            0x4800: 0x40000,
		            0x5800: 0x20040080,
		            0x6800: 0x21040000,
		            0x7800: 0x20000000,
		            0x8800: 0x20040000,
		            0x9800: 0x0,
		            0xa800: 0x21040080,
		            0xb800: 0x1000080,
		            0xc800: 0x20000080,
		            0xd800: 0x21000000,
		            0xe800: 0x1000000,
		            0xf800: 0x40080,
		            0x10000: 0x40000,
		            0x11000: 0x80,
		            0x12000: 0x20000000,
		            0x13000: 0x21000080,
		            0x14000: 0x1000080,
		            0x15000: 0x21040000,
		            0x16000: 0x20040080,
		            0x17000: 0x1000000,
		            0x18000: 0x21040080,
		            0x19000: 0x21000000,
		            0x1a000: 0x1040000,
		            0x1b000: 0x20040000,
		            0x1c000: 0x40080,
		            0x1d000: 0x20000080,
		            0x1e000: 0x0,
		            0x1f000: 0x1040080,
		            0x10800: 0x21000080,
		            0x11800: 0x1000000,
		            0x12800: 0x1040000,
		            0x13800: 0x20040080,
		            0x14800: 0x20000000,
		            0x15800: 0x1040080,
		            0x16800: 0x80,
		            0x17800: 0x21040000,
		            0x18800: 0x40080,
		            0x19800: 0x21040080,
		            0x1a800: 0x0,
		            0x1b800: 0x21000000,
		            0x1c800: 0x1000080,
		            0x1d800: 0x40000,
		            0x1e800: 0x20040000,
		            0x1f800: 0x20000080
		        },
		        {
		            0x0: 0x10000008,
		            0x100: 0x2000,
		            0x200: 0x10200000,
		            0x300: 0x10202008,
		            0x400: 0x10002000,
		            0x500: 0x200000,
		            0x600: 0x200008,
		            0x700: 0x10000000,
		            0x800: 0x0,
		            0x900: 0x10002008,
		            0xa00: 0x202000,
		            0xb00: 0x8,
		            0xc00: 0x10200008,
		            0xd00: 0x202008,
		            0xe00: 0x2008,
		            0xf00: 0x10202000,
		            0x80: 0x10200000,
		            0x180: 0x10202008,
		            0x280: 0x8,
		            0x380: 0x200000,
		            0x480: 0x202008,
		            0x580: 0x10000008,
		            0x680: 0x10002000,
		            0x780: 0x2008,
		            0x880: 0x200008,
		            0x980: 0x2000,
		            0xa80: 0x10002008,
		            0xb80: 0x10200008,
		            0xc80: 0x0,
		            0xd80: 0x10202000,
		            0xe80: 0x202000,
		            0xf80: 0x10000000,
		            0x1000: 0x10002000,
		            0x1100: 0x10200008,
		            0x1200: 0x10202008,
		            0x1300: 0x2008,
		            0x1400: 0x200000,
		            0x1500: 0x10000000,
		            0x1600: 0x10000008,
		            0x1700: 0x202000,
		            0x1800: 0x202008,
		            0x1900: 0x0,
		            0x1a00: 0x8,
		            0x1b00: 0x10200000,
		            0x1c00: 0x2000,
		            0x1d00: 0x10002008,
		            0x1e00: 0x10202000,
		            0x1f00: 0x200008,
		            0x1080: 0x8,
		            0x1180: 0x202000,
		            0x1280: 0x200000,
		            0x1380: 0x10000008,
		            0x1480: 0x10002000,
		            0x1580: 0x2008,
		            0x1680: 0x10202008,
		            0x1780: 0x10200000,
		            0x1880: 0x10202000,
		            0x1980: 0x10200008,
		            0x1a80: 0x2000,
		            0x1b80: 0x202008,
		            0x1c80: 0x200008,
		            0x1d80: 0x0,
		            0x1e80: 0x10000000,
		            0x1f80: 0x10002008
		        },
		        {
		            0x0: 0x100000,
		            0x10: 0x2000401,
		            0x20: 0x400,
		            0x30: 0x100401,
		            0x40: 0x2100401,
		            0x50: 0x0,
		            0x60: 0x1,
		            0x70: 0x2100001,
		            0x80: 0x2000400,
		            0x90: 0x100001,
		            0xa0: 0x2000001,
		            0xb0: 0x2100400,
		            0xc0: 0x2100000,
		            0xd0: 0x401,
		            0xe0: 0x100400,
		            0xf0: 0x2000000,
		            0x8: 0x2100001,
		            0x18: 0x0,
		            0x28: 0x2000401,
		            0x38: 0x2100400,
		            0x48: 0x100000,
		            0x58: 0x2000001,
		            0x68: 0x2000000,
		            0x78: 0x401,
		            0x88: 0x100401,
		            0x98: 0x2000400,
		            0xa8: 0x2100000,
		            0xb8: 0x100001,
		            0xc8: 0x400,
		            0xd8: 0x2100401,
		            0xe8: 0x1,
		            0xf8: 0x100400,
		            0x100: 0x2000000,
		            0x110: 0x100000,
		            0x120: 0x2000401,
		            0x130: 0x2100001,
		            0x140: 0x100001,
		            0x150: 0x2000400,
		            0x160: 0x2100400,
		            0x170: 0x100401,
		            0x180: 0x401,
		            0x190: 0x2100401,
		            0x1a0: 0x100400,
		            0x1b0: 0x1,
		            0x1c0: 0x0,
		            0x1d0: 0x2100000,
		            0x1e0: 0x2000001,
		            0x1f0: 0x400,
		            0x108: 0x100400,
		            0x118: 0x2000401,
		            0x128: 0x2100001,
		            0x138: 0x1,
		            0x148: 0x2000000,
		            0x158: 0x100000,
		            0x168: 0x401,
		            0x178: 0x2100400,
		            0x188: 0x2000001,
		            0x198: 0x2100000,
		            0x1a8: 0x0,
		            0x1b8: 0x2100401,
		            0x1c8: 0x100401,
		            0x1d8: 0x400,
		            0x1e8: 0x2000400,
		            0x1f8: 0x100001
		        },
		        {
		            0x0: 0x8000820,
		            0x1: 0x20000,
		            0x2: 0x8000000,
		            0x3: 0x20,
		            0x4: 0x20020,
		            0x5: 0x8020820,
		            0x6: 0x8020800,
		            0x7: 0x800,
		            0x8: 0x8020000,
		            0x9: 0x8000800,
		            0xa: 0x20800,
		            0xb: 0x8020020,
		            0xc: 0x820,
		            0xd: 0x0,
		            0xe: 0x8000020,
		            0xf: 0x20820,
		            0x80000000: 0x800,
		            0x80000001: 0x8020820,
		            0x80000002: 0x8000820,
		            0x80000003: 0x8000000,
		            0x80000004: 0x8020000,
		            0x80000005: 0x20800,
		            0x80000006: 0x20820,
		            0x80000007: 0x20,
		            0x80000008: 0x8000020,
		            0x80000009: 0x820,
		            0x8000000a: 0x20020,
		            0x8000000b: 0x8020800,
		            0x8000000c: 0x0,
		            0x8000000d: 0x8020020,
		            0x8000000e: 0x8000800,
		            0x8000000f: 0x20000,
		            0x10: 0x20820,
		            0x11: 0x8020800,
		            0x12: 0x20,
		            0x13: 0x800,
		            0x14: 0x8000800,
		            0x15: 0x8000020,
		            0x16: 0x8020020,
		            0x17: 0x20000,
		            0x18: 0x0,
		            0x19: 0x20020,
		            0x1a: 0x8020000,
		            0x1b: 0x8000820,
		            0x1c: 0x8020820,
		            0x1d: 0x20800,
		            0x1e: 0x820,
		            0x1f: 0x8000000,
		            0x80000010: 0x20000,
		            0x80000011: 0x800,
		            0x80000012: 0x8020020,
		            0x80000013: 0x20820,
		            0x80000014: 0x20,
		            0x80000015: 0x8020000,
		            0x80000016: 0x8000000,
		            0x80000017: 0x8000820,
		            0x80000018: 0x8020820,
		            0x80000019: 0x8000020,
		            0x8000001a: 0x8000800,
		            0x8000001b: 0x0,
		            0x8000001c: 0x20800,
		            0x8000001d: 0x820,
		            0x8000001e: 0x20020,
		            0x8000001f: 0x8020800
		        }
		    ];
	
		    // Masks that select the SBOX input
		    var SBOX_MASK = [
		        0xf8000001, 0x1f800000, 0x01f80000, 0x001f8000,
		        0x0001f800, 0x00001f80, 0x000001f8, 0x8000001f
		    ];
	
		    /**
		     * DES block cipher algorithm.
		     */
		    var DES = C_algo.DES = BlockCipher.extend({
		        _doReset: function () {
		            // Shortcuts
		            var key = this._key;
		            var keyWords = key.words;
	
		            // Select 56 bits according to PC1
		            var keyBits = [];
		            for (var i = 0; i < 56; i++) {
		                var keyBitPos = PC1[i] - 1;
		                keyBits[i] = (keyWords[keyBitPos >>> 5] >>> (31 - keyBitPos % 32)) & 1;
		            }
	
		            // Assemble 16 subkeys
		            var subKeys = this._subKeys = [];
		            for (var nSubKey = 0; nSubKey < 16; nSubKey++) {
		                // Create subkey
		                var subKey = subKeys[nSubKey] = [];
	
		                // Shortcut
		                var bitShift = BIT_SHIFTS[nSubKey];
	
		                // Select 48 bits according to PC2
		                for (var i = 0; i < 24; i++) {
		                    // Select from the left 28 key bits
		                    subKey[(i / 6) | 0] |= keyBits[((PC2[i] - 1) + bitShift) % 28] << (31 - i % 6);
	
		                    // Select from the right 28 key bits
		                    subKey[4 + ((i / 6) | 0)] |= keyBits[28 + (((PC2[i + 24] - 1) + bitShift) % 28)] << (31 - i % 6);
		                }
	
		                // Since each subkey is applied to an expanded 32-bit input,
		                // the subkey can be broken into 8 values scaled to 32-bits,
		                // which allows the key to be used without expansion
		                subKey[0] = (subKey[0] << 1) | (subKey[0] >>> 31);
		                for (var i = 1; i < 7; i++) {
		                    subKey[i] = subKey[i] >>> ((i - 1) * 4 + 3);
		                }
		                subKey[7] = (subKey[7] << 5) | (subKey[7] >>> 27);
		            }
	
		            // Compute inverse subkeys
		            var invSubKeys = this._invSubKeys = [];
		            for (var i = 0; i < 16; i++) {
		                invSubKeys[i] = subKeys[15 - i];
		            }
		        },
	
		        encryptBlock: function (M, offset) {
		            this._doCryptBlock(M, offset, this._subKeys);
		        },
	
		        decryptBlock: function (M, offset) {
		            this._doCryptBlock(M, offset, this._invSubKeys);
		        },
	
		        _doCryptBlock: function (M, offset, subKeys) {
		            // Get input
		            this._lBlock = M[offset];
		            this._rBlock = M[offset + 1];
	
		            // Initial permutation
		            exchangeLR.call(this, 4,  0x0f0f0f0f);
		            exchangeLR.call(this, 16, 0x0000ffff);
		            exchangeRL.call(this, 2,  0x33333333);
		            exchangeRL.call(this, 8,  0x00ff00ff);
		            exchangeLR.call(this, 1,  0x55555555);
	
		            // Rounds
		            for (var round = 0; round < 16; round++) {
		                // Shortcuts
		                var subKey = subKeys[round];
		                var lBlock = this._lBlock;
		                var rBlock = this._rBlock;
	
		                // Feistel function
		                var f = 0;
		                for (var i = 0; i < 8; i++) {
		                    f |= SBOX_P[i][((rBlock ^ subKey[i]) & SBOX_MASK[i]) >>> 0];
		                }
		                this._lBlock = rBlock;
		                this._rBlock = lBlock ^ f;
		            }
	
		            // Undo swap from last round
		            var t = this._lBlock;
		            this._lBlock = this._rBlock;
		            this._rBlock = t;
	
		            // Final permutation
		            exchangeLR.call(this, 1,  0x55555555);
		            exchangeRL.call(this, 8,  0x00ff00ff);
		            exchangeRL.call(this, 2,  0x33333333);
		            exchangeLR.call(this, 16, 0x0000ffff);
		            exchangeLR.call(this, 4,  0x0f0f0f0f);
	
		            // Set output
		            M[offset] = this._lBlock;
		            M[offset + 1] = this._rBlock;
		        },
	
		        keySize: 64/32,
	
		        ivSize: 64/32,
	
		        blockSize: 64/32
		    });
	
		    // Swap bits across the left and right words
		    function exchangeLR(offset, mask) {
		        var t = ((this._lBlock >>> offset) ^ this._rBlock) & mask;
		        this._rBlock ^= t;
		        this._lBlock ^= t << offset;
		    }
	
		    function exchangeRL(offset, mask) {
		        var t = ((this._rBlock >>> offset) ^ this._lBlock) & mask;
		        this._lBlock ^= t;
		        this._rBlock ^= t << offset;
		    }
	
		    /**
		     * Shortcut functions to the cipher's object interface.
		     *
		     * @example
		     *
		     *     var ciphertext = CryptoJS.DES.encrypt(message, key, cfg);
		     *     var plaintext  = CryptoJS.DES.decrypt(ciphertext, key, cfg);
		     */
		    C.DES = BlockCipher._createHelper(DES);
	
		    /**
		     * Triple-DES block cipher algorithm.
		     */
		    var TripleDES = C_algo.TripleDES = BlockCipher.extend({
		        _doReset: function () {
		            // Shortcuts
		            var key = this._key;
		            var keyWords = key.words;
	
		            // Create DES instances
		            this._des1 = DES.createEncryptor(WordArray.create(keyWords.slice(0, 2)));
		            this._des2 = DES.createEncryptor(WordArray.create(keyWords.slice(2, 4)));
		            this._des3 = DES.createEncryptor(WordArray.create(keyWords.slice(4, 6)));
		        },
	
		        encryptBlock: function (M, offset) {
		            this._des1.encryptBlock(M, offset);
		            this._des2.decryptBlock(M, offset);
		            this._des3.encryptBlock(M, offset);
		        },
	
		        decryptBlock: function (M, offset) {
		            this._des3.decryptBlock(M, offset);
		            this._des2.encryptBlock(M, offset);
		            this._des1.decryptBlock(M, offset);
		        },
	
		        keySize: 192/32,
	
		        ivSize: 64/32,
	
		        blockSize: 64/32
		    });
	
		    /**
		     * Shortcut functions to the cipher's object interface.
		     *
		     * @example
		     *
		     *     var ciphertext = CryptoJS.TripleDES.encrypt(message, key, cfg);
		     *     var plaintext  = CryptoJS.TripleDES.decrypt(ciphertext, key, cfg);
		     */
		    C.TripleDES = BlockCipher._createHelper(TripleDES);
		}());
	
	
		return CryptoJS.TripleDES;
	
	}));

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

	;(function (root, factory, undef) {
		if (true) {
			// CommonJS
			module.exports = exports = factory(__webpack_require__(28), __webpack_require__(32), __webpack_require__(33), __webpack_require__(43), __webpack_require__(44));
		}
		else if (typeof define === "function" && define.amd) {
			// AMD
			define(["./core", "./enc-base64", "./md5", "./evpkdf", "./cipher-core"], factory);
		}
		else {
			// Global (browser)
			factory(root.CryptoJS);
		}
	}(this, function (CryptoJS) {
	
		(function () {
		    // Shortcuts
		    var C = CryptoJS;
		    var C_lib = C.lib;
		    var StreamCipher = C_lib.StreamCipher;
		    var C_algo = C.algo;
	
		    /**
		     * RC4 stream cipher algorithm.
		     */
		    var RC4 = C_algo.RC4 = StreamCipher.extend({
		        _doReset: function () {
		            // Shortcuts
		            var key = this._key;
		            var keyWords = key.words;
		            var keySigBytes = key.sigBytes;
	
		            // Init sbox
		            var S = this._S = [];
		            for (var i = 0; i < 256; i++) {
		                S[i] = i;
		            }
	
		            // Key setup
		            for (var i = 0, j = 0; i < 256; i++) {
		                var keyByteIndex = i % keySigBytes;
		                var keyByte = (keyWords[keyByteIndex >>> 2] >>> (24 - (keyByteIndex % 4) * 8)) & 0xff;
	
		                j = (j + S[i] + keyByte) % 256;
	
		                // Swap
		                var t = S[i];
		                S[i] = S[j];
		                S[j] = t;
		            }
	
		            // Counters
		            this._i = this._j = 0;
		        },
	
		        _doProcessBlock: function (M, offset) {
		            M[offset] ^= generateKeystreamWord.call(this);
		        },
	
		        keySize: 256/32,
	
		        ivSize: 0
		    });
	
		    function generateKeystreamWord() {
		        // Shortcuts
		        var S = this._S;
		        var i = this._i;
		        var j = this._j;
	
		        // Generate keystream word
		        var keystreamWord = 0;
		        for (var n = 0; n < 4; n++) {
		            i = (i + 1) % 256;
		            j = (j + S[i]) % 256;
	
		            // Swap
		            var t = S[i];
		            S[i] = S[j];
		            S[j] = t;
	
		            keystreamWord |= S[(S[i] + S[j]) % 256] << (24 - n * 8);
		        }
	
		        // Update counters
		        this._i = i;
		        this._j = j;
	
		        return keystreamWord;
		    }
	
		    /**
		     * Shortcut functions to the cipher's object interface.
		     *
		     * @example
		     *
		     *     var ciphertext = CryptoJS.RC4.encrypt(message, key, cfg);
		     *     var plaintext  = CryptoJS.RC4.decrypt(ciphertext, key, cfg);
		     */
		    C.RC4 = StreamCipher._createHelper(RC4);
	
		    /**
		     * Modified RC4 stream cipher algorithm.
		     */
		    var RC4Drop = C_algo.RC4Drop = RC4.extend({
		        /**
		         * Configuration options.
		         *
		         * @property {number} drop The number of keystream words to drop. Default 192
		         */
		        cfg: RC4.cfg.extend({
		            drop: 192
		        }),
	
		        _doReset: function () {
		            RC4._doReset.call(this);
	
		            // Drop
		            for (var i = this.cfg.drop; i > 0; i--) {
		                generateKeystreamWord.call(this);
		            }
		        }
		    });
	
		    /**
		     * Shortcut functions to the cipher's object interface.
		     *
		     * @example
		     *
		     *     var ciphertext = CryptoJS.RC4Drop.encrypt(message, key, cfg);
		     *     var plaintext  = CryptoJS.RC4Drop.decrypt(ciphertext, key, cfg);
		     */
		    C.RC4Drop = StreamCipher._createHelper(RC4Drop);
		}());
	
	
		return CryptoJS.RC4;
	
	}));

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

	;(function (root, factory, undef) {
		if (true) {
			// CommonJS
			module.exports = exports = factory(__webpack_require__(28), __webpack_require__(32), __webpack_require__(33), __webpack_require__(43), __webpack_require__(44));
		}
		else if (typeof define === "function" && define.amd) {
			// AMD
			define(["./core", "./enc-base64", "./md5", "./evpkdf", "./cipher-core"], factory);
		}
		else {
			// Global (browser)
			factory(root.CryptoJS);
		}
	}(this, function (CryptoJS) {
	
		(function () {
		    // Shortcuts
		    var C = CryptoJS;
		    var C_lib = C.lib;
		    var StreamCipher = C_lib.StreamCipher;
		    var C_algo = C.algo;
	
		    // Reusable objects
		    var S  = [];
		    var C_ = [];
		    var G  = [];
	
		    /**
		     * Rabbit stream cipher algorithm
		     */
		    var Rabbit = C_algo.Rabbit = StreamCipher.extend({
		        _doReset: function () {
		            // Shortcuts
		            var K = this._key.words;
		            var iv = this.cfg.iv;
	
		            // Swap endian
		            for (var i = 0; i < 4; i++) {
		                K[i] = (((K[i] << 8)  | (K[i] >>> 24)) & 0x00ff00ff) |
		                       (((K[i] << 24) | (K[i] >>> 8))  & 0xff00ff00);
		            }
	
		            // Generate initial state values
		            var X = this._X = [
		                K[0], (K[3] << 16) | (K[2] >>> 16),
		                K[1], (K[0] << 16) | (K[3] >>> 16),
		                K[2], (K[1] << 16) | (K[0] >>> 16),
		                K[3], (K[2] << 16) | (K[1] >>> 16)
		            ];
	
		            // Generate initial counter values
		            var C = this._C = [
		                (K[2] << 16) | (K[2] >>> 16), (K[0] & 0xffff0000) | (K[1] & 0x0000ffff),
		                (K[3] << 16) | (K[3] >>> 16), (K[1] & 0xffff0000) | (K[2] & 0x0000ffff),
		                (K[0] << 16) | (K[0] >>> 16), (K[2] & 0xffff0000) | (K[3] & 0x0000ffff),
		                (K[1] << 16) | (K[1] >>> 16), (K[3] & 0xffff0000) | (K[0] & 0x0000ffff)
		            ];
	
		            // Carry bit
		            this._b = 0;
	
		            // Iterate the system four times
		            for (var i = 0; i < 4; i++) {
		                nextState.call(this);
		            }
	
		            // Modify the counters
		            for (var i = 0; i < 8; i++) {
		                C[i] ^= X[(i + 4) & 7];
		            }
	
		            // IV setup
		            if (iv) {
		                // Shortcuts
		                var IV = iv.words;
		                var IV_0 = IV[0];
		                var IV_1 = IV[1];
	
		                // Generate four subvectors
		                var i0 = (((IV_0 << 8) | (IV_0 >>> 24)) & 0x00ff00ff) | (((IV_0 << 24) | (IV_0 >>> 8)) & 0xff00ff00);
		                var i2 = (((IV_1 << 8) | (IV_1 >>> 24)) & 0x00ff00ff) | (((IV_1 << 24) | (IV_1 >>> 8)) & 0xff00ff00);
		                var i1 = (i0 >>> 16) | (i2 & 0xffff0000);
		                var i3 = (i2 << 16)  | (i0 & 0x0000ffff);
	
		                // Modify counter values
		                C[0] ^= i0;
		                C[1] ^= i1;
		                C[2] ^= i2;
		                C[3] ^= i3;
		                C[4] ^= i0;
		                C[5] ^= i1;
		                C[6] ^= i2;
		                C[7] ^= i3;
	
		                // Iterate the system four times
		                for (var i = 0; i < 4; i++) {
		                    nextState.call(this);
		                }
		            }
		        },
	
		        _doProcessBlock: function (M, offset) {
		            // Shortcut
		            var X = this._X;
	
		            // Iterate the system
		            nextState.call(this);
	
		            // Generate four keystream words
		            S[0] = X[0] ^ (X[5] >>> 16) ^ (X[3] << 16);
		            S[1] = X[2] ^ (X[7] >>> 16) ^ (X[5] << 16);
		            S[2] = X[4] ^ (X[1] >>> 16) ^ (X[7] << 16);
		            S[3] = X[6] ^ (X[3] >>> 16) ^ (X[1] << 16);
	
		            for (var i = 0; i < 4; i++) {
		                // Swap endian
		                S[i] = (((S[i] << 8)  | (S[i] >>> 24)) & 0x00ff00ff) |
		                       (((S[i] << 24) | (S[i] >>> 8))  & 0xff00ff00);
	
		                // Encrypt
		                M[offset + i] ^= S[i];
		            }
		        },
	
		        blockSize: 128/32,
	
		        ivSize: 64/32
		    });
	
		    function nextState() {
		        // Shortcuts
		        var X = this._X;
		        var C = this._C;
	
		        // Save old counter values
		        for (var i = 0; i < 8; i++) {
		            C_[i] = C[i];
		        }
	
		        // Calculate new counter values
		        C[0] = (C[0] + 0x4d34d34d + this._b) | 0;
		        C[1] = (C[1] + 0xd34d34d3 + ((C[0] >>> 0) < (C_[0] >>> 0) ? 1 : 0)) | 0;
		        C[2] = (C[2] + 0x34d34d34 + ((C[1] >>> 0) < (C_[1] >>> 0) ? 1 : 0)) | 0;
		        C[3] = (C[3] + 0x4d34d34d + ((C[2] >>> 0) < (C_[2] >>> 0) ? 1 : 0)) | 0;
		        C[4] = (C[4] + 0xd34d34d3 + ((C[3] >>> 0) < (C_[3] >>> 0) ? 1 : 0)) | 0;
		        C[5] = (C[5] + 0x34d34d34 + ((C[4] >>> 0) < (C_[4] >>> 0) ? 1 : 0)) | 0;
		        C[6] = (C[6] + 0x4d34d34d + ((C[5] >>> 0) < (C_[5] >>> 0) ? 1 : 0)) | 0;
		        C[7] = (C[7] + 0xd34d34d3 + ((C[6] >>> 0) < (C_[6] >>> 0) ? 1 : 0)) | 0;
		        this._b = (C[7] >>> 0) < (C_[7] >>> 0) ? 1 : 0;
	
		        // Calculate the g-values
		        for (var i = 0; i < 8; i++) {
		            var gx = X[i] + C[i];
	
		            // Construct high and low argument for squaring
		            var ga = gx & 0xffff;
		            var gb = gx >>> 16;
	
		            // Calculate high and low result of squaring
		            var gh = ((((ga * ga) >>> 17) + ga * gb) >>> 15) + gb * gb;
		            var gl = (((gx & 0xffff0000) * gx) | 0) + (((gx & 0x0000ffff) * gx) | 0);
	
		            // High XOR low
		            G[i] = gh ^ gl;
		        }
	
		        // Calculate new state values
		        X[0] = (G[0] + ((G[7] << 16) | (G[7] >>> 16)) + ((G[6] << 16) | (G[6] >>> 16))) | 0;
		        X[1] = (G[1] + ((G[0] << 8)  | (G[0] >>> 24)) + G[7]) | 0;
		        X[2] = (G[2] + ((G[1] << 16) | (G[1] >>> 16)) + ((G[0] << 16) | (G[0] >>> 16))) | 0;
		        X[3] = (G[3] + ((G[2] << 8)  | (G[2] >>> 24)) + G[1]) | 0;
		        X[4] = (G[4] + ((G[3] << 16) | (G[3] >>> 16)) + ((G[2] << 16) | (G[2] >>> 16))) | 0;
		        X[5] = (G[5] + ((G[4] << 8)  | (G[4] >>> 24)) + G[3]) | 0;
		        X[6] = (G[6] + ((G[5] << 16) | (G[5] >>> 16)) + ((G[4] << 16) | (G[4] >>> 16))) | 0;
		        X[7] = (G[7] + ((G[6] << 8)  | (G[6] >>> 24)) + G[5]) | 0;
		    }
	
		    /**
		     * Shortcut functions to the cipher's object interface.
		     *
		     * @example
		     *
		     *     var ciphertext = CryptoJS.Rabbit.encrypt(message, key, cfg);
		     *     var plaintext  = CryptoJS.Rabbit.decrypt(ciphertext, key, cfg);
		     */
		    C.Rabbit = StreamCipher._createHelper(Rabbit);
		}());
	
	
		return CryptoJS.Rabbit;
	
	}));

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

	;(function (root, factory, undef) {
		if (true) {
			// CommonJS
			module.exports = exports = factory(__webpack_require__(28), __webpack_require__(32), __webpack_require__(33), __webpack_require__(43), __webpack_require__(44));
		}
		else if (typeof define === "function" && define.amd) {
			// AMD
			define(["./core", "./enc-base64", "./md5", "./evpkdf", "./cipher-core"], factory);
		}
		else {
			// Global (browser)
			factory(root.CryptoJS);
		}
	}(this, function (CryptoJS) {
	
		(function () {
		    // Shortcuts
		    var C = CryptoJS;
		    var C_lib = C.lib;
		    var StreamCipher = C_lib.StreamCipher;
		    var C_algo = C.algo;
	
		    // Reusable objects
		    var S  = [];
		    var C_ = [];
		    var G  = [];
	
		    /**
		     * Rabbit stream cipher algorithm.
		     *
		     * This is a legacy version that neglected to convert the key to little-endian.
		     * This error doesn't affect the cipher's security,
		     * but it does affect its compatibility with other implementations.
		     */
		    var RabbitLegacy = C_algo.RabbitLegacy = StreamCipher.extend({
		        _doReset: function () {
		            // Shortcuts
		            var K = this._key.words;
		            var iv = this.cfg.iv;
	
		            // Generate initial state values
		            var X = this._X = [
		                K[0], (K[3] << 16) | (K[2] >>> 16),
		                K[1], (K[0] << 16) | (K[3] >>> 16),
		                K[2], (K[1] << 16) | (K[0] >>> 16),
		                K[3], (K[2] << 16) | (K[1] >>> 16)
		            ];
	
		            // Generate initial counter values
		            var C = this._C = [
		                (K[2] << 16) | (K[2] >>> 16), (K[0] & 0xffff0000) | (K[1] & 0x0000ffff),
		                (K[3] << 16) | (K[3] >>> 16), (K[1] & 0xffff0000) | (K[2] & 0x0000ffff),
		                (K[0] << 16) | (K[0] >>> 16), (K[2] & 0xffff0000) | (K[3] & 0x0000ffff),
		                (K[1] << 16) | (K[1] >>> 16), (K[3] & 0xffff0000) | (K[0] & 0x0000ffff)
		            ];
	
		            // Carry bit
		            this._b = 0;
	
		            // Iterate the system four times
		            for (var i = 0; i < 4; i++) {
		                nextState.call(this);
		            }
	
		            // Modify the counters
		            for (var i = 0; i < 8; i++) {
		                C[i] ^= X[(i + 4) & 7];
		            }
	
		            // IV setup
		            if (iv) {
		                // Shortcuts
		                var IV = iv.words;
		                var IV_0 = IV[0];
		                var IV_1 = IV[1];
	
		                // Generate four subvectors
		                var i0 = (((IV_0 << 8) | (IV_0 >>> 24)) & 0x00ff00ff) | (((IV_0 << 24) | (IV_0 >>> 8)) & 0xff00ff00);
		                var i2 = (((IV_1 << 8) | (IV_1 >>> 24)) & 0x00ff00ff) | (((IV_1 << 24) | (IV_1 >>> 8)) & 0xff00ff00);
		                var i1 = (i0 >>> 16) | (i2 & 0xffff0000);
		                var i3 = (i2 << 16)  | (i0 & 0x0000ffff);
	
		                // Modify counter values
		                C[0] ^= i0;
		                C[1] ^= i1;
		                C[2] ^= i2;
		                C[3] ^= i3;
		                C[4] ^= i0;
		                C[5] ^= i1;
		                C[6] ^= i2;
		                C[7] ^= i3;
	
		                // Iterate the system four times
		                for (var i = 0; i < 4; i++) {
		                    nextState.call(this);
		                }
		            }
		        },
	
		        _doProcessBlock: function (M, offset) {
		            // Shortcut
		            var X = this._X;
	
		            // Iterate the system
		            nextState.call(this);
	
		            // Generate four keystream words
		            S[0] = X[0] ^ (X[5] >>> 16) ^ (X[3] << 16);
		            S[1] = X[2] ^ (X[7] >>> 16) ^ (X[5] << 16);
		            S[2] = X[4] ^ (X[1] >>> 16) ^ (X[7] << 16);
		            S[3] = X[6] ^ (X[3] >>> 16) ^ (X[1] << 16);
	
		            for (var i = 0; i < 4; i++) {
		                // Swap endian
		                S[i] = (((S[i] << 8)  | (S[i] >>> 24)) & 0x00ff00ff) |
		                       (((S[i] << 24) | (S[i] >>> 8))  & 0xff00ff00);
	
		                // Encrypt
		                M[offset + i] ^= S[i];
		            }
		        },
	
		        blockSize: 128/32,
	
		        ivSize: 64/32
		    });
	
		    function nextState() {
		        // Shortcuts
		        var X = this._X;
		        var C = this._C;
	
		        // Save old counter values
		        for (var i = 0; i < 8; i++) {
		            C_[i] = C[i];
		        }
	
		        // Calculate new counter values
		        C[0] = (C[0] + 0x4d34d34d + this._b) | 0;
		        C[1] = (C[1] + 0xd34d34d3 + ((C[0] >>> 0) < (C_[0] >>> 0) ? 1 : 0)) | 0;
		        C[2] = (C[2] + 0x34d34d34 + ((C[1] >>> 0) < (C_[1] >>> 0) ? 1 : 0)) | 0;
		        C[3] = (C[3] + 0x4d34d34d + ((C[2] >>> 0) < (C_[2] >>> 0) ? 1 : 0)) | 0;
		        C[4] = (C[4] + 0xd34d34d3 + ((C[3] >>> 0) < (C_[3] >>> 0) ? 1 : 0)) | 0;
		        C[5] = (C[5] + 0x34d34d34 + ((C[4] >>> 0) < (C_[4] >>> 0) ? 1 : 0)) | 0;
		        C[6] = (C[6] + 0x4d34d34d + ((C[5] >>> 0) < (C_[5] >>> 0) ? 1 : 0)) | 0;
		        C[7] = (C[7] + 0xd34d34d3 + ((C[6] >>> 0) < (C_[6] >>> 0) ? 1 : 0)) | 0;
		        this._b = (C[7] >>> 0) < (C_[7] >>> 0) ? 1 : 0;
	
		        // Calculate the g-values
		        for (var i = 0; i < 8; i++) {
		            var gx = X[i] + C[i];
	
		            // Construct high and low argument for squaring
		            var ga = gx & 0xffff;
		            var gb = gx >>> 16;
	
		            // Calculate high and low result of squaring
		            var gh = ((((ga * ga) >>> 17) + ga * gb) >>> 15) + gb * gb;
		            var gl = (((gx & 0xffff0000) * gx) | 0) + (((gx & 0x0000ffff) * gx) | 0);
	
		            // High XOR low
		            G[i] = gh ^ gl;
		        }
	
		        // Calculate new state values
		        X[0] = (G[0] + ((G[7] << 16) | (G[7] >>> 16)) + ((G[6] << 16) | (G[6] >>> 16))) | 0;
		        X[1] = (G[1] + ((G[0] << 8)  | (G[0] >>> 24)) + G[7]) | 0;
		        X[2] = (G[2] + ((G[1] << 16) | (G[1] >>> 16)) + ((G[0] << 16) | (G[0] >>> 16))) | 0;
		        X[3] = (G[3] + ((G[2] << 8)  | (G[2] >>> 24)) + G[1]) | 0;
		        X[4] = (G[4] + ((G[3] << 16) | (G[3] >>> 16)) + ((G[2] << 16) | (G[2] >>> 16))) | 0;
		        X[5] = (G[5] + ((G[4] << 8)  | (G[4] >>> 24)) + G[3]) | 0;
		        X[6] = (G[6] + ((G[5] << 16) | (G[5] >>> 16)) + ((G[4] << 16) | (G[4] >>> 16))) | 0;
		        X[7] = (G[7] + ((G[6] << 8)  | (G[6] >>> 24)) + G[5]) | 0;
		    }
	
		    /**
		     * Shortcut functions to the cipher's object interface.
		     *
		     * @example
		     *
		     *     var ciphertext = CryptoJS.RabbitLegacy.encrypt(message, key, cfg);
		     *     var plaintext  = CryptoJS.RabbitLegacy.decrypt(ciphertext, key, cfg);
		     */
		    C.RabbitLegacy = StreamCipher._createHelper(RabbitLegacy);
		}());
	
	
		return CryptoJS.RabbitLegacy;
	
	}));

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module, global) {/*! https://mths.be/utf8js v2.1.2 by @mathias */
	;(function(root) {
	
		// Detect free variables `exports`
		var freeExports = typeof exports == 'object' && exports;
	
		// Detect free variable `module`
		var freeModule = typeof module == 'object' && module &&
			module.exports == freeExports && module;
	
		// Detect free variable `global`, from Node.js or Browserified code,
		// and use it as `root`
		var freeGlobal = typeof global == 'object' && global;
		if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
			root = freeGlobal;
		}
	
		/*--------------------------------------------------------------------------*/
	
		var stringFromCharCode = String.fromCharCode;
	
		// Taken from https://mths.be/punycode
		function ucs2decode(string) {
			var output = [];
			var counter = 0;
			var length = string.length;
			var value;
			var extra;
			while (counter < length) {
				value = string.charCodeAt(counter++);
				if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
					// high surrogate, and there is a next character
					extra = string.charCodeAt(counter++);
					if ((extra & 0xFC00) == 0xDC00) { // low surrogate
						output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
					} else {
						// unmatched surrogate; only append this code unit, in case the next
						// code unit is the high surrogate of a surrogate pair
						output.push(value);
						counter--;
					}
				} else {
					output.push(value);
				}
			}
			return output;
		}
	
		// Taken from https://mths.be/punycode
		function ucs2encode(array) {
			var length = array.length;
			var index = -1;
			var value;
			var output = '';
			while (++index < length) {
				value = array[index];
				if (value > 0xFFFF) {
					value -= 0x10000;
					output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
					value = 0xDC00 | value & 0x3FF;
				}
				output += stringFromCharCode(value);
			}
			return output;
		}
	
		function checkScalarValue(codePoint) {
			if (codePoint >= 0xD800 && codePoint <= 0xDFFF) {
				throw Error(
					'Lone surrogate U+' + codePoint.toString(16).toUpperCase() +
					' is not a scalar value'
				);
			}
		}
		/*--------------------------------------------------------------------------*/
	
		function createByte(codePoint, shift) {
			return stringFromCharCode(((codePoint >> shift) & 0x3F) | 0x80);
		}
	
		function encodeCodePoint(codePoint) {
			if ((codePoint & 0xFFFFFF80) == 0) { // 1-byte sequence
				return stringFromCharCode(codePoint);
			}
			var symbol = '';
			if ((codePoint & 0xFFFFF800) == 0) { // 2-byte sequence
				symbol = stringFromCharCode(((codePoint >> 6) & 0x1F) | 0xC0);
			}
			else if ((codePoint & 0xFFFF0000) == 0) { // 3-byte sequence
				checkScalarValue(codePoint);
				symbol = stringFromCharCode(((codePoint >> 12) & 0x0F) | 0xE0);
				symbol += createByte(codePoint, 6);
			}
			else if ((codePoint & 0xFFE00000) == 0) { // 4-byte sequence
				symbol = stringFromCharCode(((codePoint >> 18) & 0x07) | 0xF0);
				symbol += createByte(codePoint, 12);
				symbol += createByte(codePoint, 6);
			}
			symbol += stringFromCharCode((codePoint & 0x3F) | 0x80);
			return symbol;
		}
	
		function utf8encode(string) {
			var codePoints = ucs2decode(string);
			var length = codePoints.length;
			var index = -1;
			var codePoint;
			var byteString = '';
			while (++index < length) {
				codePoint = codePoints[index];
				byteString += encodeCodePoint(codePoint);
			}
			return byteString;
		}
	
		/*--------------------------------------------------------------------------*/
	
		function readContinuationByte() {
			if (byteIndex >= byteCount) {
				throw Error('Invalid byte index');
			}
	
			var continuationByte = byteArray[byteIndex] & 0xFF;
			byteIndex++;
	
			if ((continuationByte & 0xC0) == 0x80) {
				return continuationByte & 0x3F;
			}
	
			// If we end up here, it’s not a continuation byte
			throw Error('Invalid continuation byte');
		}
	
		function decodeSymbol() {
			var byte1;
			var byte2;
			var byte3;
			var byte4;
			var codePoint;
	
			if (byteIndex > byteCount) {
				throw Error('Invalid byte index');
			}
	
			if (byteIndex == byteCount) {
				return false;
			}
	
			// Read first byte
			byte1 = byteArray[byteIndex] & 0xFF;
			byteIndex++;
	
			// 1-byte sequence (no continuation bytes)
			if ((byte1 & 0x80) == 0) {
				return byte1;
			}
	
			// 2-byte sequence
			if ((byte1 & 0xE0) == 0xC0) {
				byte2 = readContinuationByte();
				codePoint = ((byte1 & 0x1F) << 6) | byte2;
				if (codePoint >= 0x80) {
					return codePoint;
				} else {
					throw Error('Invalid continuation byte');
				}
			}
	
			// 3-byte sequence (may include unpaired surrogates)
			if ((byte1 & 0xF0) == 0xE0) {
				byte2 = readContinuationByte();
				byte3 = readContinuationByte();
				codePoint = ((byte1 & 0x0F) << 12) | (byte2 << 6) | byte3;
				if (codePoint >= 0x0800) {
					checkScalarValue(codePoint);
					return codePoint;
				} else {
					throw Error('Invalid continuation byte');
				}
			}
	
			// 4-byte sequence
			if ((byte1 & 0xF8) == 0xF0) {
				byte2 = readContinuationByte();
				byte3 = readContinuationByte();
				byte4 = readContinuationByte();
				codePoint = ((byte1 & 0x07) << 0x12) | (byte2 << 0x0C) |
					(byte3 << 0x06) | byte4;
				if (codePoint >= 0x010000 && codePoint <= 0x10FFFF) {
					return codePoint;
				}
			}
	
			throw Error('Invalid UTF-8 detected');
		}
	
		var byteArray;
		var byteCount;
		var byteIndex;
		function utf8decode(byteString) {
			byteArray = ucs2decode(byteString);
			byteCount = byteArray.length;
			byteIndex = 0;
			var codePoints = [];
			var tmp;
			while ((tmp = decodeSymbol()) !== false) {
				codePoints.push(tmp);
			}
			return ucs2encode(codePoints);
		}
	
		/*--------------------------------------------------------------------------*/
	
		var utf8 = {
			'version': '2.1.2',
			'encode': utf8encode,
			'decode': utf8decode
		};
	
		// Some AMD build optimizers, like r.js, check for specific condition patterns
		// like the following:
		if (
			true
		) {
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
				return utf8;
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		}	else if (freeExports && !freeExports.nodeType) {
			if (freeModule) { // in Node.js or RingoJS v0.8.0+
				freeModule.exports = utf8;
			} else { // in Narwhal or RingoJS v0.7.0-
				var object = {};
				var hasOwnProperty = object.hasOwnProperty;
				for (var key in utf8) {
					hasOwnProperty.call(utf8, key) && (freeExports[key] = utf8[key]);
				}
			}
		} else { // in Rhino or a web browser
			root.utf8 = utf8;
		}
	
	}(this));
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(62)(module), (function() { return this; }())))

/***/ }),
/* 62 */
/***/ (function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

	/*
	    This file is part of web3.js.
	
	    web3.js is free software: you can redistribute it and/or modify
	    it under the terms of the GNU Lesser General Public License as published by
	    the Free Software Foundation, either version 3 of the License, or
	    (at your option) any later version.
	
	    web3.js is distributed in the hope that it will be useful,
	    but WITHOUT ANY WARRANTY; without even the implied warranty of
	    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	    GNU Lesser General Public License for more details.
	
	    You should have received a copy of the GNU Lesser General Public License
	    along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
	*/
	/** @file config.js
	 * @authors:
	 *   Marek Kotewicz <marek@ethdev.com>
	 * @date 2015
	 */
	
	/**
	 * Utils
	 * 
	 * @module utils
	 */
	
	/**
	 * Utility functions
	 * 
	 * @class [utils] config
	 * @constructor
	 */
	
	
	/// required to define ETH_BIGNUMBER_ROUNDING_MODE
	var BigNumber = __webpack_require__(25);
	
	var ETH_UNITS = [
	    'wei',
	    'kwei',
	    'Mwei',
	    'Gwei',
	    'szabo',
	    'finney',
	    'femtoether',
	    'picoether',
	    'nanoether',
	    'microether',
	    'milliether',
	    'nano',
	    'micro',
	    'milli',
	    'ether',
	    'grand',
	    'Mether',
	    'Gether',
	    'Tether',
	    'Pether',
	    'Eether',
	    'Zether',
	    'Yether',
	    'Nether',
	    'Dether',
	    'Vether',
	    'Uether'
	];
	
	module.exports = {
	    ETH_PADDING: 32,
	    ETH_SIGNATURE_LENGTH: 4,
	    ETH_UNITS: ETH_UNITS,
	    ETH_BIGNUMBER_ROUNDING_MODE: { ROUNDING_MODE: BigNumber.ROUND_DOWN },
	    ETH_POLLING_TIMEOUT: 1000/2,
	    defaultBlock: 'latest',
	    defaultAccount: undefined
	};
	


/***/ }),
/* 64 */
/***/ (function(module, exports) {

	/*
	    This file is part of web3.js.
	
	    web3.js is free software: you can redistribute it and/or modify
	    it under the terms of the GNU Lesser General Public License as published by
	    the Free Software Foundation, either version 3 of the License, or
	    (at your option) any later version.
	
	    web3.js is distributed in the hope that it will be useful,
	    but WITHOUT ANY WARRANTY; without even the implied warranty of
	    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	    GNU Lesser General Public License for more details.
	
	    You should have received a copy of the GNU Lesser General Public License
	    along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
	*/
	/** 
	 * @file errors.js
	 * @author Marek Kotewicz <marek@ethdev.com>
	 * @date 2015
	 */
	
	module.exports = {
	    InvalidNumberOfParams: function () {
	        return new Error('Invalid number of input parameters');
	    },
	    InvalidConnection: function (host){
	        return new Error('CONNECTION ERROR: Couldn\'t connect to node '+ host +'.');
	    },
	    InvalidProvider: function () {
	        return new Error('Provider not set or invalid');
	    },
	    InvalidResponse: function (result){
	        var message = !!result && !!result.error && !!result.error.message ? result.error.message : 'Invalid JSON RPC response: ' + JSON.stringify(result);
	        return new Error(message);
	    }
	};
	


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

	/*
	    This file is part of web3.js.
	
	    web3.js is free software: you can redistribute it and/or modify
	    it under the terms of the GNU Lesser General Public License as published by
	    the Free Software Foundation, either version 3 of the License, or
	    (at your option) any later version.
	
	    web3.js is distributed in the hope that it will be useful,
	    but WITHOUT ANY WARRANTY; without even the implied warranty of
	    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	    GNU Lesser General Public License for more details.
	
	    You should have received a copy of the GNU Lesser General Public License
	    along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
	*/
	/** 
	 * @file iban.js
	 * @author Marek Kotewicz <marek@ethdev.com>
	 * @date 2015
	 */
	
	var BigNumber = __webpack_require__(25);
	
	var padLeft = function (string, bytes) {
	    var result = string;
	    while (result.length < bytes * 2) {
	        result = '00' + result;
	    }
	    return result;
	};
	
	/**
	 * Prepare an IBAN for mod 97 computation by moving the first 4 chars to the end and transforming the letters to
	 * numbers (A = 10, B = 11, ..., Z = 35), as specified in ISO13616.
	 *
	 * @method iso13616Prepare
	 * @param {String} iban the IBAN
	 * @returns {String} the prepared IBAN
	 */
	var iso13616Prepare = function (iban) {
	    var A = 'A'.charCodeAt(0);
	    var Z = 'Z'.charCodeAt(0);
	
	    iban = iban.toUpperCase();
	    iban = iban.substr(4) + iban.substr(0,4);
	
	    return iban.split('').map(function(n){
	        var code = n.charCodeAt(0);
	        if (code >= A && code <= Z){
	            // A = 10, B = 11, ... Z = 35
	            return code - A + 10;
	        } else {
	            return n;
	        }
	    }).join('');
	};
	
	/**
	 * Calculates the MOD 97 10 of the passed IBAN as specified in ISO7064.
	 *
	 * @method mod9710
	 * @param {String} iban
	 * @returns {Number}
	 */
	var mod9710 = function (iban) {
	    var remainder = iban,
	        block;
	
	    while (remainder.length > 2){
	        block = remainder.slice(0, 9);
	        remainder = parseInt(block, 10) % 97 + remainder.slice(block.length);
	    }
	
	    return parseInt(remainder, 10) % 97;
	};
	
	/**
	 * This prototype should be used to create iban object from iban correct string
	 *
	 * @param {String} iban
	 */
	var Iban = function (iban) {
	    this._iban = iban;
	};
	
	/**
	 * This method should be used to create iban object from ethereum address
	 *
	 * @method fromAddress
	 * @param {String} address
	 * @return {Iban} the IBAN object
	 */
	Iban.fromAddress = function (address) {
	    var asBn = new BigNumber(address, 16);
	    var base36 = asBn.toString(36);
	    var padded = padLeft(base36, 15);
	    return Iban.fromBban(padded.toUpperCase());
	};
	
	/**
	 * Convert the passed BBAN to an IBAN for this country specification.
	 * Please note that <i>"generation of the IBAN shall be the exclusive responsibility of the bank/branch servicing the account"</i>.
	 * This method implements the preferred algorithm described in http://en.wikipedia.org/wiki/International_Bank_Account_Number#Generating_IBAN_check_digits
	 *
	 * @method fromBban
	 * @param {String} bban the BBAN to convert to IBAN
	 * @returns {Iban} the IBAN object
	 */
	Iban.fromBban = function (bban) {
	    var countryCode = 'XE';
	
	    var remainder = mod9710(iso13616Prepare(countryCode + '00' + bban));
	    var checkDigit = ('0' + (98 - remainder)).slice(-2);
	
	    return new Iban(countryCode + checkDigit + bban);
	};
	
	/**
	 * Should be used to create IBAN object for given institution and identifier
	 *
	 * @method createIndirect
	 * @param {Object} options, required options are "institution" and "identifier"
	 * @return {Iban} the IBAN object
	 */
	Iban.createIndirect = function (options) {
	    return Iban.fromBban('ETH' + options.institution + options.identifier);
	};
	
	/**
	 * Thos method should be used to check if given string is valid iban object
	 *
	 * @method isValid
	 * @param {String} iban string
	 * @return {Boolean} true if it is valid IBAN
	 */
	Iban.isValid = function (iban) {
	    var i = new Iban(iban);
	    return i.isValid();
	};
	
	/**
	 * Should be called to check if iban is correct
	 *
	 * @method isValid
	 * @returns {Boolean} true if it is, otherwise false
	 */
	Iban.prototype.isValid = function () {
	    return /^XE[0-9]{2}(ETH[0-9A-Z]{13}|[0-9A-Z]{30,31})$/.test(this._iban) &&
	        mod9710(iso13616Prepare(this._iban)) === 1;
	};
	
	/**
	 * Should be called to check if iban number is direct
	 *
	 * @method isDirect
	 * @returns {Boolean} true if it is, otherwise false
	 */
	Iban.prototype.isDirect = function () {
	    return this._iban.length === 34 || this._iban.length === 35;
	};
	
	/**
	 * Should be called to check if iban number if indirect
	 *
	 * @method isIndirect
	 * @returns {Boolean} true if it is, otherwise false
	 */
	Iban.prototype.isIndirect = function () {
	    return this._iban.length === 20;
	};
	
	/**
	 * Should be called to get iban checksum
	 * Uses the mod-97-10 checksumming protocol (ISO/IEC 7064:2003)
	 *
	 * @method checksum
	 * @returns {String} checksum
	 */
	Iban.prototype.checksum = function () {
	    return this._iban.substr(2, 2);
	};
	
	/**
	 * Should be called to get institution identifier
	 * eg. XREG
	 *
	 * @method institution
	 * @returns {String} institution identifier
	 */
	Iban.prototype.institution = function () {
	    return this.isIndirect() ? this._iban.substr(7, 4) : '';
	};
	
	/**
	 * Should be called to get client identifier within institution
	 * eg. GAVOFYORK
	 *
	 * @method client
	 * @returns {String} client identifier
	 */
	Iban.prototype.client = function () {
	    return this.isIndirect() ? this._iban.substr(11) : '';
	};
	
	/**
	 * Should be called to get client direct address
	 *
	 * @method address
	 * @returns {String} client direct address
	 */
	Iban.prototype.address = function () {
	    if (this.isDirect()) {
	        var base36 = this._iban.substr(4);
	        var asBn = new BigNumber(base36, 36);
	        return padLeft(asBn.toString(16), 20);
	    } 
	
	    return '';
	};
	
	Iban.prototype.toString = function () {
	    return this._iban;
	};
	
	module.exports = Iban;
	


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

	/*
	    This file is part of web3.js.
	
	    web3.js is free software: you can redistribute it and/or modify
	    it under the terms of the GNU Lesser General Public License as published by
	    the Free Software Foundation, either version 3 of the License, or
	    (at your option) any later version.
	
	    web3.js is distributed in the hope that it will be useful,
	    but WITHOUT ANY WARRANTY; without even the implied warranty of
	    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	    GNU Lesser General Public License for more details.
	
	    You should have received a copy of the GNU Lesser General Public License
	    along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
	*/
	/**
	 * @file eth.js
	 * @author Marek Kotewicz <marek@ethdev.com>
	 * @author Fabian Vogelsteller <fabian@ethdev.com>
	 * @date 2015
	 */
	
	"use strict";
	
	var formatters = __webpack_require__(67);
	var utils = __webpack_require__(24);
	var Method = __webpack_require__(68);
	var Property = __webpack_require__(69);
	var c = __webpack_require__(63);
	var Contract = __webpack_require__(70);
	var watches = __webpack_require__(86);
	var Filter = __webpack_require__(85);
	var IsSyncing = __webpack_require__(89);
	var namereg = __webpack_require__(90);
	var Iban = __webpack_require__(65);
	var transfer = __webpack_require__(93);
	
	var blockCall = function (args) {
	    return (utils.isString(args[0]) && args[0].indexOf('0x') === 0) ? "eth_getBlockByHash" : "eth_getBlockByNumber";
	};
	
	var transactionFromBlockCall = function (args) {
	    return (utils.isString(args[0]) && args[0].indexOf('0x') === 0) ? 'eth_getTransactionByBlockHashAndIndex' : 'eth_getTransactionByBlockNumberAndIndex';
	};
	
	var uncleCall = function (args) {
	    return (utils.isString(args[0]) && args[0].indexOf('0x') === 0) ? 'eth_getUncleByBlockHashAndIndex' : 'eth_getUncleByBlockNumberAndIndex';
	};
	
	var getBlockTransactionCountCall = function (args) {
	    return (utils.isString(args[0]) && args[0].indexOf('0x') === 0) ? 'eth_getBlockTransactionCountByHash' : 'eth_getBlockTransactionCountByNumber';
	};
	
	var uncleCountCall = function (args) {
	    return (utils.isString(args[0]) && args[0].indexOf('0x') === 0) ? 'eth_getUncleCountByBlockHash' : 'eth_getUncleCountByBlockNumber';
	};
	
	function Eth(web3) {
	    this._requestManager = web3._requestManager;
	
	    var self = this;
	
	    methods().forEach(function(method) { 
	        method.attachToObject(self);
	        method.setRequestManager(self._requestManager);
	    });
	
	    properties().forEach(function(p) { 
	        p.attachToObject(self);
	        p.setRequestManager(self._requestManager);
	    });
	
	
	    this.iban = Iban;
	    this.sendIBANTransaction = transfer.bind(null, this);
	}
	
	Object.defineProperty(Eth.prototype, 'defaultBlock', {
	    get: function () {
	        return c.defaultBlock;
	    },
	    set: function (val) {
	        c.defaultBlock = val;
	        return val;
	    }
	});
	
	Object.defineProperty(Eth.prototype, 'defaultAccount', {
	    get: function () {
	        return c.defaultAccount;
	    },
	    set: function (val) {
	        c.defaultAccount = val;
	        return val;
	    }
	});
	
	var methods = function () {
	    var getBalance = new Method({
	        name: 'getBalance',
	        call: 'eth_getBalance',
	        params: 2,
	        inputFormatter: [formatters.inputAddressFormatter, formatters.inputDefaultBlockNumberFormatter],
	        outputFormatter: formatters.outputBigNumberFormatter
	    });
	
	    var getStorageAt = new Method({
	        name: 'getStorageAt',
	        call: 'eth_getStorageAt',
	        params: 3,
	        inputFormatter: [null, utils.toHex, formatters.inputDefaultBlockNumberFormatter]
	    });
	
	    var getCode = new Method({
	        name: 'getCode',
	        call: 'eth_getCode',
	        params: 2,
	        inputFormatter: [formatters.inputAddressFormatter, formatters.inputDefaultBlockNumberFormatter]
	    });
	
	    var getBlock = new Method({
	        name: 'getBlock',
	        call: blockCall,
	        params: 2,
	        inputFormatter: [formatters.inputBlockNumberFormatter, function (val) { return !!val; }],
	        outputFormatter: formatters.outputBlockFormatter
	    });
	
	    var getUncle = new Method({
	        name: 'getUncle',
	        call: uncleCall,
	        params: 2,
	        inputFormatter: [formatters.inputBlockNumberFormatter, utils.toHex],
	        outputFormatter: formatters.outputBlockFormatter,
	
	    });
	
	    var getCompilers = new Method({
	        name: 'getCompilers',
	        call: 'eth_getCompilers',
	        params: 0
	    });
	
	    var getBlockTransactionCount = new Method({
	        name: 'getBlockTransactionCount',
	        call: getBlockTransactionCountCall,
	        params: 1,
	        inputFormatter: [formatters.inputBlockNumberFormatter],
	        outputFormatter: utils.toDecimal
	    });
	
	    var getBlockUncleCount = new Method({
	        name: 'getBlockUncleCount',
	        call: uncleCountCall,
	        params: 1,
	        inputFormatter: [formatters.inputBlockNumberFormatter],
	        outputFormatter: utils.toDecimal
	    });
	
	    var getTransaction = new Method({
	        name: 'getTransaction',
	        call: 'eth_getTransactionByHash',
	        params: 1,
	        outputFormatter: formatters.outputTransactionFormatter
	    });
	
	    var getTransactionFromBlock = new Method({
	        name: 'getTransactionFromBlock',
	        call: transactionFromBlockCall,
	        params: 2,
	        inputFormatter: [formatters.inputBlockNumberFormatter, utils.toHex],
	        outputFormatter: formatters.outputTransactionFormatter
	    });
	
	    var getTransactionReceipt = new Method({
	        name: 'getTransactionReceipt',
	        call: 'eth_getTransactionReceipt',
	        params: 1,
	        outputFormatter: formatters.outputTransactionReceiptFormatter
	    });
	
	    var getTransactionCount = new Method({
	        name: 'getTransactionCount',
	        call: 'eth_getTransactionCount',
	        params: 2,
	        inputFormatter: [null, formatters.inputDefaultBlockNumberFormatter],
	        outputFormatter: utils.toDecimal
	    });
	
	    var sendRawTransaction = new Method({
	        name: 'sendRawTransaction',
	        call: 'eth_sendRawTransaction',
	        params: 1,
	        inputFormatter: [null]
	    });
	
	    var sendTransaction = new Method({
	        name: 'sendTransaction',
	        call: 'eth_sendTransaction',
	        params: 1,
	        inputFormatter: [formatters.inputTransactionFormatter]
	    });
	
	    var sign = new Method({
	        name: 'sign',
	        call: 'eth_sign',
	        params: 2,
	        inputFormatter: [formatters.inputAddressFormatter, null]
	    });
	
	    var call = new Method({
	        name: 'call',
	        call: 'eth_call',
	        params: 2,
	        inputFormatter: [formatters.inputCallFormatter, formatters.inputDefaultBlockNumberFormatter]
	    });
	
	    var estimateGas = new Method({
	        name: 'estimateGas',
	        call: 'eth_estimateGas',
	        params: 1,
	        inputFormatter: [formatters.inputCallFormatter],
	        outputFormatter: utils.toDecimal
	    });
	
	    var compileSolidity = new Method({
	        name: 'compile.solidity',
	        call: 'eth_compileSolidity',
	        params: 1
	    });
	
	    var compileLLL = new Method({
	        name: 'compile.lll',
	        call: 'eth_compileLLL',
	        params: 1
	    });
	
	    var compileSerpent = new Method({
	        name: 'compile.serpent',
	        call: 'eth_compileSerpent',
	        params: 1
	    });
	
	    var submitWork = new Method({
	        name: 'submitWork',
	        call: 'eth_submitWork',
	        params: 3
	    });
	
	    var getWork = new Method({
	        name: 'getWork',
	        call: 'eth_getWork',
	        params: 0
	    });
	
	    return [
	        getBalance,
	        getStorageAt,
	        getCode,
	        getBlock,
	        getUncle,
	        getCompilers,
	        getBlockTransactionCount,
	        getBlockUncleCount,
	        getTransaction,
	        getTransactionFromBlock,
	        getTransactionReceipt,
	        getTransactionCount,
	        call,
	        estimateGas,
	        sendRawTransaction,
	        sendTransaction,
	        sign,
	        compileSolidity,
	        compileLLL,
	        compileSerpent,
	        submitWork,
	        getWork
	    ];
	};
	
	
	var properties = function () {
	    return [
	        new Property({
	            name: 'coinbase',
	            getter: 'eth_coinbase'
	        }),
	        new Property({
	            name: 'mining',
	            getter: 'eth_mining'
	        }),
	        new Property({
	            name: 'hashrate',
	            getter: 'eth_hashrate',
	            outputFormatter: utils.toDecimal
	        }),
	        new Property({
	            name: 'syncing',
	            getter: 'eth_syncing',
	            outputFormatter: formatters.outputSyncingFormatter
	        }),
	        new Property({
	            name: 'gasPrice',
	            getter: 'eth_gasPrice',
	            outputFormatter: formatters.outputBigNumberFormatter
	        }),
	        new Property({
	            name: 'accounts',
	            getter: 'eth_accounts'
	        }),
	        new Property({
	            name: 'blockNumber',
	            getter: 'eth_blockNumber',
	            outputFormatter: utils.toDecimal
	        })
	    ];
	};
	
	Eth.prototype.contract = function (abi) {
	    var factory = new Contract(this, abi);
	    return factory;
	};
	
	Eth.prototype.filter = function (fil, callback) {
	    return new Filter(this._requestManager, fil, watches.eth(), formatters.outputLogFormatter, callback);
	};
	
	Eth.prototype.namereg = function () {
	    return this.contract(namereg.global.abi).at(namereg.global.address);
	};
	
	Eth.prototype.icapNamereg = function () {
	    return this.contract(namereg.icap.abi).at(namereg.icap.address);
	};
	
	Eth.prototype.isSyncing = function (callback) {
	    return new IsSyncing(this._requestManager, callback);
	};
	
	module.exports = Eth;
	


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

	/*
	    This file is part of web3.js.
	
	    web3.js is free software: you can redistribute it and/or modify
	    it under the terms of the GNU Lesser General Public License as published by
	    the Free Software Foundation, either version 3 of the License, or
	    (at your option) any later version.
	
	    web3.js is distributed in the hope that it will be useful,
	    but WITHOUT ANY WARRANTY; without even the implied warranty of
	    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	    GNU Lesser General Public License for more details.
	
	    You should have received a copy of the GNU Lesser General Public License
	    along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
	*/
	/** 
	 * @file formatters.js
	 * @author Marek Kotewicz <marek@ethdev.com>
	 * @author Fabian Vogelsteller <fabian@ethdev.com>
	 * @date 2015
	 */
	
	var utils = __webpack_require__(24);
	var config = __webpack_require__(63);
	var Iban = __webpack_require__(65);
	
	/**
	 * Should the format output to a big number
	 *
	 * @method outputBigNumberFormatter
	 * @param {String|Number|BigNumber}
	 * @returns {BigNumber} object
	 */
	var outputBigNumberFormatter = function (number) {
	    return utils.toBigNumber(number);
	};
	
	var isPredefinedBlockNumber = function (blockNumber) {
	    return blockNumber === 'latest' || blockNumber === 'pending' || blockNumber === 'earliest';
	};
	
	var inputDefaultBlockNumberFormatter = function (blockNumber) {
	    if (blockNumber === undefined) {
	        return config.defaultBlock;
	    }
	    return inputBlockNumberFormatter(blockNumber);
	};
	
	var inputBlockNumberFormatter = function (blockNumber) {
	    if (blockNumber === undefined) {
	        return undefined;
	    } else if (isPredefinedBlockNumber(blockNumber)) {
	        return blockNumber;
	    }
	    return utils.toHex(blockNumber);
	};
	
	/**
	 * Formats the input of a transaction and converts all values to HEX
	 *
	 * @method inputCallFormatter
	 * @param {Object} transaction options
	 * @returns object
	*/
	var inputCallFormatter = function (options){
	
	    options.from = options.from || config.defaultAccount;
	
	    if (options.from) {
	        options.from = inputAddressFormatter(options.from);
	    }
	
	    if (options.to) { // it might be contract creation
	        options.to = inputAddressFormatter(options.to);
	    }
	
	    ['gasPrice', 'gas', 'value', 'nonce'].filter(function (key) {
	        return options[key] !== undefined;
	    }).forEach(function(key){
	        options[key] = utils.fromDecimal(options[key]);
	    });
	
	    return options; 
	};
	
	/**
	 * Formats the input of a transaction and converts all values to HEX
	 *
	 * @method inputTransactionFormatter
	 * @param {Object} transaction options
	 * @returns object
	*/
	var inputTransactionFormatter = function (options){
	
	    options.from = options.from || config.defaultAccount;
	    options.from = inputAddressFormatter(options.from);
	
	    if (options.to) { // it might be contract creation
	        options.to = inputAddressFormatter(options.to);
	    }
	
	    ['gasPrice', 'gas', 'value', 'nonce'].filter(function (key) {
	        return options[key] !== undefined;
	    }).forEach(function(key){
	        options[key] = utils.fromDecimal(options[key]);
	    });
	
	    return options; 
	};
	
	/**
	 * Formats the output of a transaction to its proper values
	 * 
	 * @method outputTransactionFormatter
	 * @param {Object} tx
	 * @returns {Object}
	*/
	var outputTransactionFormatter = function (tx){
	    if(tx.blockNumber !== null)
	        tx.blockNumber = utils.toDecimal(tx.blockNumber);
	    if(tx.transactionIndex !== null)
	        tx.transactionIndex = utils.toDecimal(tx.transactionIndex);
	    tx.nonce = utils.toDecimal(tx.nonce);
	    tx.gas = utils.toDecimal(tx.gas);
	    tx.gasPrice = utils.toBigNumber(tx.gasPrice);
	    tx.value = utils.toBigNumber(tx.value);
	    return tx;
	};
	
	/**
	 * Formats the output of a transaction receipt to its proper values
	 * 
	 * @method outputTransactionReceiptFormatter
	 * @param {Object} receipt
	 * @returns {Object}
	*/
	var outputTransactionReceiptFormatter = function (receipt){
	    if(receipt.blockNumber !== null)
	        receipt.blockNumber = utils.toDecimal(receipt.blockNumber);
	    if(receipt.transactionIndex !== null)
	        receipt.transactionIndex = utils.toDecimal(receipt.transactionIndex);
	    receipt.cumulativeGasUsed = utils.toDecimal(receipt.cumulativeGasUsed);
	    receipt.gasUsed = utils.toDecimal(receipt.gasUsed);
	
	    if(utils.isArray(receipt.logs)) {
	        receipt.logs = receipt.logs.map(function(log){
	            return outputLogFormatter(log);
	        });
	    }
	
	    return receipt;
	};
	
	/**
	 * Formats the output of a block to its proper values
	 *
	 * @method outputBlockFormatter
	 * @param {Object} block 
	 * @returns {Object}
	*/
	var outputBlockFormatter = function(block) {
	
	    // transform to number
	    block.gasLimit = utils.toDecimal(block.gasLimit);
	    block.gasUsed = utils.toDecimal(block.gasUsed);
	    block.size = utils.toDecimal(block.size);
	    block.timestamp = utils.toDecimal(block.timestamp);
	    if(block.number !== null)
	        block.number = utils.toDecimal(block.number);
	
	    block.difficulty = utils.toBigNumber(block.difficulty);
	    block.totalDifficulty = utils.toBigNumber(block.totalDifficulty);
	
	    if (utils.isArray(block.transactions)) {
	        block.transactions.forEach(function(item){
	            if(!utils.isString(item))
	                return outputTransactionFormatter(item);
	        });
	    }
	
	    return block;
	};
	
	/**
	 * Formats the output of a log
	 * 
	 * @method outputLogFormatter
	 * @param {Object} log object
	 * @returns {Object} log
	*/
	var outputLogFormatter = function(log) {
	    if(log.blockNumber !== null)
	        log.blockNumber = utils.toDecimal(log.blockNumber);
	    if(log.transactionIndex !== null)
	        log.transactionIndex = utils.toDecimal(log.transactionIndex);
	    if(log.logIndex !== null)
	        log.logIndex = utils.toDecimal(log.logIndex);
	
	    return log;
	};
	
	/**
	 * Formats the input of a whisper post and converts all values to HEX
	 *
	 * @method inputPostFormatter
	 * @param {Object} transaction object
	 * @returns {Object}
	*/
	var inputPostFormatter = function(post) {
	
	    // post.payload = utils.toHex(post.payload);
	    post.ttl = utils.fromDecimal(post.ttl);
	    post.workToProve = utils.fromDecimal(post.workToProve);
	    post.priority = utils.fromDecimal(post.priority);
	
	    // fallback
	    if (!utils.isArray(post.topics)) {
	        post.topics = post.topics ? [post.topics] : [];
	    }
	
	    // format the following options
	    post.topics = post.topics.map(function(topic){
	        // convert only if not hex
	        return (topic.indexOf('0x') === 0) ? topic : utils.fromUtf8(topic);
	    });
	
	    return post; 
	};
	
	/**
	 * Formats the output of a received post message
	 *
	 * @method outputPostFormatter
	 * @param {Object}
	 * @returns {Object}
	 */
	var outputPostFormatter = function(post){
	
	    post.expiry = utils.toDecimal(post.expiry);
	    post.sent = utils.toDecimal(post.sent);
	    post.ttl = utils.toDecimal(post.ttl);
	    post.workProved = utils.toDecimal(post.workProved);
	    // post.payloadRaw = post.payload;
	    // post.payload = utils.toAscii(post.payload);
	
	    // if (utils.isJson(post.payload)) {
	    //     post.payload = JSON.parse(post.payload);
	    // }
	
	    // format the following options
	    if (!post.topics) {
	        post.topics = [];
	    }
	    post.topics = post.topics.map(function(topic){
	        return utils.toAscii(topic);
	    });
	
	    return post;
	};
	
	var inputAddressFormatter = function (address) {
	    var iban = new Iban(address);
	    if (iban.isValid() && iban.isDirect()) {
	        return '0x' + iban.address();
	    } else if (utils.isStrictAddress(address)) {
	        return address;
	    } else if (utils.isAddress(address)) {
	        return '0x' + address;
	    }
	    throw 'invalid address';
	};
	
	
	var outputSyncingFormatter = function(result) {
	
	    result.startingBlock = utils.toDecimal(result.startingBlock);
	    result.currentBlock = utils.toDecimal(result.currentBlock);
	    result.highestBlock = utils.toDecimal(result.highestBlock);
	
	    return result;
	};
	
	module.exports = {
	    inputDefaultBlockNumberFormatter: inputDefaultBlockNumberFormatter,
	    inputBlockNumberFormatter: inputBlockNumberFormatter,
	    inputCallFormatter: inputCallFormatter,
	    inputTransactionFormatter: inputTransactionFormatter,
	    inputAddressFormatter: inputAddressFormatter,
	    inputPostFormatter: inputPostFormatter,
	    outputBigNumberFormatter: outputBigNumberFormatter,
	    outputTransactionFormatter: outputTransactionFormatter,
	    outputTransactionReceiptFormatter: outputTransactionReceiptFormatter,
	    outputBlockFormatter: outputBlockFormatter,
	    outputLogFormatter: outputLogFormatter,
	    outputPostFormatter: outputPostFormatter,
	    outputSyncingFormatter: outputSyncingFormatter
	};
	


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

	/*
	    This file is part of web3.js.
	
	    web3.js is free software: you can redistribute it and/or modify
	    it under the terms of the GNU Lesser General Public License as published by
	    the Free Software Foundation, either version 3 of the License, or
	    (at your option) any later version.
	
	    web3.js is distributed in the hope that it will be useful,
	    but WITHOUT ANY WARRANTY; without even the implied warranty of
	    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	    GNU Lesser General Public License for more details.
	
	    You should have received a copy of the GNU Lesser General Public License
	    along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
	*/
	/**
	 * @file method.js
	 * @author Marek Kotewicz <marek@ethdev.com>
	 * @date 2015
	 */
	
	var utils = __webpack_require__(24);
	var errors = __webpack_require__(64);
	
	var Method = function (options) {
	    this.name = options.name;
	    this.call = options.call;
	    this.params = options.params || 0;
	    this.inputFormatter = options.inputFormatter;
	    this.outputFormatter = options.outputFormatter;
	    this.requestManager = null;
	};
	
	Method.prototype.setRequestManager = function (rm) {
	    this.requestManager = rm;
	};
	
	/**
	 * Should be used to determine name of the jsonrpc method based on arguments
	 *
	 * @method getCall
	 * @param {Array} arguments
	 * @return {String} name of jsonrpc method
	 */
	Method.prototype.getCall = function (args) {
	    return utils.isFunction(this.call) ? this.call(args) : this.call;
	};
	
	/**
	 * Should be used to extract callback from array of arguments. Modifies input param
	 *
	 * @method extractCallback
	 * @param {Array} arguments
	 * @return {Function|Null} callback, if exists
	 */
	Method.prototype.extractCallback = function (args) {
	    if (utils.isFunction(args[args.length - 1])) {
	        return args.pop(); // modify the args array!
	    }
	};
	
	/**
	 * Should be called to check if the number of arguments is correct
	 * 
	 * @method validateArgs
	 * @param {Array} arguments
	 * @throws {Error} if it is not
	 */
	Method.prototype.validateArgs = function (args) {
	    if (args.length !== this.params) {
	        throw errors.InvalidNumberOfParams();
	    }
	};
	
	/**
	 * Should be called to format input args of method
	 * 
	 * @method formatInput
	 * @param {Array}
	 * @return {Array}
	 */
	Method.prototype.formatInput = function (args) {
	    if (!this.inputFormatter) {
	        return args;
	    }
	
	    return this.inputFormatter.map(function (formatter, index) {
	        return formatter ? formatter(args[index]) : args[index];
	    });
	};
	
	/**
	 * Should be called to format output(result) of method
	 *
	 * @method formatOutput
	 * @param {Object}
	 * @return {Object}
	 */
	Method.prototype.formatOutput = function (result) {
	    return this.outputFormatter && result ? this.outputFormatter(result) : result;
	};
	
	/**
	 * Should create payload from given input args
	 *
	 * @method toPayload
	 * @param {Array} args
	 * @return {Object}
	 */
	Method.prototype.toPayload = function (args) {
	    var call = this.getCall(args);
	    var callback = this.extractCallback(args);
	    var params = this.formatInput(args);
	    this.validateArgs(params);
	
	    return {
	        method: call,
	        params: params,
	        callback: callback
	    };
	};
	
	Method.prototype.attachToObject = function (obj) {
	    var func = this.buildCall();
	    func.call = this.call; // TODO!!! that's ugly. filter.js uses it
	    var name = this.name.split('.');
	    if (name.length > 1) {
	        obj[name[0]] = obj[name[0]] || {};
	        obj[name[0]][name[1]] = func;
	    } else {
	        obj[name[0]] = func; 
	    }
	};
	
	Method.prototype.buildCall = function() {
	    var method = this;
	    var send = function () {
	        var payload = method.toPayload(Array.prototype.slice.call(arguments));
	        if (payload.callback) {
	            return method.requestManager.sendAsync(payload, function (err, result) {
	                payload.callback(err, method.formatOutput(result));
	            });
	        }
	        return method.formatOutput(method.requestManager.send(payload));
	    };
	    send.request = this.request.bind(this);
	    return send;
	};
	
	/**
	 * Should be called to create pure JSONRPC request which can be used in batch request
	 *
	 * @method request
	 * @param {...} params
	 * @return {Object} jsonrpc request
	 */
	Method.prototype.request = function () {
	    var payload = this.toPayload(Array.prototype.slice.call(arguments));
	    payload.format = this.formatOutput.bind(this);
	    return payload;
	};
	
	module.exports = Method;
	


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

	/*
	    This file is part of web3.js.
	
	    web3.js is free software: you can redistribute it and/or modify
	    it under the terms of the GNU Lesser General Public License as published by
	    the Free Software Foundation, either version 3 of the License, or
	    (at your option) any later version.
	
	    web3.js is distributed in the hope that it will be useful,
	    but WITHOUT ANY WARRANTY; without even the implied warranty of
	    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	    GNU Lesser General Public License for more details.
	
	    You should have received a copy of the GNU Lesser General Public License
	    along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
	*/
	/**
	 * @file property.js
	 * @author Fabian Vogelsteller <fabian@frozeman.de>
	 * @author Marek Kotewicz <marek@ethdev.com>
	 * @date 2015
	 */
	
	var utils = __webpack_require__(24);
	
	var Property = function (options) {
	    this.name = options.name;
	    this.getter = options.getter;
	    this.setter = options.setter;
	    this.outputFormatter = options.outputFormatter;
	    this.inputFormatter = options.inputFormatter;
	    this.requestManager = null;
	};
	
	Property.prototype.setRequestManager = function (rm) {
	    this.requestManager = rm;
	};
	
	/**
	 * Should be called to format input args of method
	 * 
	 * @method formatInput
	 * @param {Array}
	 * @return {Array}
	 */
	Property.prototype.formatInput = function (arg) {
	    return this.inputFormatter ? this.inputFormatter(arg) : arg;
	};
	
	/**
	 * Should be called to format output(result) of method
	 *
	 * @method formatOutput
	 * @param {Object}
	 * @return {Object}
	 */
	Property.prototype.formatOutput = function (result) {
	    return this.outputFormatter && result !== null ? this.outputFormatter(result) : result;
	};
	
	/**
	 * Should be used to extract callback from array of arguments. Modifies input param
	 *
	 * @method extractCallback
	 * @param {Array} arguments
	 * @return {Function|Null} callback, if exists
	 */
	Property.prototype.extractCallback = function (args) {
	    if (utils.isFunction(args[args.length - 1])) {
	        return args.pop(); // modify the args array!
	    }
	};
	
	
	/**
	 * Should attach function to method
	 * 
	 * @method attachToObject
	 * @param {Object}
	 * @param {Function}
	 */
	Property.prototype.attachToObject = function (obj) {
	    var proto = {
	        get: this.buildGet(),
	        enumerable: true 
	    };
	
	    var names = this.name.split('.');
	    var name = names[0];
	    if (names.length > 1) {
	        obj[names[0]] = obj[names[0]] || {};
	        obj = obj[names[0]];
	        name = names[1];
	    }
	
	    Object.defineProperty(obj, name, proto);
	    obj[asyncGetterName(name)] = this.buildAsyncGet();
	};
	
	var asyncGetterName = function (name) {
	    return 'get' + name.charAt(0).toUpperCase() + name.slice(1);
	};
	
	Property.prototype.buildGet = function () {
	    var property = this;
	    return function get() {
	        return property.formatOutput(property.requestManager.send({
	            method: property.getter
	        })); 
	    };
	};
	
	Property.prototype.buildAsyncGet = function () {
	    var property = this;
	    var get = function (callback) {
	        property.requestManager.sendAsync({
	            method: property.getter
	        }, function (err, result) {
	            callback(err, property.formatOutput(result));
	        });
	    };
	    get.request = this.request.bind(this);
	    return get;
	};
	
	/**
	 * Should be called to create pure JSONRPC request which can be used in batch request
	 *
	 * @method request
	 * @param {...} params
	 * @return {Object} jsonrpc request
	 */
	Property.prototype.request = function () {
	    var payload = {
	        method: this.getter,
	        params: [],
	        callback: this.extractCallback(Array.prototype.slice.call(arguments))
	    };
	    payload.format = this.formatOutput.bind(this);
	    return payload;
	};
	
	module.exports = Property;
	


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

	/*
	    This file is part of web3.js.
	
	    web3.js is free software: you can redistribute it and/or modify
	    it under the terms of the GNU Lesser General Public License as published by
	    the Free Software Foundation, either version 3 of the License, or
	    (at your option) any later version.
	
	    web3.js is distributed in the hope that it will be useful,
	    but WITHOUT ANY WARRANTY; without even the implied warranty of
	    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	    GNU Lesser General Public License for more details.
	
	    You should have received a copy of the GNU Lesser General Public License
	    along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
	*/
	/**
	 * @file contract.js
	 * @author Marek Kotewicz <marek@ethdev.com>
	 * @date 2014
	 */
	
	var utils = __webpack_require__(24);
	var coder = __webpack_require__(71);
	var SolidityEvent = __webpack_require__(84);
	var SolidityFunction = __webpack_require__(87);
	var AllEvents = __webpack_require__(88);
	
	/**
	 * Should be called to encode constructor params
	 *
	 * @method encodeConstructorParams
	 * @param {Array} abi
	 * @param {Array} constructor params
	 */
	var encodeConstructorParams = function (abi, params) {
	    return abi.filter(function (json) {
	        return json.type === 'constructor' && json.inputs.length === params.length;
	    }).map(function (json) {
	        return json.inputs.map(function (input) {
	            return input.type;
	        });
	    }).map(function (types) {
	        return coder.encodeParams(types, params);
	    })[0] || '';
	};
	
	/**
	 * Should be called to add functions to contract object
	 *
	 * @method addFunctionsToContract
	 * @param {Contract} contract
	 * @param {Array} abi
	 */
	var addFunctionsToContract = function (contract) {
	    contract.abi.filter(function (json) {
	        return json.type === 'function';
	    }).map(function (json) {
	        return new SolidityFunction(contract._eth, json, contract.address);
	    }).forEach(function (f) {
	        f.attachToContract(contract);
	    });
	};
	
	/**
	 * Should be called to add events to contract object
	 *
	 * @method addEventsToContract
	 * @param {Contract} contract
	 * @param {Array} abi
	 */
	var addEventsToContract = function (contract) {
	    var events = contract.abi.filter(function (json) {
	        return json.type === 'event';
	    });
	
	    var All = new AllEvents(contract._eth._requestManager, events, contract.address);
	    All.attachToContract(contract);
	
	    events.map(function (json) {
	        return new SolidityEvent(contract._eth._requestManager, json, contract.address);
	    }).forEach(function (e) {
	        e.attachToContract(contract);
	    });
	};
	
	
	/**
	 * Should be called to check if the contract gets properly deployed on the blockchain.
	 *
	 * @method checkForContractAddress
	 * @param {Object} contract
	 * @param {Function} callback
	 * @returns {Undefined}
	 */
	var checkForContractAddress = function(contract, callback){
	    var count = 0,
	        callbackFired = false;
	
	    // wait for receipt
	    var filter = contract._eth.filter('latest', function(e){
	        if (!e && !callbackFired) {
	            count++;
	
	            // stop watching after 50 blocks (timeout)
	            if (count > 50) {
	
	                filter.stopWatching();
	                callbackFired = true;
	
	                if (callback)
	                    callback(new Error('Contract transaction couldn\'t be found after 50 blocks'));
	                else
	                    throw new Error('Contract transaction couldn\'t be found after 50 blocks');
	
	
	            } else {
	
	                contract._eth.getTransactionReceipt(contract.transactionHash, function(e, receipt){
	                    if(receipt && !callbackFired) {
	
	                        contract._eth.getCode(receipt.contractAddress, function(e, code){
	                            /*jshint maxcomplexity: 6 */
	
	                            if(callbackFired || !code)
	                                return;
	
	                            filter.stopWatching();
	                            callbackFired = true;
	
	                            if(code.length > 2) {
	
	                                // console.log('Contract code deployed!');
	
	                                contract.address = receipt.contractAddress;
	
	                                // attach events and methods again after we have
	                                addFunctionsToContract(contract);
	                                addEventsToContract(contract);
	
	                                // call callback for the second time
	                                if(callback)
	                                    callback(null, contract);
	
	                            } else {
	                                if(callback)
	                                    callback(new Error('The contract code couldn\'t be stored, please check your gas amount.'));
	                                else
	                                    throw new Error('The contract code couldn\'t be stored, please check your gas amount.');
	                            }
	                        });
	                    }
	                });
	            }
	        }
	    });
	};
	
	/**
	 * Should be called to create new ContractFactory instance
	 *
	 * @method ContractFactory
	 * @param {Array} abi
	 */
	var ContractFactory = function (eth, abi) {
	    this.eth = eth;
	    this.abi = abi;
	
	    /**
	     * Should be called to create new contract on a blockchain
	     *
	     * @method new
	     * @param {Any} contract constructor param1 (optional)
	     * @param {Any} contract constructor param2 (optional)
	     * @param {Object} contract transaction object (required)
	     * @param {Function} callback
	     * @returns {Contract} returns contract instance
	     */
	    this.new = function () {
	        var contract = new Contract(this.eth, this.abi);
	
	        // parse arguments
	        var options = {}; // required!
	        var callback;
	
	        var args = Array.prototype.slice.call(arguments);
	        if (utils.isFunction(args[args.length - 1])) {
	            callback = args.pop();
	        }
	
	        var last = args[args.length - 1];
	        if (utils.isObject(last) && !utils.isArray(last)) {
	            options = args.pop();
	        }
	
	        var bytes = encodeConstructorParams(this.abi, args);
	        options.data += bytes;
	
	        if (callback) {
	
	            // wait for the contract address adn check if the code was deployed
	            this.eth.sendTransaction(options, function (err, hash) {
	                if (err) {
	                    callback(err);
	                } else {
	                    // add the transaction hash
	                    contract.transactionHash = hash;
	
	                    // call callback for the first time
	                    callback(null, contract);
	
	                    checkForContractAddress(contract, callback);
	                }
	            });
	        } else {
	            var hash = this.eth.sendTransaction(options);
	            // add the transaction hash
	            contract.transactionHash = hash;
	            checkForContractAddress(contract);
	        }
	
	        return contract;
	    };
	
	    this.new.getData = this.getData.bind(this);
	};
	
	/**
	 * Should be called to create new ContractFactory
	 *
	 * @method contract
	 * @param {Array} abi
	 * @returns {ContractFactory} new contract factory
	 */
	//var contract = function (abi) {
	    //return new ContractFactory(abi);
	//};
	
	
	
	/**
	 * Should be called to get access to existing contract on a blockchain
	 *
	 * @method at
	 * @param {Address} contract address (required)
	 * @param {Function} callback {optional)
	 * @returns {Contract} returns contract if no callback was passed,
	 * otherwise calls callback function (err, contract)
	 */
	ContractFactory.prototype.at = function (address, callback) {
	    var contract = new Contract(this.eth, this.abi, address);
	
	    // this functions are not part of prototype,
	    // because we dont want to spoil the interface
	    addFunctionsToContract(contract);
	    addEventsToContract(contract);
	
	    if (callback) {
	        callback(null, contract);
	    }
	    return contract;
	};
	
	/**
	 * Gets the data, which is data to deploy plus constructor params
	 *
	 * @method getData
	 */
	ContractFactory.prototype.getData = function () {
	    var options = {}; // required!
	    var args = Array.prototype.slice.call(arguments);
	
	    var last = args[args.length - 1];
	    if (utils.isObject(last) && !utils.isArray(last)) {
	        options = args.pop();
	    }
	
	    var bytes = encodeConstructorParams(this.abi, args);
	    options.data += bytes;
	
	    return options.data;
	};
	
	/**
	 * Should be called to create new contract instance
	 *
	 * @method Contract
	 * @param {Array} abi
	 * @param {Address} contract address
	 */
	var Contract = function (eth, abi, address) {
	    this._eth = eth;
	    this.transactionHash = null;
	    this.address = address;
	    this.abi = abi;
	};
	
	module.exports = ContractFactory;


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

	/*
	    This file is part of web3.js.
	
	    web3.js is free software: you can redistribute it and/or modify
	    it under the terms of the GNU Lesser General Public License as published by
	    the Free Software Foundation, either version 3 of the License, or
	    (at your option) any later version.
	
	    web3.js is distributed in the hope that it will be useful,
	    but WITHOUT ANY WARRANTY; without even the implied warranty of
	    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	    GNU Lesser General Public License for more details.
	
	    You should have received a copy of the GNU Lesser General Public License
	    along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
	*/
	/** 
	 * @file coder.js
	 * @author Marek Kotewicz <marek@ethdev.com>
	 * @date 2015
	 */
	
	var f = __webpack_require__(72);
	
	var SolidityTypeAddress = __webpack_require__(74);
	var SolidityTypeBool = __webpack_require__(76);
	var SolidityTypeInt = __webpack_require__(77);
	var SolidityTypeUInt = __webpack_require__(78);
	var SolidityTypeDynamicBytes = __webpack_require__(79);
	var SolidityTypeString = __webpack_require__(80);
	var SolidityTypeReal = __webpack_require__(81);
	var SolidityTypeUReal = __webpack_require__(82);
	var SolidityTypeBytes = __webpack_require__(83);
	
	/**
	 * SolidityCoder prototype should be used to encode/decode solidity params of any type
	 */
	var SolidityCoder = function (types) {
	    this._types = types;
	};
	
	/**
	 * This method should be used to transform type to SolidityType
	 *
	 * @method _requireType
	 * @param {String} type
	 * @returns {SolidityType} 
	 * @throws {Error} throws if no matching type is found
	 */
	SolidityCoder.prototype._requireType = function (type) {
	    var solidityType = this._types.filter(function (t) {
	        return t.isType(type);
	    })[0];
	
	    if (!solidityType) {
	        throw Error('invalid solidity type!: ' + type);
	    }
	
	    return solidityType;
	};
	
	/**
	 * Should be used to encode plain param
	 *
	 * @method encodeParam
	 * @param {String} type
	 * @param {Object} plain param
	 * @return {String} encoded plain param
	 */
	SolidityCoder.prototype.encodeParam = function (type, param) {
	    return this.encodeParams([type], [param]);
	};
	
	/**
	 * Should be used to encode list of params
	 *
	 * @method encodeParams
	 * @param {Array} types
	 * @param {Array} params
	 * @return {String} encoded list of params
	 */
	SolidityCoder.prototype.encodeParams = function (types, params) {
	    var solidityTypes = this.getSolidityTypes(types);
	
	    var encodeds = solidityTypes.map(function (solidityType, index) {
	        return solidityType.encode(params[index], types[index]);
	    });
	
	    var dynamicOffset = solidityTypes.reduce(function (acc, solidityType, index) {
	        var staticPartLength = solidityType.staticPartLength(types[index]);
	        var roundedStaticPartLength = Math.floor((staticPartLength + 31) / 32) * 32;
	        return acc + roundedStaticPartLength;
	    }, 0);
	
	    var result = this.encodeMultiWithOffset(types, solidityTypes, encodeds, dynamicOffset); 
	
	    return result;
	};
	
	SolidityCoder.prototype.encodeMultiWithOffset = function (types, solidityTypes, encodeds, dynamicOffset) {
	    var result = "";
	    var self = this;
	
	    var isDynamic = function (i) {
	       return solidityTypes[i].isDynamicArray(types[i]) || solidityTypes[i].isDynamicType(types[i]);
	    };
	
	    types.forEach(function (type, i) {
	        if (isDynamic(i)) {
	            result += f.formatInputInt(dynamicOffset).encode();
	            var e = self.encodeWithOffset(types[i], solidityTypes[i], encodeds[i], dynamicOffset);
	            dynamicOffset += e.length / 2;
	        } else {
	            // don't add length to dynamicOffset. it's already counted
	            result += self.encodeWithOffset(types[i], solidityTypes[i], encodeds[i], dynamicOffset);
	        }
	
	        // TODO: figure out nested arrays
	    });
	    
	    types.forEach(function (type, i) {
	        if (isDynamic(i)) {
	            var e = self.encodeWithOffset(types[i], solidityTypes[i], encodeds[i], dynamicOffset);
	            dynamicOffset += e.length / 2;
	            result += e;
	        }
	    });
	    return result;
	};
	
	// TODO: refactor whole encoding!
	SolidityCoder.prototype.encodeWithOffset = function (type, solidityType, encoded, offset) {
	    var self = this;
	    if (solidityType.isDynamicArray(type)) {
	        return (function () {
	            // offset was already set
	            var nestedName = solidityType.nestedName(type);
	            var nestedStaticPartLength = solidityType.staticPartLength(nestedName);
	            var result = encoded[0];
	            
	            (function () {
	                var previousLength = 2; // in int
	                if (solidityType.isDynamicArray(nestedName)) {
	                    for (var i = 1; i < encoded.length; i++) {
	                        previousLength += +(encoded[i - 1])[0] || 0;
	                        result += f.formatInputInt(offset + i * nestedStaticPartLength + previousLength * 32).encode();
	                    }
	                }
	            })();
	            
	            // first element is length, skip it
	            (function () {
	                for (var i = 0; i < encoded.length - 1; i++) {
	                    var additionalOffset = result / 2;
	                    result += self.encodeWithOffset(nestedName, solidityType, encoded[i + 1], offset +  additionalOffset);
	                }
	            })();
	
	            return result;
	        })();
	       
	    } else if (solidityType.isStaticArray(type)) {
	        return (function () {
	            var nestedName = solidityType.nestedName(type);
	            var nestedStaticPartLength = solidityType.staticPartLength(nestedName);
	            var result = "";
	
	
	            if (solidityType.isDynamicArray(nestedName)) {
	                (function () {
	                    var previousLength = 0; // in int
	                    for (var i = 0; i < encoded.length; i++) {
	                        // calculate length of previous item
	                        previousLength += +(encoded[i - 1] || [])[0] || 0; 
	                        result += f.formatInputInt(offset + i * nestedStaticPartLength + previousLength * 32).encode();
	                    }
	                })();
	            }
	
	            (function () {
	                for (var i = 0; i < encoded.length; i++) {
	                    var additionalOffset = result / 2;
	                    result += self.encodeWithOffset(nestedName, solidityType, encoded[i], offset + additionalOffset);
	                }
	            })();
	
	            return result;
	        })();
	    }
	
	    return encoded;
	};
	
	/**
	 * Should be used to decode bytes to plain param
	 *
	 * @method decodeParam
	 * @param {String} type
	 * @param {String} bytes
	 * @return {Object} plain param
	 */
	SolidityCoder.prototype.decodeParam = function (type, bytes) {
	    return this.decodeParams([type], bytes)[0];
	};
	
	/**
	 * Should be used to decode list of params
	 *
	 * @method decodeParam
	 * @param {Array} types
	 * @param {String} bytes
	 * @return {Array} array of plain params
	 */
	SolidityCoder.prototype.decodeParams = function (types, bytes) {
	    var solidityTypes = this.getSolidityTypes(types);
	    var offsets = this.getOffsets(types, solidityTypes);
	        
	    return solidityTypes.map(function (solidityType, index) {
	        return solidityType.decode(bytes, offsets[index],  types[index], index);
	    });
	};
	
	SolidityCoder.prototype.getOffsets = function (types, solidityTypes) {
	    var lengths =  solidityTypes.map(function (solidityType, index) {
	        return solidityType.staticPartLength(types[index]);
	    });
	    
	    for (var i = 1; i < lengths.length; i++) {
	         // sum with length of previous element
	        lengths[i] += lengths[i - 1]; 
	    }
	
	    return lengths.map(function (length, index) {
	        // remove the current length, so the length is sum of previous elements
	        var staticPartLength = solidityTypes[index].staticPartLength(types[index]);
	        return length - staticPartLength; 
	    });
	};
	
	SolidityCoder.prototype.getSolidityTypes = function (types) {
	    var self = this;
	    return types.map(function (type) {
	        return self._requireType(type);
	    });
	};
	
	var coder = new SolidityCoder([
	    new SolidityTypeAddress(),
	    new SolidityTypeBool(),
	    new SolidityTypeInt(),
	    new SolidityTypeUInt(),
	    new SolidityTypeDynamicBytes(),
	    new SolidityTypeBytes(),
	    new SolidityTypeString(),
	    new SolidityTypeReal(),
	    new SolidityTypeUReal()
	]);
	
	module.exports = coder;
	


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

	/*
	    This file is part of web3.js.
	
	    web3.js is free software: you can redistribute it and/or modify
	    it under the terms of the GNU Lesser General Public License as published by
	    the Free Software Foundation, either version 3 of the License, or
	    (at your option) any later version.
	
	    web3.js is distributed in the hope that it will be useful,
	    but WITHOUT ANY WARRANTY; without even the implied warranty of
	    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	    GNU Lesser General Public License for more details.
	
	    You should have received a copy of the GNU Lesser General Public License
	    along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
	*/
	/** 
	 * @file formatters.js
	 * @author Marek Kotewicz <marek@ethdev.com>
	 * @date 2015
	 */
	
	var BigNumber = __webpack_require__(25);
	var utils = __webpack_require__(24);
	var c = __webpack_require__(63);
	var SolidityParam = __webpack_require__(73);
	
	
	/**
	 * Formats input value to byte representation of int
	 * If value is negative, return it's two's complement
	 * If the value is floating point, round it down
	 *
	 * @method formatInputInt
	 * @param {String|Number|BigNumber} value that needs to be formatted
	 * @returns {SolidityParam}
	 */
	var formatInputInt = function (value) {
	    BigNumber.config(c.ETH_BIGNUMBER_ROUNDING_MODE);
	    var result = utils.padLeft(utils.toTwosComplement(value).round().toString(16), 64);
	    return new SolidityParam(result);
	};
	
	/**
	 * Formats input bytes
	 *
	 * @method formatInputBytes
	 * @param {String}
	 * @returns {SolidityParam}
	 */
	var formatInputBytes = function (value) {
	    var result = utils.toHex(value).substr(2);
	    var l = Math.floor((result.length + 63) / 64);
	    result = utils.padRight(result, l * 64);
	    return new SolidityParam(result);
	};
	
	/**
	 * Formats input bytes
	 *
	 * @method formatDynamicInputBytes
	 * @param {String}
	 * @returns {SolidityParam}
	 */
	var formatInputDynamicBytes = function (value) {
	    var result = utils.toHex(value).substr(2);
	    var length = result.length / 2;
	    var l = Math.floor((result.length + 63) / 64);
	    result = utils.padRight(result, l * 64);
	    return new SolidityParam(formatInputInt(length).value + result);
	};
	
	/**
	 * Formats input value to byte representation of string
	 *
	 * @method formatInputString
	 * @param {String}
	 * @returns {SolidityParam}
	 */
	var formatInputString = function (value) {
	    var result = utils.fromUtf8(value).substr(2);
	    var length = result.length / 2;
	    var l = Math.floor((result.length + 63) / 64);
	    result = utils.padRight(result, l * 64);
	    return new SolidityParam(formatInputInt(length).value + result);
	};
	
	/**
	 * Formats input value to byte representation of bool
	 *
	 * @method formatInputBool
	 * @param {Boolean}
	 * @returns {SolidityParam}
	 */
	var formatInputBool = function (value) {
	    var result = '000000000000000000000000000000000000000000000000000000000000000' + (value ?  '1' : '0');
	    return new SolidityParam(result);
	};
	
	/**
	 * Formats input value to byte representation of real
	 * Values are multiplied by 2^m and encoded as integers
	 *
	 * @method formatInputReal
	 * @param {String|Number|BigNumber}
	 * @returns {SolidityParam}
	 */
	var formatInputReal = function (value) {
	    return formatInputInt(new BigNumber(value).times(new BigNumber(2).pow(128)));
	};
	
	/**
	 * Check if input value is negative
	 *
	 * @method signedIsNegative
	 * @param {String} value is hex format
	 * @returns {Boolean} true if it is negative, otherwise false
	 */
	var signedIsNegative = function (value) {
	    return (new BigNumber(value.substr(0, 1), 16).toString(2).substr(0, 1)) === '1';
	};
	
	/**
	 * Formats right-aligned output bytes to int
	 *
	 * @method formatOutputInt
	 * @param {SolidityParam} param
	 * @returns {BigNumber} right-aligned output bytes formatted to big number
	 */
	var formatOutputInt = function (param) {
	    var value = param.staticPart() || "0";
	
	    // check if it's negative number
	    // it it is, return two's complement
	    if (signedIsNegative(value)) {
	        return new BigNumber(value, 16).minus(new BigNumber('ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff', 16)).minus(1);
	    }
	    return new BigNumber(value, 16);
	};
	
	/**
	 * Formats right-aligned output bytes to uint
	 *
	 * @method formatOutputUInt
	 * @param {SolidityParam}
	 * @returns {BigNumeber} right-aligned output bytes formatted to uint
	 */
	var formatOutputUInt = function (param) {
	    var value = param.staticPart() || "0";
	    return new BigNumber(value, 16);
	};
	
	/**
	 * Formats right-aligned output bytes to real
	 *
	 * @method formatOutputReal
	 * @param {SolidityParam}
	 * @returns {BigNumber} input bytes formatted to real
	 */
	var formatOutputReal = function (param) {
	    return formatOutputInt(param).dividedBy(new BigNumber(2).pow(128)); 
	};
	
	/**
	 * Formats right-aligned output bytes to ureal
	 *
	 * @method formatOutputUReal
	 * @param {SolidityParam}
	 * @returns {BigNumber} input bytes formatted to ureal
	 */
	var formatOutputUReal = function (param) {
	    return formatOutputUInt(param).dividedBy(new BigNumber(2).pow(128)); 
	};
	
	/**
	 * Should be used to format output bool
	 *
	 * @method formatOutputBool
	 * @param {SolidityParam}
	 * @returns {Boolean} right-aligned input bytes formatted to bool
	 */
	var formatOutputBool = function (param) {
	    return param.staticPart() === '0000000000000000000000000000000000000000000000000000000000000001' ? true : false;
	};
	
	/**
	 * Should be used to format output bytes
	 *
	 * @method formatOutputBytes
	 * @param {SolidityParam} left-aligned hex representation of string
	 * @returns {String} hex string
	 */
	var formatOutputBytes = function (param) {
	    return '0x' + param.staticPart();
	};
	
	/**
	 * Should be used to format output bytes
	 *
	 * @method formatOutputDynamicBytes
	 * @param {SolidityParam} left-aligned hex representation of string
	 * @returns {String} hex string
	 */
	var formatOutputDynamicBytes = function (param) {
	    var length = (new BigNumber(param.dynamicPart().slice(0, 64), 16)).toNumber() * 2;
	    return '0x' + param.dynamicPart().substr(64, length);
	};
	
	/**
	 * Should be used to format output string
	 *
	 * @method formatOutputString
	 * @param {SolidityParam} left-aligned hex representation of string
	 * @returns {String} ascii string
	 */
	var formatOutputString = function (param) {
	    var length = (new BigNumber(param.dynamicPart().slice(0, 64), 16)).toNumber() * 2;
	    return utils.toUtf8(param.dynamicPart().substr(64, length));
	};
	
	/**
	 * Should be used to format output address
	 *
	 * @method formatOutputAddress
	 * @param {SolidityParam} right-aligned input bytes
	 * @returns {String} address
	 */
	var formatOutputAddress = function (param) {
	    var value = param.staticPart();
	    return "0x" + value.slice(value.length - 40, value.length);
	};
	
	module.exports = {
	    formatInputInt: formatInputInt,
	    formatInputBytes: formatInputBytes,
	    formatInputDynamicBytes: formatInputDynamicBytes,
	    formatInputString: formatInputString,
	    formatInputBool: formatInputBool,
	    formatInputReal: formatInputReal,
	    formatOutputInt: formatOutputInt,
	    formatOutputUInt: formatOutputUInt,
	    formatOutputReal: formatOutputReal,
	    formatOutputUReal: formatOutputUReal,
	    formatOutputBool: formatOutputBool,
	    formatOutputBytes: formatOutputBytes,
	    formatOutputDynamicBytes: formatOutputDynamicBytes,
	    formatOutputString: formatOutputString,
	    formatOutputAddress: formatOutputAddress
	};
	


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

	/*
	    This file is part of web3.js.
	
	    web3.js is free software: you can redistribute it and/or modify
	    it under the terms of the GNU Lesser General Public License as published by
	    the Free Software Foundation, either version 3 of the License, or
	    (at your option) any later version.
	
	    web3.js is distributed in the hope that it will be useful,
	    but WITHOUT ANY WARRANTY; without even the implied warranty of
	    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	    GNU Lesser General Public License for more details.
	
	    You should have received a copy of the GNU Lesser General Public License
	    along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
	*/
	/** 
	 * @file param.js
	 * @author Marek Kotewicz <marek@ethdev.com>
	 * @date 2015
	 */
	
	var utils = __webpack_require__(24);
	
	/**
	 * SolidityParam object prototype.
	 * Should be used when encoding, decoding solidity bytes
	 */
	var SolidityParam = function (value, offset) {
	    this.value = value || '';
	    this.offset = offset; // offset in bytes
	};
	
	/**
	 * This method should be used to get length of params's dynamic part
	 * 
	 * @method dynamicPartLength
	 * @returns {Number} length of dynamic part (in bytes)
	 */
	SolidityParam.prototype.dynamicPartLength = function () {
	    return this.dynamicPart().length / 2;
	};
	
	/**
	 * This method should be used to create copy of solidity param with different offset
	 *
	 * @method withOffset
	 * @param {Number} offset length in bytes
	 * @returns {SolidityParam} new solidity param with applied offset
	 */
	SolidityParam.prototype.withOffset = function (offset) {
	    return new SolidityParam(this.value, offset);
	};
	
	/**
	 * This method should be used to combine solidity params together
	 * eg. when appending an array
	 *
	 * @method combine
	 * @param {SolidityParam} param with which we should combine
	 * @param {SolidityParam} result of combination
	 */
	SolidityParam.prototype.combine = function (param) {
	    return new SolidityParam(this.value + param.value); 
	};
	
	/**
	 * This method should be called to check if param has dynamic size.
	 * If it has, it returns true, otherwise false
	 *
	 * @method isDynamic
	 * @returns {Boolean}
	 */
	SolidityParam.prototype.isDynamic = function () {
	    return this.offset !== undefined;
	};
	
	/**
	 * This method should be called to transform offset to bytes
	 *
	 * @method offsetAsBytes
	 * @returns {String} bytes representation of offset
	 */
	SolidityParam.prototype.offsetAsBytes = function () {
	    return !this.isDynamic() ? '' : utils.padLeft(utils.toTwosComplement(this.offset).toString(16), 64);
	};
	
	/**
	 * This method should be called to get static part of param
	 *
	 * @method staticPart
	 * @returns {String} offset if it is a dynamic param, otherwise value
	 */
	SolidityParam.prototype.staticPart = function () {
	    if (!this.isDynamic()) {
	        return this.value; 
	    } 
	    return this.offsetAsBytes();
	};
	
	/**
	 * This method should be called to get dynamic part of param
	 *
	 * @method dynamicPart
	 * @returns {String} returns a value if it is a dynamic param, otherwise empty string
	 */
	SolidityParam.prototype.dynamicPart = function () {
	    return this.isDynamic() ? this.value : '';
	};
	
	/**
	 * This method should be called to encode param
	 *
	 * @method encode
	 * @returns {String}
	 */
	SolidityParam.prototype.encode = function () {
	    return this.staticPart() + this.dynamicPart();
	};
	
	/**
	 * This method should be called to encode array of params
	 *
	 * @method encodeList
	 * @param {Array[SolidityParam]} params
	 * @returns {String}
	 */
	SolidityParam.encodeList = function (params) {
	    
	    // updating offsets
	    var totalOffset = params.length * 32;
	    var offsetParams = params.map(function (param) {
	        if (!param.isDynamic()) {
	            return param;
	        }
	        var offset = totalOffset;
	        totalOffset += param.dynamicPartLength();
	        return param.withOffset(offset);
	    });
	
	    // encode everything!
	    return offsetParams.reduce(function (result, param) {
	        return result + param.dynamicPart();
	    }, offsetParams.reduce(function (result, param) {
	        return result + param.staticPart();
	    }, ''));
	};
	
	
	
	module.exports = SolidityParam;
	


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

	var f = __webpack_require__(72);
	var SolidityType = __webpack_require__(75);
	
	/**
	 * SolidityTypeAddress is a prootype that represents address type
	 * It matches:
	 * address
	 * address[]
	 * address[4]
	 * address[][]
	 * address[3][]
	 * address[][6][], ...
	 */
	var SolidityTypeAddress = function () {
	    this._inputFormatter = f.formatInputInt;
	    this._outputFormatter = f.formatOutputAddress;
	};
	
	SolidityTypeAddress.prototype = new SolidityType({});
	SolidityTypeAddress.prototype.constructor = SolidityTypeAddress;
	
	SolidityTypeAddress.prototype.isType = function (name) {
	    return !!name.match(/address(\[([0-9]*)\])?/);
	};
	
	SolidityTypeAddress.prototype.staticPartLength = function (name) {
	    return 32 * this.staticArrayLength(name);
	};
	
	module.exports = SolidityTypeAddress;
	


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

	var f = __webpack_require__(72);
	var SolidityParam = __webpack_require__(73);
	
	/**
	 * SolidityType prototype is used to encode/decode solidity params of certain type
	 */
	var SolidityType = function (config) {
	    this._inputFormatter = config.inputFormatter;
	    this._outputFormatter = config.outputFormatter;
	};
	
	/**
	 * Should be used to determine if this SolidityType do match given name
	 *
	 * @method isType
	 * @param {String} name
	 * @return {Bool} true if type match this SolidityType, otherwise false
	 */
	SolidityType.prototype.isType = function (name) {
	    throw "this method should be overrwritten for type " + name;
	};
	
	/**
	 * Should be used to determine what is the length of static part in given type
	 *
	 * @method staticPartLength
	 * @param {String} name
	 * @return {Number} length of static part in bytes
	 */
	SolidityType.prototype.staticPartLength = function (name) {
	    throw "this method should be overrwritten for type: " + name;
	};
	
	/**
	 * Should be used to determine if type is dynamic array
	 * eg: 
	 * "type[]" => true
	 * "type[4]" => false
	 *
	 * @method isDynamicArray
	 * @param {String} name
	 * @return {Bool} true if the type is dynamic array 
	 */
	SolidityType.prototype.isDynamicArray = function (name) {
	    var nestedTypes = this.nestedTypes(name);
	    return !!nestedTypes && !nestedTypes[nestedTypes.length - 1].match(/[0-9]{1,}/g);
	};
	
	/**
	 * Should be used to determine if type is static array
	 * eg: 
	 * "type[]" => false
	 * "type[4]" => true
	 *
	 * @method isStaticArray
	 * @param {String} name
	 * @return {Bool} true if the type is static array 
	 */
	SolidityType.prototype.isStaticArray = function (name) {
	    var nestedTypes = this.nestedTypes(name);
	    return !!nestedTypes && !!nestedTypes[nestedTypes.length - 1].match(/[0-9]{1,}/g);
	};
	
	/**
	 * Should return length of static array
	 * eg. 
	 * "int[32]" => 32
	 * "int256[14]" => 14
	 * "int[2][3]" => 3
	 * "int" => 1
	 * "int[1]" => 1
	 * "int[]" => 1
	 *
	 * @method staticArrayLength
	 * @param {String} name
	 * @return {Number} static array length
	 */
	SolidityType.prototype.staticArrayLength = function (name) {
	    var nestedTypes = this.nestedTypes(name);
	    if (nestedTypes) {
	       return parseInt(nestedTypes[nestedTypes.length - 1].match(/[0-9]{1,}/g) || 1);
	    }
	    return 1;
	};
	
	/**
	 * Should return nested type
	 * eg.
	 * "int[32]" => "int"
	 * "int256[14]" => "int256"
	 * "int[2][3]" => "int[2]"
	 * "int" => "int"
	 * "int[]" => "int"
	 *
	 * @method nestedName
	 * @param {String} name
	 * @return {String} nested name
	 */
	SolidityType.prototype.nestedName = function (name) {
	    // remove last [] in name
	    var nestedTypes = this.nestedTypes(name);
	    if (!nestedTypes) {
	        return name;
	    }
	
	    return name.substr(0, name.length - nestedTypes[nestedTypes.length - 1].length);
	};
	
	/**
	 * Should return true if type has dynamic size by default
	 * such types are "string", "bytes"
	 *
	 * @method isDynamicType
	 * @param {String} name
	 * @return {Bool} true if is dynamic, otherwise false
	 */
	SolidityType.prototype.isDynamicType = function () {
	    return false;
	};
	
	/**
	 * Should return array of nested types
	 * eg.
	 * "int[2][3][]" => ["[2]", "[3]", "[]"]
	 * "int[] => ["[]"]
	 * "int" => null
	 *
	 * @method nestedTypes
	 * @param {String} name
	 * @return {Array} array of nested types
	 */
	SolidityType.prototype.nestedTypes = function (name) {
	    // return list of strings eg. "[]", "[3]", "[]", "[2]"
	    return name.match(/(\[[0-9]*\])/g);
	};
	
	/**
	 * Should be used to encode the value
	 *
	 * @method encode
	 * @param {Object} value 
	 * @param {String} name
	 * @return {String} encoded value
	 */
	SolidityType.prototype.encode = function (value, name) {
	    var self = this;
	    if (this.isDynamicArray(name)) {
	
	        return (function () {
	            var length = value.length;                          // in int
	            var nestedName = self.nestedName(name);
	
	            var result = [];
	            result.push(f.formatInputInt(length).encode());
	            
	            value.forEach(function (v) {
	                result.push(self.encode(v, nestedName));
	            });
	
	            return result;
	        })();
	
	    } else if (this.isStaticArray(name)) {
	
	        return (function () {
	            var length = self.staticArrayLength(name);          // in int
	            var nestedName = self.nestedName(name);
	
	            var result = [];
	            for (var i = 0; i < length; i++) {
	                result.push(self.encode(value[i], nestedName));
	            }
	
	            return result;
	        })();
	
	    }
	
	    return this._inputFormatter(value, name).encode();
	};
	
	/**
	 * Should be used to decode value from bytes
	 *
	 * @method decode
	 * @param {String} bytes
	 * @param {Number} offset in bytes
	 * @param {String} name type name
	 * @returns {Object} decoded value
	 */
	SolidityType.prototype.decode = function (bytes, offset, name) {
	    var self = this;
	
	    if (this.isDynamicArray(name)) {
	
	        return (function () {
	            var arrayOffset = parseInt('0x' + bytes.substr(offset * 2, 64)); // in bytes
	            var length = parseInt('0x' + bytes.substr(arrayOffset * 2, 64)); // in int
	            var arrayStart = arrayOffset + 32; // array starts after length; // in bytes
	
	            var nestedName = self.nestedName(name);
	            var nestedStaticPartLength = self.staticPartLength(nestedName);  // in bytes
	            var roundedNestedStaticPartLength = Math.floor((nestedStaticPartLength + 31) / 32) * 32;
	            var result = [];
	
	            for (var i = 0; i < length * roundedNestedStaticPartLength; i += roundedNestedStaticPartLength) {
	                result.push(self.decode(bytes, arrayStart + i, nestedName));
	            }
	
	            return result;
	        })();
	
	    } else if (this.isStaticArray(name)) {
	
	        return (function () {
	            var length = self.staticArrayLength(name);                      // in int
	            var arrayStart = offset;                                        // in bytes
	
	            var nestedName = self.nestedName(name);
	            var nestedStaticPartLength = self.staticPartLength(nestedName); // in bytes
	            var roundedNestedStaticPartLength = Math.floor((nestedStaticPartLength + 31) / 32) * 32;
	            var result = [];
	
	            for (var i = 0; i < length * roundedNestedStaticPartLength; i += roundedNestedStaticPartLength) {
	                result.push(self.decode(bytes, arrayStart + i, nestedName));
	            }
	
	            return result;
	        })();
	    } else if (this.isDynamicType(name)) {
	        
	        return (function () {
	            var dynamicOffset = parseInt('0x' + bytes.substr(offset * 2, 64));      // in bytes
	            var length = parseInt('0x' + bytes.substr(dynamicOffset * 2, 64));      // in bytes
	            var roundedLength = Math.floor((length + 31) / 32);                     // in int
	        
	            return self._outputFormatter(new SolidityParam(bytes.substr(dynamicOffset * 2, ( 1 + roundedLength) * 64), 0));
	        })();
	    }
	
	    var length = this.staticPartLength(name);
	    return this._outputFormatter(new SolidityParam(bytes.substr(offset * 2, length * 2)));
	};
	
	module.exports = SolidityType;


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

	var f = __webpack_require__(72);
	var SolidityType = __webpack_require__(75);
	
	/**
	 * SolidityTypeBool is a prootype that represents bool type
	 * It matches:
	 * bool
	 * bool[]
	 * bool[4]
	 * bool[][]
	 * bool[3][]
	 * bool[][6][], ...
	 */
	var SolidityTypeBool = function () {
	    this._inputFormatter = f.formatInputBool;
	    this._outputFormatter = f.formatOutputBool;
	};
	
	SolidityTypeBool.prototype = new SolidityType({});
	SolidityTypeBool.prototype.constructor = SolidityTypeBool;
	
	SolidityTypeBool.prototype.isType = function (name) {
	    return !!name.match(/^bool(\[([0-9]*)\])*$/);
	};
	
	SolidityTypeBool.prototype.staticPartLength = function (name) {
	    return 32 * this.staticArrayLength(name);
	};
	
	module.exports = SolidityTypeBool;


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

	var f = __webpack_require__(72);
	var SolidityType = __webpack_require__(75);
	
	/**
	 * SolidityTypeInt is a prootype that represents int type
	 * It matches:
	 * int
	 * int[]
	 * int[4]
	 * int[][]
	 * int[3][]
	 * int[][6][], ...
	 * int32
	 * int64[]
	 * int8[4]
	 * int256[][]
	 * int[3][]
	 * int64[][6][], ...
	 */
	var SolidityTypeInt = function () {
	    this._inputFormatter = f.formatInputInt;
	    this._outputFormatter = f.formatOutputInt;
	};
	
	SolidityTypeInt.prototype = new SolidityType({});
	SolidityTypeInt.prototype.constructor = SolidityTypeInt;
	
	SolidityTypeInt.prototype.isType = function (name) {
	    return !!name.match(/^int([0-9]*)?(\[([0-9]*)\])*$/);
	};
	
	SolidityTypeInt.prototype.staticPartLength = function (name) {
	    return 32 * this.staticArrayLength(name);
	};
	
	module.exports = SolidityTypeInt;


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

	var f = __webpack_require__(72);
	var SolidityType = __webpack_require__(75);
	
	/**
	 * SolidityTypeUInt is a prootype that represents uint type
	 * It matches:
	 * uint
	 * uint[]
	 * uint[4]
	 * uint[][]
	 * uint[3][]
	 * uint[][6][], ...
	 * uint32
	 * uint64[]
	 * uint8[4]
	 * uint256[][]
	 * uint[3][]
	 * uint64[][6][], ...
	 */
	var SolidityTypeUInt = function () {
	    this._inputFormatter = f.formatInputInt;
	    this._outputFormatter = f.formatOutputUInt;
	};
	
	SolidityTypeUInt.prototype = new SolidityType({});
	SolidityTypeUInt.prototype.constructor = SolidityTypeUInt;
	
	SolidityTypeUInt.prototype.isType = function (name) {
	    return !!name.match(/^uint([0-9]*)?(\[([0-9]*)\])*$/);
	};
	
	SolidityTypeUInt.prototype.staticPartLength = function (name) {
	    return 32 * this.staticArrayLength(name);
	};
	
	module.exports = SolidityTypeUInt;


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

	var f = __webpack_require__(72);
	var SolidityType = __webpack_require__(75);
	
	var SolidityTypeDynamicBytes = function () {
	    this._inputFormatter = f.formatInputDynamicBytes;
	    this._outputFormatter = f.formatOutputDynamicBytes;
	};
	
	SolidityTypeDynamicBytes.prototype = new SolidityType({});
	SolidityTypeDynamicBytes.prototype.constructor = SolidityTypeDynamicBytes;
	
	SolidityTypeDynamicBytes.prototype.isType = function (name) {
	    return !!name.match(/^bytes(\[([0-9]*)\])*$/);
	};
	
	SolidityTypeDynamicBytes.prototype.staticPartLength = function (name) {
	    return 32 * this.staticArrayLength(name);
	};
	
	SolidityTypeDynamicBytes.prototype.isDynamicType = function () {
	    return true;
	};
	
	module.exports = SolidityTypeDynamicBytes;
	


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

	var f = __webpack_require__(72);
	var SolidityType = __webpack_require__(75);
	
	var SolidityTypeString = function () {
	    this._inputFormatter = f.formatInputString;
	    this._outputFormatter = f.formatOutputString;
	};
	
	SolidityTypeString.prototype = new SolidityType({});
	SolidityTypeString.prototype.constructor = SolidityTypeString;
	
	SolidityTypeString.prototype.isType = function (name) {
	    return !!name.match(/^string(\[([0-9]*)\])*$/);
	};
	
	SolidityTypeString.prototype.staticPartLength = function (name) {
	    return 32 * this.staticArrayLength(name);
	};
	
	SolidityTypeString.prototype.isDynamicType = function () {
	    return true;
	};
	
	module.exports = SolidityTypeString;
	


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

	var f = __webpack_require__(72);
	var SolidityType = __webpack_require__(75);
	
	/**
	 * SolidityTypeReal is a prootype that represents real type
	 * It matches:
	 * real
	 * real[]
	 * real[4]
	 * real[][]
	 * real[3][]
	 * real[][6][], ...
	 * real32
	 * real64[]
	 * real8[4]
	 * real256[][]
	 * real[3][]
	 * real64[][6][], ...
	 */
	var SolidityTypeReal = function () {
	    this._inputFormatter = f.formatInputReal;
	    this._outputFormatter = f.formatOutputReal;
	};
	
	SolidityTypeReal.prototype = new SolidityType({});
	SolidityTypeReal.prototype.constructor = SolidityTypeReal;
	
	SolidityTypeReal.prototype.isType = function (name) {
	    return !!name.match(/real([0-9]*)?(\[([0-9]*)\])?/);
	};
	
	SolidityTypeReal.prototype.staticPartLength = function (name) {
	    return 32 * this.staticArrayLength(name);
	};
	
	module.exports = SolidityTypeReal;


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

	var f = __webpack_require__(72);
	var SolidityType = __webpack_require__(75);
	
	/**
	 * SolidityTypeUReal is a prootype that represents ureal type
	 * It matches:
	 * ureal
	 * ureal[]
	 * ureal[4]
	 * ureal[][]
	 * ureal[3][]
	 * ureal[][6][], ...
	 * ureal32
	 * ureal64[]
	 * ureal8[4]
	 * ureal256[][]
	 * ureal[3][]
	 * ureal64[][6][], ...
	 */
	var SolidityTypeUReal = function () {
	    this._inputFormatter = f.formatInputReal;
	    this._outputFormatter = f.formatOutputUReal;
	};
	
	SolidityTypeUReal.prototype = new SolidityType({});
	SolidityTypeUReal.prototype.constructor = SolidityTypeUReal;
	
	SolidityTypeUReal.prototype.isType = function (name) {
	    return !!name.match(/^ureal([0-9]*)?(\[([0-9]*)\])*$/);
	};
	
	SolidityTypeUReal.prototype.staticPartLength = function (name) {
	    return 32 * this.staticArrayLength(name);
	};
	
	module.exports = SolidityTypeUReal;


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

	var f = __webpack_require__(72);
	var SolidityType = __webpack_require__(75);
	
	/**
	 * SolidityTypeBytes is a prootype that represents bytes type
	 * It matches:
	 * bytes
	 * bytes[]
	 * bytes[4]
	 * bytes[][]
	 * bytes[3][]
	 * bytes[][6][], ...
	 * bytes32
	 * bytes64[]
	 * bytes8[4]
	 * bytes256[][]
	 * bytes[3][]
	 * bytes64[][6][], ...
	 */
	var SolidityTypeBytes = function () {
	    this._inputFormatter = f.formatInputBytes;
	    this._outputFormatter = f.formatOutputBytes;
	};
	
	SolidityTypeBytes.prototype = new SolidityType({});
	SolidityTypeBytes.prototype.constructor = SolidityTypeBytes;
	
	SolidityTypeBytes.prototype.isType = function (name) {
	    return !!name.match(/^bytes([0-9]{1,})(\[([0-9]*)\])*$/);
	};
	
	SolidityTypeBytes.prototype.staticPartLength = function (name) {
	    var matches = name.match(/^bytes([0-9]*)/);
	    var size = parseInt(matches[1]);
	    return size * this.staticArrayLength(name);
	};
	
	module.exports = SolidityTypeBytes;


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

	/*
	    This file is part of web3.js.
	
	    web3.js is free software: you can redistribute it and/or modify
	    it under the terms of the GNU Lesser General Public License as published by
	    the Free Software Foundation, either version 3 of the License, or
	    (at your option) any later version.
	
	    web3.js is distributed in the hope that it will be useful,
	    but WITHOUT ANY WARRANTY; without even the implied warranty of
	    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	    GNU Lesser General Public License for more details.
	
	    You should have received a copy of the GNU Lesser General Public License
	    along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
	*/
	/** 
	 * @file event.js
	 * @author Marek Kotewicz <marek@ethdev.com>
	 * @date 2014
	 */
	
	var utils = __webpack_require__(24);
	var coder = __webpack_require__(71);
	var formatters = __webpack_require__(67);
	var sha3 = __webpack_require__(26);
	var Filter = __webpack_require__(85);
	var watches = __webpack_require__(86);
	
	/**
	 * This prototype should be used to create event filters
	 */
	var SolidityEvent = function (requestManager, json, address) {
	    this._requestManager = requestManager;
	    this._params = json.inputs;
	    this._name = utils.transformToFullName(json);
	    this._address = address;
	    this._anonymous = json.anonymous;
	};
	
	/**
	 * Should be used to get filtered param types
	 *
	 * @method types
	 * @param {Bool} decide if returned typed should be indexed
	 * @return {Array} array of types
	 */
	SolidityEvent.prototype.types = function (indexed) {
	    return this._params.filter(function (i) {
	        return i.indexed === indexed;
	    }).map(function (i) {
	        return i.type;
	    });
	};
	
	/**
	 * Should be used to get event display name
	 *
	 * @method displayName
	 * @return {String} event display name
	 */
	SolidityEvent.prototype.displayName = function () {
	    return utils.extractDisplayName(this._name);
	};
	
	/**
	 * Should be used to get event type name
	 *
	 * @method typeName
	 * @return {String} event type name
	 */
	SolidityEvent.prototype.typeName = function () {
	    return utils.extractTypeName(this._name);
	};
	
	/**
	 * Should be used to get event signature
	 *
	 * @method signature
	 * @return {String} event signature
	 */
	SolidityEvent.prototype.signature = function () {
	    return sha3(this._name);
	};
	
	/**
	 * Should be used to encode indexed params and options to one final object
	 * 
	 * @method encode
	 * @param {Object} indexed
	 * @param {Object} options
	 * @return {Object} everything combined together and encoded
	 */
	SolidityEvent.prototype.encode = function (indexed, options) {
	    indexed = indexed || {};
	    options = options || {};
	    var result = {};
	
	    ['fromBlock', 'toBlock'].filter(function (f) {
	        return options[f] !== undefined;
	    }).forEach(function (f) {
	        result[f] = formatters.inputBlockNumberFormatter(options[f]);
	    });
	
	    result.topics = [];
	
	    result.address = this._address;
	    if (!this._anonymous) {
	        result.topics.push('0x' + this.signature());
	    }
	
	    var indexedTopics = this._params.filter(function (i) {
	        return i.indexed === true;
	    }).map(function (i) {
	        var value = indexed[i.name];
	        if (value === undefined || value === null) {
	            return null;
	        }
	        
	        if (utils.isArray(value)) {
	            return value.map(function (v) {
	                return '0x' + coder.encodeParam(i.type, v);
	            });
	        }
	        return '0x' + coder.encodeParam(i.type, value);
	    });
	
	    result.topics = result.topics.concat(indexedTopics);
	
	    return result;
	};
	
	/**
	 * Should be used to decode indexed params and options
	 *
	 * @method decode
	 * @param {Object} data
	 * @return {Object} result object with decoded indexed && not indexed params
	 */
	SolidityEvent.prototype.decode = function (data) {
	 
	    data.data = data.data || '';
	    data.topics = data.topics || [];
	
	    var argTopics = this._anonymous ? data.topics : data.topics.slice(1);
	    var indexedData = argTopics.map(function (topics) { return topics.slice(2); }).join("");
	    var indexedParams = coder.decodeParams(this.types(true), indexedData); 
	
	    var notIndexedData = data.data.slice(2);
	    var notIndexedParams = coder.decodeParams(this.types(false), notIndexedData);
	    
	    var result = formatters.outputLogFormatter(data);
	    result.event = this.displayName();
	    result.address = data.address;
	
	    result.args = this._params.reduce(function (acc, current) {
	        acc[current.name] = current.indexed ? indexedParams.shift() : notIndexedParams.shift();
	        return acc;
	    }, {});
	
	    delete result.data;
	    delete result.topics;
	
	    return result;
	};
	
	/**
	 * Should be used to create new filter object from event
	 *
	 * @method execute
	 * @param {Object} indexed
	 * @param {Object} options
	 * @return {Object} filter object
	 */
	SolidityEvent.prototype.execute = function (indexed, options, callback) {
	
	    if (utils.isFunction(arguments[arguments.length - 1])) {
	        callback = arguments[arguments.length - 1];
	        if(arguments.length === 2)
	            options = null;
	        if(arguments.length === 1) {
	            options = null;
	            indexed = {};
	        }
	    }
	    
	    var o = this.encode(indexed, options);
	    var formatter = this.decode.bind(this);
	    return new Filter(this._requestManager, o, watches.eth(), formatter, callback);
	};
	
	/**
	 * Should be used to attach event to contract object
	 *
	 * @method attachToContract
	 * @param {Contract}
	 */
	SolidityEvent.prototype.attachToContract = function (contract) {
	    var execute = this.execute.bind(this);
	    var displayName = this.displayName();
	    if (!contract[displayName]) {
	        contract[displayName] = execute;
	    }
	    contract[displayName][this.typeName()] = this.execute.bind(this, contract);
	};
	
	module.exports = SolidityEvent;
	


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

	/*
	    This file is part of web3.js.
	
	    web3.js is free software: you can redistribute it and/or modify
	    it under the terms of the GNU Lesser General Public License as published by
	    the Free Software Foundation, either version 3 of the License, or
	    (at your option) any later version.
	
	    web3.js is distributed in the hope that it will be useful,
	    but WITHOUT ANY WARRANTY; without even the implied warranty of
	    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	    GNU Lesser General Public License for more details.
	
	    You should have received a copy of the GNU Lesser General Public License
	    along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
	*/
	/** @file filter.js
	 * @authors:
	 *   Jeffrey Wilcke <jeff@ethdev.com>
	 *   Marek Kotewicz <marek@ethdev.com>
	 *   Marian Oancea <marian@ethdev.com>
	 *   Fabian Vogelsteller <fabian@ethdev.com>
	 *   Gav Wood <g@ethdev.com>
	 * @date 2014
	 */
	
	var formatters = __webpack_require__(67);
	var utils = __webpack_require__(24);
	
	/**
	* Converts a given topic to a hex string, but also allows null values.
	*
	* @param {Mixed} value
	* @return {String}
	*/
	var toTopic = function(value){
	
	    if(value === null || typeof value === 'undefined')
	        return null;
	
	    value = String(value);
	
	    if(value.indexOf('0x') === 0)
	        return value;
	    else
	        return utils.fromUtf8(value);
	};
	
	/// This method should be called on options object, to verify deprecated properties && lazy load dynamic ones
	/// @param should be string or object
	/// @returns options string or object
	var getOptions = function (options) {
	
	    if (utils.isString(options)) {
	        return options;
	    }
	
	    options = options || {};
	
	    // make sure topics, get converted to hex
	    options.topics = options.topics || [];
	    options.topics = options.topics.map(function(topic){
	        return (utils.isArray(topic)) ? topic.map(toTopic) : toTopic(topic);
	    });
	
	    return {
	        topics: options.topics,
	        from: options.from,
	        to: options.to,
	        address: options.address,
	        fromBlock: formatters.inputBlockNumberFormatter(options.fromBlock),
	        toBlock: formatters.inputBlockNumberFormatter(options.toBlock)
	    };
	};
	
	/**
	Adds the callback and sets up the methods, to iterate over the results.
	
	@method getLogsAtStart
	@param {Object} self
	@param {funciton}
	*/
	var getLogsAtStart = function(self, callback){
	    // call getFilterLogs for the first watch callback start
	    if (!utils.isString(self.options)) {
	        self.get(function (err, messages) {
	            // don't send all the responses to all the watches again... just to self one
	            if (err) {
	                callback(err);
	            }
	
	            if(utils.isArray(messages)) {
	                messages.forEach(function (message) {
	                    callback(null, message);
	                });
	            }
	        });
	    }
	};
	
	/**
	Adds the callback and sets up the methods, to iterate over the results.
	
	@method pollFilter
	@param {Object} self
	*/
	var pollFilter = function(self) {
	
	    var onMessage = function (error, messages) {
	        if (error) {
	            return self.callbacks.forEach(function (callback) {
	                callback(error);
	            });
	        }
	
	        if(utils.isArray(messages)) {
	            messages.forEach(function (message) {
	                message = self.formatter ? self.formatter(message) : message;
	                self.callbacks.forEach(function (callback) {
	                    callback(null, message);
	                });
	            });
	        }
	    };
	
	    self.requestManager.startPolling({
	        method: self.implementation.poll.call,
	        params: [self.filterId],
	    }, self.filterId, onMessage, self.stopWatching.bind(self));
	
	};
	
	var Filter = function (requestManager, options, methods, formatter, callback) {
	    var self = this;
	    var implementation = {};
	    methods.forEach(function (method) {
	        method.setRequestManager(requestManager);
	        method.attachToObject(implementation);
	    });
	    this.requestManager = requestManager;
	    this.options = getOptions(options);
	    this.implementation = implementation;
	    this.filterId = null;
	    this.callbacks = [];
	    this.getLogsCallbacks = [];
	    this.pollFilters = [];
	    this.formatter = formatter;
	    this.implementation.newFilter(this.options, function(error, id){
	        if(error) {
	            self.callbacks.forEach(function(cb){
	                cb(error);
	            });
	        } else {
	            self.filterId = id;
	
	            // check if there are get pending callbacks as a consequence
	            // of calling get() with filterId unassigned.
	            self.getLogsCallbacks.forEach(function (cb){
	                self.get(cb);
	            });
	            self.getLogsCallbacks = [];
	
	            // get filter logs for the already existing watch calls
	            self.callbacks.forEach(function(cb){
	                getLogsAtStart(self, cb);
	            });
	            if(self.callbacks.length > 0)
	                pollFilter(self);
	
	            // start to watch immediately
	            if(typeof callback === 'function') {
	                return self.watch(callback);
	            }
	        }
	    });
	
	    return this;
	};
	
	Filter.prototype.watch = function (callback) {
	    this.callbacks.push(callback);
	
	    if(this.filterId) {
	        getLogsAtStart(this, callback);
	        pollFilter(this);
	    }
	
	    return this;
	};
	
	Filter.prototype.stopWatching = function () {
	    this.requestManager.stopPolling(this.filterId);
	    // remove filter async
	    this.implementation.uninstallFilter(this.filterId, function(){});
	    this.callbacks = [];
	};
	
	Filter.prototype.get = function (callback) {
	    var self = this;
	    if (utils.isFunction(callback)) {
	        if (this.filterId === null) {
	            // If filterId is not set yet, call it back
	            // when newFilter() assigns it.
	            this.getLogsCallbacks.push(callback);
	        } else {
	            this.implementation.getLogs(this.filterId, function(err, res){
	                if (err) {
	                    callback(err);
	                } else {
	                    callback(null, res.map(function (log) {
	                        return self.formatter ? self.formatter(log) : log;
	                    }));
	                }
	            });
	        }
	    } else {
	        if (this.filterId === null) {
	            throw new Error('Filter ID Error: filter().get() can\'t be chained synchronous, please provide a callback for the get() method.');
	        }
	        var logs = this.implementation.getLogs(this.filterId);
	        return logs.map(function (log) {
	            return self.formatter ? self.formatter(log) : log;
	        });
	    }
	
	    return this;
	};
	
	module.exports = Filter;
	


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

	/*
	    This file is part of web3.js.
	
	    web3.js is free software: you can redistribute it and/or modify
	    it under the terms of the GNU Lesser General Public License as published by
	    the Free Software Foundation, either version 3 of the License, or
	    (at your option) any later version.
	
	    web3.js is distributed in the hope that it will be useful,
	    but WITHOUT ANY WARRANTY; without even the implied warranty of
	    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	    GNU Lesser General Public License for more details.
	
	    You should have received a copy of the GNU Lesser General Public License
	    along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
	*/
	/** @file watches.js
	 * @authors:
	 *   Marek Kotewicz <marek@ethdev.com>
	 * @date 2015
	 */
	
	var Method = __webpack_require__(68);
	
	/// @returns an array of objects describing web3.eth.filter api methods
	var eth = function () {
	    var newFilterCall = function (args) {
	        var type = args[0];
	
	        switch(type) {
	            case 'latest':
	                args.shift();
	                this.params = 0;
	                return 'eth_newBlockFilter';
	            case 'pending':
	                args.shift();
	                this.params = 0;
	                return 'eth_newPendingTransactionFilter';
	            default:
	                return 'eth_newFilter';
	        }
	    };
	
	    var newFilter = new Method({
	        name: 'newFilter',
	        call: newFilterCall,
	        params: 1
	    });
	
	    var uninstallFilter = new Method({
	        name: 'uninstallFilter',
	        call: 'eth_uninstallFilter',
	        params: 1
	    });
	
	    var getLogs = new Method({
	        name: 'getLogs',
	        call: 'eth_getFilterLogs',
	        params: 1
	    });
	
	    var poll = new Method({
	        name: 'poll',
	        call: 'eth_getFilterChanges',
	        params: 1
	    });
	
	    return [
	        newFilter,
	        uninstallFilter,
	        getLogs,
	        poll
	    ];
	};
	
	/// @returns an array of objects describing web3.shh.watch api methods
	var shh = function () {
	    var newFilter = new Method({
	        name: 'newFilter',
	        call: 'shh_newFilter',
	        params: 1
	    });
	
	    var uninstallFilter = new Method({
	        name: 'uninstallFilter',
	        call: 'shh_uninstallFilter',
	        params: 1
	    });
	
	    var getLogs = new Method({
	        name: 'getLogs',
	        call: 'shh_getMessages',
	        params: 1
	    });
	
	    var poll = new Method({
	        name: 'poll',
	        call: 'shh_getFilterChanges',
	        params: 1
	    });
	
	    return [
	        newFilter,
	        uninstallFilter,
	        getLogs,
	        poll
	    ];
	};
	
	module.exports = {
	    eth: eth,
	    shh: shh
	};
	


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

	/*
	    This file is part of web3.js.
	
	    web3.js is free software: you can redistribute it and/or modify
	    it under the terms of the GNU Lesser General Public License as published by
	    the Free Software Foundation, either version 3 of the License, or
	    (at your option) any later version.
	
	    web3.js is distributed in the hope that it will be useful,
	    but WITHOUT ANY WARRANTY; without even the implied warranty of
	    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	    GNU Lesser General Public License for more details.
	
	    You should have received a copy of the GNU Lesser General Public License
	    along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
	*/
	/**
	 * @file function.js
	 * @author Marek Kotewicz <marek@ethdev.com>
	 * @date 2015
	 */
	
	var coder = __webpack_require__(71);
	var utils = __webpack_require__(24);
	var formatters = __webpack_require__(67);
	var sha3 = __webpack_require__(26);
	
	/**
	 * This prototype should be used to call/sendTransaction to solidity functions
	 */
	var SolidityFunction = function (eth, json, address) {
	    this._eth = eth;
	    this._inputTypes = json.inputs.map(function (i) {
	        return i.type;
	    });
	    this._outputTypes = json.outputs.map(function (i) {
	        return i.type;
	    });
	    this._constant = json.constant;
	    this._name = utils.transformToFullName(json);
	    this._address = address;
	};
	
	SolidityFunction.prototype.extractCallback = function (args) {
	    if (utils.isFunction(args[args.length - 1])) {
	        return args.pop(); // modify the args array!
	    }
	};
	
	SolidityFunction.prototype.extractDefaultBlock = function (args) {
	    if (args.length > this._inputTypes.length && !utils.isObject(args[args.length -1])) {
	        return formatters.inputDefaultBlockNumberFormatter(args.pop()); // modify the args array!
	    }
	};
	
	/**
	 * Should be used to create payload from arguments
	 *
	 * @method toPayload
	 * @param {Array} solidity function params
	 * @param {Object} optional payload options
	 */
	SolidityFunction.prototype.toPayload = function (args) {
	    var options = {};
	    if (args.length > this._inputTypes.length && utils.isObject(args[args.length -1])) {
	        options = args[args.length - 1];
	    }
	    options.to = this._address;
	    options.data = '0x' + this.signature() + coder.encodeParams(this._inputTypes, args);
	    return options;
	};
	
	/**
	 * Should be used to get function signature
	 *
	 * @method signature
	 * @return {String} function signature
	 */
	SolidityFunction.prototype.signature = function () {
	    return sha3(this._name).slice(0, 8);
	};
	
	
	SolidityFunction.prototype.unpackOutput = function (output) {
	    if (!output) {
	        return;
	    }
	
	    output = output.length >= 2 ? output.slice(2) : output;
	    var result = coder.decodeParams(this._outputTypes, output);
	    return result.length === 1 ? result[0] : result;
	};
	
	/**
	 * Calls a contract function.
	 *
	 * @method call
	 * @param {...Object} Contract function arguments
	 * @param {function} If the last argument is a function, the contract function
	 *   call will be asynchronous, and the callback will be passed the
	 *   error and result.
	 * @return {String} output bytes
	 */
	SolidityFunction.prototype.call = function () {
	    var args = Array.prototype.slice.call(arguments).filter(function (a) {return a !== undefined; });
	    var callback = this.extractCallback(args);
	    var defaultBlock = this.extractDefaultBlock(args);
	    var payload = this.toPayload(args);
	
	
	    if (!callback) {
	        var output = this._eth.call(payload, defaultBlock);
	        return this.unpackOutput(output);
	    } 
	        
	    var self = this;
	    this._eth.call(payload, defaultBlock, function (error, output) {
	        callback(error, self.unpackOutput(output));
	    });
	};
	
	/**
	 * Should be used to sendTransaction to solidity function
	 *
	 * @method sendTransaction
	 */
	SolidityFunction.prototype.sendTransaction = function () {
	    var args = Array.prototype.slice.call(arguments).filter(function (a) {return a !== undefined; });
	    var callback = this.extractCallback(args);
	    var payload = this.toPayload(args);
	
	    if (!callback) {
	        return this._eth.sendTransaction(payload);
	    }
	
	    this._eth.sendTransaction(payload, callback);
	};
	
	/**
	 * Should be used to estimateGas of solidity function
	 *
	 * @method estimateGas
	 */
	SolidityFunction.prototype.estimateGas = function () {
	    var args = Array.prototype.slice.call(arguments);
	    var callback = this.extractCallback(args);
	    var payload = this.toPayload(args);
	
	    if (!callback) {
	        return this._eth.estimateGas(payload);
	    }
	
	    this._eth.estimateGas(payload, callback);
	};
	
	/**
	 * Return the encoded data of the call
	 *
	 * @method getData
	 * @return {String} the encoded data
	 */
	SolidityFunction.prototype.getData = function () {
	    var args = Array.prototype.slice.call(arguments);
	    var payload = this.toPayload(args);
	
	    return payload.data;
	};
	
	/**
	 * Should be used to get function display name
	 *
	 * @method displayName
	 * @return {String} display name of the function
	 */
	SolidityFunction.prototype.displayName = function () {
	    return utils.extractDisplayName(this._name);
	};
	
	/**
	 * Should be used to get function type name
	 *
	 * @method typeName
	 * @return {String} type name of the function
	 */
	SolidityFunction.prototype.typeName = function () {
	    return utils.extractTypeName(this._name);
	};
	
	/**
	 * Should be called to get rpc requests from solidity function
	 *
	 * @method request
	 * @returns {Object}
	 */
	SolidityFunction.prototype.request = function () {
	    var args = Array.prototype.slice.call(arguments);
	    var callback = this.extractCallback(args);
	    var payload = this.toPayload(args);
	    var format = this.unpackOutput.bind(this);
	    
	    return {
	        method: this._constant ? 'eth_call' : 'eth_sendTransaction',
	        callback: callback,
	        params: [payload], 
	        format: format
	    };
	};
	
	/**
	 * Should be called to execute function
	 *
	 * @method execute
	 */
	SolidityFunction.prototype.execute = function () {
	    var transaction = !this._constant;
	
	    // send transaction
	    if (transaction) {
	        return this.sendTransaction.apply(this, Array.prototype.slice.call(arguments));
	    }
	
	    // call
	    return this.call.apply(this, Array.prototype.slice.call(arguments));
	};
	
	/**
	 * Should be called to attach function to contract
	 *
	 * @method attachToContract
	 * @param {Contract}
	 */
	SolidityFunction.prototype.attachToContract = function (contract) {
	    var execute = this.execute.bind(this);
	    execute.request = this.request.bind(this);
	    execute.call = this.call.bind(this);
	    execute.sendTransaction = this.sendTransaction.bind(this);
	    execute.estimateGas = this.estimateGas.bind(this);
	    execute.getData = this.getData.bind(this);
	    var displayName = this.displayName();
	    if (!contract[displayName]) {
	        contract[displayName] = execute;
	    }
	    contract[displayName][this.typeName()] = execute; // circular!!!!
	};
	
	module.exports = SolidityFunction;
	


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

	/*
	    This file is part of web3.js.
	
	    web3.js is free software: you can redistribute it and/or modify
	    it under the terms of the GNU Lesser General Public License as published by
	    the Free Software Foundation, either version 3 of the License, or
	    (at your option) any later version.
	
	    web3.js is distributed in the hope that it will be useful,
	    but WITHOUT ANY WARRANTY; without even the implied warranty of
	    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	    GNU Lesser General Public License for more details.
	
	    You should have received a copy of the GNU Lesser General Public License
	    along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
	*/
	/** 
	 * @file allevents.js
	 * @author Marek Kotewicz <marek@ethdev.com>
	 * @date 2014
	 */
	
	var sha3 = __webpack_require__(26);
	var SolidityEvent = __webpack_require__(84);
	var formatters = __webpack_require__(67);
	var utils = __webpack_require__(24);
	var Filter = __webpack_require__(85);
	var watches = __webpack_require__(86);
	
	var AllSolidityEvents = function (requestManager, json, address) {
	    this._requestManager = requestManager;
	    this._json = json;
	    this._address = address;
	};
	
	AllSolidityEvents.prototype.encode = function (options) {
	    options = options || {};
	    var result = {};
	
	    ['fromBlock', 'toBlock'].filter(function (f) {
	        return options[f] !== undefined;
	    }).forEach(function (f) {
	        result[f] = formatters.inputBlockNumberFormatter(options[f]);
	    });
	
	    result.address = this._address;
	
	    return result;
	};
	
	AllSolidityEvents.prototype.decode = function (data) {
	    data.data = data.data || '';
	    data.topics = data.topics || [];
	
	    var eventTopic = data.topics[0].slice(2);
	    var match = this._json.filter(function (j) {
	        return eventTopic === sha3(utils.transformToFullName(j));
	    })[0];
	
	    if (!match) { // cannot find matching event?
	        console.warn('cannot find event for log');
	        return data;
	    }
	
	    var event = new SolidityEvent(this._requestManager, match, this._address);
	    return event.decode(data);
	};
	
	AllSolidityEvents.prototype.execute = function (options, callback) {
	
	    if (utils.isFunction(arguments[arguments.length - 1])) {
	        callback = arguments[arguments.length - 1];
	        if(arguments.length === 1)
	            options = null;
	    }
	
	    var o = this.encode(options);
	    var formatter = this.decode.bind(this);
	    return new Filter(this._requestManager, o, watches.eth(), formatter, callback);
	};
	
	AllSolidityEvents.prototype.attachToContract = function (contract) {
	    var execute = this.execute.bind(this);
	    contract.allEvents = execute;
	};
	
	module.exports = AllSolidityEvents;
	


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

	/*
	    This file is part of web3.js.
	
	    web3.js is free software: you can redistribute it and/or modify
	    it under the terms of the GNU Lesser General Public License as published by
	    the Free Software Foundation, either version 3 of the License, or
	    (at your option) any later version.
	
	    web3.js is distributed in the hope that it will be useful,
	    but WITHOUT ANY WARRANTY; without even the implied warranty of
	    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	    GNU Lesser General Public License for more details.
	
	    You should have received a copy of the GNU Lesser General Public License
	    along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
	*/
	/** @file syncing.js
	 * @authors:
	 *   Fabian Vogelsteller <fabian@ethdev.com>
	 * @date 2015
	 */
	
	var formatters = __webpack_require__(67);
	var utils = __webpack_require__(24);
	
	var count = 1;
	
	/**
	Adds the callback and sets up the methods, to iterate over the results.
	
	@method pollSyncing
	@param {Object} self
	*/
	var pollSyncing = function(self) {
	
	    var onMessage = function (error, sync) {
	        if (error) {
	            return self.callbacks.forEach(function (callback) {
	                callback(error);
	            });
	        }
	
	        if(utils.isObject(sync) && sync.startingBlock)
	            sync = formatters.outputSyncingFormatter(sync);
	
	        self.callbacks.forEach(function (callback) {
	            if (self.lastSyncState !== sync) {
	                
	                // call the callback with true first so the app can stop anything, before receiving the sync data
	                if(!self.lastSyncState && utils.isObject(sync))
	                    callback(null, true);
	                
	                // call on the next CPU cycle, so the actions of the sync stop can be processes first
	                setTimeout(function() {
	                    callback(null, sync);
	                }, 0);
	                
	                self.lastSyncState = sync;
	            }
	        });
	    };
	
	    self.requestManager.startPolling({
	        method: 'eth_syncing',
	        params: [],
	    }, self.pollId, onMessage, self.stopWatching.bind(self));
	
	};
	
	var IsSyncing = function (requestManager, callback) {
	    this.requestManager = requestManager;
	    this.pollId = 'syncPoll_'+ count++;
	    this.callbacks = [];
	    this.addCallback(callback);
	    this.lastSyncState = false;
	    pollSyncing(this);
	
	    return this;
	};
	
	IsSyncing.prototype.addCallback = function (callback) {
	    if(callback)
	        this.callbacks.push(callback);
	    return this;
	};
	
	IsSyncing.prototype.stopWatching = function () {
	    this.requestManager.stopPolling(this.pollId);
	    this.callbacks = [];
	};
	
	module.exports = IsSyncing;
	


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

	/*
	    This file is part of web3.js.
	
	    web3.js is free software: you can redistribute it and/or modify
	    it under the terms of the GNU Lesser General Public License as published by
	    the Free Software Foundation, either version 3 of the License, or
	    (at your option) any later version.
	
	    web3.js is distributed in the hope that it will be useful,
	    but WITHOUT ANY WARRANTY; without even the implied warranty of
	    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	    GNU Lesser General Public License for more details.
	
	    You should have received a copy of the GNU Lesser General Public License
	    along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
	*/
	/** 
	 * @file namereg.js
	 * @author Marek Kotewicz <marek@ethdev.com>
	 * @date 2015
	 */
	
	var globalRegistrarAbi = __webpack_require__(91);
	var icapRegistrarAbi= __webpack_require__(92);
	
	var globalNameregAddress = '0xc6d9d2cd449a754c494264e1809c50e34d64562b';
	var icapNameregAddress = '0xa1a111bc074c9cfa781f0c38e63bd51c91b8af00';
	
	module.exports = {
	    global: {
	        abi: globalRegistrarAbi,
	        address: globalNameregAddress
	    },
	    icap: {
	        abi: icapRegistrarAbi,
	        address: icapNameregAddress
	    }
	};
	


/***/ }),
/* 91 */
/***/ (function(module, exports) {

	module.exports = [{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"name","outputs":[{"name":"o_name","type":"bytes32"}],"type":"function"},{"constant":true,"inputs":[{"name":"_name","type":"bytes32"}],"name":"owner","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":true,"inputs":[{"name":"_name","type":"bytes32"}],"name":"content","outputs":[{"name":"","type":"bytes32"}],"type":"function"},{"constant":true,"inputs":[{"name":"_name","type":"bytes32"}],"name":"addr","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"bytes32"}],"name":"reserve","outputs":[],"type":"function"},{"constant":true,"inputs":[{"name":"_name","type":"bytes32"}],"name":"subRegistrar","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"bytes32"},{"name":"_newOwner","type":"address"}],"name":"transfer","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"bytes32"},{"name":"_registrar","type":"address"}],"name":"setSubRegistrar","outputs":[],"type":"function"},{"constant":false,"inputs":[],"name":"Registrar","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"bytes32"},{"name":"_a","type":"address"},{"name":"_primary","type":"bool"}],"name":"setAddress","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"bytes32"},{"name":"_content","type":"bytes32"}],"name":"setContent","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"bytes32"}],"name":"disown","outputs":[],"type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_name","type":"bytes32"},{"indexed":false,"name":"_winner","type":"address"}],"name":"AuctionEnded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_name","type":"bytes32"},{"indexed":false,"name":"_bidder","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"NewBid","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"name","type":"bytes32"}],"name":"Changed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"name","type":"bytes32"},{"indexed":true,"name":"addr","type":"address"}],"name":"PrimaryChanged","type":"event"}]

/***/ }),
/* 92 */
/***/ (function(module, exports) {

	module.exports = [{"constant":true,"inputs":[{"name":"_name","type":"bytes32"}],"name":"owner","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"bytes32"},{"name":"_refund","type":"address"}],"name":"disown","outputs":[],"type":"function"},{"constant":true,"inputs":[{"name":"_name","type":"bytes32"}],"name":"addr","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"bytes32"}],"name":"reserve","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"bytes32"},{"name":"_newOwner","type":"address"}],"name":"transfer","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"bytes32"},{"name":"_a","type":"address"}],"name":"setAddr","outputs":[],"type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"name","type":"bytes32"}],"name":"Changed","type":"event"}]

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

	/*
	    This file is part of web3.js.
	
	    web3.js is free software: you can redistribute it and/or modify
	    it under the terms of the GNU Lesser General Public License as published by
	    the Free Software Foundation, either version 3 of the License, or
	    (at your option) any later version.
	
	    web3.js is distributed in the hope that it will be useful,
	    but WITHOUT ANY WARRANTY; without even the implied warranty of
	    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	    GNU Lesser General Public License for more details.
	
	    You should have received a copy of the GNU Lesser General Public License
	    along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
	*/
	/** 
	 * @file transfer.js
	 * @author Marek Kotewicz <marek@ethdev.com>
	 * @date 2015
	 */
	
	var Iban = __webpack_require__(65);
	var exchangeAbi = __webpack_require__(94);
	
	/**
	 * Should be used to make Iban transfer
	 *
	 * @method transfer
	 * @param {String} from
	 * @param {String} to iban
	 * @param {Value} value to be tranfered
	 * @param {Function} callback, callback
	 */
	var transfer = function (eth, from, to, value, callback) {
	    var iban = new Iban(to); 
	    if (!iban.isValid()) {
	        throw new Error('invalid iban address');
	    }
	
	    if (iban.isDirect()) {
	        return transferToAddress(eth, from, iban.address(), value, callback);
	    }
	    
	    if (!callback) {
	        var address = eth.icapNamereg().addr(iban.institution());
	        return deposit(eth, from, address, value, iban.client());
	    }
	
	    eth.icapNamereg().addr(iban.institution(), function (err, address) {
	        return deposit(eth, from, address, value, iban.client(), callback);
	    });
	    
	};
	
	/**
	 * Should be used to transfer funds to certain address
	 *
	 * @method transferToAddress
	 * @param {String} from
	 * @param {String} to
	 * @param {Value} value to be tranfered
	 * @param {Function} callback, callback
	 */
	var transferToAddress = function (eth, from, to, value, callback) {
	    return eth.sendTransaction({
	        address: to,
	        from: from,
	        value: value
	    }, callback);
	};
	
	/**
	 * Should be used to deposit funds to generic Exchange contract (must implement deposit(bytes32) method!)
	 *
	 * @method deposit
	 * @param {String} from
	 * @param {String} to
	 * @param {Value} value to be transfered
	 * @param {String} client unique identifier
	 * @param {Function} callback, callback
	 */
	var deposit = function (eth, from, to, value, client, callback) {
	    var abi = exchangeAbi;
	    return eth.contract(abi).at(to).deposit(client, {
	        from: from,
	        value: value
	    }, callback);
	};
	
	module.exports = transfer;
	


/***/ }),
/* 94 */
/***/ (function(module, exports) {

	module.exports = [{"constant":false,"inputs":[{"name":"from","type":"bytes32"},{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"transfer","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"from","type":"bytes32"},{"name":"to","type":"address"},{"name":"indirectId","type":"bytes32"},{"name":"value","type":"uint256"}],"name":"icapTransfer","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"to","type":"bytes32"}],"name":"deposit","outputs":[],"type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"AnonymousDeposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"bytes32"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"bytes32"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"bytes32"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"indirectId","type":"bytes32"},{"indexed":false,"name":"value","type":"uint256"}],"name":"IcapTransfer","type":"event"}]

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

	/*
	    This file is part of web3.js.
	
	    web3.js is free software: you can redistribute it and/or modify
	    it under the terms of the GNU Lesser General Public License as published by
	    the Free Software Foundation, either version 3 of the License, or
	    (at your option) any later version.
	
	    web3.js is distributed in the hope that it will be useful,
	    but WITHOUT ANY WARRANTY; without even the implied warranty of
	    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	    GNU Lesser General Public License for more details.
	
	    You should have received a copy of the GNU Lesser General Public License
	    along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
	*/
	/** @file db.js
	 * @authors:
	 *   Marek Kotewicz <marek@ethdev.com>
	 * @date 2015
	 */
	
	var Method = __webpack_require__(68);
	
	var DB = function (web3) {
	    this._requestManager = web3._requestManager;
	
	    var self = this;
	    
	    methods().forEach(function(method) { 
	        method.attachToObject(self);
	        method.setRequestManager(web3._requestManager);
	    });
	};
	
	var methods = function () {
	    var putString = new Method({
	        name: 'putString',
	        call: 'db_putString',
	        params: 3
	    });
	
	    var getString = new Method({
	        name: 'getString',
	        call: 'db_getString',
	        params: 2
	    });
	
	    var putHex = new Method({
	        name: 'putHex',
	        call: 'db_putHex',
	        params: 3
	    });
	
	    var getHex = new Method({
	        name: 'getHex',
	        call: 'db_getHex',
	        params: 2
	    });
	
	    return [
	        putString, getString, putHex, getHex
	    ];
	};
	
	module.exports = DB;


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

	/*
	    This file is part of web3.js.
	
	    web3.js is free software: you can redistribute it and/or modify
	    it under the terms of the GNU Lesser General Public License as published by
	    the Free Software Foundation, either version 3 of the License, or
	    (at your option) any later version.
	
	    web3.js is distributed in the hope that it will be useful,
	    but WITHOUT ANY WARRANTY; without even the implied warranty of
	    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	    GNU Lesser General Public License for more details.
	
	    You should have received a copy of the GNU Lesser General Public License
	    along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
	*/
	/** @file shh.js
	 * @authors:
	 *   Marek Kotewicz <marek@ethdev.com>
	 * @date 2015
	 */
	
	var Method = __webpack_require__(68);
	var formatters = __webpack_require__(67);
	var Filter = __webpack_require__(85);
	var watches = __webpack_require__(86);
	
	var Shh = function (web3) {
	    this._requestManager = web3._requestManager;
	
	    var self = this;
	
	    methods().forEach(function(method) { 
	        method.attachToObject(self);
	        method.setRequestManager(self._requestManager);
	    });
	};
	
	Shh.prototype.filter = function (fil, callback) {
	    return new Filter(this._requestManager, fil, watches.shh(), formatters.outputPostFormatter, callback);
	};
	
	var methods = function () { 
	
	    var post = new Method({
	        name: 'post', 
	        call: 'shh_post', 
	        params: 1,
	        inputFormatter: [formatters.inputPostFormatter]
	    });
	
	    var newIdentity = new Method({
	        name: 'newIdentity',
	        call: 'shh_newIdentity',
	        params: 0
	    });
	
	    var hasIdentity = new Method({
	        name: 'hasIdentity',
	        call: 'shh_hasIdentity',
	        params: 1
	    });
	
	    var newGroup = new Method({
	        name: 'newGroup',
	        call: 'shh_newGroup',
	        params: 0
	    });
	
	    var addToGroup = new Method({
	        name: 'addToGroup',
	        call: 'shh_addToGroup',
	        params: 0
	    });
	
	    return [
	        post,
	        newIdentity,
	        hasIdentity,
	        newGroup,
	        addToGroup
	    ];
	};
	
	module.exports = Shh;
	


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

	/*
	    This file is part of web3.js.
	
	    web3.js is free software: you can redistribute it and/or modify
	    it under the terms of the GNU Lesser General Public License as published by
	    the Free Software Foundation, either version 3 of the License, or
	    (at your option) any later version.
	
	    web3.js is distributed in the hope that it will be useful,
	    but WITHOUT ANY WARRANTY; without even the implied warranty of
	    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	    GNU Lesser General Public License for more details.
	
	    You should have received a copy of the GNU Lesser General Public License
	    along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
	*/
	/** @file eth.js
	 * @authors:
	 *   Marek Kotewicz <marek@ethdev.com>
	 * @date 2015
	 */
	
	var utils = __webpack_require__(24);
	var Property = __webpack_require__(69);
	
	var Net = function (web3) {
	    this._requestManager = web3._requestManager;
	
	    var self = this;
	
	    properties().forEach(function(p) { 
	        p.attachToObject(self);
	        p.setRequestManager(web3._requestManager);
	    });
	};
	
	/// @returns an array of objects describing web3.eth api properties
	var properties = function () {
	    return [
	        new Property({
	            name: 'listening',
	            getter: 'net_listening'
	        }),
	        new Property({
	            name: 'peerCount',
	            getter: 'net_peerCount',
	            outputFormatter: utils.toDecimal
	        })
	    ];
	};
	
	module.exports = Net;


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

	/*
	    This file is part of web3.js.
	
	    web3.js is free software: you can redistribute it and/or modify
	    it under the terms of the GNU Lesser General Public License as published by
	    the Free Software Foundation, either version 3 of the License, or
	    (at your option) any later version.
	
	    web3.js is distributed in the hope that it will be useful,
	    but WITHOUT ANY WARRANTY; without even the implied warranty of
	    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	    GNU Lesser General Public License for more details.
	
	    You should have received a copy of the GNU Lesser General Public License
	    along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
	*/
	/**
	 * @file eth.js
	 * @author Marek Kotewicz <marek@ethdev.com>
	 * @author Fabian Vogelsteller <fabian@ethdev.com>
	 * @date 2015
	 */
	
	"use strict";
	
	var Method = __webpack_require__(68);
	var Property = __webpack_require__(69);
	
	function Personal(web3) {
	    this._requestManager = web3._requestManager;
	
	    var self = this;
	
	    methods().forEach(function(method) {
	        method.attachToObject(self);
	        method.setRequestManager(self._requestManager);
	    });
	
	    properties().forEach(function(p) {
	        p.attachToObject(self);
	        p.setRequestManager(self._requestManager);
	    });
	}
	
	var methods = function () {
	    var newAccount = new Method({
	        name: 'newAccount',
	        call: 'personal_newAccount',
	        params: 1,
	        inputFormatter: [null]
	    });
	
	    var unlockAccount = new Method({
	        name: 'unlockAccount',
	        call: 'personal_unlockAccount',
	        params: 3,
	        inputFormatter: [null, null, null]
	    });
	
	    return [
	        newAccount,
	        unlockAccount
	    ];
	};
	
	var properties = function () {
	    return [
	        new Property({
	            name: 'listAccounts',
	            getter: 'personal_listAccounts'
	        })
	    ];
	};
	
	
	module.exports = Personal;


/***/ }),
/* 99 */
/***/ (function(module, exports) {

	
	
	var Settings = function () {
	    this.defaultBlock = 'latest';
	    this.defaultAccount = undefined;
	};
	
	module.exports = Settings;
	


/***/ }),
/* 100 */
/***/ (function(module, exports) {

	module.exports = {"version":"0.15.3"}

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

	var formatters = __webpack_require__(67);
	var utils = __webpack_require__(24);
	var Method = __webpack_require__(68);
	var Property = __webpack_require__(69);
	
	// TODO: refactor, so the input params are not altered.
	// it's necessary to make same 'extension' work with multiple providers
	var extend = function (web3) {
	    /* jshint maxcomplexity:5 */
	    var ex = function (extension) {
	
	        var extendedObject;
	        if (extension.property) {
	            if (!web3[extension.property]) {
	                web3[extension.property] = {};
	            }
	            extendedObject = web3[extension.property];
	        } else {
	            extendedObject = web3;
	        }
	
	        if (extension.methods) {
	            extension.methods.forEach(function (method) {
	                method.attachToObject(extendedObject);
	                method.setRequestManager(web3._requestManager);
	            });
	        }
	
	        if (extension.properties) {
	            extension.properties.forEach(function (property) {
	                property.attachToObject(extendedObject);
	                property.setRequestManager(web3._requestManager);
	            });
	        }
	    };
	
	    ex.formatters = formatters; 
	    ex.utils = utils;
	    ex.Method = Method;
	    ex.Property = Property;
	
	    return ex;
	};
	
	
	
	module.exports = extend;
	


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

	/*
	    This file is part of web3.js.
	
	    web3.js is free software: you can redistribute it and/or modify
	    it under the terms of the GNU Lesser General Public License as published by
	    the Free Software Foundation, either version 3 of the License, or
	    (at your option) any later version.
	
	    web3.js is distributed in the hope that it will be useful,
	    but WITHOUT ANY WARRANTY; without even the implied warranty of
	    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	    GNU Lesser General Public License for more details.
	
	    You should have received a copy of the GNU Lesser General Public License
	    along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
	*/
	/** 
	 * @file batch.js
	 * @author Marek Kotewicz <marek@ethdev.com>
	 * @date 2015
	 */
	
	var Jsonrpc = __webpack_require__(23);
	var errors = __webpack_require__(64);
	
	var Batch = function (web3) {
	    this.requestManager = web3._requestManager;
	    this.requests = [];
	};
	
	/**
	 * Should be called to add create new request to batch request
	 *
	 * @method add
	 * @param {Object} jsonrpc requet object
	 */
	Batch.prototype.add = function (request) {
	    this.requests.push(request);
	};
	
	/**
	 * Should be called to execute batch request
	 *
	 * @method execute
	 */
	Batch.prototype.execute = function () {
	    var requests = this.requests;
	    this.requestManager.sendBatch(requests, function (err, results) {
	        results = results || [];
	        requests.map(function (request, index) {
	            return results[index] || {};
	        }).forEach(function (result, index) {
	            if (requests[index].callback) {
	
	                if (!Jsonrpc.getInstance().isValidResponse(result)) {
	                    return requests[index].callback(errors.InvalidResponse(result));
	                }
	
	                requests[index].callback(null, (requests[index].format ? requests[index].format(result.result) : result.result));
	            }
	        });
	    }); 
	};
	
	module.exports = Batch;
	


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

	/*
	    This file is part of web3.js.
	
	    web3.js is free software: you can redistribute it and/or modify
	    it under the terms of the GNU Lesser General Public License as published by
	    the Free Software Foundation, either version 3 of the License, or
	    (at your option) any later version.
	
	    web3.js is distributed in the hope that it will be useful,
	    but WITHOUT ANY WARRANTY; without even the implied warranty of
	    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	    GNU Lesser General Public License for more details.
	
	    You should have received a copy of the GNU Lesser General Public License
	    along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
	*/
	/** @file httpprovider.js
	 * @authors:
	 *   Marek Kotewicz <marek@ethdev.com>
	 *   Marian Oancea <marian@ethdev.com>
	 *   Fabian Vogelsteller <fabian@ethdev.com>
	 * @date 2015
	 */
	
	"use strict";
	
	var errors = __webpack_require__(64);
	
	// workaround to use httpprovider in different envs
	var XMLHttpRequest; // jshint ignore: line
	
	// meteor server environment
	if (typeof Meteor !== 'undefined' && Meteor.isServer) { // jshint ignore: line
	    XMLHttpRequest = Npm.require('xmlhttprequest').XMLHttpRequest; // jshint ignore: line
	
	// browser
	} else if (typeof window !== 'undefined' && window.XMLHttpRequest) {
	    XMLHttpRequest = window.XMLHttpRequest; // jshint ignore: line
	
	// node
	} else {
	    XMLHttpRequest = __webpack_require__(104).XMLHttpRequest; // jshint ignore: line
	}
	
	/**
	 * HttpProvider should be used to send rpc calls over http
	 */
	var HttpProvider = function (host) {
	    this.host = host || 'http://localhost:8545';
	};
	
	/**
	 * Should be called to prepare new XMLHttpRequest
	 *
	 * @method prepareRequest
	 * @param {Boolean} true if request should be async
	 * @return {XMLHttpRequest} object
	 */
	HttpProvider.prototype.prepareRequest = function (async) {
	    var request = new XMLHttpRequest();
	    request.open('POST', this.host, async);
	    request.setRequestHeader('Content-Type','application/json');
	    return request;
	};
	
	/**
	 * Should be called to make sync request
	 *
	 * @method send
	 * @param {Object} payload
	 * @return {Object} result
	 */
	HttpProvider.prototype.send = function (payload) {
	    var request = this.prepareRequest(false);
	
	    try {
	        request.send(JSON.stringify(payload));
	    } catch(error) {
	        throw errors.InvalidConnection(this.host);
	    }
	
	    var result = request.responseText;
	
	    try {
	        result = JSON.parse(result);
	    } catch(e) {
	        throw errors.InvalidResponse(request.responseText);                
	    }
	
	    return result;
	};
	
	/**
	 * Should be used to make async request
	 *
	 * @method sendAsync
	 * @param {Object} payload
	 * @param {Function} callback triggered on end with (err, result)
	 */
	HttpProvider.prototype.sendAsync = function (payload, callback) {
	    var request = this.prepareRequest(true); 
	
	    request.onreadystatechange = function() {
	        if (request.readyState === 4) {
	            var result = request.responseText;
	            var error = null;
	
	            try {
	                result = JSON.parse(result);
	            } catch(e) {
	                error = errors.InvalidResponse(request.responseText);                
	            }
	
	            callback(error, result);
	        }
	    };
	    
	    try {
	        request.send(JSON.stringify(payload));
	    } catch(error) {
	        callback(errors.InvalidConnection(this.host));
	    }
	};
	
	/**
	 * Synchronously tries to make Http request
	 *
	 * @method isConnected
	 * @return {Boolean} returns true if request haven't failed. Otherwise false
	 */
	HttpProvider.prototype.isConnected = function() {
	    try {
	        this.send({
	            id: 9999999999,
	            jsonrpc: '2.0',
	            method: 'net_listening',
	            params: []
	        });
	        return true;
	    } catch(e) {
	        return false;
	    }
	};
	
	module.exports = HttpProvider;
	


/***/ }),
/* 104 */
/***/ (function(module, exports) {

	'use strict';
	
	// go env doesn't have and need XMLHttpRequest
	if (typeof XMLHttpRequest === 'undefined') {
	    exports.XMLHttpRequest = {};
	} else {
	    exports.XMLHttpRequest = XMLHttpRequest; // jshint ignore:line
	}
	


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

	/*
	    This file is part of web3.js.
	
	    web3.js is free software: you can redistribute it and/or modify
	    it under the terms of the GNU Lesser General Public License as published by
	    the Free Software Foundation, either version 3 of the License, or
	    (at your option) any later version.
	
	    web3.js is distributed in the hope that it will be useful,
	    but WITHOUT ANY WARRANTY; without even the implied warranty of
	    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	    GNU Lesser General Public License for more details.
	
	    You should have received a copy of the GNU Lesser General Public License
	    along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
	*/
	/** @file ipcprovider.js
	 * @authors:
	 *   Fabian Vogelsteller <fabian@ethdev.com>
	 * @date 2015
	 */
	
	"use strict";
	
	var utils = __webpack_require__(24);
	var errors = __webpack_require__(64);
	
	
	var IpcProvider = function (path, net) {
	    var _this = this;
	    this.responseCallbacks = {};
	    this.path = path;
	    
	    this.connection = net.connect({path: this.path});
	
	    this.connection.on('error', function(e){
	        console.error('IPC Connection Error', e);
	        _this._timeout();
	    });
	
	    this.connection.on('end', function(){
	        _this._timeout();
	    }); 
	
	
	    // LISTEN FOR CONNECTION RESPONSES
	    this.connection.on('data', function(data) {
	        /*jshint maxcomplexity: 6 */
	
	        _this._parseResponse(data.toString()).forEach(function(result){
	
	            var id = null;
	
	            // get the id which matches the returned id
	            if(utils.isArray(result)) {
	                result.forEach(function(load){
	                    if(_this.responseCallbacks[load.id])
	                        id = load.id;
	                });
	            } else {
	                id = result.id;
	            }
	
	            // fire the callback
	            if(_this.responseCallbacks[id]) {
	                _this.responseCallbacks[id](null, result);
	                delete _this.responseCallbacks[id];
	            }
	        });
	    });
	};
	
	/**
	Will parse the response and make an array out of it.
	
	@method _parseResponse
	@param {String} data
	*/
	IpcProvider.prototype._parseResponse = function(data) {
	    var _this = this,
	        returnValues = [];
	    
	    // DE-CHUNKER
	    var dechunkedData = data
	        .replace(/\}[\n\r]?\{/g,'}|--|{') // }{
	        .replace(/\}\][\n\r]?\[\{/g,'}]|--|[{') // }][{
	        .replace(/\}[\n\r]?\[\{/g,'}|--|[{') // }[{
	        .replace(/\}\][\n\r]?\{/g,'}]|--|{') // }]{
	        .split('|--|');
	
	    dechunkedData.forEach(function(data){
	
	        // prepend the last chunk
	        if(_this.lastChunk)
	            data = _this.lastChunk + data;
	
	        var result = null;
	
	        try {
	            result = JSON.parse(data);
	
	        } catch(e) {
	
	            _this.lastChunk = data;
	
	            // start timeout to cancel all requests
	            clearTimeout(_this.lastChunkTimeout);
	            _this.lastChunkTimeout = setTimeout(function(){
	                _this._timeout();
	                throw errors.InvalidResponse(data);
	            }, 1000 * 15);
	
	            return;
	        }
	
	        // cancel timeout and set chunk to null
	        clearTimeout(_this.lastChunkTimeout);
	        _this.lastChunk = null;
	
	        if(result)
	            returnValues.push(result);
	    });
	
	    return returnValues;
	};
	
	
	/**
	Get the adds a callback to the responseCallbacks object,
	which will be called if a response matching the response Id will arrive.
	
	@method _addResponseCallback
	*/
	IpcProvider.prototype._addResponseCallback = function(payload, callback) {
	    var id = payload.id || payload[0].id;
	    var method = payload.method || payload[0].method;
	
	    this.responseCallbacks[id] = callback;
	    this.responseCallbacks[id].method = method;
	};
	
	/**
	Timeout all requests when the end/error event is fired
	
	@method _timeout
	*/
	IpcProvider.prototype._timeout = function() {
	    for(var key in this.responseCallbacks) {
	        if(this.responseCallbacks.hasOwnProperty(key)){
	            this.responseCallbacks[key](errors.InvalidConnection('on IPC'));
	            delete this.responseCallbacks[key];
	        }
	    }
	};
	
	
	/**
	Check if the current connection is still valid.
	
	@method isConnected
	*/
	IpcProvider.prototype.isConnected = function() {
	    var _this = this;
	
	    // try reconnect, when connection is gone
	    if(!_this.connection.writable)
	        _this.connection.connect({path: _this.path});
	
	    return !!this.connection.writable;
	};
	
	IpcProvider.prototype.send = function (payload) {
	
	    if(this.connection.writeSync) {
	        var result;
	
	        // try reconnect, when connection is gone
	        if(!this.connection.writable)
	            this.connection.connect({path: this.path});
	
	        var data = this.connection.writeSync(JSON.stringify(payload));
	
	        try {
	            result = JSON.parse(data);
	        } catch(e) {
	            throw errors.InvalidResponse(data);                
	        }
	
	        return result;
	
	    } else {
	        throw new Error('You tried to send "'+ payload.method +'" synchronously. Synchronous requests are not supported by the IPC provider.');
	    }
	};
	
	IpcProvider.prototype.sendAsync = function (payload, callback) {
	    // try reconnect, when connection is gone
	    if(!this.connection.writable)
	        this.connection.connect({path: this.path});
	
	
	    this.connection.write(JSON.stringify(payload));
	    this._addResponseCallback(payload, callback);
	};
	
	module.exports = IpcProvider;
	


/***/ }),
/* 106 */
/***/ (function(module, exports) {

	'use strict';
	
	/* global angular, mist */
	angular.module('dappChess').config(function ($routeProvider, $provide) {
	  var pages = {
	    welcomePage: 'welcome',
	    initializeGamePage: 'initializeGame',
	    joinGamePage: 'joinGame',
	    playGamePage: 'playGame'
	  };
	
	  $provide.factory('navigation', function ($route) {
	    var navigation = pages;
	
	    navigation.isActivePage = function (page) {
	      if (typeof $route.current !== 'undefined') {
	        return page === $route.current.activePage;
	      }
	    };
	
	    navigation.isActiveGame = function (game) {
	      if (typeof $route.current !== 'undefined' && typeof $route.current.params.id !== 'undefined') {
	        return $route.current.activePage === navigation.playGamePage && game.gameId === $route.current.params.id;
	      }
	    };
	
	    navigation.goto = function (page, parameter) {
	      if (parameter) {
	        window.location = '#/' + page + '/' + parameter;
	      } else {
	        window.location = '#/' + page;
	      }
	    };
	
	    return navigation;
	  });
	
	  $routeProvider.when('/' + pages.welcomePage, {
	    templateUrl: pages.welcomePage + '.html',
	    controller: 'WelcomeCtrl',
	    activePage: pages.welcomePage
	  }).when('/' + pages.initializeGamePage, {
	    templateUrl: pages.initializeGamePage + '.html',
	    controller: 'InitializeGameCtrl',
	    activePage: pages.initializeGamePage
	  }).when('/' + pages.joinGamePage, {
	    templateUrl: pages.joinGamePage + '.html',
	    controller: 'JoinGameCtrl',
	    activePage: pages.joinGamePage
	  }).when('/' + pages.playGamePage + '/:id', {
	    templateUrl: pages.playGamePage + '.html',
	    controller: 'PlayGameCtrl',
	    activePage: pages.playGamePage
	  }).otherwise({ redirectTo: '/' + pages.welcomePage });
	}).controller('NavigationCtrl', function (accounts, navigation, games, $scope) {
	  $scope.games = games.list;
	
	  $scope.navigation = navigation;
	
	  $scope.isMist = false;
	
	  console.log(typeof mist === 'undefined' ? 'No mist browser' : 'Mist browser');
	  console.log(games);
	  if (typeof mist !== 'undefined') {
	    $scope.isMist = true;
	
	    console.log('Clearing mist menu');
	    mist.menu.clear();
	
	    mist.menu.add('welcome', {
	      name: 'Welcome',
	      position: 1,
	      selected: navigation.isActivePage(navigation.welcomePage)
	    }, function () {
	      navigation.goto(navigation.welcomePage);
	    });
	    mist.menu.add('initializeGame', {
	      name: 'New game',
	      position: 2,
	      selected: navigation.isActivePage(navigation.initializeGamePage)
	    }, function () {
	      navigation.goto(navigation.initializeGamePage);
	    });
	    mist.menu.add('joinGame', {
	      name: 'Join game',
	      position: 3,
	      selected: navigation.isActivePage(navigation.joinGamePage)
	    }, function () {
	      navigation.goto(navigation.joinGamePage);
	    });
	
	    $scope.$watch('games', function (newGames, oldGames) {
	      console.log('games changed');
	
	      var oldGameIds = [];
	
	      for (var i in oldGames) {
	        oldGameIds.push(oldGames[i].gameId);
	      }
	
	      var _loop = function _loop(_i) {
	        if (accounts.availableAccounts.indexOf(newGames[_i].self.accountId) !== -1 || typeof newGames[_i].opponent !== 'undefined' && accounts.availableAccounts.indexOf(newGames[_i].opponent.accountId) !== -1) {
	
	          var oldGameIndex = oldGameIds.indexOf(newGames[_i].gameId);
	
	          if (oldGameIndex !== -1) {
	            oldGameIds.splice(oldGameIndex, 1);
	          }
	
	          var menuName = typeof newGames[_i].opponent !== 'undefined' ? newGames[_i].opponent.username : 'Open game';
	
	          console.log('Adding menu entry for game with id ' + newGames[_i].gameId + ' (' + menuName + ')');
	          // Since mist menu callbacks don't provide the clicked element, we need to
	          // create the callbacks in a loop; thus the JSHint error has to be suppressed
	          /*jshint -W083 */
	          mist.menu.update(newGames[_i].gameId, {
	            name: menuName,
	            position: _i + 3,
	            selected: navigation.isActiveGame(newGames[_i])
	          }, function () {
	            navigation.goto(navigation.playGamePage, newGames[_i].gameId);
	          });
	          /*jshint +W083 */
	        }
	      };
	
	      for (var _i in newGames) {
	        _loop(_i);
	      }
	
	      for (var _i2 in oldGameIds) {
	        console.log('Removing menu entry for game with id ' + oldGameIds[_i2]);
	        mist.menu.remove(oldGameIds[_i2]);
	      }
	    }, true);
	  }
	});

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /* global angular */
	
	
	var _Chess = __webpack_require__(19);
	
	angular.module('dappChess').factory('gameStates', function () {
	  var gameStates = {
	    selfMoves: {},
	    opponentMoves: {},
	    lastMoveNumber: {},
	    lastMoveTime: {}
	  };
	
	  gameStates.getMoveNumberFromState = function (state) {
	    return state[8] * 128 + state[9];
	  };
	
	  gameStates.initializeGame = function (gameId) {
	    if (typeof gameStates.selfMoves[gameId] === 'undefined') {
	      gameStates.selfMoves[gameId] = [];
	    }
	    if (typeof gameStates.opponentMoves[gameId] === 'undefined') {
	      gameStates.opponentMoves[gameId] = [];
	    }
	    if (typeof gameStates.lastMoveNumber[gameId] === 'undefined') {
	      gameStates.lastMoveNumber[gameId] = 0;
	    }
	    if (typeof gameStates.lastMoveTime[gameId] === 'undefined') {
	      gameStates.lastMoveTime[gameId] = 0;
	    }
	  };
	
	  gameStates.addSelfMove = function (gameId, moveFrom, moveTo, newState) {
	
	    gameStates.initializeGame(gameId);
	
	    var moveNumber = gameStates.getMoveNumberFromState(newState);
	
	    // If we already stored this move, don't do anything
	    if (gameStates.lastMoveNumber[gameId] === moveNumber) {
	      return;
	    }
	    if (gameStates.lastMoveNumber[gameId] > moveNumber) {
	      throw 'Invalid move: The last store move number is higher';
	    }
	
	    gameStates.selfMoves[gameId].push({
	      moveFrom: moveFrom,
	      moveTo: moveTo,
	      newState: newState
	    });
	    gameStates.lastMoveNumber[gameId] = moveNumber;
	    gameStates.lastMoveTime[gameId] = new Date().getTime();
	
	    gameStates.updateLocalStorage();
	  };
	  gameStates.addOpponentMove = function (gameId, moveFrom, moveTo, moveSignature, newState, newStateSignature) {
	    gameStates.initializeGame(gameId);
	
	    var moveNumber = gameStates.getMoveNumberFromState(newState);
	
	    // If we already stored this move, don't do anything
	    if (gameStates.lastMoveNumber[gameId] === moveNumber) {
	      return;
	    }
	    if (gameStates.lastMoveNumber[gameId] > moveNumber) {
	      throw 'Invalid move: The last store move number is higher';
	    }
	
	    gameStates.opponentMoves[gameId].push({
	      moveFrom: moveFrom,
	      moveTo: moveTo,
	      moveSignature: moveSignature,
	      newState: newState,
	      newStateSignature: newStateSignature
	    });
	    gameStates.lastMoveNumber[gameId] = moveNumber;
	    gameStates.lastMoveTime[gameId] = new Date().getTime();
	
	    gameStates.updateLocalStorage();
	  };
	
	  /**
	   * Delete a game from the local storage
	   * @param gameId
	     */
	  gameStates.delete = function (gameId) {
	    delete gameStates.selfMoves[gameId];
	    delete gameStates.opponentMoves[gameId];
	    delete gameStates.lastMoveNumber[gameId];
	    delete gameStates.lastMoveTime[gameId];
	
	    gameStates.updateLocalStorage();
	  };
	
	  gameStates.getSelfMoves = function (gameId) {
	    if (typeof gameStates.selfMoves[gameId] === 'undefined') {
	      return [];
	    }
	
	    return gameStates.selfMoves[gameId];
	  };
	  gameStates.getLastSelfMove = function (gameId) {
	    if (typeof gameStates.selfMoves[gameId] === 'undefined' || gameStates.selfMoves[gameId].length === 0) {
	      throw 'This game has no self moves yet';
	    }
	
	    return gameStates.selfMoves[gameId][gameStates.selfMoves[gameId].length - 1];
	  };
	  gameStates.getSelfMove = function (gameId, moveNumber) {
	    if (typeof gameStates.selfMoves[gameId] === 'undefined') {
	      throw 'This game has no moves yet';
	    }
	    if (gameStates.selfMoves[gameId].length === 0) {
	      throw 'This game has no self moves yet';
	    }
	
	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;
	
	    try {
	      for (var _iterator = gameStates.selfMoves[gameId][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	        var currentMove = _step.value;
	
	        var currentMoveNumber = gameStates.getMoveNumberFromState(currentMove.newState);
	
	        if (currentMoveNumber === moveNumber) {
	          return currentMove;
	        }
	      }
	    } catch (err) {
	      _didIteratorError = true;
	      _iteratorError = err;
	    } finally {
	      try {
	        if (!_iteratorNormalCompletion && _iterator.return) {
	          _iterator.return();
	        }
	      } finally {
	        if (_didIteratorError) {
	          throw _iteratorError;
	        }
	      }
	    }
	
	    throw 'Could not find moveNumber ' + moveNumber + ' for the game ' + gameId;
	  };
	
	  gameStates.getPreviousOpponentMove = function (gameId) {
	    if (typeof gameStates.opponentMoves[gameId] === 'undefined') {
	      throw 'This game has no moves yet';
	    }
	    if (gameStates.opponentMoves[gameId].length === 0) {
	      throw 'This game has no opponent moves yet';
	    }
	    if (gameStates.opponentMoves[gameId].length < 2) {
	      throw 'This game has no previous opponent move';
	    }
	
	    return gameStates.opponentMoves[gameId][gameStates.opponentMoves[gameId].length - 2];
	  };
	  gameStates.getLastOpponentMove = function (gameId) {
	    if (typeof gameStates.opponentMoves[gameId] === 'undefined') {
	      throw 'This game has no moves yet';
	    }
	    if (gameStates.opponentMoves[gameId].length === 0) {
	      throw 'This game has no opponent moves yet';
	    }
	
	    return gameStates.opponentMoves[gameId][gameStates.opponentMoves[gameId].length - 1];
	  };
	
	  /**
	   *
	   * @param gameId
	   * @return boolean
	     */
	  gameStates.isBlockchainStateNewer = function (gameId) {
	    var blockchainState = _Chess.Chess.getCurrentGameState(gameId);
	
	    if (blockchainState) {
	      if (typeof gameStates.lastMoveNumber[gameId] === 'undefined') {
	        // No state in the local states, so return true
	        return true;
	      }
	
	      var blockchainMoveNumber = gameStates.getMoveNumberFromState(blockchainState);
	
	      return blockchainMoveNumber > gameStates.lastMoveNumber[gameId];
	    }
	    // No state in the blockchain, so return false
	    return false;
	  };
	
	  /**
	   * Get an array with all parameters needed to send them to the blockchain.
	   * @param gameId
	   * @return [opponentState, opponentStateSignature, moveSelfFrom, moveSelfTo]
	     */
	  gameStates.getLastMovePackage = function (gameId) {
	    if (typeof gameStates.selfMoves[gameId] === 'undefined') {
	      throw 'This game has no moves yet';
	    }
	    if (gameStates.selfMoves[gameId].length === 0) {
	      throw 'This game has no self moves yet';
	    }
	
	    var lastSelfMove = gameStates.getLastSelfMove(gameId);
	    var lastSelfMoveNumber = gameStates.getMoveNumberFromState(lastSelfMove.newState);
	
	    // There was only one move, and it was the self move
	    // => we do not have a state for this
	    if (gameStates.lastMoveNumber[gameId] === 1) {
	      throw 'No move package found for last self move.';
	    }
	
	    var opponentMove = gameStates.getLastOpponentMove(gameId);
	    var opponentMoveNumber = gameStates.getMoveNumberFromState(opponentMove.newState);
	
	    // We have to fetch the opponent move that was the last move before our own move
	    // If the opponents move was the last move, we need to check for the previous
	    // move that *should* be the move before our last move
	    if (opponentMoveNumber + 1 !== lastSelfMoveNumber) {
	      // Fetch the previous opponents move
	      opponentMove = gameStates.getPreviousOpponentMove(gameId);
	      opponentMoveNumber = gameStates.getMoveNumberFromState(opponentMove.newState);
	
	      // If this is not the move previous to our move, there was an error
	      // Thus: *Something* has to fetch the last move from the blockchain
	      if (opponentMoveNumber + 1 !== lastSelfMoveNumber) {
	        throw 'No move package found for last self move.';
	      }
	    }
	
	    return [opponentMove.newState, opponentMove.newStateSignature, lastSelfMove.moveFrom, lastSelfMove.moveTo];
	  };
	
	  /**
	   * Get last state from local storage
	   * @param gameId
	   * @returns state | false if not in local storage
	     */
	  gameStates.getLastLocalState = function (game) {
	    if (typeof gameStates.lastMoveNumber[game.gameId] === 'undefined') {
	      return false;
	    }
	
	    if (gameStates.selfMoves[game.gameId].length > 0) {
	      var lastSelfMove = gameStates.getLastSelfMove(game.gameId);
	      var lastSelfMoveNumber = gameStates.getMoveNumberFromState(lastSelfMove.newState);
	
	      if (lastSelfMoveNumber === gameStates.lastMoveNumber[game.gameId]) {
	        return lastSelfMove.newState;
	      }
	    }
	
	    if (gameStates.opponentMoves[game.gameId].length > 0) {
	      var lastOpponentMove = gameStates.getLastOpponentMove(game.gameId);
	      var lastOpponentMoveNumber = gameStates.getMoveNumberFromState(lastOpponentMove.newState);
	
	      if (lastOpponentMoveNumber === gameStates.lastMoveNumber[game.gameId]) {
	        return lastOpponentMove.newState;
	      }
	    }
	
	    throw 'Could not find last move in self or opponent moves';
	  };
	
	  gameStates.getLastBlockchainState = function (game) {
	    var blockchainGameState = _Chess.Chess.getCurrentGameState(game.gameId, { from: game.self.accountId,
	      gas: 10000000 });
	
	    blockchainGameState = blockchainGameState.map(function (element) {
	      if ((typeof element === 'undefined' ? 'undefined' : _typeof(element)) === 'object' && typeof element.toNumber === 'function') {
	        return element.toNumber();
	      }
	
	      return element;
	    });
	
	    return blockchainGameState;
	  };
	
	  gameStates.getLastMoveTime = function (game) {
	    return gameStates.lastMoveTime[game.gameId];
	  };
	
	  gameStates.getLastMoveNumber = function (game) {
	    return gameStates.lastMoveNumber[game.gameId];
	  };
	
	  gameStates.updateLocalStorage = function () {
	    window.localStorage.setItem('gameStates.selfMoves', angular.toJson(gameStates.selfMoves));
	    window.localStorage.setItem('gameStates.opponentMoves', angular.toJson(gameStates.opponentMoves));
	    window.localStorage.setItem('gameStates.lastMoveNumber', angular.toJson(gameStates.lastMoveNumber));
	    window.localStorage.setItem('gameStates.lastMoveTime', angular.toJson(gameStates.lastMoveTime));
	  };
	  gameStates.fetchFromLocalStorage = function () {
	    if (typeof window.localStorage['gameStates.selfMoves'] !== 'undefined') {
	      try {
	        var movesInLocalStorage = JSON.parse(window.localStorage['gameStates.selfMoves']);
	        if ((typeof movesInLocalStorage === 'undefined' ? 'undefined' : _typeof(movesInLocalStorage)) === 'object') {
	          gameStates.selfMoves = movesInLocalStorage;
	        } else {
	          throw 'Invalid data format of selfMoves';
	        }
	      } catch (e) {
	        console.log('Could not parse selfMoves from local storage', e);
	      }
	    }
	    if (typeof window.localStorage['gameStates.opponentMoves'] !== 'undefined') {
	      try {
	        var _movesInLocalStorage = JSON.parse(window.localStorage['gameStates.opponentMoves']);
	        if ((typeof _movesInLocalStorage === 'undefined' ? 'undefined' : _typeof(_movesInLocalStorage)) === 'object') {
	          gameStates.opponentMoves = _movesInLocalStorage;
	        } else {
	          throw 'Invalid data format of opponentMoves';
	        }
	      } catch (e) {
	        console.log('Could not parse opponentMoves from local storage', e);
	      }
	    }
	    if (typeof window.localStorage['gameStates.lastMoveNumber'] !== 'undefined') {
	      try {
	        var lastMoveNumber = JSON.parse(window.localStorage['gameStates.lastMoveNumber']);
	        if ((typeof lastMoveNumber === 'undefined' ? 'undefined' : _typeof(lastMoveNumber)) === 'object') {
	          gameStates.lastMoveNumber = lastMoveNumber;
	        } else {
	          throw 'Invalid data format of lastMoveNumber';
	        }
	      } catch (e) {
	        console.log('Could not parse lastMoveNumber from local storage', e);
	      }
	    }
	    if (typeof window.localStorage['gameStates.lastMoveTime'] !== 'undefined') {
	      try {
	        var lastMoveTime = JSON.parse(window.localStorage['gameStates.lastMoveTime']);
	        if ((typeof lastMoveTime === 'undefined' ? 'undefined' : _typeof(lastMoveTime)) === 'object') {
	          gameStates.lastMoveTime = lastMoveTime;
	        } else {
	          throw 'Invalid data format of lastMoveTime';
	        }
	      } catch (e) {
	        console.log('Could not parse lastMoveTime from local storage', e);
	      }
	    }
	  };
	
	  gameStates.fetchFromLocalStorage();
	
	  return gameStates;
	});

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /* global angular */
	
	
	var _Chess = __webpack_require__(19);
	
	var _fenConversion = __webpack_require__(109);
	
	var _config = __webpack_require__(110);
	
	var _config2 = _interopRequireDefault(_config);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var ChessJS = __webpack_require__(111);
	var shhFactory = __webpack_require__(112);
	
	var proxyUri = _config2.default.proxyUri;
	var shhTopic = _config2.default.appId;
	var TIMEOUT_ACK = _config2.default.timeouts.ack;
	
	angular.module('dappChess').factory('games', function (crypto, navigation, gameStates, accounts, $rootScope, $route) {
	  // Only needed for fake Whisper proxy
	  var shh = shhFactory(proxyUri, function (shh) {
	    // Register all my accounts with proxy
	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;
	
	    try {
	      for (var _iterator = accounts.availableAccounts[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	        var account = _step.value;
	
	        shh.register(account);
	      }
	    } catch (err) {
	      _didIteratorError = true;
	      _iteratorError = err;
	    } finally {
	      try {
	        if (!_iteratorNormalCompletion && _iterator.return) {
	          _iterator.return();
	        }
	      } finally {
	        if (_didIteratorError) {
	          throw _iteratorError;
	        }
	      }
	    }
	  });
	
	  var games = {
	    list: [],
	    openGames: [],
	    viewingGame: { id: 0 }
	  };
	
	  games.getGame = function (id) {
	    return games.list.find(function (game) {
	      return game.gameId === id;
	    });
	  };
	
	  games.removeGame = function (gameId) {
	    for (var i in games.list) {
	      if (games.list[i].gameId === gameId) {
	        console.log('game removed', games.list.splice(i, 1));
	        break;
	      }
	    }
	
	    gameStates.delete(gameId);
	  };
	
	  /**
	   * Convert an array to a game object as seen in the contract with the given gameId.
	   * @param gameId of the game
	   * @param array containing the data
	   * @returns object as seen in the contract (contractGameObject)
	   */
	  games.parseContractGameArray = function (gameId, array) {
	    var playerWhite = _Chess.Chess.getWhitePlayer(gameId);
	    return {
	      gameId: gameId,
	      player1: array[0],
	      player2: array[1],
	      player1Alias: array[2],
	      player2Alias: array[3],
	      nextPlayer: array[4],
	      winner: array[5],
	      ended: array[6],
	      pot: array[7],
	      player1WonEther: array[8],
	      player2WonEther: array[9],
	      turnTime: array[10],
	      timeoutStarted: array[11],
	      timeoutState: array[12],
	      playerWhite: playerWhite
	    };
	  };
	
	  /**
	   * Convert a game array to a game for the games list
	   * Structure of the game:
	   *  gameId: <string>,
	   *  {
	   *    self: {
	   *      username: <string>,
	   *      accountId: <string>,
	   *      color: <string>,
	   *      wonEther: <int>
	   *    },
	   *    opponent: {
	   *      username: <string>,
	   *      accountId: <string>,
	   *      color: <string>,
	   *      wonEther: <int>
	   *    }
	   *  },
	   *  ended: <boolean>,
	   *  pot: <number>,
	   *  turnTime: <number>,
	   *  timeoutStarted: <date>,
	   *  timeoutState: <{-2,-1,0,1,2}>
	   * @param contractGameObject
	   * @returns game
	     */
	  games.convertGameToObject = function (contractGameObject) {
	    var game = {
	      gameId: contractGameObject.gameId,
	      nextPlayer: contractGameObject.nextPlayer,
	      turnTime: contractGameObject.turnTime.toNumber(),
	      ended: contractGameObject.ended,
	      pot: _Chess.web3.fromWei(contractGameObject.pot, 'ether').toDigits().toString()
	    };
	
	    if (typeof contractGameObject.timeoutState !== 'undefined') {
	      game.timeoutState = contractGameObject.timeoutState.toNumber();
	      game.timeoutStarted = contractGameObject.timeoutStarted.toNumber() || 0;
	    } else {
	      game.timeoutState = 0;
	      game.timeoutStarted = 0;
	    }
	
	    if (accounts.availableAccounts.indexOf(contractGameObject.player2) !== -1) {
	      game.self = {
	        username: contractGameObject.player2Alias,
	        accountId: contractGameObject.player2,
	        color: contractGameObject.playerWhite === contractGameObject.player2 ? 'white' : 'black',
	        wonEther: contractGameObject.player2WonEther ? _Chess.web3.fromWei(contractGameObject.player2WonEther, 'ether').toDigits().toString() : 0
	      };
	      game.opponent = {
	        username: contractGameObject.player1Alias,
	        accountId: contractGameObject.player1,
	        color: contractGameObject.playerWhite === contractGameObject.player1 ? 'white' : 'black',
	        wonEther: contractGameObject.player1WonEther ? _Chess.web3.fromWei(contractGameObject.player1WonEther, 'ether').toDigits().toString() : 0
	      };
	    } else {
	      game.self = {
	        username: contractGameObject.player1Alias,
	        accountId: contractGameObject.player1,
	        color: contractGameObject.playerWhite === contractGameObject.player1 ? 'white' : 'black',
	        wonEther: contractGameObject.player1WonEther ? _Chess.web3.fromWei(contractGameObject.player1WonEther, 'ether').toDigits().toString() : 0
	      };
	      if (typeof contractGameObject.player2 !== 'undefined' && contractGameObject.player2 !== '0x0000000000000000000000000000000000000000') {
	        game.opponent = {
	          username: contractGameObject.player2Alias,
	          accountId: contractGameObject.player2,
	          color: contractGameObject.playerWhite === contractGameObject.player2 ? 'white' : 'black',
	          wonEther: contractGameObject.player2WonEther ? _Chess.web3.fromWei(contractGameObject.player2WonEther, 'ether').toDigits().toString() : 0
	        };
	      }
	    }
	    if (typeof contractGameObject.winner !== 'undefined' && contractGameObject.winner !== '0x0000000000000000000000000000000000000000') {
	      if (game.self.accountId === contractGameObject.winner) {
	        game.winner = 'self';
	      } else if (game.opponent.accountId === contractGameObject.winner) {
	        game.winner = 'opponent';
	      }
	    }
	
	    return game;
	  };
	
	  /**
	   * Add a game to the list, if there is no game with the same id.
	   * @param game A game in the format required for the game list
	   */
	  games.add = function (game) {
	    console.log('game add called', game);
	
	    for (var i in games.list) {
	      if (games.list[i].gameId === game.gameId) {
	        console.log('game with id ' + game.gameId + ' already exists');
	        return;
	      }
	    }
	    games.list.push(game);
	
	    // Initialize chess object
	    game.chess = new ChessJS();
	
	    if (gameStates.isBlockchainStateNewer(game.gameId)) {
	      game.state = gameStates.getLastBlockchainState(game);
	    } else {
	      game.state = gameStates.getLastLocalState(game);
	    }
	
	    game.chess.load((0, _fenConversion.generateFen)(game.state));
	    if (game.self.color[0] === game.chess.turn()) {
	      game.nextPlayer = game.self.accountId;
	    } else {
	      game.nextPlayer = game.opponent.accountId;
	    }
	
	    var lastMoveTime = void 0;
	    try {
	      // Try to find out time of last move
	      lastMoveTime = gameStates.getLastMoveTime(game);
	      if (!lastMoveTime) {
	        // get it from blockchain?
	      }
	    } catch (e) {}
	    if (lastMoveTime) {
	      game.currentTimeout = new Date(lastMoveTime + game.turnTime * 60 * 1000);
	    }
	
	    // Add events for this game
	    games.listenForMoves(game, function (m) {
	      var _m$payload = _slicedToArray(m.payload, 6),
	          state = _m$payload[1],
	          stateSignature = _m$payload[2],
	          fromIndex = _m$payload[3],
	          toIndex = _m$payload[4],
	          moveSignature = _m$payload[5];
	
	      // Apply move
	
	
	      var opponentChessMove = game.chess.move({
	        from: fromIndex,
	        to: toIndex,
	        promotion: 'q'
	      });
	
	      if (opponentChessMove !== null) {
	        game.state = state;
	        game.nextPlayer = game.self.accountId;
	        game.lastMove = opponentChessMove;
	        games.sendAck(game);
	        var toBackend = (0, _fenConversion.generateMapping)().toBackend;
	        gameStates.addOpponentMove(game.gameId, toBackend[fromIndex], toBackend[toIndex], moveSignature, state, stateSignature);
	
	        if (game.gameId !== games.viewingGame.id) {
	          // Player is currently in another game
	          $rootScope.$broadcast('message', game.opponent.username + ' made a move!', 'message', 'playgame');
	        }
	        $rootScope.$apply();
	      } else {
	        console.log('Move is not valid, send last state and move to blockchain');
	        try {
	          games.sendLastStateOrMoveToBlockchain(game);
	          // TODO call Chess.claimTimeout ?
	        } catch (e) {
	          // TODO inform user?
	          console.log('Sending state + move to blockchain failed:', e);
	        }
	      }
	    });
	
	    console.log('added game with id ' + game.gameId);
	  };
	
	  /**
	   * Add a game to the list, if there is no game with the same id;
	   * otherwise update it
	   * @param game A game in the format required for the game list
	   */
	  games.update = function (game) {
	    var g = games.getGame(game.gameId);
	    if (typeof g !== 'undefined') {
	      jQuery.extend(g, game);
	      // update game view to new state
	      g.chess.load((0, _fenConversion.generateFen)(g.state));
	      if (g.self.color[0] === g.chess.turn()) {
	        g.nextPlayer = g.self.accountId;
	      } else {
	        g.nextPlayer = g.opponent.accountId;
	      }
	      // TODO update move timer, listeners, ...?
	    } else {
	      games.add(game);
	    }
	  };
	
	  games.showWinner = function (game) {
	    console.log('show winner', game);
	    // Only do this if we are part of this game
	    if (accounts.availableAccounts.indexOf(game.self.accountId) !== -1) {
	      // Perform actions if game is won
	      if (game.winner === 'self') {
	        $rootScope.$broadcast('message', 'You have won the game against ' + game.opponent.username, 'message', 'playgame');
	      }
	      // Perform action if the winner was the opponent
	      else if (game.winner === 'opponent') {
	          $rootScope.$broadcast('message', 'You have lost the game against ' + game.opponent.username, 'message', 'playgame');
	        } else {
	          $rootScope.$broadcast('message', 'Your game against ' + game.opponent.username + ' ended in a draw', 'message', 'playgame');
	        }
	    } else {
	      console.log(game.self.accountId + ' not in account ids', accounts.availableAccounts);
	    }
	  };
	
	  games.claimWin = function (game) {
	    console.log('claimWin', game);
	    if (accounts.availableAccounts.indexOf(game.self.accountId) !== -1) {
	      if (game.timeoutState !== 0) {
	        $rootScope.$broadcast('message', 'Not able to claim win, while other claim is active in game with the id ' + game.gameId, 'error', 'claimwin');
	      } else {
	        $rootScope.$broadcast('message', 'Claiming win for your game with the id ' + game.gameId, 'message', 'claimwin');
	        try {
	          games.sendLastStateOrMoveToBlockchain(game);
	        } catch (e) {
	          console.log('sendLastStateOrMoveToBlockchain error', e);
	          $rootScope.$broadcast('message', 'An error occurred while sending the game state to the blockchain', 'error', 'claimwin');
	        }
	        try {
	          _Chess.Chess.claimWin(game.gameId, { from: game.self.accountId, gas: 10000000 });
	        } catch (e) {
	          console.log('claimWin error', e);
	          $rootScope.$broadcast('message', 'An error occurred while trying to claim win', 'error', 'claimwin');
	        }
	      }
	    }
	  };
	
	  games.offerDraw = function (game) {
	    console.log('offerDraw', game);
	    if (accounts.availableAccounts.indexOf(game.self.accountId) !== -1) {
	      if (game.timeoutState !== 0) {
	        $rootScope.$broadcast('message', 'Not able to offer draw, while other claim is active in game with the id ' + game.gameId, 'error', 'offerdraw');
	      } else {
	        $rootScope.$broadcast('message', 'Offering draw for your game with the id ' + game.gameId, 'message', 'offerdraw');
	        try {
	          games.sendLastStateOrMoveToBlockchain(game);
	          _Chess.Chess.offerDraw(game.gameId, { from: game.self.accountId, gas: 10000000 });
	        } catch (e) {
	          console.log('offerDraw error', e);
	          $rootScope.$broadcast('message', 'Could not offer a draw', 'error', 'offerdraw');
	        }
	      }
	    }
	  };
	
	  games.claimTimeout = function (game) {
	    console.log('claimTimeout', game);
	    if (accounts.availableAccounts.indexOf(game.self.accountId) !== -1) {
	      if (game.timeoutState !== 0) {
	        $rootScope.$broadcast('message', 'Not able to claim timeout while other claim is active in game with the id ' + game.gameId, 'error', 'claimtimeout');
	      } else {
	        $rootScope.$broadcast('message', 'Claim timeout for your game with the id ' + game.gameId, 'message', 'claimtimeout');
	        try {
	          games.sendLastStateOrMoveToBlockchain(game);
	          _Chess.Chess.claimTimeout(game.gameId, { from: game.self.accountId, gas: 10000000 });
	        } catch (e) {
	          console.log('claimTimeout error', e);
	          $rootScope.$broadcast('message', 'Could not claim timeout', 'error', 'claimtimeout');
	        }
	      }
	    }
	  };
	
	  games.confirmGameEnded = function (game) {
	    console.log('confirmGameEnded', game);
	    if (accounts.availableAccounts.indexOf(game.self.accountId) !== -1) {
	      if (game.timeoutState === 0) {
	        $rootScope.$broadcast('message', 'Not able to comfirm game ended, while no claim is active ' + 'in game with the id ' + game.gameId, 'error', 'confirmgameended');
	      } else {
	        $rootScope.$broadcast('message', 'Sending confirmation to end your game with the id ' + game.gameId, 'message', 'confirmgameended');
	        try {
	          _Chess.Chess.confirmGameEnded(game.gameId, { from: game.self.accountId, gas: 10000000 });
	        } catch (e) {
	          console.log('confirmGameEnded error', e);
	          $rootScope.$broadcast('message', 'Could not end the game', 'error', 'confirmgameended');
	        }
	      }
	    }
	  };
	
	  games.claimTimeoutEnded = function (game) {
	    console.log('claimTimeoutEnded', game);
	    if (accounts.availableAccounts.indexOf(game.self.accountId) !== -1) {
	      if (game.timeoutState === 0) {
	        $rootScope.$broadcast('message', 'Not able to claim timeout, while no claim is active ' + 'in game with the id ' + game.gameId, 'error', 'claimtimeoutended');
	      } else {
	        $rootScope.$broadcast('message', 'Claiming timeout for your game with the id ' + game.gameId, 'message', 'claimtimeoutended');
	        try {
	          _Chess.Chess.claimTimeoutEnded(game.gameId, { from: game.self.accountId, gas: 10000000 });
	        } catch (e) {
	          console.log('claimTimeoutEnded error', e);
	          $rootScope.$broadcast('message', 'Could not claim timeout', 'error', 'claimtimeoutended');
	        }
	      }
	    }
	  };
	
	  games.claimEther = function (game) {
	    console.log('claim ether', game);
	    // Only do this if we are part of this game
	    if (accounts.availableAccounts.indexOf(game.self.accountId) !== -1) {
	      // When the player has won ether, claim this
	      if (game.self.wonEther > 0) {
	        if (game.opponent) {
	          $rootScope.$broadcast('message', 'Claiming your won ether in the game against ' + game.opponent.username, 'message', 'claimpot');
	        } else {
	          $rootScope.$broadcast('message', 'Reclaiming your ether in your game with the id ' + game.gameId, 'message', 'claimpot');
	        }
	
	        try {
	          console.log('Trying to claim ether for game ', game);
	          _Chess.Chess.withdraw(game.gameId, { from: game.self.accountId, gas: 100000000000000000000000000 });
	          $rootScope.$broadcast('message', 'Your ether with the amount of ' + game.self.wonEther + ' has been added to your account', 'success', 'claimpot');
	
	          game.self.wonEther = 0;
	          game.pot = 0;
	        } catch (e) {
	          $rootScope.$broadcast('message', 'Could not claim your ether', 'error', 'claimpot');
	        }
	      } else {
	        console.log('no ether to claim for self: ', game.self);
	      }
	    } else {
	      console.log(game.self.accountId + ' not in account ids', accounts.availableAccounts);
	    }
	  };
	
	  /* Send move and resulting new state to second player */
	  games.sendMove = function (game, fromIndex, toIndex) {
	    // update game information
	    gameStates.addSelfMove(game.gameId, (0, _fenConversion.algebraicToIndex)(fromIndex), (0, _fenConversion.algebraicToIndex)(toIndex), game.state);
	    game.nextPlayer = game.opponent.accountId;
	    console.log('sendMove move number', gameStates.getMoveNumberFromState(game.state));
	
	    // if there is a timeout running against us, send the move to blockchain
	    if (game.timeoutState !== 0 && game.timeoutState !== -2) {
	      games.sendLastStateOrMoveToBlockchain(game);
	      return;
	    }
	    var identity = game.self.accountId;
	    var payload = ['MOVE', game.state, crypto.sign(identity, game.gameId, game.state), fromIndex, toIndex, crypto.sign(identity, game.gameId, [fromIndex, toIndex])];
	    game.lastSentHash = crypto.solSha3(payload);
	    shh.post({
	      'from': identity,
	      'to': game.opponent.accountId,
	      'topic': [shhTopic, game.gameId],
	      'payload': payload
	    });
	    console.log('Sent move no', game.state[8] * 128 + game.state[9], 'from', fromIndex, 'to', toIndex);
	
	    // Wait for ACK
	    if (typeof game.ackTimeout !== 'undefined') {
	      clearTimeout(game.ackTimeout);
	    }
	    game.ackTimeout = setTimeout(function () {
	      if (game.lastAckHash !== game.lastSentHash) {
	        console.log('Opponent did not ACK, sending last state and move to blockchain');
	        // If not ACKed, send my last move to blockchain
	        try {
	          games.sendLastStateOrMoveToBlockchain(game);
	          console.log('after t/o ACK sendLastStateOrMoveToBlockchain');
	          // then send claimTimeout
	          _Chess.Chess.claimTimeout(game.gameId, { from: game.self.accountId, gas: 10000000 });
	
	          game.moveTimeout = setTimeout(function () {
	            var _games$getValidMove = games.getValidMove(game),
	                _games$getValidMove2 = _slicedToArray(_games$getValidMove, 2),
	                fromIndex = _games$getValidMove2[0],
	                toIndex = _games$getValidMove2[1];
	
	            try {
	              _Chess.Chess.claimTimeoutEndedWithMove(game.gameId, fromIndex, toIndex, { from: game.self.accountId,
	                gas: 10000000 });
	            } catch (e) {
	              console.error('Could not claimTimeoutEndedWithMove', e);
	            }
	          }, game.turnTime * 60 * 1000);
	          game.currentTimeout = new Date(new Date().getTime() + game.turnTime * 60 * 1000);
	        } catch (e) {
	          console.log('Could not send state and move to blockchain', e);
	        }
	      }
	    }, TIMEOUT_ACK);
	
	    // Wait for next move
	    if (typeof game.moveTimeout !== 'undefined') {
	      clearTimeout(game.moveTimeout);
	    }
	    game.moveTimeout = setTimeout(function () {
	      console.log('Opponent did not send move, sending' + 'last state and move to blockchain');
	      // If opponent did not move, send my last state and move to blockchain
	      try {
	        games.sendLastStateOrMoveToBlockchain(game);
	        // then send claimTimeout
	        _Chess.Chess.claimTimeout(game.gameId, { from: game.self.accountId, gas: 10000000 });
	
	        game.moveTimeout = setTimeout(function () {
	          var _games$getValidMove3 = games.getValidMove(game),
	              _games$getValidMove4 = _slicedToArray(_games$getValidMove3, 2),
	              fromIndex = _games$getValidMove4[0],
	              toIndex = _games$getValidMove4[1];
	
	          try {
	            _Chess.Chess.claimTimeoutEndedWithMove(game.gameId, fromIndex, toIndex, { from: game.self.accountId, gas: 10000000 });
	          } catch (e) {
	            console.error('Could not claimTimeoutEndedWithMove', e);
	          }
	        }, game.turnTime * 60 * 1000 + 10000); // half game time plus 10 seconds extra
	        game.currentTimeout = new Date(new Date().getTime() + game.turnTime * 60 * 1000);
	      } catch (e) {
	        console.log('Could not send state and move to blockchain', e);
	      }
	    }, game.turnTime * 60 * 1000); // half game time
	    game.currentTimeout = new Date(new Date().getTime() + game.turnTime * 60 * 1000);
	    $rootScope.$apply();
	  };
	
	  /**
	   * Returns a random valid move, throws if no valid moves are possible
	   *
	   * @param game
	   * @returns {*[from index in 0x88, to index in 0x88]}
	   */
	  games.getValidMove = function (game) {
	    console.log('get valid move for', game);
	    var move = game.chess.moves()[0];
	    move = game.chess.move(move);
	    game.chess.undo();
	    var toBackend = _fenConversion.generateMapping.toBackend;
	    return [toBackend[move.from], toBackend[move.to]];
	  };
	
	  games.sendLastStateOrMoveToBlockchain = function (game) {
	    var state = void 0,
	        stateSignature = void 0,
	        fromIndex = void 0,
	        toIndex = void 0;
	    try {
	      var _gameStates$getLastMo = gameStates.getLastMovePackage(game.gameId);
	
	      var _gameStates$getLastMo2 = _slicedToArray(_gameStates$getLastMo, 4);
	
	      state = _gameStates$getLastMo2[0];
	      stateSignature = _gameStates$getLastMo2[1];
	      fromIndex = _gameStates$getLastMo2[2];
	      toIndex = _gameStates$getLastMo2[3];
	
	      console.log('getLastMovePackage', state, stateSignature, fromIndex, toIndex, gameStates.getMoveNumberFromState(state));
	    } catch (e) {
	      console.log('getLastMovePackage failed');
	      // last state + move not present, move base on blockchain state
	      var blockchainMoveNumber = gameStates.getMoveNumberFromState(gameStates.getLastBlockchainState(game));
	      console.log('lastBlockchainState Number', gameStates.getMoveNumberFromState(gameStates.getLastBlockchainState(game)));
	      var lastSelfMove = void 0;
	      try {
	        lastSelfMove = gameStates.getLastSelfMove(game.gameId);
	      } catch (e) {
	        if (blockchainMoveNumber === 0) {
	          // blockchain has no move, we have no move... fine
	          console.log('state = 0 --> no move ... fine');
	          return;
	        }
	      }
	      var lastSelfMoveNumber = gameStates.getMoveNumberFromState(lastSelfMove.newState);
	      console.log('lastSelfMove Number', lastSelfMoveNumber);
	      if (blockchainMoveNumber === lastSelfMoveNumber) {
	        return;
	      } else if (blockchainMoveNumber + 1 === lastSelfMoveNumber) {
	        _Chess.Chess.move(game.gameId, lastSelfMove.moveFrom, lastSelfMove.moveTo, { from: game.self.accountId,
	          gas: 10000000 });
	      } else {
	        // should not happen
	        throw Error('Blockchain state and local move do not match.');
	      }
	      return;
	    }
	    console.log('getLastMovePackage success... sending move', state, fromIndex, toIndex, stateSignature);
	    _Chess.Chess.moveFromState(game.gameId, state, fromIndex, toIndex, stateSignature, { from: game.self.accountId, gas: 10000000 });
	  };
	
	  /* Send acknowledgment of last received move */
	  games.sendAck = function (game) {
	    console.log('Acknowledge reception of', game.lastReceivedHash);
	    shh.post({
	      'from': game.self.accountId,
	      'to': game.opponent.accountId,
	      'topic': [shhTopic, game.gameId],
	      'payload': ['ACK', game.lastReceivedHash]
	    });
	  };
	
	  /* Receive move and resulting new state from opponent */
	  /* callback({[state, stateSignature, fromIndex, toIndex, moveSignature], from}) */
	  games.listenForMoves = function (game, callback) {
	    var moveEvents = shh.watch({
	      'topic': [shhTopic, game.gameId],
	      'to': game.self.accountId
	    });
	    moveEvents.arrived(function (m) {
	      console.log('moveEvents.arrived', m);
	      if (m.payload[0] === 'ACK') {
	        var hash = m.payload[1];
	        game.lastAckHash = hash;
	        console.log('Received acknowledgment of', hash);
	      }
	      if (m.payload[0] === 'MOVE') {
	        var _m$payload2 = _slicedToArray(m.payload, 6),
	            state = _m$payload2[1],
	            stateSignature = _m$payload2[2],
	            fromIndex = _m$payload2[3],
	            toIndex = _m$payload2[4],
	            moveSignature = _m$payload2[5];
	
	        if (!crypto.verify(game.opponent.accountId, game.gameId, stateSignature, state) || !crypto.verify(game.opponent.accountId, game.gameId, moveSignature, [fromIndex, toIndex])) {
	          console.log('Could not verify opponent\'s move signature, sending last ' + 'valid state and move to blockchain');
	          // TODO Send my last known state and move to the blockchain
	        } else {
	          game.lastReceivedHash = crypto.solSha3(m.payload);
	          game.currentTimeout = new Date(new Date().getTime() + game.turnTime * 60 * 1000);
	          callback(m);
	        }
	      }
	    });
	
	    return {
	      stopListening: function stopListening() {
	        moveEvents.remove();
	      }
	    };
	  };
	
	  games.eventGameInitialized = function (err, data) {
	    console.log('eventGameInitialized', err, data);
	    if (err) {
	      console.log('error occured', err);
	      /*$rootScope.$broadcast('message',
	       'Your game could not be created, the following error occured: ' + err,
	       'error', 'startgame');*/
	    } else {
	      var game = games.convertGameToObject(data.args);
	      games.add(game);
	      games.openGames.push(game.gameId);
	
	      if (accounts.availableAccounts.indexOf(game.self.accountId) !== -1) {
	        $rootScope.$broadcast('message', 'Your game has successfully been created and has the id ' + game.gameId, 'success', 'startgame');
	      }
	
	      $rootScope.$apply();
	    }
	  };
	
	  games.eventGameJoined = function (err, data) {
	    console.log('eventGameJoined', err, data);
	    if (err) {
	      console.log('error occured', err);
	      /*$rootScope.$broadcast('message',
	       'It was not possible to join the game, the following error occured: ' + err,
	       'error', 'joingame');*/
	    } else {
	      var gameId = data.args.gameId;
	      var p1accountId = data.args.player1;
	      var p1username = data.args.player1Alias;
	      var p1color = data.args.playerWhite === data.args.player1 ? 'white' : 'black';
	      var p2accountId = data.args.player2;
	      var p2username = data.args.player2Alias;
	      var p2color = data.args.playerWhite === data.args.player2 ? 'white' : 'black';
	
	      var game = games.getGame(gameId);
	      if (typeof game === 'undefined') {
	        game = games.convertGameToObject(data.args);
	        games.add(game);
	      } else {
	        // remove game from openGames
	        var gameIndex = games.openGames.indexOf(gameId);
	        games.openGames.splice(gameIndex, 1);
	        if (accounts.availableAccounts.indexOf(p2accountId) !== -1) {
	          game.self = {
	            username: p2username,
	            accountId: p2accountId,
	            color: p2color
	          };
	          game.opponent = {
	            username: p1username,
	            accountId: p1accountId,
	            color: p1color
	          };
	        } else {
	          game.self = {
	            username: p1username,
	            accountId: p1accountId,
	            color: p1color
	          };
	          game.opponent = {
	            username: p2username,
	            accountId: p2accountId,
	            color: p2color
	          };
	        }
	        game.pot = _Chess.web3.fromWei(data.args.pot, 'ether').toDigits().toString();
	        game.player1WonEther = 0;
	        game.player2WonEther = 0;
	      }
	
	      if (accounts.availableAccounts.indexOf(game.self.accountId) !== -1) {
	        $rootScope.$broadcast('message', 'Your game against ' + game.opponent.username.replace(/<(?:.|\n)*?>/gm, '') + ' has started', 'success', 'joingame');
	
	        if ($route.current.activePage === navigation.joinGamePage) {
	          navigation.goto(navigation.playGamePage, gameId);
	        } else {
	          $rootScope.$apply();
	        }
	      }
	    }
	  };
	
	  games.eventGameStateChanged = function (err, data) {
	    console.log('eventGameStateChanged', err, data);
	    var game = games.getGame(data.args.gameId);
	    if (typeof game !== 'undefined') {
	      game.state = data.args.state;
	      games.update(game);
	    }
	  };
	
	  games.eventMove = function (err, data) {
	    console.log('eventMove', err, data);
	    var game = games.getGame(data.args.gameId);
	    if (typeof game !== 'undefined') {
	      // Apply move
	      var toFrontend = (0, _fenConversion.generateMapping)().toFrontend;
	      var opponentChessMove = game.chess.move({
	        from: toFrontend[data.args.fromIndex],
	        to: toFrontend[data.args.toIndex],
	        promotion: 'q'
	      });
	
	      game.state = (0, _fenConversion.generateState)(game.chess.fen());
	      game.nextPlayer = data.args.player === game.self.accountId ? game.opponent.accountId : game.self.accountId;
	      game.lastMove = opponentChessMove;
	      game.timeoutState = 0;
	
	      $rootScope.$apply();
	    }
	  };
	
	  games.eventGameEnded = function (err, data) {
	    console.log('eventGameEnded', err, data);
	    if (err) {
	      console.log('error occured', err);
	      /* $rootScope.$broadcast('message',
	       'The surrender could not be saved, the following error occurred: ' + err,
	       'error', 'playgame');*/
	    } else {
	      // Update game in games list
	      var gameInContract = _Chess.Chess.games(data.args.gameId);
	
	      if (gameInContract) {
	        for (var i in games.list) {
	          if (games.list[i].gameId === data.args.gameId) {
	            var game = games.convertGameToObject(games.parseContractGameArray(data.args.gameId, gameInContract));
	            console.log('updated game after close', game);
	            games.update(game);
	
	            // Show the winner of the game
	            games.showWinner(game);
	
	            // Claim the ether automatically
	            games.claimEther(game);
	
	            $rootScope.$apply();
	          }
	        }
	      }
	    }
	  };
	
	  games.eventGameClosed = function (err, data) {
	    console.log('eventGameClosed', err, data);
	    if (err) {
	      console.log('error occured', err);
	      /*$rootScope.$broadcast('message',
	       'The surrender could not be saved, the following error occurred: ' + err,
	       'error', 'playgame');*/
	    } else {
	      // Update game in games list
	      var gameInContract = _Chess.Chess.games(data.args.gameId);
	
	      if (gameInContract) {
	        for (var i in games.list) {
	          if (games.list[i].gameId === data.args.gameId) {
	            var game = games.convertGameToObject(games.parseContractGameArray(data.args.gameId, gameInContract));
	            games.update(game);
	
	            // If the player closed his own game
	            if (accounts.availableAccounts.indexOf(data.args.player) !== -1) {
	              navigation.goto(navigation.welcomePage);
	
	              $rootScope.$broadcast('message', 'Your game with the id ' + data.args.gameId + ' was closed', 'success', 'playgame');
	
	              // If the game did not have an opponent: Claim the ether from this game
	              if (typeof game.opponent === 'undefined') {
	                games.claimEther(game);
	              }
	
	              games.removeGame(data.args.gameId);
	
	              $rootScope.$apply();
	            } else {
	              var openGameIndex = games.openGames.indexOf(game.gameId);
	
	              // If this was an open game of another player
	              if (openGameIndex !== -1) {
	                games.removeGame(data.args.gameId);
	                games.openGames.splice(openGameIndex, 1);
	
	                $rootScope.$apply();
	              }
	            }
	          }
	        }
	      }
	    }
	  };
	
	  games.eventGameTimeoutStarted = function (err, data) {
	    console.log('eventGameTimeoutStarted', err, data);
	    if (err) {
	      console.error('error occured', err);
	      return;
	    }
	    var game = games.getGame(data.args.gameId);
	    if (typeof game === 'undefined') {
	      return;
	    }
	    game.timeoutStarted = data.args.timeoutStarted.toNumber();
	    game.timeoutState = data.args.timeoutState.toNumber();
	
	    if (gameStates.isBlockchainStateNewer(game.gameId)) {
	      console.log('blockchain state newer, update');
	      game.state = gameStates.getLastBlockchainState(game);
	      games.update(game);
	      // TODO update chessboard !
	    }
	
	    /*
	     * -2 draw offered by nextPlayer
	     * -1 draw offered by waiting player
	     * 0 nothing
	     * 1 checkmate
	     * 2 timeout
	     */
	    console.log('eventGameTimeoutStarted for', game);
	    if (game.timeoutState === -1 && game.nextPlayer === game.self.accountId || game.timeoutState === -2 && game.nextPlayer === game.opponent.accountId) {
	      $rootScope.$broadcast('message', 'Player ' + game.opponent.username + ' wants to offer a draw', 'message', 'playgame-' + game.gameId);
	    } else if (game.timeoutState === 1 && game.nextPlayer === game.self.accountId) {
	      $rootScope.$broadcast('message', 'Player ' + game.opponent.username + ' claims that he won the game', 'message', 'playgame-' + game.gameId);
	    } else if (game.timeoutState === 2 && game.nextPlayer === game.self.accountId) {
	      $rootScope.$broadcast('message', 'Player ' + game.opponent.username + ' claims that he won the game due to a timeout', 'message', 'playgame-' + game.gameId);
	    }
	
	    $rootScope.$apply();
	
	    // Check own state to confirm or decline
	    if (data.args.timeoutState !== 0 && (game.chess.turn() === 'w' && game.self.color === 'white' || game.chess.turn() === 'b' && game.self.color === 'black')) {
	      if ( // confirm if [1, 2] (claimWin, claimTimeout) and we are checkmate
	      [1, 2].indexOf(data.args.timeoutState) !== -1 && game.chess.in_checkmate() || // jshint ignore:line
	      // or confirm if -1 (offerDraw) and stalemate of draw
	      data.args.timeoutState === -1 && (game.chess.in_stalemate() || game.chess.in_draw()) // jshint ignore:line
	      ) {
	          try {
	            _Chess.Chess.confirmGameEnded(game.gameId, { from: game.self.accountId, gas: 10000000 });
	          } catch (e) {
	            $rootScope.$broadcast('message', 'Could not confirm your game against ' + game.opponent.username + ' ended', 'error', 'playgame-' + game.gameId);
	            console.log('error while trying to confirm the game ended after draw', e);
	          }
	        } else {
	        // no valid endgame
	        try {
	          games.sendLastStateOrMoveToBlockchain(game);
	        } catch (e) {
	          // no move found that user made before. user has to make a move
	          $rootScope.$broadcast('message', game.opponent.username + ' has started a timeout. ' + 'You have to move withing the next ' + game.turnTime + ' minutes ' + 'to decline.', 'error', 'playgame-' + game.gameId);
	          // Set countdown. We cannot know when the opponent moves, so just start it from now
	          game.currentTimeout = new Date(new Date().getTime() + game.turnTime * 60 * 1000);
	          console.log(game.opponent.username + ' has started a timeout. You have to move withing ' + 'the next ' + game.turnTime + ' minutes ' + 'to decline.');
	        }
	      }
	    } else if (data.args.timeoutState === -2 && ( // -2 = offerDraw by turning player
	    // confirm if in stalemate or draw
	    game.chess.in_stalemate() || game.chess.in_draw()) && ( // jshint ignore:line
	    game.chess.turn() === 'w' && game.self.color === 'black' || game.chess.turn() === 'b' && game.self.color === 'white')) {
	      // opponent (currently turning player) offers draw
	      try {
	        _Chess.Chess.confirmGameEnded(game.gameId, { from: game.self.accountId, gas: 10000000 });
	      } catch (e) {
	        $rootScope.$broadcast('message', 'Could not confirm your game against ' + game.opponent.username + ' ended', 'error', 'playgame-' + game.gameId);
	        console.error('error while trying to confirm the game ended after draw', e);
	      }
	    }
	    $rootScope.$apply();
	  };
	
	  // Fetch games of player
	  var _iteratorNormalCompletion2 = true;
	  var _didIteratorError2 = false;
	  var _iteratorError2 = undefined;
	
	  try {
	    for (var _iterator2 = accounts.availableAccounts[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	      var accountId = _step2.value;
	      var _iteratorNormalCompletion4 = true;
	      var _didIteratorError4 = false;
	      var _iteratorError4 = undefined;
	
	      try {
	        for (var _iterator4 = _Chess.Chess.getGamesOfPlayer(accountId)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
	          var currentGameId = _step4.value;
	
	          // Check if the game already exists in the games list
	          var game = games.getGame(currentGameId);
	          if (typeof game === 'undefined') {
	            games.add(games.convertGameToObject(games.parseContractGameArray(currentGameId, _Chess.Chess.games(currentGameId))));
	          }
	        }
	      } catch (err) {
	        _didIteratorError4 = true;
	        _iteratorError4 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion4 && _iterator4.return) {
	            _iterator4.return();
	          }
	        } finally {
	          if (_didIteratorError4) {
	            throw _iteratorError4;
	          }
	        }
	      }
	    }
	
	    // Fetch open games
	  } catch (err) {
	    _didIteratorError2 = true;
	    _iteratorError2 = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion2 && _iterator2.return) {
	        _iterator2.return();
	      }
	    } finally {
	      if (_didIteratorError2) {
	        throw _iteratorError2;
	      }
	    }
	  }
	
	  var _iteratorNormalCompletion3 = true;
	  var _didIteratorError3 = false;
	  var _iteratorError3 = undefined;
	
	  try {
	    for (var _iterator3 = _Chess.Chess.getOpenGameIds()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	      var openGameId = _step3.value;
	
	      // Check if the game already exists in the games list
	      var _game = games.getGame(openGameId);
	      if (typeof _game === 'undefined') {
	        games.add(games.convertGameToObject(games.parseContractGameArray(openGameId, _Chess.Chess.games(openGameId))));
	      }
	      if (games.openGames.indexOf(openGameId) === -1) {
	        games.openGames.push(openGameId);
	      }
	      if (games.openGames.indexOf(openGameId) === -1) {
	        games.openGames.push(openGameId);
	      }
	    }
	
	    // Event listeners
	  } catch (err) {
	    _didIteratorError3 = true;
	    _iteratorError3 = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion3 && _iterator3.return) {
	        _iterator3.return();
	      }
	    } finally {
	      if (_didIteratorError3) {
	        throw _iteratorError3;
	      }
	    }
	  }
	
	  _Chess.Chess.GameInitialized({}, games.eventGameInitialized);
	  _Chess.Chess.GameJoined({}, games.eventGameJoined);
	  _Chess.Chess.GameStateChanged({}, games.eventGameStateChanged);
	  _Chess.Chess.Move({}, games.eventMove);
	  _Chess.Chess.GameEnded({}, games.eventGameEnded);
	  _Chess.Chess.GameClosed({}, games.eventGameClosed);
	  _Chess.Chess.GameTimeoutStarted({}, games.eventGameTimeoutStarted);
	
	  return games;
	}).filter('ownGames', function (accounts) {
	  return function (games) {
	    return games.filter(function (game) {
	      return accounts.availableAccounts.indexOf(game.self.accountId) !== -1;
	    });
	  };
	}).filter('othersOpenGames', function (accounts) {
	  return function (games, openGames) {
	    if (typeof games !== 'undefined') {
	      return games.filter(function (game) {
	        return accounts.availableAccounts.indexOf(game.self.accountId) === -1;
	      }).filter(function (game) {
	        return openGames.indexOf(game.gameId) !== -1;
	      });
	    }
	  };
	});

/***/ }),
/* 109 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.generateMapping = generateMapping;
	exports.algebraicToIndex = algebraicToIndex;
	exports.generateState = generateState;
	exports.generateFen = generateFen;
	function generatePieceMapping() {
	  return {
	
	    // for 0x88 to fen
	    '-6': 'k',
	    '-5': 'q',
	    '-4': 'r',
	    '-3': 'b',
	    '-2': 'n',
	    '-1': 'p',
	    '1': 'P',
	    '2': 'N',
	    '3': 'B',
	    '4': 'R',
	    '5': 'Q',
	    '6': 'K',
	
	    // for fen to 0x88
	    'k': -6,
	    'q': -5,
	    'r': -4,
	    'b': -3,
	    'n': -2,
	    'p': -1,
	    'P': 1,
	    'N': 2,
	    'B': 3,
	    'R': 4,
	    'Q': 5,
	    'K': 6
	
	  };
	}
	
	function generateMapping() {
	  var x = 0,
	      y = 8;
	  var toBackend = {};
	  var toFrontend = {};
	  var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
	
	  for (var i = 0; i < 128; i++) {
	    toBackend[alphabet[x] + y] = i;
	    toFrontend[i] = alphabet[x] + y;
	
	    x++;
	    if (x === 8) {
	      x = 0;
	      y--;
	      i += 8;
	    }
	  }
	
	  return { 'toBackend': toBackend, 'toFrontend': toFrontend };
	}
	
	/**
	 * Convert Standard Algebraic Notation to 0x88 index
	 * @param string: SAN string (e.g. 'a3')
	 * @return number: Index in 0x88 board
	 */
	function algebraicToIndex(string) {
	  var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
	  return (8 - parseInt(string[1])) * 16 + alphabet.indexOf(string[0]);
	}
	
	function generateState(fen) {
	  var fenComponents = fen.split(' ');
	  var board = fenComponents[0],
	      activeColor = fenComponents[1],
	      castling = fenComponents[2],
	      enPassant = fenComponents[3],
	
	  // halfMoveClock = fenComponents[4],
	  fullMoveCounter = fenComponents[5];
	
	  // set board to 0x88
	  var state = [];
	  var counter = 0;
	  var toState = generatePieceMapping();
	  var whiteKing = void 0,
	      blackKing = void 0;
	  for (var i = 0; i < board.length; i++) {
	    if (isNaN(Number(board[i]))) {
	      if (board[i] === '/') {
	        for (var _k = 0; _k < 8; _k++) {
	          state.push(0);
	          counter++;
	        }
	      } else {
	        state.push(toState[board[i]]);
	        if (board[i] === 'k') {
	          blackKing = counter;
	        }
	        if (board[i] === 'K') {
	          whiteKing = counter;
	        }
	        counter++;
	      }
	    } else {
	      for (var j = 0; j < Number(board[i]); j++) {
	        state.push(0);
	        counter++;
	      }
	    }
	  }
	  // fill rest of shadow field
	  for (var _j = 0; _j < 8; _j++) {
	    state.push(0);
	  }
	
	  // fullmove
	  var halfMoveCounter = 2 * fullMoveCounter + (activeColor === 'w' ? -2 : -1);
	  state[8] = parseInt(halfMoveCounter / 128);
	  state[9] = parseInt(halfMoveCounter % 128);
	
	  // set king position
	  state[11] = blackKing;
	  state[123] = whiteKing;
	
	  // set color
	  if (activeColor === 'w') {
	    state[56] = 1;
	  } else {
	    state[56] = -1;
	  }
	
	  // init for castling
	  state[78] = -1;
	  state[79] = -1;
	  state[62] = -1;
	  state[63] = -1;
	
	  // change state if castling is possible
	  for (var k = 0; k < castling.length; k++) {
	    // white right - kleine rochade für weiß
	    if (castling[k] === 'K') {
	      state[79] = 0;
	    }
	    // white left - große rochade für weiß
	    else if (castling[k] === 'Q') {
	        state[78] = 0;
	      }
	      // black right - kleine rochade für schwarz
	      else if (castling[k] === 'k') {
	          state[63] = 0;
	        }
	        // black left - große rochade für schwarz
	        else if (castling[k] === 'q') {
	            state[62] = 0;
	          }
	  }
	
	  // set enpassant
	  var mapping = generateMapping();
	  state[61] = mapping.toBackend[enPassant];
	  if (typeof state[61] === 'undefined') {
	    state[61] = 0;
	  }
	  state[77] = mapping.toBackend[enPassant];
	  if (typeof state[77] === 'undefined') {
	    state[77] = 0;
	  }
	
	  return state;
	}
	
	function generateFen(state) {
	  var skip = 0,
	      fen = '',
	      zero = 0,
	      toPiece = generatePieceMapping();
	
	  for (var i = 0; i < state.length; i++) {
	    // field is empty
	    if (state[i] === 0) {
	      zero += 1;
	    }
	    // field contains a piece
	    else {
	
	        // before concatinate piece to fen, check if zeros exist
	        if (zero > 0) {
	          fen += zero;
	          zero = 0;
	        }
	        fen += toPiece[state[i]];
	      }
	
	    skip++;
	
	    // shadow board
	    if (skip === 8) {
	
	      // concatinate rest to fen if exists
	      if (zero > 0) {
	        fen += zero;
	        zero = 0;
	      }
	
	      // concatinate '/'
	      if (i < 118) {
	        fen += '/';
	      }
	
	      // skip shadow board and reset skip
	      i += 8;
	      skip = 0;
	    }
	  }
	
	  // set current player
	  if (state[56] === 1) {
	    // white
	    fen += ' w ';
	  } else {
	    // black
	    fen += ' b ';
	  }
	
	  // set Rochade
	  if (state[79] === 0 || state[78] === 0 || state[62] === 0 || state[63] === 0) {
	    if (state[79] === 0) {
	      fen += 'K';
	    }
	    if (state[78] === 0) {
	      fen += 'Q';
	    }
	    if (state[62] === 0) {
	      fen += 'k';
	    }
	    if (state[63] === 0) {
	      fen += 'q';
	    }
	  } else {
	    fen += '-';
	  }
	
	  // set En passant
	  if (state[61] > 0 || state[77] > 0) {
	    var position = generateMapping();
	    if (state[61] > 0) {
	      fen += ' ' + position.toFrontend[state[61]];
	    } else if (state[77] > 0) {
	      fen += ' ' + position.toFrontend[state[77]];
	    }
	  } else {
	    fen += ' -';
	  }
	
	  // set clock for halfmoves since last capture or pawn advance
	  // not implemented, so always 0
	  fen += ' 0 ';
	
	  // set fullmove number
	  var halfMoveCounter = 128 * state[8] + state[9];
	  fen += Math.ceil((halfMoveCounter + 1) / 2);
	
	  return fen;
	}

/***/ }),
/* 110 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  'appId': 'dappChess_server',
	  'proxyUri': 'https://dappchessserver.sdhacson.repl.co',
	  'timeouts': {
	    'ack': 10000
	  }
	};

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*
	 * Copyright (c) 2020, Jeff Hlywa (jhlywa@gmail.com)
	 * All rights reserved.
	 *
	 * Redistribution and use in source and binary forms, with or without
	 * modification, are permitted provided that the following conditions are met:
	 *
	 * 1. Redistributions of source code must retain the above copyright notice,
	 *    this list of conditions and the following disclaimer.
	 * 2. Redistributions in binary form must reproduce the above copyright notice,
	 *    this list of conditions and the following disclaimer in the documentation
	 *    and/or other materials provided with the distribution.
	 *
	 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
	 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
	 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
	 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
	 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
	 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
	 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
	 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
	 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
	 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
	 * POSSIBILITY OF SUCH DAMAGE.
	 *
	 *----------------------------------------------------------------------------*/
	
	/* minified license below  */
	
	/* @license
	 * Copyright (c) 2018, Jeff Hlywa (jhlywa@gmail.com)
	 * Released under the BSD license
	 * https://github.com/jhlywa/chess.js/blob/master/LICENSE
	 */
	
	var Chess = function(fen) {
	  var BLACK = 'b'
	  var WHITE = 'w'
	
	  var EMPTY = -1
	
	  var PAWN = 'p'
	  var KNIGHT = 'n'
	  var BISHOP = 'b'
	  var ROOK = 'r'
	  var QUEEN = 'q'
	  var KING = 'k'
	
	  var SYMBOLS = 'pnbrqkPNBRQK'
	
	  var DEFAULT_POSITION =
	    'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
	
	  var POSSIBLE_RESULTS = ['1-0', '0-1', '1/2-1/2', '*']
	
	  var PAWN_OFFSETS = {
	    b: [16, 32, 17, 15],
	    w: [-16, -32, -17, -15]
	  }
	
	  var PIECE_OFFSETS = {
	    n: [-18, -33, -31, -14, 18, 33, 31, 14],
	    b: [-17, -15, 17, 15],
	    r: [-16, 1, 16, -1],
	    q: [-17, -16, -15, 1, 17, 16, 15, -1],
	    k: [-17, -16, -15, 1, 17, 16, 15, -1]
	  }
	
	  // prettier-ignore
	  var ATTACKS = [
	    20, 0, 0, 0, 0, 0, 0, 24,  0, 0, 0, 0, 0, 0,20, 0,
	     0,20, 0, 0, 0, 0, 0, 24,  0, 0, 0, 0, 0,20, 0, 0,
	     0, 0,20, 0, 0, 0, 0, 24,  0, 0, 0, 0,20, 0, 0, 0,
	     0, 0, 0,20, 0, 0, 0, 24,  0, 0, 0,20, 0, 0, 0, 0,
	     0, 0, 0, 0,20, 0, 0, 24,  0, 0,20, 0, 0, 0, 0, 0,
	     0, 0, 0, 0, 0,20, 2, 24,  2,20, 0, 0, 0, 0, 0, 0,
	     0, 0, 0, 0, 0, 2,53, 56, 53, 2, 0, 0, 0, 0, 0, 0,
	    24,24,24,24,24,24,56,  0, 56,24,24,24,24,24,24, 0,
	     0, 0, 0, 0, 0, 2,53, 56, 53, 2, 0, 0, 0, 0, 0, 0,
	     0, 0, 0, 0, 0,20, 2, 24,  2,20, 0, 0, 0, 0, 0, 0,
	     0, 0, 0, 0,20, 0, 0, 24,  0, 0,20, 0, 0, 0, 0, 0,
	     0, 0, 0,20, 0, 0, 0, 24,  0, 0, 0,20, 0, 0, 0, 0,
	     0, 0,20, 0, 0, 0, 0, 24,  0, 0, 0, 0,20, 0, 0, 0,
	     0,20, 0, 0, 0, 0, 0, 24,  0, 0, 0, 0, 0,20, 0, 0,
	    20, 0, 0, 0, 0, 0, 0, 24,  0, 0, 0, 0, 0, 0,20
	  ];
	
	  // prettier-ignore
	  var RAYS = [
	     17,  0,  0,  0,  0,  0,  0, 16,  0,  0,  0,  0,  0,  0, 15, 0,
	      0, 17,  0,  0,  0,  0,  0, 16,  0,  0,  0,  0,  0, 15,  0, 0,
	      0,  0, 17,  0,  0,  0,  0, 16,  0,  0,  0,  0, 15,  0,  0, 0,
	      0,  0,  0, 17,  0,  0,  0, 16,  0,  0,  0, 15,  0,  0,  0, 0,
	      0,  0,  0,  0, 17,  0,  0, 16,  0,  0, 15,  0,  0,  0,  0, 0,
	      0,  0,  0,  0,  0, 17,  0, 16,  0, 15,  0,  0,  0,  0,  0, 0,
	      0,  0,  0,  0,  0,  0, 17, 16, 15,  0,  0,  0,  0,  0,  0, 0,
	      1,  1,  1,  1,  1,  1,  1,  0, -1, -1,  -1,-1, -1, -1, -1, 0,
	      0,  0,  0,  0,  0,  0,-15,-16,-17,  0,  0,  0,  0,  0,  0, 0,
	      0,  0,  0,  0,  0,-15,  0,-16,  0,-17,  0,  0,  0,  0,  0, 0,
	      0,  0,  0,  0,-15,  0,  0,-16,  0,  0,-17,  0,  0,  0,  0, 0,
	      0,  0,  0,-15,  0,  0,  0,-16,  0,  0,  0,-17,  0,  0,  0, 0,
	      0,  0,-15,  0,  0,  0,  0,-16,  0,  0,  0,  0,-17,  0,  0, 0,
	      0,-15,  0,  0,  0,  0,  0,-16,  0,  0,  0,  0,  0,-17,  0, 0,
	    -15,  0,  0,  0,  0,  0,  0,-16,  0,  0,  0,  0,  0,  0,-17
	  ];
	
	  var SHIFTS = { p: 0, n: 1, b: 2, r: 3, q: 4, k: 5 }
	
	  var FLAGS = {
	    NORMAL: 'n',
	    CAPTURE: 'c',
	    BIG_PAWN: 'b',
	    EP_CAPTURE: 'e',
	    PROMOTION: 'p',
	    KSIDE_CASTLE: 'k',
	    QSIDE_CASTLE: 'q'
	  }
	
	  var BITS = {
	    NORMAL: 1,
	    CAPTURE: 2,
	    BIG_PAWN: 4,
	    EP_CAPTURE: 8,
	    PROMOTION: 16,
	    KSIDE_CASTLE: 32,
	    QSIDE_CASTLE: 64
	  }
	
	  var RANK_1 = 7
	  var RANK_2 = 6
	  var RANK_3 = 5
	  var RANK_4 = 4
	  var RANK_5 = 3
	  var RANK_6 = 2
	  var RANK_7 = 1
	  var RANK_8 = 0
	
	  // prettier-ignore
	  var SQUARES = {
	    a8:   0, b8:   1, c8:   2, d8:   3, e8:   4, f8:   5, g8:   6, h8:   7,
	    a7:  16, b7:  17, c7:  18, d7:  19, e7:  20, f7:  21, g7:  22, h7:  23,
	    a6:  32, b6:  33, c6:  34, d6:  35, e6:  36, f6:  37, g6:  38, h6:  39,
	    a5:  48, b5:  49, c5:  50, d5:  51, e5:  52, f5:  53, g5:  54, h5:  55,
	    a4:  64, b4:  65, c4:  66, d4:  67, e4:  68, f4:  69, g4:  70, h4:  71,
	    a3:  80, b3:  81, c3:  82, d3:  83, e3:  84, f3:  85, g3:  86, h3:  87,
	    a2:  96, b2:  97, c2:  98, d2:  99, e2: 100, f2: 101, g2: 102, h2: 103,
	    a1: 112, b1: 113, c1: 114, d1: 115, e1: 116, f1: 117, g1: 118, h1: 119
	  };
	
	  var ROOKS = {
	    w: [
	      { square: SQUARES.a1, flag: BITS.QSIDE_CASTLE },
	      { square: SQUARES.h1, flag: BITS.KSIDE_CASTLE }
	    ],
	    b: [
	      { square: SQUARES.a8, flag: BITS.QSIDE_CASTLE },
	      { square: SQUARES.h8, flag: BITS.KSIDE_CASTLE }
	    ]
	  }
	
	  var board = new Array(128)
	  var kings = { w: EMPTY, b: EMPTY }
	  var turn = WHITE
	  var castling = { w: 0, b: 0 }
	  var ep_square = EMPTY
	  var half_moves = 0
	  var move_number = 1
	  var history = []
	  var header = {}
	
	  /* if the user passes in a fen string, load it, else default to
	   * starting position
	   */
	  if (typeof fen === 'undefined') {
	    load(DEFAULT_POSITION)
	  } else {
	    load(fen)
	  }
	
	  function clear(keep_headers) {
	    if (typeof keep_headers === 'undefined') {
	      keep_headers = false
	    }
	
	    board = new Array(128)
	    kings = { w: EMPTY, b: EMPTY }
	    turn = WHITE
	    castling = { w: 0, b: 0 }
	    ep_square = EMPTY
	    half_moves = 0
	    move_number = 1
	    history = []
	    if (!keep_headers) header = {}
	    update_setup(generate_fen())
	  }
	
	  function reset() {
	    load(DEFAULT_POSITION)
	  }
	
	  function load(fen, keep_headers) {
	    if (typeof keep_headers === 'undefined') {
	      keep_headers = false
	    }
	
	    var tokens = fen.split(/\s+/)
	    var position = tokens[0]
	    var square = 0
	
	    if (!validate_fen(fen).valid) {
	      return false
	    }
	
	    clear(keep_headers)
	
	    for (var i = 0; i < position.length; i++) {
	      var piece = position.charAt(i)
	
	      if (piece === '/') {
	        square += 8
	      } else if (is_digit(piece)) {
	        square += parseInt(piece, 10)
	      } else {
	        var color = piece < 'a' ? WHITE : BLACK
	        put({ type: piece.toLowerCase(), color: color }, algebraic(square))
	        square++
	      }
	    }
	
	    turn = tokens[1]
	
	    if (tokens[2].indexOf('K') > -1) {
	      castling.w |= BITS.KSIDE_CASTLE
	    }
	    if (tokens[2].indexOf('Q') > -1) {
	      castling.w |= BITS.QSIDE_CASTLE
	    }
	    if (tokens[2].indexOf('k') > -1) {
	      castling.b |= BITS.KSIDE_CASTLE
	    }
	    if (tokens[2].indexOf('q') > -1) {
	      castling.b |= BITS.QSIDE_CASTLE
	    }
	
	    ep_square = tokens[3] === '-' ? EMPTY : SQUARES[tokens[3]]
	    half_moves = parseInt(tokens[4], 10)
	    move_number = parseInt(tokens[5], 10)
	
	    update_setup(generate_fen())
	
	    return true
	  }
	
	  /* TODO: this function is pretty much crap - it validates structure but
	   * completely ignores content (e.g. doesn't verify that each side has a king)
	   * ... we should rewrite this, and ditch the silly error_number field while
	   * we're at it
	   */
	  function validate_fen(fen) {
	    var errors = {
	      0: 'No errors.',
	      1: 'FEN string must contain six space-delimited fields.',
	      2: '6th field (move number) must be a positive integer.',
	      3: '5th field (half move counter) must be a non-negative integer.',
	      4: '4th field (en-passant square) is invalid.',
	      5: '3rd field (castling availability) is invalid.',
	      6: '2nd field (side to move) is invalid.',
	      7: "1st field (piece positions) does not contain 8 '/'-delimited rows.",
	      8: '1st field (piece positions) is invalid [consecutive numbers].',
	      9: '1st field (piece positions) is invalid [invalid piece].',
	      10: '1st field (piece positions) is invalid [row too large].',
	      11: 'Illegal en-passant square'
	    }
	
	    /* 1st criterion: 6 space-seperated fields? */
	    var tokens = fen.split(/\s+/)
	    if (tokens.length !== 6) {
	      return { valid: false, error_number: 1, error: errors[1] }
	    }
	
	    /* 2nd criterion: move number field is a integer value > 0? */
	    if (isNaN(tokens[5]) || parseInt(tokens[5], 10) <= 0) {
	      return { valid: false, error_number: 2, error: errors[2] }
	    }
	
	    /* 3rd criterion: half move counter is an integer >= 0? */
	    if (isNaN(tokens[4]) || parseInt(tokens[4], 10) < 0) {
	      return { valid: false, error_number: 3, error: errors[3] }
	    }
	
	    /* 4th criterion: 4th field is a valid e.p.-string? */
	    if (!/^(-|[abcdefgh][36])$/.test(tokens[3])) {
	      return { valid: false, error_number: 4, error: errors[4] }
	    }
	
	    /* 5th criterion: 3th field is a valid castle-string? */
	    if (!/^(KQ?k?q?|Qk?q?|kq?|q|-)$/.test(tokens[2])) {
	      return { valid: false, error_number: 5, error: errors[5] }
	    }
	
	    /* 6th criterion: 2nd field is "w" (white) or "b" (black)? */
	    if (!/^(w|b)$/.test(tokens[1])) {
	      return { valid: false, error_number: 6, error: errors[6] }
	    }
	
	    /* 7th criterion: 1st field contains 8 rows? */
	    var rows = tokens[0].split('/')
	    if (rows.length !== 8) {
	      return { valid: false, error_number: 7, error: errors[7] }
	    }
	
	    /* 8th criterion: every row is valid? */
	    for (var i = 0; i < rows.length; i++) {
	      /* check for right sum of fields AND not two numbers in succession */
	      var sum_fields = 0
	      var previous_was_number = false
	
	      for (var k = 0; k < rows[i].length; k++) {
	        if (!isNaN(rows[i][k])) {
	          if (previous_was_number) {
	            return { valid: false, error_number: 8, error: errors[8] }
	          }
	          sum_fields += parseInt(rows[i][k], 10)
	          previous_was_number = true
	        } else {
	          if (!/^[prnbqkPRNBQK]$/.test(rows[i][k])) {
	            return { valid: false, error_number: 9, error: errors[9] }
	          }
	          sum_fields += 1
	          previous_was_number = false
	        }
	      }
	      if (sum_fields !== 8) {
	        return { valid: false, error_number: 10, error: errors[10] }
	      }
	    }
	
	    if (
	      (tokens[3][1] == '3' && tokens[1] == 'w') ||
	      (tokens[3][1] == '6' && tokens[1] == 'b')
	    ) {
	      return { valid: false, error_number: 11, error: errors[11] }
	    }
	
	    /* everything's okay! */
	    return { valid: true, error_number: 0, error: errors[0] }
	  }
	
	  function generate_fen() {
	    var empty = 0
	    var fen = ''
	
	    for (var i = SQUARES.a8; i <= SQUARES.h1; i++) {
	      if (board[i] == null) {
	        empty++
	      } else {
	        if (empty > 0) {
	          fen += empty
	          empty = 0
	        }
	        var color = board[i].color
	        var piece = board[i].type
	
	        fen += color === WHITE ? piece.toUpperCase() : piece.toLowerCase()
	      }
	
	      if ((i + 1) & 0x88) {
	        if (empty > 0) {
	          fen += empty
	        }
	
	        if (i !== SQUARES.h1) {
	          fen += '/'
	        }
	
	        empty = 0
	        i += 8
	      }
	    }
	
	    var cflags = ''
	    if (castling[WHITE] & BITS.KSIDE_CASTLE) {
	      cflags += 'K'
	    }
	    if (castling[WHITE] & BITS.QSIDE_CASTLE) {
	      cflags += 'Q'
	    }
	    if (castling[BLACK] & BITS.KSIDE_CASTLE) {
	      cflags += 'k'
	    }
	    if (castling[BLACK] & BITS.QSIDE_CASTLE) {
	      cflags += 'q'
	    }
	
	    /* do we have an empty castling flag? */
	    cflags = cflags || '-'
	    var epflags = ep_square === EMPTY ? '-' : algebraic(ep_square)
	
	    return [fen, turn, cflags, epflags, half_moves, move_number].join(' ')
	  }
	
	  function set_header(args) {
	    for (var i = 0; i < args.length; i += 2) {
	      if (typeof args[i] === 'string' && typeof args[i + 1] === 'string') {
	        header[args[i]] = args[i + 1]
	      }
	    }
	    return header
	  }
	
	  /* called when the initial board setup is changed with put() or remove().
	   * modifies the SetUp and FEN properties of the header object.  if the FEN is
	   * equal to the default position, the SetUp and FEN are deleted
	   * the setup is only updated if history.length is zero, ie moves haven't been
	   * made.
	   */
	  function update_setup(fen) {
	    if (history.length > 0) return
	
	    if (fen !== DEFAULT_POSITION) {
	      header['SetUp'] = '1'
	      header['FEN'] = fen
	    } else {
	      delete header['SetUp']
	      delete header['FEN']
	    }
	  }
	
	  function get(square) {
	    var piece = board[SQUARES[square]]
	    return piece ? { type: piece.type, color: piece.color } : null
	  }
	
	  function put(piece, square) {
	    /* check for valid piece object */
	    if (!('type' in piece && 'color' in piece)) {
	      return false
	    }
	
	    /* check for piece */
	    if (SYMBOLS.indexOf(piece.type.toLowerCase()) === -1) {
	      return false
	    }
	
	    /* check for valid square */
	    if (!(square in SQUARES)) {
	      return false
	    }
	
	    var sq = SQUARES[square]
	
	    /* don't let the user place more than one king */
	    if (
	      piece.type == KING &&
	      !(kings[piece.color] == EMPTY || kings[piece.color] == sq)
	    ) {
	      return false
	    }
	
	    board[sq] = { type: piece.type, color: piece.color }
	    if (piece.type === KING) {
	      kings[piece.color] = sq
	    }
	
	    update_setup(generate_fen())
	
	    return true
	  }
	
	  function remove(square) {
	    var piece = get(square)
	    board[SQUARES[square]] = null
	    if (piece && piece.type === KING) {
	      kings[piece.color] = EMPTY
	    }
	
	    update_setup(generate_fen())
	
	    return piece
	  }
	
	  function build_move(board, from, to, flags, promotion) {
	    var move = {
	      color: turn,
	      from: from,
	      to: to,
	      flags: flags,
	      piece: board[from].type
	    }
	
	    if (promotion) {
	      move.flags |= BITS.PROMOTION
	      move.promotion = promotion
	    }
	
	    if (board[to]) {
	      move.captured = board[to].type
	    } else if (flags & BITS.EP_CAPTURE) {
	      move.captured = PAWN
	    }
	    return move
	  }
	
	  function generate_moves(options) {
	    function add_move(board, moves, from, to, flags) {
	      /* if pawn promotion */
	      if (
	        board[from].type === PAWN &&
	        (rank(to) === RANK_8 || rank(to) === RANK_1)
	      ) {
	        var pieces = [QUEEN, ROOK, BISHOP, KNIGHT]
	        for (var i = 0, len = pieces.length; i < len; i++) {
	          moves.push(build_move(board, from, to, flags, pieces[i]))
	        }
	      } else {
	        moves.push(build_move(board, from, to, flags))
	      }
	    }
	
	    var moves = []
	    var us = turn
	    var them = swap_color(us)
	    var second_rank = { b: RANK_7, w: RANK_2 }
	
	    var first_sq = SQUARES.a8
	    var last_sq = SQUARES.h1
	    var single_square = false
	
	    /* do we want legal moves? */
	    var legal =
	      typeof options !== 'undefined' && 'legal' in options
	        ? options.legal
	        : true
	
	    /* are we generating moves for a single square? */
	    if (typeof options !== 'undefined' && 'square' in options) {
	      if (options.square in SQUARES) {
	        first_sq = last_sq = SQUARES[options.square]
	        single_square = true
	      } else {
	        /* invalid square */
	        return []
	      }
	    }
	
	    for (var i = first_sq; i <= last_sq; i++) {
	      /* did we run off the end of the board */
	      if (i & 0x88) {
	        i += 7
	        continue
	      }
	
	      var piece = board[i]
	      if (piece == null || piece.color !== us) {
	        continue
	      }
	
	      if (piece.type === PAWN) {
	        /* single square, non-capturing */
	        var square = i + PAWN_OFFSETS[us][0]
	        if (board[square] == null) {
	          add_move(board, moves, i, square, BITS.NORMAL)
	
	          /* double square */
	          var square = i + PAWN_OFFSETS[us][1]
	          if (second_rank[us] === rank(i) && board[square] == null) {
	            add_move(board, moves, i, square, BITS.BIG_PAWN)
	          }
	        }
	
	        /* pawn captures */
	        for (j = 2; j < 4; j++) {
	          var square = i + PAWN_OFFSETS[us][j]
	          if (square & 0x88) continue
	
	          if (board[square] != null && board[square].color === them) {
	            add_move(board, moves, i, square, BITS.CAPTURE)
	          } else if (square === ep_square) {
	            add_move(board, moves, i, ep_square, BITS.EP_CAPTURE)
	          }
	        }
	      } else {
	        for (var j = 0, len = PIECE_OFFSETS[piece.type].length; j < len; j++) {
	          var offset = PIECE_OFFSETS[piece.type][j]
	          var square = i
	
	          while (true) {
	            square += offset
	            if (square & 0x88) break
	
	            if (board[square] == null) {
	              add_move(board, moves, i, square, BITS.NORMAL)
	            } else {
	              if (board[square].color === us) break
	              add_move(board, moves, i, square, BITS.CAPTURE)
	              break
	            }
	
	            /* break, if knight or king */
	            if (piece.type === 'n' || piece.type === 'k') break
	          }
	        }
	      }
	    }
	
	    /* check for castling if: a) we're generating all moves, or b) we're doing
	     * single square move generation on the king's square
	     */
	    if (!single_square || last_sq === kings[us]) {
	      /* king-side castling */
	      if (castling[us] & BITS.KSIDE_CASTLE) {
	        var castling_from = kings[us]
	        var castling_to = castling_from + 2
	
	        if (
	          board[castling_from + 1] == null &&
	          board[castling_to] == null &&
	          !attacked(them, kings[us]) &&
	          !attacked(them, castling_from + 1) &&
	          !attacked(them, castling_to)
	        ) {
	          add_move(board, moves, kings[us], castling_to, BITS.KSIDE_CASTLE)
	        }
	      }
	
	      /* queen-side castling */
	      if (castling[us] & BITS.QSIDE_CASTLE) {
	        var castling_from = kings[us]
	        var castling_to = castling_from - 2
	
	        if (
	          board[castling_from - 1] == null &&
	          board[castling_from - 2] == null &&
	          board[castling_from - 3] == null &&
	          !attacked(them, kings[us]) &&
	          !attacked(them, castling_from - 1) &&
	          !attacked(them, castling_to)
	        ) {
	          add_move(board, moves, kings[us], castling_to, BITS.QSIDE_CASTLE)
	        }
	      }
	    }
	
	    /* return all pseudo-legal moves (this includes moves that allow the king
	     * to be captured)
	     */
	    if (!legal) {
	      return moves
	    }
	
	    /* filter out illegal moves */
	    var legal_moves = []
	    for (var i = 0, len = moves.length; i < len; i++) {
	      make_move(moves[i])
	      if (!king_attacked(us)) {
	        legal_moves.push(moves[i])
	      }
	      undo_move()
	    }
	
	    return legal_moves
	  }
	
	  /* convert a move from 0x88 coordinates to Standard Algebraic Notation
	   * (SAN)
	   *
	   * @param {boolean} sloppy Use the sloppy SAN generator to work around over
	   * disambiguation bugs in Fritz and Chessbase.  See below:
	   *
	   * r1bqkbnr/ppp2ppp/2n5/1B1pP3/4P3/8/PPPP2PP/RNBQK1NR b KQkq - 2 4
	   * 4. ... Nge7 is overly disambiguated because the knight on c6 is pinned
	   * 4. ... Ne7 is technically the valid SAN
	   */
	  function move_to_san(move, sloppy) {
	    var output = ''
	
	    if (move.flags & BITS.KSIDE_CASTLE) {
	      output = 'O-O'
	    } else if (move.flags & BITS.QSIDE_CASTLE) {
	      output = 'O-O-O'
	    } else {
	      var disambiguator = get_disambiguator(move, sloppy)
	
	      if (move.piece !== PAWN) {
	        output += move.piece.toUpperCase() + disambiguator
	      }
	
	      if (move.flags & (BITS.CAPTURE | BITS.EP_CAPTURE)) {
	        if (move.piece === PAWN) {
	          output += algebraic(move.from)[0]
	        }
	        output += 'x'
	      }
	
	      output += algebraic(move.to)
	
	      if (move.flags & BITS.PROMOTION) {
	        output += '=' + move.promotion.toUpperCase()
	      }
	    }
	
	    make_move(move)
	    if (in_check()) {
	      if (in_checkmate()) {
	        output += '#'
	      } else {
	        output += '+'
	      }
	    }
	    undo_move()
	
	    return output
	  }
	
	  // parses all of the decorators out of a SAN string
	  function stripped_san(move) {
	    return move.replace(/=/, '').replace(/[+#]?[?!]*$/, '')
	  }
	
	  function attacked(color, square) {
	    for (var i = SQUARES.a8; i <= SQUARES.h1; i++) {
	      /* did we run off the end of the board */
	      if (i & 0x88) {
	        i += 7
	        continue
	      }
	
	      /* if empty square or wrong color */
	      if (board[i] == null || board[i].color !== color) continue
	
	      var piece = board[i]
	      var difference = i - square
	      var index = difference + 119
	
	      if (ATTACKS[index] & (1 << SHIFTS[piece.type])) {
	        if (piece.type === PAWN) {
	          if (difference > 0) {
	            if (piece.color === WHITE) return true
	          } else {
	            if (piece.color === BLACK) return true
	          }
	          continue
	        }
	
	        /* if the piece is a knight or a king */
	        if (piece.type === 'n' || piece.type === 'k') return true
	
	        var offset = RAYS[index]
	        var j = i + offset
	
	        var blocked = false
	        while (j !== square) {
	          if (board[j] != null) {
	            blocked = true
	            break
	          }
	          j += offset
	        }
	
	        if (!blocked) return true
	      }
	    }
	
	    return false
	  }
	
	  function king_attacked(color) {
	    return attacked(swap_color(color), kings[color])
	  }
	
	  function in_check() {
	    return king_attacked(turn)
	  }
	
	  function in_checkmate() {
	    return in_check() && generate_moves().length === 0
	  }
	
	  function in_stalemate() {
	    return !in_check() && generate_moves().length === 0
	  }
	
	  function insufficient_material() {
	    var pieces = {}
	    var bishops = []
	    var num_pieces = 0
	    var sq_color = 0
	
	    for (var i = SQUARES.a8; i <= SQUARES.h1; i++) {
	      sq_color = (sq_color + 1) % 2
	      if (i & 0x88) {
	        i += 7
	        continue
	      }
	
	      var piece = board[i]
	      if (piece) {
	        pieces[piece.type] = piece.type in pieces ? pieces[piece.type] + 1 : 1
	        if (piece.type === BISHOP) {
	          bishops.push(sq_color)
	        }
	        num_pieces++
	      }
	    }
	
	    /* k vs. k */
	    if (num_pieces === 2) {
	      return true
	    } else if (
	      /* k vs. kn .... or .... k vs. kb */
	      num_pieces === 3 &&
	      (pieces[BISHOP] === 1 || pieces[KNIGHT] === 1)
	    ) {
	      return true
	    } else if (num_pieces === pieces[BISHOP] + 2) {
	      /* kb vs. kb where any number of bishops are all on the same color */
	      var sum = 0
	      var len = bishops.length
	      for (var i = 0; i < len; i++) {
	        sum += bishops[i]
	      }
	      if (sum === 0 || sum === len) {
	        return true
	      }
	    }
	
	    return false
	  }
	
	  function in_threefold_repetition() {
	    /* TODO: while this function is fine for casual use, a better
	     * implementation would use a Zobrist key (instead of FEN). the
	     * Zobrist key would be maintained in the make_move/undo_move functions,
	     * avoiding the costly that we do below.
	     */
	    var moves = []
	    var positions = {}
	    var repetition = false
	
	    while (true) {
	      var move = undo_move()
	      if (!move) break
	      moves.push(move)
	    }
	
	    while (true) {
	      /* remove the last two fields in the FEN string, they're not needed
	       * when checking for draw by rep */
	      var fen = generate_fen()
	        .split(' ')
	        .slice(0, 4)
	        .join(' ')
	
	      /* has the position occurred three or move times */
	      positions[fen] = fen in positions ? positions[fen] + 1 : 1
	      if (positions[fen] >= 3) {
	        repetition = true
	      }
	
	      if (!moves.length) {
	        break
	      }
	      make_move(moves.pop())
	    }
	
	    return repetition
	  }
	
	  function push(move) {
	    history.push({
	      move: move,
	      kings: { b: kings.b, w: kings.w },
	      turn: turn,
	      castling: { b: castling.b, w: castling.w },
	      ep_square: ep_square,
	      half_moves: half_moves,
	      move_number: move_number
	    })
	  }
	
	  function make_move(move) {
	    var us = turn
	    var them = swap_color(us)
	    push(move)
	
	    board[move.to] = board[move.from]
	    board[move.from] = null
	
	    /* if ep capture, remove the captured pawn */
	    if (move.flags & BITS.EP_CAPTURE) {
	      if (turn === BLACK) {
	        board[move.to - 16] = null
	      } else {
	        board[move.to + 16] = null
	      }
	    }
	
	    /* if pawn promotion, replace with new piece */
	    if (move.flags & BITS.PROMOTION) {
	      board[move.to] = { type: move.promotion, color: us }
	    }
	
	    /* if we moved the king */
	    if (board[move.to].type === KING) {
	      kings[board[move.to].color] = move.to
	
	      /* if we castled, move the rook next to the king */
	      if (move.flags & BITS.KSIDE_CASTLE) {
	        var castling_to = move.to - 1
	        var castling_from = move.to + 1
	        board[castling_to] = board[castling_from]
	        board[castling_from] = null
	      } else if (move.flags & BITS.QSIDE_CASTLE) {
	        var castling_to = move.to + 1
	        var castling_from = move.to - 2
	        board[castling_to] = board[castling_from]
	        board[castling_from] = null
	      }
	
	      /* turn off castling */
	      castling[us] = ''
	    }
	
	    /* turn off castling if we move a rook */
	    if (castling[us]) {
	      for (var i = 0, len = ROOKS[us].length; i < len; i++) {
	        if (
	          move.from === ROOKS[us][i].square &&
	          castling[us] & ROOKS[us][i].flag
	        ) {
	          castling[us] ^= ROOKS[us][i].flag
	          break
	        }
	      }
	    }
	
	    /* turn off castling if we capture a rook */
	    if (castling[them]) {
	      for (var i = 0, len = ROOKS[them].length; i < len; i++) {
	        if (
	          move.to === ROOKS[them][i].square &&
	          castling[them] & ROOKS[them][i].flag
	        ) {
	          castling[them] ^= ROOKS[them][i].flag
	          break
	        }
	      }
	    }
	
	    /* if big pawn move, update the en passant square */
	    if (move.flags & BITS.BIG_PAWN) {
	      if (turn === 'b') {
	        ep_square = move.to - 16
	      } else {
	        ep_square = move.to + 16
	      }
	    } else {
	      ep_square = EMPTY
	    }
	
	    /* reset the 50 move counter if a pawn is moved or a piece is captured */
	    if (move.piece === PAWN) {
	      half_moves = 0
	    } else if (move.flags & (BITS.CAPTURE | BITS.EP_CAPTURE)) {
	      half_moves = 0
	    } else {
	      half_moves++
	    }
	
	    if (turn === BLACK) {
	      move_number++
	    }
	    turn = swap_color(turn)
	  }
	
	  function undo_move() {
	    var old = history.pop()
	    if (old == null) {
	      return null
	    }
	
	    var move = old.move
	    kings = old.kings
	    turn = old.turn
	    castling = old.castling
	    ep_square = old.ep_square
	    half_moves = old.half_moves
	    move_number = old.move_number
	
	    var us = turn
	    var them = swap_color(turn)
	
	    board[move.from] = board[move.to]
	    board[move.from].type = move.piece // to undo any promotions
	    board[move.to] = null
	
	    if (move.flags & BITS.CAPTURE) {
	      board[move.to] = { type: move.captured, color: them }
	    } else if (move.flags & BITS.EP_CAPTURE) {
	      var index
	      if (us === BLACK) {
	        index = move.to - 16
	      } else {
	        index = move.to + 16
	      }
	      board[index] = { type: PAWN, color: them }
	    }
	
	    if (move.flags & (BITS.KSIDE_CASTLE | BITS.QSIDE_CASTLE)) {
	      var castling_to, castling_from
	      if (move.flags & BITS.KSIDE_CASTLE) {
	        castling_to = move.to + 1
	        castling_from = move.to - 1
	      } else if (move.flags & BITS.QSIDE_CASTLE) {
	        castling_to = move.to - 2
	        castling_from = move.to + 1
	      }
	
	      board[castling_to] = board[castling_from]
	      board[castling_from] = null
	    }
	
	    return move
	  }
	
	  /* this function is used to uniquely identify ambiguous moves */
	  function get_disambiguator(move, sloppy) {
	    var moves = generate_moves({ legal: !sloppy })
	
	    var from = move.from
	    var to = move.to
	    var piece = move.piece
	
	    var ambiguities = 0
	    var same_rank = 0
	    var same_file = 0
	
	    for (var i = 0, len = moves.length; i < len; i++) {
	      var ambig_from = moves[i].from
	      var ambig_to = moves[i].to
	      var ambig_piece = moves[i].piece
	
	      /* if a move of the same piece type ends on the same to square, we'll
	       * need to add a disambiguator to the algebraic notation
	       */
	      if (piece === ambig_piece && from !== ambig_from && to === ambig_to) {
	        ambiguities++
	
	        if (rank(from) === rank(ambig_from)) {
	          same_rank++
	        }
	
	        if (file(from) === file(ambig_from)) {
	          same_file++
	        }
	      }
	    }
	
	    if (ambiguities > 0) {
	      /* if there exists a similar moving piece on the same rank and file as
	       * the move in question, use the square as the disambiguator
	       */
	      if (same_rank > 0 && same_file > 0) {
	        return algebraic(from)
	      } else if (same_file > 0) {
	        /* if the moving piece rests on the same file, use the rank symbol as the
	         * disambiguator
	         */
	        return algebraic(from).charAt(1)
	      } else {
	        /* else use the file symbol */
	        return algebraic(from).charAt(0)
	      }
	    }
	
	    return ''
	  }
	
	  function ascii() {
	    var s = '   +------------------------+\n'
	    for (var i = SQUARES.a8; i <= SQUARES.h1; i++) {
	      /* display the rank */
	      if (file(i) === 0) {
	        s += ' ' + '87654321'[rank(i)] + ' |'
	      }
	
	      /* empty piece */
	      if (board[i] == null) {
	        s += ' . '
	      } else {
	        var piece = board[i].type
	        var color = board[i].color
	        var symbol = color === WHITE ? piece.toUpperCase() : piece.toLowerCase()
	        s += ' ' + symbol + ' '
	      }
	
	      if ((i + 1) & 0x88) {
	        s += '|\n'
	        i += 8
	      }
	    }
	    s += '   +------------------------+\n'
	    s += '     a  b  c  d  e  f  g  h\n'
	
	    return s
	  }
	
	  // convert a move from Standard Algebraic Notation (SAN) to 0x88 coordinates
	  function move_from_san(move, sloppy) {
	    // strip off any move decorations: e.g Nf3+?!
	    var clean_move = stripped_san(move)
	
	    // if we're using the sloppy parser run a regex to grab piece, to, and from
	    // this should parse invalid SAN like: Pe2-e4, Rc1c4, Qf3xf7
	    if (sloppy) {
	      var matches = clean_move.match(
	        /([pnbrqkPNBRQK])?([a-h][1-8])x?-?([a-h][1-8])([qrbnQRBN])?/
	      )
	      if (matches) {
	        var piece = matches[1]
	        var from = matches[2]
	        var to = matches[3]
	        var promotion = matches[4]
	      }
	    }
	
	    var moves = generate_moves()
	    for (var i = 0, len = moves.length; i < len; i++) {
	      // try the strict parser first, then the sloppy parser if requested
	      // by the user
	      if (
	        clean_move === stripped_san(move_to_san(moves[i])) ||
	        (sloppy && clean_move === stripped_san(move_to_san(moves[i], true)))
	      ) {
	        return moves[i]
	      } else {
	        if (
	          matches &&
	          (!piece || piece.toLowerCase() == moves[i].piece) &&
	          SQUARES[from] == moves[i].from &&
	          SQUARES[to] == moves[i].to &&
	          (!promotion || promotion.toLowerCase() == moves[i].promotion)
	        ) {
	          return moves[i]
	        }
	      }
	    }
	
	    return null
	  }
	
	  /*****************************************************************************
	   * UTILITY FUNCTIONS
	   ****************************************************************************/
	  function rank(i) {
	    return i >> 4
	  }
	
	  function file(i) {
	    return i & 15
	  }
	
	  function algebraic(i) {
	    var f = file(i),
	      r = rank(i)
	    return 'abcdefgh'.substring(f, f + 1) + '87654321'.substring(r, r + 1)
	  }
	
	  function swap_color(c) {
	    return c === WHITE ? BLACK : WHITE
	  }
	
	  function is_digit(c) {
	    return '0123456789'.indexOf(c) !== -1
	  }
	
	  /* pretty = external move object */
	  function make_pretty(ugly_move) {
	    var move = clone(ugly_move)
	    move.san = move_to_san(move, false)
	    move.to = algebraic(move.to)
	    move.from = algebraic(move.from)
	
	    var flags = ''
	
	    for (var flag in BITS) {
	      if (BITS[flag] & move.flags) {
	        flags += FLAGS[flag]
	      }
	    }
	    move.flags = flags
	
	    return move
	  }
	
	  function clone(obj) {
	    var dupe = obj instanceof Array ? [] : {}
	
	    for (var property in obj) {
	      if (typeof property === 'object') {
	        dupe[property] = clone(obj[property])
	      } else {
	        dupe[property] = obj[property]
	      }
	    }
	
	    return dupe
	  }
	
	  function trim(str) {
	    return str.replace(/^\s+|\s+$/g, '')
	  }
	
	  /*****************************************************************************
	   * DEBUGGING UTILITIES
	   ****************************************************************************/
	  function perft(depth) {
	    var moves = generate_moves({ legal: false })
	    var nodes = 0
	    var color = turn
	
	    for (var i = 0, len = moves.length; i < len; i++) {
	      make_move(moves[i])
	      if (!king_attacked(color)) {
	        if (depth - 1 > 0) {
	          var child_nodes = perft(depth - 1)
	          nodes += child_nodes
	        } else {
	          nodes++
	        }
	      }
	      undo_move()
	    }
	
	    return nodes
	  }
	
	  return {
	    /***************************************************************************
	     * PUBLIC CONSTANTS (is there a better way to do this?)
	     **************************************************************************/
	    WHITE: WHITE,
	    BLACK: BLACK,
	    PAWN: PAWN,
	    KNIGHT: KNIGHT,
	    BISHOP: BISHOP,
	    ROOK: ROOK,
	    QUEEN: QUEEN,
	    KING: KING,
	    SQUARES: (function() {
	      /* from the ECMA-262 spec (section 12.6.4):
	       * "The mechanics of enumerating the properties ... is
	       * implementation dependent"
	       * so: for (var sq in SQUARES) { keys.push(sq); } might not be
	       * ordered correctly
	       */
	      var keys = []
	      for (var i = SQUARES.a8; i <= SQUARES.h1; i++) {
	        if (i & 0x88) {
	          i += 7
	          continue
	        }
	        keys.push(algebraic(i))
	      }
	      return keys
	    })(),
	    FLAGS: FLAGS,
	
	    /***************************************************************************
	     * PUBLIC API
	     **************************************************************************/
	    load: function(fen) {
	      return load(fen)
	    },
	
	    reset: function() {
	      return reset()
	    },
	
	    moves: function(options) {
	      /* The internal representation of a chess move is in 0x88 format, and
	       * not meant to be human-readable.  The code below converts the 0x88
	       * square coordinates to algebraic coordinates.  It also prunes an
	       * unnecessary move keys resulting from a verbose call.
	       */
	
	      var ugly_moves = generate_moves(options)
	      var moves = []
	
	      for (var i = 0, len = ugly_moves.length; i < len; i++) {
	        /* does the user want a full move object (most likely not), or just
	         * SAN
	         */
	        if (
	          typeof options !== 'undefined' &&
	          'verbose' in options &&
	          options.verbose
	        ) {
	          moves.push(make_pretty(ugly_moves[i]))
	        } else {
	          moves.push(move_to_san(ugly_moves[i], false))
	        }
	      }
	
	      return moves
	    },
	
	    in_check: function() {
	      return in_check()
	    },
	
	    in_checkmate: function() {
	      return in_checkmate()
	    },
	
	    in_stalemate: function() {
	      return in_stalemate()
	    },
	
	    in_draw: function() {
	      return (
	        half_moves >= 100 ||
	        in_stalemate() ||
	        insufficient_material() ||
	        in_threefold_repetition()
	      )
	    },
	
	    insufficient_material: function() {
	      return insufficient_material()
	    },
	
	    in_threefold_repetition: function() {
	      return in_threefold_repetition()
	    },
	
	    game_over: function() {
	      return (
	        half_moves >= 100 ||
	        in_checkmate() ||
	        in_stalemate() ||
	        insufficient_material() ||
	        in_threefold_repetition()
	      )
	    },
	
	    validate_fen: function(fen) {
	      return validate_fen(fen)
	    },
	
	    fen: function() {
	      return generate_fen()
	    },
	
	    board: function() {
	      var output = [],
	        row = []
	
	      for (var i = SQUARES.a8; i <= SQUARES.h1; i++) {
	        if (board[i] == null) {
	          row.push(null)
	        } else {
	          row.push({ type: board[i].type, color: board[i].color })
	        }
	        if ((i + 1) & 0x88) {
	          output.push(row)
	          row = []
	          i += 8
	        }
	      }
	
	      return output
	    },
	
	    pgn: function(options) {
	      /* using the specification from http://www.chessclub.com/help/PGN-spec
	       * example for html usage: .pgn({ max_width: 72, newline_char: "<br />" })
	       */
	      var newline =
	        typeof options === 'object' && typeof options.newline_char === 'string'
	          ? options.newline_char
	          : '\n'
	      var max_width =
	        typeof options === 'object' && typeof options.max_width === 'number'
	          ? options.max_width
	          : 0
	      var result = []
	      var header_exists = false
	
	      /* add the PGN header headerrmation */
	      for (var i in header) {
	        /* TODO: order of enumerated properties in header object is not
	         * guaranteed, see ECMA-262 spec (section 12.6.4)
	         */
	        result.push('[' + i + ' "' + header[i] + '"]' + newline)
	        header_exists = true
	      }
	
	      if (header_exists && history.length) {
	        result.push(newline)
	      }
	
	      /* pop all of history onto reversed_history */
	      var reversed_history = []
	      while (history.length > 0) {
	        reversed_history.push(undo_move())
	      }
	
	      var moves = []
	      var move_string = ''
	
	      /* build the list of moves.  a move_string looks like: "3. e3 e6" */
	      while (reversed_history.length > 0) {
	        var move = reversed_history.pop()
	
	        /* if the position started with black to move, start PGN with 1. ... */
	        if (!history.length && move.color === 'b') {
	          move_string = move_number + '. ...'
	        } else if (move.color === 'w') {
	          /* store the previous generated move_string if we have one */
	          if (move_string.length) {
	            moves.push(move_string)
	          }
	          move_string = move_number + '.'
	        }
	
	        move_string = move_string + ' ' + move_to_san(move, false)
	        make_move(move)
	      }
	
	      /* are there any other leftover moves? */
	      if (move_string.length) {
	        moves.push(move_string)
	      }
	
	      /* is there a result? */
	      if (typeof header.Result !== 'undefined') {
	        moves.push(header.Result)
	      }
	
	      /* history should be back to what is was before we started generating PGN,
	       * so join together moves
	       */
	      if (max_width === 0) {
	        return result.join('') + moves.join(' ')
	      }
	
	      /* wrap the PGN output at max_width */
	      var current_width = 0
	      for (var i = 0; i < moves.length; i++) {
	        /* if the current move will push past max_width */
	        if (current_width + moves[i].length > max_width && i !== 0) {
	          /* don't end the line with whitespace */
	          if (result[result.length - 1] === ' ') {
	            result.pop()
	          }
	
	          result.push(newline)
	          current_width = 0
	        } else if (i !== 0) {
	          result.push(' ')
	          current_width++
	        }
	        result.push(moves[i])
	        current_width += moves[i].length
	      }
	
	      return result.join('')
	    },
	
	    load_pgn: function(pgn, options) {
	      // allow the user to specify the sloppy move parser to work around over
	      // disambiguation bugs in Fritz and Chessbase
	      var sloppy =
	        typeof options !== 'undefined' && 'sloppy' in options
	          ? options.sloppy
	          : false
	
	      function mask(str) {
	        return str.replace(/\\/g, '\\')
	      }
	
	      function has_keys(object) {
	        for (var key in object) {
	          return true
	        }
	        return false
	      }
	
	      function parse_pgn_header(header, options) {
	        var newline_char =
	          typeof options === 'object' &&
	          typeof options.newline_char === 'string'
	            ? options.newline_char
	            : '\r?\n'
	        var header_obj = {}
	        var headers = header.split(new RegExp(mask(newline_char)))
	        var key = ''
	        var value = ''
	
	        for (var i = 0; i < headers.length; i++) {
	          key = headers[i].replace(/^\[([A-Z][A-Za-z]*)\s.*\]$/, '$1')
	          value = headers[i].replace(/^\[[A-Za-z]+\s"(.*)"\]$/, '$1')
	          if (trim(key).length > 0) {
	            header_obj[key] = value
	          }
	        }
	
	        return header_obj
	      }
	
	      var newline_char =
	        typeof options === 'object' && typeof options.newline_char === 'string'
	          ? options.newline_char
	          : '\r?\n'
	
	      // RegExp to split header. Takes advantage of the fact that header and movetext
	      // will always have a blank line between them (ie, two newline_char's).
	      // With default newline_char, will equal: /^(\[((?:\r?\n)|.)*\])(?:\r?\n){2}/
	      var header_regex = new RegExp(
	        '^(\\[((?:' +
	          mask(newline_char) +
	          ')|.)*\\])' +
	          '(?:' +
	          mask(newline_char) +
	          '){2}'
	      )
	
	      // If no header given, begin with moves.
	      var header_string = header_regex.test(pgn)
	        ? header_regex.exec(pgn)[1]
	        : ''
	
	      // Put the board in the starting position
	      reset()
	
	      /* parse PGN header */
	      var headers = parse_pgn_header(header_string, options)
	      for (var key in headers) {
	        set_header([key, headers[key]])
	      }
	
	      /* load the starting position indicated by [Setup '1'] and
	       * [FEN position] */
	      if (headers['SetUp'] === '1') {
	        if (!('FEN' in headers && load(headers['FEN'], true))) {
	          // second argument to load: don't clear the headers
	          return false
	        }
	      }
	
	      /* delete header to get the moves */
	      var ms = pgn
	        .replace(header_string, '')
	        .replace(new RegExp(mask(newline_char), 'g'), ' ')
	
	      /* delete comments */
	      ms = ms.replace(/(\{[^}]+\})+?/g, '')
	
	      /* delete recursive annotation variations */
	      var rav_regex = /(\([^\(\)]+\))+?/g
	      while (rav_regex.test(ms)) {
	        ms = ms.replace(rav_regex, '')
	      }
	
	      /* delete move numbers */
	      ms = ms.replace(/\d+\.(\.\.)?/g, '')
	
	      /* delete ... indicating black to move */
	      ms = ms.replace(/\.\.\./g, '')
	
	      /* delete numeric annotation glyphs */
	      ms = ms.replace(/\$\d+/g, '')
	
	      /* trim and get array of moves */
	      var moves = trim(ms).split(new RegExp(/\s+/))
	
	      /* delete empty entries */
	      moves = moves
	        .join(',')
	        .replace(/,,+/g, ',')
	        .split(',')
	      var move = ''
	
	      for (var half_move = 0; half_move < moves.length - 1; half_move++) {
	        move = move_from_san(moves[half_move], sloppy)
	
	        /* move not possible! (don't clear the board to examine to show the
	         * latest valid position)
	         */
	        if (move == null) {
	          return false
	        } else {
	          make_move(move)
	        }
	      }
	
	      /* examine last move */
	      move = moves[moves.length - 1]
	      if (POSSIBLE_RESULTS.indexOf(move) > -1) {
	        if (has_keys(header) && typeof header.Result === 'undefined') {
	          set_header(['Result', move])
	        }
	      } else {
	        move = move_from_san(move, sloppy)
	        if (move == null) {
	          return false
	        } else {
	          make_move(move)
	        }
	      }
	      return true
	    },
	
	    header: function() {
	      return set_header(arguments)
	    },
	
	    ascii: function() {
	      return ascii()
	    },
	
	    turn: function() {
	      return turn
	    },
	
	    move: function(move, options) {
	      /* The move function can be called with in the following parameters:
	       *
	       * .move('Nxb7')      <- where 'move' is a case-sensitive SAN string
	       *
	       * .move({ from: 'h7', <- where the 'move' is a move object (additional
	       *         to :'h8',      fields are ignored)
	       *         promotion: 'q',
	       *      })
	       */
	
	      // allow the user to specify the sloppy move parser to work around over
	      // disambiguation bugs in Fritz and Chessbase
	      var sloppy =
	        typeof options !== 'undefined' && 'sloppy' in options
	          ? options.sloppy
	          : false
	
	      var move_obj = null
	
	      if (typeof move === 'string') {
	        move_obj = move_from_san(move, sloppy)
	      } else if (typeof move === 'object') {
	        var moves = generate_moves()
	
	        /* convert the pretty move object to an ugly move object */
	        for (var i = 0, len = moves.length; i < len; i++) {
	          if (
	            move.from === algebraic(moves[i].from) &&
	            move.to === algebraic(moves[i].to) &&
	            (!('promotion' in moves[i]) ||
	              move.promotion === moves[i].promotion)
	          ) {
	            move_obj = moves[i]
	            break
	          }
	        }
	      }
	
	      /* failed to find move */
	      if (!move_obj) {
	        return null
	      }
	
	      /* need to make a copy of move because we can't generate SAN after the
	       * move is made
	       */
	      var pretty_move = make_pretty(move_obj)
	
	      make_move(move_obj)
	
	      return pretty_move
	    },
	
	    undo: function() {
	      var move = undo_move()
	      return move ? make_pretty(move) : null
	    },
	
	    clear: function() {
	      return clear()
	    },
	
	    put: function(piece, square) {
	      return put(piece, square)
	    },
	
	    get: function(square) {
	      return get(square)
	    },
	
	    remove: function(square) {
	      return remove(square)
	    },
	
	    perft: function(depth) {
	      return perft(depth)
	    },
	
	    square_color: function(square) {
	      if (square in SQUARES) {
	        var sq_0x88 = SQUARES[square]
	        return (rank(sq_0x88) + file(sq_0x88)) % 2 === 0 ? 'light' : 'dark'
	      }
	
	      return null
	    },
	
	    history: function(options) {
	      var reversed_history = []
	      var move_history = []
	      var verbose =
	        typeof options !== 'undefined' &&
	        'verbose' in options &&
	        options.verbose
	
	      while (history.length > 0) {
	        reversed_history.push(undo_move())
	      }
	
	      while (reversed_history.length > 0) {
	        var move = reversed_history.pop()
	        if (verbose) {
	          move_history.push(make_pretty(move))
	        } else {
	          move_history.push(move_to_san(move))
	        }
	        make_move(move)
	      }
	
	      return move_history
	    }
	  }
	}
	
	/* export Chess object if using node or any other CommonJS compatible
	 * environment */
	if (true) exports.Chess = Chess
	/* export Chess object for any RequireJS compatible environment */
	if (true)
	  !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	    return Chess
	  }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

	var io = __webpack_require__(113);
	var uuid = __webpack_require__(166);
	
	var shhFactory = function(uri, next) {
	  var instance = {
	    watchers: {},
	
	    connect: function(uri) {
	      this.socket = io.connect(uri);
	    },
	
	    newIdentity: function() {
	      this.identity = '0x' + uuid.v4().replace(/\-/g, '').substr(0,20);
	      this.socket.emit('register', {address: this.identity});
	      return this.identity;
	    },
	
	    register: function(identity) {
	      this.socket.emit('register', {address: identity});
	    },
	
	    post: function(options) {
	      if (typeof options.topic != 'undefined') {
	        options.topic = options.topic.join('');
	      }
	      this.socket.emit('send', options);
	    },
	
	    watch: function(options) {
	      var topic = '';
	      if (typeof options.topic != 'undefined') {
	        topic = options.topic.join('');
	      }
	      var ev = {
	        arrived: function(fun){
	          if (typeof instance.watchers[this.topic] == 'undefined') {
	            instance.watchers[this.topic] = [fun];
	          } else {
	            instance.watchers[this.topic].push(fun);
	          }  
	        },
	        remove: function() {
	          if (typeof instance.watchers[this.topic] != 'undefined') {
	            delete instance.watchers[this.topic];
	          }
	        }
	      };
	      ev.topic = topic;
	      return ev;
	    },
	
	    arrivedTopic: function(topic, data) {
	      if (typeof this.watchers[topic] == 'undefined') {
	        // Message for not-watched topic.
	        return;
	      }
	      this.watchers[topic].forEach(function(watcher) {
	        watcher(data);
	      });
	    }
	  };
	  instance.connect(uri);
	  instance.socket.on('connect', function() {
	    if (typeof next == 'function') {
	      next(instance);
	    }
	  });
	  instance.socket.on('receive', function(data) {
	    instance.arrivedTopic(data.topic, data);
	  });
	  return instance;
	};
	
	module.exports = shhFactory;

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

	
	/**
	 * Module dependencies.
	 */
	
	var url = __webpack_require__(114);
	var parser = __webpack_require__(120);
	var Manager = __webpack_require__(130);
	var debug = __webpack_require__(116)('socket.io-client');
	
	/**
	 * Module exports.
	 */
	
	module.exports = exports = lookup;
	
	/**
	 * Managers cache.
	 */
	
	var cache = exports.managers = {};
	
	/**
	 * Looks up an existing `Manager` for multiplexing.
	 * If the user summons:
	 *
	 *   `io('http://localhost/a');`
	 *   `io('http://localhost/b');`
	 *
	 * We reuse the existing instance based on same scheme/port/host,
	 * and we initialize sockets for each namespace.
	 *
	 * @api public
	 */
	
	function lookup (uri, opts) {
	  if (typeof uri === 'object') {
	    opts = uri;
	    uri = undefined;
	  }
	
	  opts = opts || {};
	
	  var parsed = url(uri);
	  var source = parsed.source;
	  var id = parsed.id;
	  var path = parsed.path;
	  var sameNamespace = cache[id] && path in cache[id].nsps;
	  var newConnection = opts.forceNew || opts['force new connection'] ||
	                      false === opts.multiplex || sameNamespace;
	
	  var io;
	
	  if (newConnection) {
	    debug('ignoring socket cache for %s', source);
	    io = Manager(source, opts);
	  } else {
	    if (!cache[id]) {
	      debug('new io instance for %s', source);
	      cache[id] = Manager(source, opts);
	    }
	    io = cache[id];
	  }
	  if (parsed.query && !opts.query) {
	    opts.query = parsed.query;
	  } else if (opts && 'object' === typeof opts.query) {
	    opts.query = encodeQueryString(opts.query);
	  }
	  return io.socket(parsed.path, opts);
	}
	/**
	 *  Helper method to parse query objects to string.
	 * @param {object} query
	 * @returns {string}
	 */
	function encodeQueryString (obj) {
	  var str = [];
	  for (var p in obj) {
	    if (obj.hasOwnProperty(p)) {
	      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
	    }
	  }
	  return str.join('&');
	}
	/**
	 * Protocol version.
	 *
	 * @api public
	 */
	
	exports.protocol = parser.protocol;
	
	/**
	 * `connect`.
	 *
	 * @param {String} uri
	 * @api public
	 */
	
	exports.connect = lookup;
	
	/**
	 * Expose constructors for standalone build.
	 *
	 * @api public
	 */
	
	exports.Manager = __webpack_require__(130);
	exports.Socket = __webpack_require__(160);


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {
	/**
	 * Module dependencies.
	 */
	
	var parseuri = __webpack_require__(115);
	var debug = __webpack_require__(116)('socket.io-client:url');
	
	/**
	 * Module exports.
	 */
	
	module.exports = url;
	
	/**
	 * URL parser.
	 *
	 * @param {String} url
	 * @param {Object} An object meant to mimic window.location.
	 *                 Defaults to window.location.
	 * @api public
	 */
	
	function url (uri, loc) {
	  var obj = uri;
	
	  // default to window.location
	  loc = loc || global.location;
	  if (null == uri) uri = loc.protocol + '//' + loc.host;
	
	  // relative path support
	  if ('string' === typeof uri) {
	    if ('/' === uri.charAt(0)) {
	      if ('/' === uri.charAt(1)) {
	        uri = loc.protocol + uri;
	      } else {
	        uri = loc.host + uri;
	      }
	    }
	
	    if (!/^(https?|wss?):\/\//.test(uri)) {
	      debug('protocol-less url %s', uri);
	      if ('undefined' !== typeof loc) {
	        uri = loc.protocol + '//' + uri;
	      } else {
	        uri = 'https://' + uri;
	      }
	    }
	
	    // parse
	    debug('parse %s', uri);
	    obj = parseuri(uri);
	  }
	
	  // make sure we treat `localhost:80` and `localhost` equally
	  if (!obj.port) {
	    if (/^(http|ws)$/.test(obj.protocol)) {
	      obj.port = '80';
	    } else if (/^(http|ws)s$/.test(obj.protocol)) {
	      obj.port = '443';
	    }
	  }
	
	  obj.path = obj.path || '/';
	
	  var ipv6 = obj.host.indexOf(':') !== -1;
	  var host = ipv6 ? '[' + obj.host + ']' : obj.host;
	
	  // define unique id
	  obj.id = obj.protocol + '://' + host + ':' + obj.port;
	  // define href
	  obj.href = obj.protocol + '://' + host + (loc && loc.port === obj.port ? '' : (':' + obj.port));
	
	  return obj;
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 115 */
/***/ (function(module, exports) {

	/**
	 * Parses an URI
	 *
	 * @author Steven Levithan <stevenlevithan.com> (MIT license)
	 * @api private
	 */
	
	var re = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;
	
	var parts = [
	    'source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'anchor'
	];
	
	module.exports = function parseuri(str) {
	    var src = str,
	        b = str.indexOf('['),
	        e = str.indexOf(']');
	
	    if (b != -1 && e != -1) {
	        str = str.substring(0, b) + str.substring(b, e).replace(/:/g, ';') + str.substring(e, str.length);
	    }
	
	    var m = re.exec(str || ''),
	        uri = {},
	        i = 14;
	
	    while (i--) {
	        uri[parts[i]] = m[i] || '';
	    }
	
	    if (b != -1 && e != -1) {
	        uri.source = src;
	        uri.host = uri.host.substring(1, uri.host.length - 1).replace(/;/g, ':');
	        uri.authority = uri.authority.replace('[', '').replace(']', '').replace(/;/g, ':');
	        uri.ipv6uri = true;
	    }
	
	    return uri;
	};


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {
	/**
	 * This is the web browser implementation of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */
	
	exports = module.exports = __webpack_require__(118);
	exports.log = log;
	exports.formatArgs = formatArgs;
	exports.save = save;
	exports.load = load;
	exports.useColors = useColors;
	exports.storage = 'undefined' != typeof chrome
	               && 'undefined' != typeof chrome.storage
	                  ? chrome.storage.local
	                  : localstorage();
	
	/**
	 * Colors.
	 */
	
	exports.colors = [
	  'lightseagreen',
	  'forestgreen',
	  'goldenrod',
	  'dodgerblue',
	  'darkorchid',
	  'crimson'
	];
	
	/**
	 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
	 * and the Firebug extension (any Firefox version) are known
	 * to support "%c" CSS customizations.
	 *
	 * TODO: add a `localStorage` variable to explicitly enable/disable colors
	 */
	
	function useColors() {
	  // is webkit? http://stackoverflow.com/a/16459606/376773
	  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
	  return (typeof document !== 'undefined' && 'WebkitAppearance' in document.documentElement.style) ||
	    // is firebug? http://stackoverflow.com/a/398120/376773
	    (window.console && (console.firebug || (console.exception && console.table))) ||
	    // is firefox >= v31?
	    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
	    (navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31);
	}
	
	/**
	 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
	 */
	
	exports.formatters.j = function(v) {
	  try {
	    return JSON.stringify(v);
	  } catch (err) {
	    return '[UnexpectedJSONParseError]: ' + err.message;
	  }
	};
	
	
	/**
	 * Colorize log arguments if enabled.
	 *
	 * @api public
	 */
	
	function formatArgs() {
	  var args = arguments;
	  var useColors = this.useColors;
	
	  args[0] = (useColors ? '%c' : '')
	    + this.namespace
	    + (useColors ? ' %c' : ' ')
	    + args[0]
	    + (useColors ? '%c ' : ' ')
	    + '+' + exports.humanize(this.diff);
	
	  if (!useColors) return args;
	
	  var c = 'color: ' + this.color;
	  args = [args[0], c, 'color: inherit'].concat(Array.prototype.slice.call(args, 1));
	
	  // the final "%c" is somewhat tricky, because there could be other
	  // arguments passed either before or after the %c, so we need to
	  // figure out the correct index to insert the CSS into
	  var index = 0;
	  var lastC = 0;
	  args[0].replace(/%[a-z%]/g, function(match) {
	    if ('%%' === match) return;
	    index++;
	    if ('%c' === match) {
	      // we only are interested in the *last* %c
	      // (the user may have provided their own)
	      lastC = index;
	    }
	  });
	
	  args.splice(lastC, 0, c);
	  return args;
	}
	
	/**
	 * Invokes `console.log()` when available.
	 * No-op when `console.log` is not a "function".
	 *
	 * @api public
	 */
	
	function log() {
	  // this hackery is required for IE8/9, where
	  // the `console.log` function doesn't have 'apply'
	  return 'object' === typeof console
	    && console.log
	    && Function.prototype.apply.call(console.log, console, arguments);
	}
	
	/**
	 * Save `namespaces`.
	 *
	 * @param {String} namespaces
	 * @api private
	 */
	
	function save(namespaces) {
	  try {
	    if (null == namespaces) {
	      exports.storage.removeItem('debug');
	    } else {
	      exports.storage.debug = namespaces;
	    }
	  } catch(e) {}
	}
	
	/**
	 * Load `namespaces`.
	 *
	 * @return {String} returns the previously persisted debug modes
	 * @api private
	 */
	
	function load() {
	  var r;
	  try {
	    return exports.storage.debug;
	  } catch(e) {}
	
	  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
	  if (typeof process !== 'undefined' && 'env' in process) {
	    return process.env.DEBUG;
	  }
	}
	
	/**
	 * Enable namespaces listed in `localStorage.debug` initially.
	 */
	
	exports.enable(load());
	
	/**
	 * Localstorage attempts to return the localstorage.
	 *
	 * This is necessary because safari throws
	 * when a user disables cookies/localstorage
	 * and you attempt to access it.
	 *
	 * @return {LocalStorage}
	 * @api private
	 */
	
	function localstorage(){
	  try {
	    return window.localStorage;
	  } catch (e) {}
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(117)))

/***/ }),
/* 117 */
/***/ (function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	
	
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	
	
	
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	process.prependListener = noop;
	process.prependOnceListener = noop;
	
	process.listeners = function (name) { return [] }
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

	
	/**
	 * This is the common logic for both the Node.js and web browser
	 * implementations of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */
	
	exports = module.exports = debug.debug = debug;
	exports.coerce = coerce;
	exports.disable = disable;
	exports.enable = enable;
	exports.enabled = enabled;
	exports.humanize = __webpack_require__(119);
	
	/**
	 * The currently active debug mode names, and names to skip.
	 */
	
	exports.names = [];
	exports.skips = [];
	
	/**
	 * Map of special "%n" handling functions, for the debug "format" argument.
	 *
	 * Valid key names are a single, lowercased letter, i.e. "n".
	 */
	
	exports.formatters = {};
	
	/**
	 * Previously assigned color.
	 */
	
	var prevColor = 0;
	
	/**
	 * Previous log timestamp.
	 */
	
	var prevTime;
	
	/**
	 * Select a color.
	 *
	 * @return {Number}
	 * @api private
	 */
	
	function selectColor() {
	  return exports.colors[prevColor++ % exports.colors.length];
	}
	
	/**
	 * Create a debugger with the given `namespace`.
	 *
	 * @param {String} namespace
	 * @return {Function}
	 * @api public
	 */
	
	function debug(namespace) {
	
	  // define the `disabled` version
	  function disabled() {
	  }
	  disabled.enabled = false;
	
	  // define the `enabled` version
	  function enabled() {
	
	    var self = enabled;
	
	    // set `diff` timestamp
	    var curr = +new Date();
	    var ms = curr - (prevTime || curr);
	    self.diff = ms;
	    self.prev = prevTime;
	    self.curr = curr;
	    prevTime = curr;
	
	    // add the `color` if not set
	    if (null == self.useColors) self.useColors = exports.useColors();
	    if (null == self.color && self.useColors) self.color = selectColor();
	
	    var args = new Array(arguments.length);
	    for (var i = 0; i < args.length; i++) {
	      args[i] = arguments[i];
	    }
	
	    args[0] = exports.coerce(args[0]);
	
	    if ('string' !== typeof args[0]) {
	      // anything else let's inspect with %o
	      args = ['%o'].concat(args);
	    }
	
	    // apply any `formatters` transformations
	    var index = 0;
	    args[0] = args[0].replace(/%([a-z%])/g, function(match, format) {
	      // if we encounter an escaped % then don't increase the array index
	      if (match === '%%') return match;
	      index++;
	      var formatter = exports.formatters[format];
	      if ('function' === typeof formatter) {
	        var val = args[index];
	        match = formatter.call(self, val);
	
	        // now we need to remove `args[index]` since it's inlined in the `format`
	        args.splice(index, 1);
	        index--;
	      }
	      return match;
	    });
	
	    // apply env-specific formatting
	    args = exports.formatArgs.apply(self, args);
	
	    var logFn = enabled.log || exports.log || console.log.bind(console);
	    logFn.apply(self, args);
	  }
	  enabled.enabled = true;
	
	  var fn = exports.enabled(namespace) ? enabled : disabled;
	
	  fn.namespace = namespace;
	
	  return fn;
	}
	
	/**
	 * Enables a debug mode by namespaces. This can include modes
	 * separated by a colon and wildcards.
	 *
	 * @param {String} namespaces
	 * @api public
	 */
	
	function enable(namespaces) {
	  exports.save(namespaces);
	
	  var split = (namespaces || '').split(/[\s,]+/);
	  var len = split.length;
	
	  for (var i = 0; i < len; i++) {
	    if (!split[i]) continue; // ignore empty strings
	    namespaces = split[i].replace(/[\\^$+?.()|[\]{}]/g, '\\$&').replace(/\*/g, '.*?');
	    if (namespaces[0] === '-') {
	      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
	    } else {
	      exports.names.push(new RegExp('^' + namespaces + '$'));
	    }
	  }
	}
	
	/**
	 * Disable debug output.
	 *
	 * @api public
	 */
	
	function disable() {
	  exports.enable('');
	}
	
	/**
	 * Returns true if the given mode name is enabled, false otherwise.
	 *
	 * @param {String} name
	 * @return {Boolean}
	 * @api public
	 */
	
	function enabled(name) {
	  var i, len;
	  for (i = 0, len = exports.skips.length; i < len; i++) {
	    if (exports.skips[i].test(name)) {
	      return false;
	    }
	  }
	  for (i = 0, len = exports.names.length; i < len; i++) {
	    if (exports.names[i].test(name)) {
	      return true;
	    }
	  }
	  return false;
	}
	
	/**
	 * Coerce `val`.
	 *
	 * @param {Mixed} val
	 * @return {Mixed}
	 * @api private
	 */
	
	function coerce(val) {
	  if (val instanceof Error) return val.stack || val.message;
	  return val;
	}


/***/ }),
/* 119 */
/***/ (function(module, exports) {

	/**
	 * Helpers.
	 */
	
	var s = 1000
	var m = s * 60
	var h = m * 60
	var d = h * 24
	var y = d * 365.25
	
	/**
	 * Parse or format the given `val`.
	 *
	 * Options:
	 *
	 *  - `long` verbose formatting [false]
	 *
	 * @param {String|Number} val
	 * @param {Object} options
	 * @throws {Error} throw an error if val is not a non-empty string or a number
	 * @return {String|Number}
	 * @api public
	 */
	
	module.exports = function (val, options) {
	  options = options || {}
	  var type = typeof val
	  if (type === 'string' && val.length > 0) {
	    return parse(val)
	  } else if (type === 'number' && isNaN(val) === false) {
	    return options.long ?
				fmtLong(val) :
				fmtShort(val)
	  }
	  throw new Error('val is not a non-empty string or a valid number. val=' + JSON.stringify(val))
	}
	
	/**
	 * Parse the given `str` and return milliseconds.
	 *
	 * @param {String} str
	 * @return {Number}
	 * @api private
	 */
	
	function parse(str) {
	  str = String(str)
	  if (str.length > 10000) {
	    return
	  }
	  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str)
	  if (!match) {
	    return
	  }
	  var n = parseFloat(match[1])
	  var type = (match[2] || 'ms').toLowerCase()
	  switch (type) {
	    case 'years':
	    case 'year':
	    case 'yrs':
	    case 'yr':
	    case 'y':
	      return n * y
	    case 'days':
	    case 'day':
	    case 'd':
	      return n * d
	    case 'hours':
	    case 'hour':
	    case 'hrs':
	    case 'hr':
	    case 'h':
	      return n * h
	    case 'minutes':
	    case 'minute':
	    case 'mins':
	    case 'min':
	    case 'm':
	      return n * m
	    case 'seconds':
	    case 'second':
	    case 'secs':
	    case 'sec':
	    case 's':
	      return n * s
	    case 'milliseconds':
	    case 'millisecond':
	    case 'msecs':
	    case 'msec':
	    case 'ms':
	      return n
	    default:
	      return undefined
	  }
	}
	
	/**
	 * Short format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */
	
	function fmtShort(ms) {
	  if (ms >= d) {
	    return Math.round(ms / d) + 'd'
	  }
	  if (ms >= h) {
	    return Math.round(ms / h) + 'h'
	  }
	  if (ms >= m) {
	    return Math.round(ms / m) + 'm'
	  }
	  if (ms >= s) {
	    return Math.round(ms / s) + 's'
	  }
	  return ms + 'ms'
	}
	
	/**
	 * Long format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */
	
	function fmtLong(ms) {
	  return plural(ms, d, 'day') ||
	    plural(ms, h, 'hour') ||
	    plural(ms, m, 'minute') ||
	    plural(ms, s, 'second') ||
	    ms + ' ms'
	}
	
	/**
	 * Pluralization helper.
	 */
	
	function plural(ms, n, name) {
	  if (ms < n) {
	    return
	  }
	  if (ms < n * 1.5) {
	    return Math.floor(ms / n) + ' ' + name
	  }
	  return Math.ceil(ms / n) + ' ' + name + 's'
	}


/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

	
	/**
	 * Module dependencies.
	 */
	
	var debug = __webpack_require__(121)('socket.io-parser');
	var json = __webpack_require__(124);
	var Emitter = __webpack_require__(126);
	var binary = __webpack_require__(127);
	var isBuf = __webpack_require__(129);
	
	/**
	 * Protocol version.
	 *
	 * @api public
	 */
	
	exports.protocol = 4;
	
	/**
	 * Packet types.
	 *
	 * @api public
	 */
	
	exports.types = [
	  'CONNECT',
	  'DISCONNECT',
	  'EVENT',
	  'ACK',
	  'ERROR',
	  'BINARY_EVENT',
	  'BINARY_ACK'
	];
	
	/**
	 * Packet type `connect`.
	 *
	 * @api public
	 */
	
	exports.CONNECT = 0;
	
	/**
	 * Packet type `disconnect`.
	 *
	 * @api public
	 */
	
	exports.DISCONNECT = 1;
	
	/**
	 * Packet type `event`.
	 *
	 * @api public
	 */
	
	exports.EVENT = 2;
	
	/**
	 * Packet type `ack`.
	 *
	 * @api public
	 */
	
	exports.ACK = 3;
	
	/**
	 * Packet type `error`.
	 *
	 * @api public
	 */
	
	exports.ERROR = 4;
	
	/**
	 * Packet type 'binary event'
	 *
	 * @api public
	 */
	
	exports.BINARY_EVENT = 5;
	
	/**
	 * Packet type `binary ack`. For acks with binary arguments.
	 *
	 * @api public
	 */
	
	exports.BINARY_ACK = 6;
	
	/**
	 * Encoder constructor.
	 *
	 * @api public
	 */
	
	exports.Encoder = Encoder;
	
	/**
	 * Decoder constructor.
	 *
	 * @api public
	 */
	
	exports.Decoder = Decoder;
	
	/**
	 * A socket.io Encoder instance
	 *
	 * @api public
	 */
	
	function Encoder() {}
	
	/**
	 * Encode a packet as a single string if non-binary, or as a
	 * buffer sequence, depending on packet type.
	 *
	 * @param {Object} obj - packet object
	 * @param {Function} callback - function to handle encodings (likely engine.write)
	 * @return Calls callback with Array of encodings
	 * @api public
	 */
	
	Encoder.prototype.encode = function(obj, callback){
	  debug('encoding packet %j', obj);
	
	  if (exports.BINARY_EVENT == obj.type || exports.BINARY_ACK == obj.type) {
	    encodeAsBinary(obj, callback);
	  }
	  else {
	    var encoding = encodeAsString(obj);
	    callback([encoding]);
	  }
	};
	
	/**
	 * Encode packet as string.
	 *
	 * @param {Object} packet
	 * @return {String} encoded
	 * @api private
	 */
	
	function encodeAsString(obj) {
	  var str = '';
	  var nsp = false;
	
	  // first is type
	  str += obj.type;
	
	  // attachments if we have them
	  if (exports.BINARY_EVENT == obj.type || exports.BINARY_ACK == obj.type) {
	    str += obj.attachments;
	    str += '-';
	  }
	
	  // if we have a namespace other than `/`
	  // we append it followed by a comma `,`
	  if (obj.nsp && '/' != obj.nsp) {
	    nsp = true;
	    str += obj.nsp;
	  }
	
	  // immediately followed by the id
	  if (null != obj.id) {
	    if (nsp) {
	      str += ',';
	      nsp = false;
	    }
	    str += obj.id;
	  }
	
	  // json data
	  if (null != obj.data) {
	    if (nsp) str += ',';
	    str += json.stringify(obj.data);
	  }
	
	  debug('encoded %j as %s', obj, str);
	  return str;
	}
	
	/**
	 * Encode packet as 'buffer sequence' by removing blobs, and
	 * deconstructing packet into object with placeholders and
	 * a list of buffers.
	 *
	 * @param {Object} packet
	 * @return {Buffer} encoded
	 * @api private
	 */
	
	function encodeAsBinary(obj, callback) {
	
	  function writeEncoding(bloblessData) {
	    var deconstruction = binary.deconstructPacket(bloblessData);
	    var pack = encodeAsString(deconstruction.packet);
	    var buffers = deconstruction.buffers;
	
	    buffers.unshift(pack); // add packet info to beginning of data list
	    callback(buffers); // write all the buffers
	  }
	
	  binary.removeBlobs(obj, writeEncoding);
	}
	
	/**
	 * A socket.io Decoder instance
	 *
	 * @return {Object} decoder
	 * @api public
	 */
	
	function Decoder() {
	  this.reconstructor = null;
	}
	
	/**
	 * Mix in `Emitter` with Decoder.
	 */
	
	Emitter(Decoder.prototype);
	
	/**
	 * Decodes an ecoded packet string into packet JSON.
	 *
	 * @param {String} obj - encoded packet
	 * @return {Object} packet
	 * @api public
	 */
	
	Decoder.prototype.add = function(obj) {
	  var packet;
	  if ('string' == typeof obj) {
	    packet = decodeString(obj);
	    if (exports.BINARY_EVENT == packet.type || exports.BINARY_ACK == packet.type) { // binary packet's json
	      this.reconstructor = new BinaryReconstructor(packet);
	
	      // no attachments, labeled binary but no binary data to follow
	      if (this.reconstructor.reconPack.attachments === 0) {
	        this.emit('decoded', packet);
	      }
	    } else { // non-binary full packet
	      this.emit('decoded', packet);
	    }
	  }
	  else if (isBuf(obj) || obj.base64) { // raw binary data
	    if (!this.reconstructor) {
	      throw new Error('got binary data when not reconstructing a packet');
	    } else {
	      packet = this.reconstructor.takeBinaryData(obj);
	      if (packet) { // received final buffer
	        this.reconstructor = null;
	        this.emit('decoded', packet);
	      }
	    }
	  }
	  else {
	    throw new Error('Unknown type: ' + obj);
	  }
	};
	
	/**
	 * Decode a packet String (JSON data)
	 *
	 * @param {String} str
	 * @return {Object} packet
	 * @api private
	 */
	
	function decodeString(str) {
	  var p = {};
	  var i = 0;
	
	  // look up type
	  p.type = Number(str.charAt(0));
	  if (null == exports.types[p.type]) return error();
	
	  // look up attachments if type binary
	  if (exports.BINARY_EVENT == p.type || exports.BINARY_ACK == p.type) {
	    var buf = '';
	    while (str.charAt(++i) != '-') {
	      buf += str.charAt(i);
	      if (i == str.length) break;
	    }
	    if (buf != Number(buf) || str.charAt(i) != '-') {
	      throw new Error('Illegal attachments');
	    }
	    p.attachments = Number(buf);
	  }
	
	  // look up namespace (if any)
	  if ('/' == str.charAt(i + 1)) {
	    p.nsp = '';
	    while (++i) {
	      var c = str.charAt(i);
	      if (',' == c) break;
	      p.nsp += c;
	      if (i == str.length) break;
	    }
	  } else {
	    p.nsp = '/';
	  }
	
	  // look up id
	  var next = str.charAt(i + 1);
	  if ('' !== next && Number(next) == next) {
	    p.id = '';
	    while (++i) {
	      var c = str.charAt(i);
	      if (null == c || Number(c) != c) {
	        --i;
	        break;
	      }
	      p.id += str.charAt(i);
	      if (i == str.length) break;
	    }
	    p.id = Number(p.id);
	  }
	
	  // look up json data
	  if (str.charAt(++i)) {
	    p = tryParse(p, str.substr(i));
	  }
	
	  debug('decoded %s as %j', str, p);
	  return p;
	}
	
	function tryParse(p, str) {
	  try {
	    p.data = json.parse(str);
	  } catch(e){
	    return error();
	  }
	  return p; 
	};
	
	/**
	 * Deallocates a parser's resources
	 *
	 * @api public
	 */
	
	Decoder.prototype.destroy = function() {
	  if (this.reconstructor) {
	    this.reconstructor.finishedReconstruction();
	  }
	};
	
	/**
	 * A manager of a binary event's 'buffer sequence'. Should
	 * be constructed whenever a packet of type BINARY_EVENT is
	 * decoded.
	 *
	 * @param {Object} packet
	 * @return {BinaryReconstructor} initialized reconstructor
	 * @api private
	 */
	
	function BinaryReconstructor(packet) {
	  this.reconPack = packet;
	  this.buffers = [];
	}
	
	/**
	 * Method to be called when binary data received from connection
	 * after a BINARY_EVENT packet.
	 *
	 * @param {Buffer | ArrayBuffer} binData - the raw binary data received
	 * @return {null | Object} returns null if more binary data is expected or
	 *   a reconstructed packet object if all buffers have been received.
	 * @api private
	 */
	
	BinaryReconstructor.prototype.takeBinaryData = function(binData) {
	  this.buffers.push(binData);
	  if (this.buffers.length == this.reconPack.attachments) { // done with buffer list
	    var packet = binary.reconstructPacket(this.reconPack, this.buffers);
	    this.finishedReconstruction();
	    return packet;
	  }
	  return null;
	};
	
	/**
	 * Cleans up binary packet reconstruction variables.
	 *
	 * @api private
	 */
	
	BinaryReconstructor.prototype.finishedReconstruction = function() {
	  this.reconPack = null;
	  this.buffers = [];
	};
	
	function error(data){
	  return {
	    type: exports.ERROR,
	    data: 'parser error'
	  };
	}


/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

	
	/**
	 * This is the web browser implementation of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */
	
	exports = module.exports = __webpack_require__(122);
	exports.log = log;
	exports.formatArgs = formatArgs;
	exports.save = save;
	exports.load = load;
	exports.useColors = useColors;
	exports.storage = 'undefined' != typeof chrome
	               && 'undefined' != typeof chrome.storage
	                  ? chrome.storage.local
	                  : localstorage();
	
	/**
	 * Colors.
	 */
	
	exports.colors = [
	  'lightseagreen',
	  'forestgreen',
	  'goldenrod',
	  'dodgerblue',
	  'darkorchid',
	  'crimson'
	];
	
	/**
	 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
	 * and the Firebug extension (any Firefox version) are known
	 * to support "%c" CSS customizations.
	 *
	 * TODO: add a `localStorage` variable to explicitly enable/disable colors
	 */
	
	function useColors() {
	  // is webkit? http://stackoverflow.com/a/16459606/376773
	  return ('WebkitAppearance' in document.documentElement.style) ||
	    // is firebug? http://stackoverflow.com/a/398120/376773
	    (window.console && (console.firebug || (console.exception && console.table))) ||
	    // is firefox >= v31?
	    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
	    (navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31);
	}
	
	/**
	 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
	 */
	
	exports.formatters.j = function(v) {
	  return JSON.stringify(v);
	};
	
	
	/**
	 * Colorize log arguments if enabled.
	 *
	 * @api public
	 */
	
	function formatArgs() {
	  var args = arguments;
	  var useColors = this.useColors;
	
	  args[0] = (useColors ? '%c' : '')
	    + this.namespace
	    + (useColors ? ' %c' : ' ')
	    + args[0]
	    + (useColors ? '%c ' : ' ')
	    + '+' + exports.humanize(this.diff);
	
	  if (!useColors) return args;
	
	  var c = 'color: ' + this.color;
	  args = [args[0], c, 'color: inherit'].concat(Array.prototype.slice.call(args, 1));
	
	  // the final "%c" is somewhat tricky, because there could be other
	  // arguments passed either before or after the %c, so we need to
	  // figure out the correct index to insert the CSS into
	  var index = 0;
	  var lastC = 0;
	  args[0].replace(/%[a-z%]/g, function(match) {
	    if ('%%' === match) return;
	    index++;
	    if ('%c' === match) {
	      // we only are interested in the *last* %c
	      // (the user may have provided their own)
	      lastC = index;
	    }
	  });
	
	  args.splice(lastC, 0, c);
	  return args;
	}
	
	/**
	 * Invokes `console.log()` when available.
	 * No-op when `console.log` is not a "function".
	 *
	 * @api public
	 */
	
	function log() {
	  // this hackery is required for IE8/9, where
	  // the `console.log` function doesn't have 'apply'
	  return 'object' === typeof console
	    && console.log
	    && Function.prototype.apply.call(console.log, console, arguments);
	}
	
	/**
	 * Save `namespaces`.
	 *
	 * @param {String} namespaces
	 * @api private
	 */
	
	function save(namespaces) {
	  try {
	    if (null == namespaces) {
	      exports.storage.removeItem('debug');
	    } else {
	      exports.storage.debug = namespaces;
	    }
	  } catch(e) {}
	}
	
	/**
	 * Load `namespaces`.
	 *
	 * @return {String} returns the previously persisted debug modes
	 * @api private
	 */
	
	function load() {
	  var r;
	  try {
	    r = exports.storage.debug;
	  } catch(e) {}
	  return r;
	}
	
	/**
	 * Enable namespaces listed in `localStorage.debug` initially.
	 */
	
	exports.enable(load());
	
	/**
	 * Localstorage attempts to return the localstorage.
	 *
	 * This is necessary because safari throws
	 * when a user disables cookies/localstorage
	 * and you attempt to access it.
	 *
	 * @return {LocalStorage}
	 * @api private
	 */
	
	function localstorage(){
	  try {
	    return window.localStorage;
	  } catch (e) {}
	}


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

	
	/**
	 * This is the common logic for both the Node.js and web browser
	 * implementations of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */
	
	exports = module.exports = debug;
	exports.coerce = coerce;
	exports.disable = disable;
	exports.enable = enable;
	exports.enabled = enabled;
	exports.humanize = __webpack_require__(123);
	
	/**
	 * The currently active debug mode names, and names to skip.
	 */
	
	exports.names = [];
	exports.skips = [];
	
	/**
	 * Map of special "%n" handling functions, for the debug "format" argument.
	 *
	 * Valid key names are a single, lowercased letter, i.e. "n".
	 */
	
	exports.formatters = {};
	
	/**
	 * Previously assigned color.
	 */
	
	var prevColor = 0;
	
	/**
	 * Previous log timestamp.
	 */
	
	var prevTime;
	
	/**
	 * Select a color.
	 *
	 * @return {Number}
	 * @api private
	 */
	
	function selectColor() {
	  return exports.colors[prevColor++ % exports.colors.length];
	}
	
	/**
	 * Create a debugger with the given `namespace`.
	 *
	 * @param {String} namespace
	 * @return {Function}
	 * @api public
	 */
	
	function debug(namespace) {
	
	  // define the `disabled` version
	  function disabled() {
	  }
	  disabled.enabled = false;
	
	  // define the `enabled` version
	  function enabled() {
	
	    var self = enabled;
	
	    // set `diff` timestamp
	    var curr = +new Date();
	    var ms = curr - (prevTime || curr);
	    self.diff = ms;
	    self.prev = prevTime;
	    self.curr = curr;
	    prevTime = curr;
	
	    // add the `color` if not set
	    if (null == self.useColors) self.useColors = exports.useColors();
	    if (null == self.color && self.useColors) self.color = selectColor();
	
	    var args = Array.prototype.slice.call(arguments);
	
	    args[0] = exports.coerce(args[0]);
	
	    if ('string' !== typeof args[0]) {
	      // anything else let's inspect with %o
	      args = ['%o'].concat(args);
	    }
	
	    // apply any `formatters` transformations
	    var index = 0;
	    args[0] = args[0].replace(/%([a-z%])/g, function(match, format) {
	      // if we encounter an escaped % then don't increase the array index
	      if (match === '%%') return match;
	      index++;
	      var formatter = exports.formatters[format];
	      if ('function' === typeof formatter) {
	        var val = args[index];
	        match = formatter.call(self, val);
	
	        // now we need to remove `args[index]` since it's inlined in the `format`
	        args.splice(index, 1);
	        index--;
	      }
	      return match;
	    });
	
	    if ('function' === typeof exports.formatArgs) {
	      args = exports.formatArgs.apply(self, args);
	    }
	    var logFn = enabled.log || exports.log || console.log.bind(console);
	    logFn.apply(self, args);
	  }
	  enabled.enabled = true;
	
	  var fn = exports.enabled(namespace) ? enabled : disabled;
	
	  fn.namespace = namespace;
	
	  return fn;
	}
	
	/**
	 * Enables a debug mode by namespaces. This can include modes
	 * separated by a colon and wildcards.
	 *
	 * @param {String} namespaces
	 * @api public
	 */
	
	function enable(namespaces) {
	  exports.save(namespaces);
	
	  var split = (namespaces || '').split(/[\s,]+/);
	  var len = split.length;
	
	  for (var i = 0; i < len; i++) {
	    if (!split[i]) continue; // ignore empty strings
	    namespaces = split[i].replace(/\*/g, '.*?');
	    if (namespaces[0] === '-') {
	      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
	    } else {
	      exports.names.push(new RegExp('^' + namespaces + '$'));
	    }
	  }
	}
	
	/**
	 * Disable debug output.
	 *
	 * @api public
	 */
	
	function disable() {
	  exports.enable('');
	}
	
	/**
	 * Returns true if the given mode name is enabled, false otherwise.
	 *
	 * @param {String} name
	 * @return {Boolean}
	 * @api public
	 */
	
	function enabled(name) {
	  var i, len;
	  for (i = 0, len = exports.skips.length; i < len; i++) {
	    if (exports.skips[i].test(name)) {
	      return false;
	    }
	  }
	  for (i = 0, len = exports.names.length; i < len; i++) {
	    if (exports.names[i].test(name)) {
	      return true;
	    }
	  }
	  return false;
	}
	
	/**
	 * Coerce `val`.
	 *
	 * @param {Mixed} val
	 * @return {Mixed}
	 * @api private
	 */
	
	function coerce(val) {
	  if (val instanceof Error) return val.stack || val.message;
	  return val;
	}


/***/ }),
/* 123 */
/***/ (function(module, exports) {

	/**
	 * Helpers.
	 */
	
	var s = 1000;
	var m = s * 60;
	var h = m * 60;
	var d = h * 24;
	var y = d * 365.25;
	
	/**
	 * Parse or format the given `val`.
	 *
	 * Options:
	 *
	 *  - `long` verbose formatting [false]
	 *
	 * @param {String|Number} val
	 * @param {Object} options
	 * @return {String|Number}
	 * @api public
	 */
	
	module.exports = function(val, options){
	  options = options || {};
	  if ('string' == typeof val) return parse(val);
	  return options.long
	    ? long(val)
	    : short(val);
	};
	
	/**
	 * Parse the given `str` and return milliseconds.
	 *
	 * @param {String} str
	 * @return {Number}
	 * @api private
	 */
	
	function parse(str) {
	  str = '' + str;
	  if (str.length > 10000) return;
	  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);
	  if (!match) return;
	  var n = parseFloat(match[1]);
	  var type = (match[2] || 'ms').toLowerCase();
	  switch (type) {
	    case 'years':
	    case 'year':
	    case 'yrs':
	    case 'yr':
	    case 'y':
	      return n * y;
	    case 'days':
	    case 'day':
	    case 'd':
	      return n * d;
	    case 'hours':
	    case 'hour':
	    case 'hrs':
	    case 'hr':
	    case 'h':
	      return n * h;
	    case 'minutes':
	    case 'minute':
	    case 'mins':
	    case 'min':
	    case 'm':
	      return n * m;
	    case 'seconds':
	    case 'second':
	    case 'secs':
	    case 'sec':
	    case 's':
	      return n * s;
	    case 'milliseconds':
	    case 'millisecond':
	    case 'msecs':
	    case 'msec':
	    case 'ms':
	      return n;
	  }
	}
	
	/**
	 * Short format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */
	
	function short(ms) {
	  if (ms >= d) return Math.round(ms / d) + 'd';
	  if (ms >= h) return Math.round(ms / h) + 'h';
	  if (ms >= m) return Math.round(ms / m) + 'm';
	  if (ms >= s) return Math.round(ms / s) + 's';
	  return ms + 'ms';
	}
	
	/**
	 * Long format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */
	
	function long(ms) {
	  return plural(ms, d, 'day')
	    || plural(ms, h, 'hour')
	    || plural(ms, m, 'minute')
	    || plural(ms, s, 'second')
	    || ms + ' ms';
	}
	
	/**
	 * Pluralization helper.
	 */
	
	function plural(ms, n, name) {
	  if (ms < n) return;
	  if (ms < n * 1.5) return Math.floor(ms / n) + ' ' + name;
	  return Math.ceil(ms / n) + ' ' + name + 's';
	}


/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module, global) {/*! JSON v3.3.2 | http://bestiejs.github.io/json3 | Copyright 2012-2014, Kit Cambridge | http://kit.mit-license.org */
	;(function () {
	  // Detect the `define` function exposed by asynchronous module loaders. The
	  // strict `define` check is necessary for compatibility with `r.js`.
	  var isLoader = "function" === "function" && __webpack_require__(125);
	
	  // A set of types used to distinguish objects from primitives.
	  var objectTypes = {
	    "function": true,
	    "object": true
	  };
	
	  // Detect the `exports` object exposed by CommonJS implementations.
	  var freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports;
	
	  // Use the `global` object exposed by Node (including Browserify via
	  // `insert-module-globals`), Narwhal, and Ringo as the default context,
	  // and the `window` object in browsers. Rhino exports a `global` function
	  // instead.
	  var root = objectTypes[typeof window] && window || this,
	      freeGlobal = freeExports && objectTypes[typeof module] && module && !module.nodeType && typeof global == "object" && global;
	
	  if (freeGlobal && (freeGlobal["global"] === freeGlobal || freeGlobal["window"] === freeGlobal || freeGlobal["self"] === freeGlobal)) {
	    root = freeGlobal;
	  }
	
	  // Public: Initializes JSON 3 using the given `context` object, attaching the
	  // `stringify` and `parse` functions to the specified `exports` object.
	  function runInContext(context, exports) {
	    context || (context = root["Object"]());
	    exports || (exports = root["Object"]());
	
	    // Native constructor aliases.
	    var Number = context["Number"] || root["Number"],
	        String = context["String"] || root["String"],
	        Object = context["Object"] || root["Object"],
	        Date = context["Date"] || root["Date"],
	        SyntaxError = context["SyntaxError"] || root["SyntaxError"],
	        TypeError = context["TypeError"] || root["TypeError"],
	        Math = context["Math"] || root["Math"],
	        nativeJSON = context["JSON"] || root["JSON"];
	
	    // Delegate to the native `stringify` and `parse` implementations.
	    if (typeof nativeJSON == "object" && nativeJSON) {
	      exports.stringify = nativeJSON.stringify;
	      exports.parse = nativeJSON.parse;
	    }
	
	    // Convenience aliases.
	    var objectProto = Object.prototype,
	        getClass = objectProto.toString,
	        isProperty, forEach, undef;
	
	    // Test the `Date#getUTC*` methods. Based on work by @Yaffle.
	    var isExtended = new Date(-3509827334573292);
	    try {
	      // The `getUTCFullYear`, `Month`, and `Date` methods return nonsensical
	      // results for certain dates in Opera >= 10.53.
	      isExtended = isExtended.getUTCFullYear() == -109252 && isExtended.getUTCMonth() === 0 && isExtended.getUTCDate() === 1 &&
	        // Safari < 2.0.2 stores the internal millisecond time value correctly,
	        // but clips the values returned by the date methods to the range of
	        // signed 32-bit integers ([-2 ** 31, 2 ** 31 - 1]).
	        isExtended.getUTCHours() == 10 && isExtended.getUTCMinutes() == 37 && isExtended.getUTCSeconds() == 6 && isExtended.getUTCMilliseconds() == 708;
	    } catch (exception) {}
	
	    // Internal: Determines whether the native `JSON.stringify` and `parse`
	    // implementations are spec-compliant. Based on work by Ken Snyder.
	    function has(name) {
	      if (has[name] !== undef) {
	        // Return cached feature test result.
	        return has[name];
	      }
	      var isSupported;
	      if (name == "bug-string-char-index") {
	        // IE <= 7 doesn't support accessing string characters using square
	        // bracket notation. IE 8 only supports this for primitives.
	        isSupported = "a"[0] != "a";
	      } else if (name == "json") {
	        // Indicates whether both `JSON.stringify` and `JSON.parse` are
	        // supported.
	        isSupported = has("json-stringify") && has("json-parse");
	      } else {
	        var value, serialized = '{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';
	        // Test `JSON.stringify`.
	        if (name == "json-stringify") {
	          var stringify = exports.stringify, stringifySupported = typeof stringify == "function" && isExtended;
	          if (stringifySupported) {
	            // A test function object with a custom `toJSON` method.
	            (value = function () {
	              return 1;
	            }).toJSON = value;
	            try {
	              stringifySupported =
	                // Firefox 3.1b1 and b2 serialize string, number, and boolean
	                // primitives as object literals.
	                stringify(0) === "0" &&
	                // FF 3.1b1, b2, and JSON 2 serialize wrapped primitives as object
	                // literals.
	                stringify(new Number()) === "0" &&
	                stringify(new String()) == '""' &&
	                // FF 3.1b1, 2 throw an error if the value is `null`, `undefined`, or
	                // does not define a canonical JSON representation (this applies to
	                // objects with `toJSON` properties as well, *unless* they are nested
	                // within an object or array).
	                stringify(getClass) === undef &&
	                // IE 8 serializes `undefined` as `"undefined"`. Safari <= 5.1.7 and
	                // FF 3.1b3 pass this test.
	                stringify(undef) === undef &&
	                // Safari <= 5.1.7 and FF 3.1b3 throw `Error`s and `TypeError`s,
	                // respectively, if the value is omitted entirely.
	                stringify() === undef &&
	                // FF 3.1b1, 2 throw an error if the given value is not a number,
	                // string, array, object, Boolean, or `null` literal. This applies to
	                // objects with custom `toJSON` methods as well, unless they are nested
	                // inside object or array literals. YUI 3.0.0b1 ignores custom `toJSON`
	                // methods entirely.
	                stringify(value) === "1" &&
	                stringify([value]) == "[1]" &&
	                // Prototype <= 1.6.1 serializes `[undefined]` as `"[]"` instead of
	                // `"[null]"`.
	                stringify([undef]) == "[null]" &&
	                // YUI 3.0.0b1 fails to serialize `null` literals.
	                stringify(null) == "null" &&
	                // FF 3.1b1, 2 halts serialization if an array contains a function:
	                // `[1, true, getClass, 1]` serializes as "[1,true,],". FF 3.1b3
	                // elides non-JSON values from objects and arrays, unless they
	                // define custom `toJSON` methods.
	                stringify([undef, getClass, null]) == "[null,null,null]" &&
	                // Simple serialization test. FF 3.1b1 uses Unicode escape sequences
	                // where character escape codes are expected (e.g., `\b` => `\u0008`).
	                stringify({ "a": [value, true, false, null, "\x00\b\n\f\r\t"] }) == serialized &&
	                // FF 3.1b1 and b2 ignore the `filter` and `width` arguments.
	                stringify(null, value) === "1" &&
	                stringify([1, 2], null, 1) == "[\n 1,\n 2\n]" &&
	                // JSON 2, Prototype <= 1.7, and older WebKit builds incorrectly
	                // serialize extended years.
	                stringify(new Date(-8.64e15)) == '"-271821-04-20T00:00:00.000Z"' &&
	                // The milliseconds are optional in ES 5, but required in 5.1.
	                stringify(new Date(8.64e15)) == '"+275760-09-13T00:00:00.000Z"' &&
	                // Firefox <= 11.0 incorrectly serializes years prior to 0 as negative
	                // four-digit years instead of six-digit years. Credits: @Yaffle.
	                stringify(new Date(-621987552e5)) == '"-000001-01-01T00:00:00.000Z"' &&
	                // Safari <= 5.1.5 and Opera >= 10.53 incorrectly serialize millisecond
	                // values less than 1000. Credits: @Yaffle.
	                stringify(new Date(-1)) == '"1969-12-31T23:59:59.999Z"';
	            } catch (exception) {
	              stringifySupported = false;
	            }
	          }
	          isSupported = stringifySupported;
	        }
	        // Test `JSON.parse`.
	        if (name == "json-parse") {
	          var parse = exports.parse;
	          if (typeof parse == "function") {
	            try {
	              // FF 3.1b1, b2 will throw an exception if a bare literal is provided.
	              // Conforming implementations should also coerce the initial argument to
	              // a string prior to parsing.
	              if (parse("0") === 0 && !parse(false)) {
	                // Simple parsing test.
	                value = parse(serialized);
	                var parseSupported = value["a"].length == 5 && value["a"][0] === 1;
	                if (parseSupported) {
	                  try {
	                    // Safari <= 5.1.2 and FF 3.1b1 allow unescaped tabs in strings.
	                    parseSupported = !parse('"\t"');
	                  } catch (exception) {}
	                  if (parseSupported) {
	                    try {
	                      // FF 4.0 and 4.0.1 allow leading `+` signs and leading
	                      // decimal points. FF 4.0, 4.0.1, and IE 9-10 also allow
	                      // certain octal literals.
	                      parseSupported = parse("01") !== 1;
	                    } catch (exception) {}
	                  }
	                  if (parseSupported) {
	                    try {
	                      // FF 4.0, 4.0.1, and Rhino 1.7R3-R4 allow trailing decimal
	                      // points. These environments, along with FF 3.1b1 and 2,
	                      // also allow trailing commas in JSON objects and arrays.
	                      parseSupported = parse("1.") !== 1;
	                    } catch (exception) {}
	                  }
	                }
	              }
	            } catch (exception) {
	              parseSupported = false;
	            }
	          }
	          isSupported = parseSupported;
	        }
	      }
	      return has[name] = !!isSupported;
	    }
	
	    if (!has("json")) {
	      // Common `[[Class]]` name aliases.
	      var functionClass = "[object Function]",
	          dateClass = "[object Date]",
	          numberClass = "[object Number]",
	          stringClass = "[object String]",
	          arrayClass = "[object Array]",
	          booleanClass = "[object Boolean]";
	
	      // Detect incomplete support for accessing string characters by index.
	      var charIndexBuggy = has("bug-string-char-index");
	
	      // Define additional utility methods if the `Date` methods are buggy.
	      if (!isExtended) {
	        var floor = Math.floor;
	        // A mapping between the months of the year and the number of days between
	        // January 1st and the first of the respective month.
	        var Months = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
	        // Internal: Calculates the number of days between the Unix epoch and the
	        // first day of the given month.
	        var getDay = function (year, month) {
	          return Months[month] + 365 * (year - 1970) + floor((year - 1969 + (month = +(month > 1))) / 4) - floor((year - 1901 + month) / 100) + floor((year - 1601 + month) / 400);
	        };
	      }
	
	      // Internal: Determines if a property is a direct property of the given
	      // object. Delegates to the native `Object#hasOwnProperty` method.
	      if (!(isProperty = objectProto.hasOwnProperty)) {
	        isProperty = function (property) {
	          var members = {}, constructor;
	          if ((members.__proto__ = null, members.__proto__ = {
	            // The *proto* property cannot be set multiple times in recent
	            // versions of Firefox and SeaMonkey.
	            "toString": 1
	          }, members).toString != getClass) {
	            // Safari <= 2.0.3 doesn't implement `Object#hasOwnProperty`, but
	            // supports the mutable *proto* property.
	            isProperty = function (property) {
	              // Capture and break the object's prototype chain (see section 8.6.2
	              // of the ES 5.1 spec). The parenthesized expression prevents an
	              // unsafe transformation by the Closure Compiler.
	              var original = this.__proto__, result = property in (this.__proto__ = null, this);
	              // Restore the original prototype chain.
	              this.__proto__ = original;
	              return result;
	            };
	          } else {
	            // Capture a reference to the top-level `Object` constructor.
	            constructor = members.constructor;
	            // Use the `constructor` property to simulate `Object#hasOwnProperty` in
	            // other environments.
	            isProperty = function (property) {
	              var parent = (this.constructor || constructor).prototype;
	              return property in this && !(property in parent && this[property] === parent[property]);
	            };
	          }
	          members = null;
	          return isProperty.call(this, property);
	        };
	      }
	
	      // Internal: Normalizes the `for...in` iteration algorithm across
	      // environments. Each enumerated key is yielded to a `callback` function.
	      forEach = function (object, callback) {
	        var size = 0, Properties, members, property;
	
	        // Tests for bugs in the current environment's `for...in` algorithm. The
	        // `valueOf` property inherits the non-enumerable flag from
	        // `Object.prototype` in older versions of IE, Netscape, and Mozilla.
	        (Properties = function () {
	          this.valueOf = 0;
	        }).prototype.valueOf = 0;
	
	        // Iterate over a new instance of the `Properties` class.
	        members = new Properties();
	        for (property in members) {
	          // Ignore all properties inherited from `Object.prototype`.
	          if (isProperty.call(members, property)) {
	            size++;
	          }
	        }
	        Properties = members = null;
	
	        // Normalize the iteration algorithm.
	        if (!size) {
	          // A list of non-enumerable properties inherited from `Object.prototype`.
	          members = ["valueOf", "toString", "toLocaleString", "propertyIsEnumerable", "isPrototypeOf", "hasOwnProperty", "constructor"];
	          // IE <= 8, Mozilla 1.0, and Netscape 6.2 ignore shadowed non-enumerable
	          // properties.
	          forEach = function (object, callback) {
	            var isFunction = getClass.call(object) == functionClass, property, length;
	            var hasProperty = !isFunction && typeof object.constructor != "function" && objectTypes[typeof object.hasOwnProperty] && object.hasOwnProperty || isProperty;
	            for (property in object) {
	              // Gecko <= 1.0 enumerates the `prototype` property of functions under
	              // certain conditions; IE does not.
	              if (!(isFunction && property == "prototype") && hasProperty.call(object, property)) {
	                callback(property);
	              }
	            }
	            // Manually invoke the callback for each non-enumerable property.
	            for (length = members.length; property = members[--length]; hasProperty.call(object, property) && callback(property));
	          };
	        } else if (size == 2) {
	          // Safari <= 2.0.4 enumerates shadowed properties twice.
	          forEach = function (object, callback) {
	            // Create a set of iterated properties.
	            var members = {}, isFunction = getClass.call(object) == functionClass, property;
	            for (property in object) {
	              // Store each property name to prevent double enumeration. The
	              // `prototype` property of functions is not enumerated due to cross-
	              // environment inconsistencies.
	              if (!(isFunction && property == "prototype") && !isProperty.call(members, property) && (members[property] = 1) && isProperty.call(object, property)) {
	                callback(property);
	              }
	            }
	          };
	        } else {
	          // No bugs detected; use the standard `for...in` algorithm.
	          forEach = function (object, callback) {
	            var isFunction = getClass.call(object) == functionClass, property, isConstructor;
	            for (property in object) {
	              if (!(isFunction && property == "prototype") && isProperty.call(object, property) && !(isConstructor = property === "constructor")) {
	                callback(property);
	              }
	            }
	            // Manually invoke the callback for the `constructor` property due to
	            // cross-environment inconsistencies.
	            if (isConstructor || isProperty.call(object, (property = "constructor"))) {
	              callback(property);
	            }
	          };
	        }
	        return forEach(object, callback);
	      };
	
	      // Public: Serializes a JavaScript `value` as a JSON string. The optional
	      // `filter` argument may specify either a function that alters how object and
	      // array members are serialized, or an array of strings and numbers that
	      // indicates which properties should be serialized. The optional `width`
	      // argument may be either a string or number that specifies the indentation
	      // level of the output.
	      if (!has("json-stringify")) {
	        // Internal: A map of control characters and their escaped equivalents.
	        var Escapes = {
	          92: "\\\\",
	          34: '\\"',
	          8: "\\b",
	          12: "\\f",
	          10: "\\n",
	          13: "\\r",
	          9: "\\t"
	        };
	
	        // Internal: Converts `value` into a zero-padded string such that its
	        // length is at least equal to `width`. The `width` must be <= 6.
	        var leadingZeroes = "000000";
	        var toPaddedString = function (width, value) {
	          // The `|| 0` expression is necessary to work around a bug in
	          // Opera <= 7.54u2 where `0 == -0`, but `String(-0) !== "0"`.
	          return (leadingZeroes + (value || 0)).slice(-width);
	        };
	
	        // Internal: Double-quotes a string `value`, replacing all ASCII control
	        // characters (characters with code unit values between 0 and 31) with
	        // their escaped equivalents. This is an implementation of the
	        // `Quote(value)` operation defined in ES 5.1 section 15.12.3.
	        var unicodePrefix = "\\u00";
	        var quote = function (value) {
	          var result = '"', index = 0, length = value.length, useCharIndex = !charIndexBuggy || length > 10;
	          var symbols = useCharIndex && (charIndexBuggy ? value.split("") : value);
	          for (; index < length; index++) {
	            var charCode = value.charCodeAt(index);
	            // If the character is a control character, append its Unicode or
	            // shorthand escape sequence; otherwise, append the character as-is.
	            switch (charCode) {
	              case 8: case 9: case 10: case 12: case 13: case 34: case 92:
	                result += Escapes[charCode];
	                break;
	              default:
	                if (charCode < 32) {
	                  result += unicodePrefix + toPaddedString(2, charCode.toString(16));
	                  break;
	                }
	                result += useCharIndex ? symbols[index] : value.charAt(index);
	            }
	          }
	          return result + '"';
	        };
	
	        // Internal: Recursively serializes an object. Implements the
	        // `Str(key, holder)`, `JO(value)`, and `JA(value)` operations.
	        var serialize = function (property, object, callback, properties, whitespace, indentation, stack) {
	          var value, className, year, month, date, time, hours, minutes, seconds, milliseconds, results, element, index, length, prefix, result;
	          try {
	            // Necessary for host object support.
	            value = object[property];
	          } catch (exception) {}
	          if (typeof value == "object" && value) {
	            className = getClass.call(value);
	            if (className == dateClass && !isProperty.call(value, "toJSON")) {
	              if (value > -1 / 0 && value < 1 / 0) {
	                // Dates are serialized according to the `Date#toJSON` method
	                // specified in ES 5.1 section 15.9.5.44. See section 15.9.1.15
	                // for the ISO 8601 date time string format.
	                if (getDay) {
	                  // Manually compute the year, month, date, hours, minutes,
	                  // seconds, and milliseconds if the `getUTC*` methods are
	                  // buggy. Adapted from @Yaffle's `date-shim` project.
	                  date = floor(value / 864e5);
	                  for (year = floor(date / 365.2425) + 1970 - 1; getDay(year + 1, 0) <= date; year++);
	                  for (month = floor((date - getDay(year, 0)) / 30.42); getDay(year, month + 1) <= date; month++);
	                  date = 1 + date - getDay(year, month);
	                  // The `time` value specifies the time within the day (see ES
	                  // 5.1 section 15.9.1.2). The formula `(A % B + B) % B` is used
	                  // to compute `A modulo B`, as the `%` operator does not
	                  // correspond to the `modulo` operation for negative numbers.
	                  time = (value % 864e5 + 864e5) % 864e5;
	                  // The hours, minutes, seconds, and milliseconds are obtained by
	                  // decomposing the time within the day. See section 15.9.1.10.
	                  hours = floor(time / 36e5) % 24;
	                  minutes = floor(time / 6e4) % 60;
	                  seconds = floor(time / 1e3) % 60;
	                  milliseconds = time % 1e3;
	                } else {
	                  year = value.getUTCFullYear();
	                  month = value.getUTCMonth();
	                  date = value.getUTCDate();
	                  hours = value.getUTCHours();
	                  minutes = value.getUTCMinutes();
	                  seconds = value.getUTCSeconds();
	                  milliseconds = value.getUTCMilliseconds();
	                }
	                // Serialize extended years correctly.
	                value = (year <= 0 || year >= 1e4 ? (year < 0 ? "-" : "+") + toPaddedString(6, year < 0 ? -year : year) : toPaddedString(4, year)) +
	                  "-" + toPaddedString(2, month + 1) + "-" + toPaddedString(2, date) +
	                  // Months, dates, hours, minutes, and seconds should have two
	                  // digits; milliseconds should have three.
	                  "T" + toPaddedString(2, hours) + ":" + toPaddedString(2, minutes) + ":" + toPaddedString(2, seconds) +
	                  // Milliseconds are optional in ES 5.0, but required in 5.1.
	                  "." + toPaddedString(3, milliseconds) + "Z";
	              } else {
	                value = null;
	              }
	            } else if (typeof value.toJSON == "function" && ((className != numberClass && className != stringClass && className != arrayClass) || isProperty.call(value, "toJSON"))) {
	              // Prototype <= 1.6.1 adds non-standard `toJSON` methods to the
	              // `Number`, `String`, `Date`, and `Array` prototypes. JSON 3
	              // ignores all `toJSON` methods on these objects unless they are
	              // defined directly on an instance.
	              value = value.toJSON(property);
	            }
	          }
	          if (callback) {
	            // If a replacement function was provided, call it to obtain the value
	            // for serialization.
	            value = callback.call(object, property, value);
	          }
	          if (value === null) {
	            return "null";
	          }
	          className = getClass.call(value);
	          if (className == booleanClass) {
	            // Booleans are represented literally.
	            return "" + value;
	          } else if (className == numberClass) {
	            // JSON numbers must be finite. `Infinity` and `NaN` are serialized as
	            // `"null"`.
	            return value > -1 / 0 && value < 1 / 0 ? "" + value : "null";
	          } else if (className == stringClass) {
	            // Strings are double-quoted and escaped.
	            return quote("" + value);
	          }
	          // Recursively serialize objects and arrays.
	          if (typeof value == "object") {
	            // Check for cyclic structures. This is a linear search; performance
	            // is inversely proportional to the number of unique nested objects.
	            for (length = stack.length; length--;) {
	              if (stack[length] === value) {
	                // Cyclic structures cannot be serialized by `JSON.stringify`.
	                throw TypeError();
	              }
	            }
	            // Add the object to the stack of traversed objects.
	            stack.push(value);
	            results = [];
	            // Save the current indentation level and indent one additional level.
	            prefix = indentation;
	            indentation += whitespace;
	            if (className == arrayClass) {
	              // Recursively serialize array elements.
	              for (index = 0, length = value.length; index < length; index++) {
	                element = serialize(index, value, callback, properties, whitespace, indentation, stack);
	                results.push(element === undef ? "null" : element);
	              }
	              result = results.length ? (whitespace ? "[\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "]" : ("[" + results.join(",") + "]")) : "[]";
	            } else {
	              // Recursively serialize object members. Members are selected from
	              // either a user-specified list of property names, or the object
	              // itself.
	              forEach(properties || value, function (property) {
	                var element = serialize(property, value, callback, properties, whitespace, indentation, stack);
	                if (element !== undef) {
	                  // According to ES 5.1 section 15.12.3: "If `gap` {whitespace}
	                  // is not the empty string, let `member` {quote(property) + ":"}
	                  // be the concatenation of `member` and the `space` character."
	                  // The "`space` character" refers to the literal space
	                  // character, not the `space` {width} argument provided to
	                  // `JSON.stringify`.
	                  results.push(quote(property) + ":" + (whitespace ? " " : "") + element);
	                }
	              });
	              result = results.length ? (whitespace ? "{\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "}" : ("{" + results.join(",") + "}")) : "{}";
	            }
	            // Remove the object from the traversed object stack.
	            stack.pop();
	            return result;
	          }
	        };
	
	        // Public: `JSON.stringify`. See ES 5.1 section 15.12.3.
	        exports.stringify = function (source, filter, width) {
	          var whitespace, callback, properties, className;
	          if (objectTypes[typeof filter] && filter) {
	            if ((className = getClass.call(filter)) == functionClass) {
	              callback = filter;
	            } else if (className == arrayClass) {
	              // Convert the property names array into a makeshift set.
	              properties = {};
	              for (var index = 0, length = filter.length, value; index < length; value = filter[index++], ((className = getClass.call(value)), className == stringClass || className == numberClass) && (properties[value] = 1));
	            }
	          }
	          if (width) {
	            if ((className = getClass.call(width)) == numberClass) {
	              // Convert the `width` to an integer and create a string containing
	              // `width` number of space characters.
	              if ((width -= width % 1) > 0) {
	                for (whitespace = "", width > 10 && (width = 10); whitespace.length < width; whitespace += " ");
	              }
	            } else if (className == stringClass) {
	              whitespace = width.length <= 10 ? width : width.slice(0, 10);
	            }
	          }
	          // Opera <= 7.54u2 discards the values associated with empty string keys
	          // (`""`) only if they are used directly within an object member list
	          // (e.g., `!("" in { "": 1})`).
	          return serialize("", (value = {}, value[""] = source, value), callback, properties, whitespace, "", []);
	        };
	      }
	
	      // Public: Parses a JSON source string.
	      if (!has("json-parse")) {
	        var fromCharCode = String.fromCharCode;
	
	        // Internal: A map of escaped control characters and their unescaped
	        // equivalents.
	        var Unescapes = {
	          92: "\\",
	          34: '"',
	          47: "/",
	          98: "\b",
	          116: "\t",
	          110: "\n",
	          102: "\f",
	          114: "\r"
	        };
	
	        // Internal: Stores the parser state.
	        var Index, Source;
	
	        // Internal: Resets the parser state and throws a `SyntaxError`.
	        var abort = function () {
	          Index = Source = null;
	          throw SyntaxError();
	        };
	
	        // Internal: Returns the next token, or `"$"` if the parser has reached
	        // the end of the source string. A token may be a string, number, `null`
	        // literal, or Boolean literal.
	        var lex = function () {
	          var source = Source, length = source.length, value, begin, position, isSigned, charCode;
	          while (Index < length) {
	            charCode = source.charCodeAt(Index);
	            switch (charCode) {
	              case 9: case 10: case 13: case 32:
	                // Skip whitespace tokens, including tabs, carriage returns, line
	                // feeds, and space characters.
	                Index++;
	                break;
	              case 123: case 125: case 91: case 93: case 58: case 44:
	                // Parse a punctuator token (`{`, `}`, `[`, `]`, `:`, or `,`) at
	                // the current position.
	                value = charIndexBuggy ? source.charAt(Index) : source[Index];
	                Index++;
	                return value;
	              case 34:
	                // `"` delimits a JSON string; advance to the next character and
	                // begin parsing the string. String tokens are prefixed with the
	                // sentinel `@` character to distinguish them from punctuators and
	                // end-of-string tokens.
	                for (value = "@", Index++; Index < length;) {
	                  charCode = source.charCodeAt(Index);
	                  if (charCode < 32) {
	                    // Unescaped ASCII control characters (those with a code unit
	                    // less than the space character) are not permitted.
	                    abort();
	                  } else if (charCode == 92) {
	                    // A reverse solidus (`\`) marks the beginning of an escaped
	                    // control character (including `"`, `\`, and `/`) or Unicode
	                    // escape sequence.
	                    charCode = source.charCodeAt(++Index);
	                    switch (charCode) {
	                      case 92: case 34: case 47: case 98: case 116: case 110: case 102: case 114:
	                        // Revive escaped control characters.
	                        value += Unescapes[charCode];
	                        Index++;
	                        break;
	                      case 117:
	                        // `\u` marks the beginning of a Unicode escape sequence.
	                        // Advance to the first character and validate the
	                        // four-digit code point.
	                        begin = ++Index;
	                        for (position = Index + 4; Index < position; Index++) {
	                          charCode = source.charCodeAt(Index);
	                          // A valid sequence comprises four hexdigits (case-
	                          // insensitive) that form a single hexadecimal value.
	                          if (!(charCode >= 48 && charCode <= 57 || charCode >= 97 && charCode <= 102 || charCode >= 65 && charCode <= 70)) {
	                            // Invalid Unicode escape sequence.
	                            abort();
	                          }
	                        }
	                        // Revive the escaped character.
	                        value += fromCharCode("0x" + source.slice(begin, Index));
	                        break;
	                      default:
	                        // Invalid escape sequence.
	                        abort();
	                    }
	                  } else {
	                    if (charCode == 34) {
	                      // An unescaped double-quote character marks the end of the
	                      // string.
	                      break;
	                    }
	                    charCode = source.charCodeAt(Index);
	                    begin = Index;
	                    // Optimize for the common case where a string is valid.
	                    while (charCode >= 32 && charCode != 92 && charCode != 34) {
	                      charCode = source.charCodeAt(++Index);
	                    }
	                    // Append the string as-is.
	                    value += source.slice(begin, Index);
	                  }
	                }
	                if (source.charCodeAt(Index) == 34) {
	                  // Advance to the next character and return the revived string.
	                  Index++;
	                  return value;
	                }
	                // Unterminated string.
	                abort();
	              default:
	                // Parse numbers and literals.
	                begin = Index;
	                // Advance past the negative sign, if one is specified.
	                if (charCode == 45) {
	                  isSigned = true;
	                  charCode = source.charCodeAt(++Index);
	                }
	                // Parse an integer or floating-point value.
	                if (charCode >= 48 && charCode <= 57) {
	                  // Leading zeroes are interpreted as octal literals.
	                  if (charCode == 48 && ((charCode = source.charCodeAt(Index + 1)), charCode >= 48 && charCode <= 57)) {
	                    // Illegal octal literal.
	                    abort();
	                  }
	                  isSigned = false;
	                  // Parse the integer component.
	                  for (; Index < length && ((charCode = source.charCodeAt(Index)), charCode >= 48 && charCode <= 57); Index++);
	                  // Floats cannot contain a leading decimal point; however, this
	                  // case is already accounted for by the parser.
	                  if (source.charCodeAt(Index) == 46) {
	                    position = ++Index;
	                    // Parse the decimal component.
	                    for (; position < length && ((charCode = source.charCodeAt(position)), charCode >= 48 && charCode <= 57); position++);
	                    if (position == Index) {
	                      // Illegal trailing decimal.
	                      abort();
	                    }
	                    Index = position;
	                  }
	                  // Parse exponents. The `e` denoting the exponent is
	                  // case-insensitive.
	                  charCode = source.charCodeAt(Index);
	                  if (charCode == 101 || charCode == 69) {
	                    charCode = source.charCodeAt(++Index);
	                    // Skip past the sign following the exponent, if one is
	                    // specified.
	                    if (charCode == 43 || charCode == 45) {
	                      Index++;
	                    }
	                    // Parse the exponential component.
	                    for (position = Index; position < length && ((charCode = source.charCodeAt(position)), charCode >= 48 && charCode <= 57); position++);
	                    if (position == Index) {
	                      // Illegal empty exponent.
	                      abort();
	                    }
	                    Index = position;
	                  }
	                  // Coerce the parsed value to a JavaScript number.
	                  return +source.slice(begin, Index);
	                }
	                // A negative sign may only precede numbers.
	                if (isSigned) {
	                  abort();
	                }
	                // `true`, `false`, and `null` literals.
	                if (source.slice(Index, Index + 4) == "true") {
	                  Index += 4;
	                  return true;
	                } else if (source.slice(Index, Index + 5) == "false") {
	                  Index += 5;
	                  return false;
	                } else if (source.slice(Index, Index + 4) == "null") {
	                  Index += 4;
	                  return null;
	                }
	                // Unrecognized token.
	                abort();
	            }
	          }
	          // Return the sentinel `$` character if the parser has reached the end
	          // of the source string.
	          return "$";
	        };
	
	        // Internal: Parses a JSON `value` token.
	        var get = function (value) {
	          var results, hasMembers;
	          if (value == "$") {
	            // Unexpected end of input.
	            abort();
	          }
	          if (typeof value == "string") {
	            if ((charIndexBuggy ? value.charAt(0) : value[0]) == "@") {
	              // Remove the sentinel `@` character.
	              return value.slice(1);
	            }
	            // Parse object and array literals.
	            if (value == "[") {
	              // Parses a JSON array, returning a new JavaScript array.
	              results = [];
	              for (;; hasMembers || (hasMembers = true)) {
	                value = lex();
	                // A closing square bracket marks the end of the array literal.
	                if (value == "]") {
	                  break;
	                }
	                // If the array literal contains elements, the current token
	                // should be a comma separating the previous element from the
	                // next.
	                if (hasMembers) {
	                  if (value == ",") {
	                    value = lex();
	                    if (value == "]") {
	                      // Unexpected trailing `,` in array literal.
	                      abort();
	                    }
	                  } else {
	                    // A `,` must separate each array element.
	                    abort();
	                  }
	                }
	                // Elisions and leading commas are not permitted.
	                if (value == ",") {
	                  abort();
	                }
	                results.push(get(value));
	              }
	              return results;
	            } else if (value == "{") {
	              // Parses a JSON object, returning a new JavaScript object.
	              results = {};
	              for (;; hasMembers || (hasMembers = true)) {
	                value = lex();
	                // A closing curly brace marks the end of the object literal.
	                if (value == "}") {
	                  break;
	                }
	                // If the object literal contains members, the current token
	                // should be a comma separator.
	                if (hasMembers) {
	                  if (value == ",") {
	                    value = lex();
	                    if (value == "}") {
	                      // Unexpected trailing `,` in object literal.
	                      abort();
	                    }
	                  } else {
	                    // A `,` must separate each object member.
	                    abort();
	                  }
	                }
	                // Leading commas are not permitted, object property names must be
	                // double-quoted strings, and a `:` must separate each property
	                // name and value.
	                if (value == "," || typeof value != "string" || (charIndexBuggy ? value.charAt(0) : value[0]) != "@" || lex() != ":") {
	                  abort();
	                }
	                results[value.slice(1)] = get(lex());
	              }
	              return results;
	            }
	            // Unexpected token encountered.
	            abort();
	          }
	          return value;
	        };
	
	        // Internal: Updates a traversed object member.
	        var update = function (source, property, callback) {
	          var element = walk(source, property, callback);
	          if (element === undef) {
	            delete source[property];
	          } else {
	            source[property] = element;
	          }
	        };
	
	        // Internal: Recursively traverses a parsed JSON object, invoking the
	        // `callback` function for each value. This is an implementation of the
	        // `Walk(holder, name)` operation defined in ES 5.1 section 15.12.2.
	        var walk = function (source, property, callback) {
	          var value = source[property], length;
	          if (typeof value == "object" && value) {
	            // `forEach` can't be used to traverse an array in Opera <= 8.54
	            // because its `Object#hasOwnProperty` implementation returns `false`
	            // for array indices (e.g., `![1, 2, 3].hasOwnProperty("0")`).
	            if (getClass.call(value) == arrayClass) {
	              for (length = value.length; length--;) {
	                update(value, length, callback);
	              }
	            } else {
	              forEach(value, function (property) {
	                update(value, property, callback);
	              });
	            }
	          }
	          return callback.call(source, property, value);
	        };
	
	        // Public: `JSON.parse`. See ES 5.1 section 15.12.2.
	        exports.parse = function (source, callback) {
	          var result, value;
	          Index = 0;
	          Source = "" + source;
	          result = get(lex());
	          // If a JSON string contains multiple tokens, it is invalid.
	          if (lex() != "$") {
	            abort();
	          }
	          // Reset the parser state.
	          Index = Source = null;
	          return callback && getClass.call(callback) == functionClass ? walk((value = {}, value[""] = result, value), "", callback) : result;
	        };
	      }
	    }
	
	    exports["runInContext"] = runInContext;
	    return exports;
	  }
	
	  if (freeExports && !isLoader) {
	    // Export for CommonJS environments.
	    runInContext(root, freeExports);
	  } else {
	    // Export for web browsers and JavaScript engines.
	    var nativeJSON = root.JSON,
	        previousJSON = root["JSON3"],
	        isRestored = false;
	
	    var JSON3 = runInContext(root, (root["JSON3"] = {
	      // Public: Restores the original value of the global `JSON` object and
	      // returns a reference to the `JSON3` object.
	      "noConflict": function () {
	        if (!isRestored) {
	          isRestored = true;
	          root.JSON = nativeJSON;
	          root["JSON3"] = previousJSON;
	          nativeJSON = previousJSON = null;
	        }
	        return JSON3;
	      }
	    }));
	
	    root.JSON = {
	      "parse": JSON3.parse,
	      "stringify": JSON3.stringify
	    };
	  }
	
	  // Export for asynchronous module loaders.
	  if (isLoader) {
	    !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	      return JSON3;
	    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  }
	}).call(this);
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(62)(module), (function() { return this; }())))

/***/ }),
/* 125 */
/***/ (function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {module.exports = __webpack_amd_options__;
	
	/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ }),
/* 126 */
/***/ (function(module, exports) {

	
	/**
	 * Expose `Emitter`.
	 */
	
	module.exports = Emitter;
	
	/**
	 * Initialize a new `Emitter`.
	 *
	 * @api public
	 */
	
	function Emitter(obj) {
	  if (obj) return mixin(obj);
	};
	
	/**
	 * Mixin the emitter properties.
	 *
	 * @param {Object} obj
	 * @return {Object}
	 * @api private
	 */
	
	function mixin(obj) {
	  for (var key in Emitter.prototype) {
	    obj[key] = Emitter.prototype[key];
	  }
	  return obj;
	}
	
	/**
	 * Listen on the given `event` with `fn`.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */
	
	Emitter.prototype.on =
	Emitter.prototype.addEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};
	  (this._callbacks[event] = this._callbacks[event] || [])
	    .push(fn);
	  return this;
	};
	
	/**
	 * Adds an `event` listener that will be invoked a single
	 * time then automatically removed.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */
	
	Emitter.prototype.once = function(event, fn){
	  var self = this;
	  this._callbacks = this._callbacks || {};
	
	  function on() {
	    self.off(event, on);
	    fn.apply(this, arguments);
	  }
	
	  on.fn = fn;
	  this.on(event, on);
	  return this;
	};
	
	/**
	 * Remove the given callback for `event` or all
	 * registered callbacks.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */
	
	Emitter.prototype.off =
	Emitter.prototype.removeListener =
	Emitter.prototype.removeAllListeners =
	Emitter.prototype.removeEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};
	
	  // all
	  if (0 == arguments.length) {
	    this._callbacks = {};
	    return this;
	  }
	
	  // specific event
	  var callbacks = this._callbacks[event];
	  if (!callbacks) return this;
	
	  // remove all handlers
	  if (1 == arguments.length) {
	    delete this._callbacks[event];
	    return this;
	  }
	
	  // remove specific handler
	  var cb;
	  for (var i = 0; i < callbacks.length; i++) {
	    cb = callbacks[i];
	    if (cb === fn || cb.fn === fn) {
	      callbacks.splice(i, 1);
	      break;
	    }
	  }
	  return this;
	};
	
	/**
	 * Emit `event` with the given args.
	 *
	 * @param {String} event
	 * @param {Mixed} ...
	 * @return {Emitter}
	 */
	
	Emitter.prototype.emit = function(event){
	  this._callbacks = this._callbacks || {};
	  var args = [].slice.call(arguments, 1)
	    , callbacks = this._callbacks[event];
	
	  if (callbacks) {
	    callbacks = callbacks.slice(0);
	    for (var i = 0, len = callbacks.length; i < len; ++i) {
	      callbacks[i].apply(this, args);
	    }
	  }
	
	  return this;
	};
	
	/**
	 * Return array of callbacks for `event`.
	 *
	 * @param {String} event
	 * @return {Array}
	 * @api public
	 */
	
	Emitter.prototype.listeners = function(event){
	  this._callbacks = this._callbacks || {};
	  return this._callbacks[event] || [];
	};
	
	/**
	 * Check if this emitter has `event` handlers.
	 *
	 * @param {String} event
	 * @return {Boolean}
	 * @api public
	 */
	
	Emitter.prototype.hasListeners = function(event){
	  return !! this.listeners(event).length;
	};


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/*global Blob,File*/
	
	/**
	 * Module requirements
	 */
	
	var isArray = __webpack_require__(128);
	var isBuf = __webpack_require__(129);
	
	/**
	 * Replaces every Buffer | ArrayBuffer in packet with a numbered placeholder.
	 * Anything with blobs or files should be fed through removeBlobs before coming
	 * here.
	 *
	 * @param {Object} packet - socket.io event packet
	 * @return {Object} with deconstructed packet and list of buffers
	 * @api public
	 */
	
	exports.deconstructPacket = function(packet){
	  var buffers = [];
	  var packetData = packet.data;
	
	  function _deconstructPacket(data) {
	    if (!data) return data;
	
	    if (isBuf(data)) {
	      var placeholder = { _placeholder: true, num: buffers.length };
	      buffers.push(data);
	      return placeholder;
	    } else if (isArray(data)) {
	      var newData = new Array(data.length);
	      for (var i = 0; i < data.length; i++) {
	        newData[i] = _deconstructPacket(data[i]);
	      }
	      return newData;
	    } else if ('object' == typeof data && !(data instanceof Date)) {
	      var newData = {};
	      for (var key in data) {
	        newData[key] = _deconstructPacket(data[key]);
	      }
	      return newData;
	    }
	    return data;
	  }
	
	  var pack = packet;
	  pack.data = _deconstructPacket(packetData);
	  pack.attachments = buffers.length; // number of binary 'attachments'
	  return {packet: pack, buffers: buffers};
	};
	
	/**
	 * Reconstructs a binary packet from its placeholder packet and buffers
	 *
	 * @param {Object} packet - event packet with placeholders
	 * @param {Array} buffers - binary buffers to put in placeholder positions
	 * @return {Object} reconstructed packet
	 * @api public
	 */
	
	exports.reconstructPacket = function(packet, buffers) {
	  var curPlaceHolder = 0;
	
	  function _reconstructPacket(data) {
	    if (data && data._placeholder) {
	      var buf = buffers[data.num]; // appropriate buffer (should be natural order anyway)
	      return buf;
	    } else if (isArray(data)) {
	      for (var i = 0; i < data.length; i++) {
	        data[i] = _reconstructPacket(data[i]);
	      }
	      return data;
	    } else if (data && 'object' == typeof data) {
	      for (var key in data) {
	        data[key] = _reconstructPacket(data[key]);
	      }
	      return data;
	    }
	    return data;
	  }
	
	  packet.data = _reconstructPacket(packet.data);
	  packet.attachments = undefined; // no longer useful
	  return packet;
	};
	
	/**
	 * Asynchronously removes Blobs or Files from data via
	 * FileReader's readAsArrayBuffer method. Used before encoding
	 * data as msgpack. Calls callback with the blobless data.
	 *
	 * @param {Object} data
	 * @param {Function} callback
	 * @api private
	 */
	
	exports.removeBlobs = function(data, callback) {
	  function _removeBlobs(obj, curKey, containingObject) {
	    if (!obj) return obj;
	
	    // convert any blob
	    if ((global.Blob && obj instanceof Blob) ||
	        (global.File && obj instanceof File)) {
	      pendingBlobs++;
	
	      // async filereader
	      var fileReader = new FileReader();
	      fileReader.onload = function() { // this.result == arraybuffer
	        if (containingObject) {
	          containingObject[curKey] = this.result;
	        }
	        else {
	          bloblessData = this.result;
	        }
	
	        // if nothing pending its callback time
	        if(! --pendingBlobs) {
	          callback(bloblessData);
	        }
	      };
	
	      fileReader.readAsArrayBuffer(obj); // blob -> arraybuffer
	    } else if (isArray(obj)) { // handle array
	      for (var i = 0; i < obj.length; i++) {
	        _removeBlobs(obj[i], i, obj);
	      }
	    } else if (obj && 'object' == typeof obj && !isBuf(obj)) { // and object
	      for (var key in obj) {
	        _removeBlobs(obj[key], key, obj);
	      }
	    }
	  }
	
	  var pendingBlobs = 0;
	  var bloblessData = data;
	  _removeBlobs(bloblessData);
	  if (!pendingBlobs) {
	    callback(bloblessData);
	  }
	};
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 128 */
/***/ (function(module, exports) {

	module.exports = Array.isArray || function (arr) {
	  return Object.prototype.toString.call(arr) == '[object Array]';
	};


/***/ }),
/* 129 */
/***/ (function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {
	module.exports = isBuf;
	
	/**
	 * Returns true if obj is a buffer or an arraybuffer.
	 *
	 * @api private
	 */
	
	function isBuf(obj) {
	  return (global.Buffer && global.Buffer.isBuffer(obj)) ||
	         (global.ArrayBuffer && obj instanceof ArrayBuffer);
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

	
	/**
	 * Module dependencies.
	 */
	
	var eio = __webpack_require__(131);
	var Socket = __webpack_require__(160);
	var Emitter = __webpack_require__(161);
	var parser = __webpack_require__(120);
	var on = __webpack_require__(163);
	var bind = __webpack_require__(164);
	var debug = __webpack_require__(116)('socket.io-client:manager');
	var indexOf = __webpack_require__(158);
	var Backoff = __webpack_require__(165);
	
	/**
	 * IE6+ hasOwnProperty
	 */
	
	var has = Object.prototype.hasOwnProperty;
	
	/**
	 * Module exports
	 */
	
	module.exports = Manager;
	
	/**
	 * `Manager` constructor.
	 *
	 * @param {String} engine instance or engine uri/opts
	 * @param {Object} options
	 * @api public
	 */
	
	function Manager (uri, opts) {
	  if (!(this instanceof Manager)) return new Manager(uri, opts);
	  if (uri && ('object' === typeof uri)) {
	    opts = uri;
	    uri = undefined;
	  }
	  opts = opts || {};
	
	  opts.path = opts.path || '/socket.io';
	  this.nsps = {};
	  this.subs = [];
	  this.opts = opts;
	  this.reconnection(opts.reconnection !== false);
	  this.reconnectionAttempts(opts.reconnectionAttempts || Infinity);
	  this.reconnectionDelay(opts.reconnectionDelay || 1000);
	  this.reconnectionDelayMax(opts.reconnectionDelayMax || 5000);
	  this.randomizationFactor(opts.randomizationFactor || 0.5);
	  this.backoff = new Backoff({
	    min: this.reconnectionDelay(),
	    max: this.reconnectionDelayMax(),
	    jitter: this.randomizationFactor()
	  });
	  this.timeout(null == opts.timeout ? 20000 : opts.timeout);
	  this.readyState = 'closed';
	  this.uri = uri;
	  this.connecting = [];
	  this.lastPing = null;
	  this.encoding = false;
	  this.packetBuffer = [];
	  this.encoder = new parser.Encoder();
	  this.decoder = new parser.Decoder();
	  this.autoConnect = opts.autoConnect !== false;
	  if (this.autoConnect) this.open();
	}
	
	/**
	 * Propagate given event to sockets and emit on `this`
	 *
	 * @api private
	 */
	
	Manager.prototype.emitAll = function () {
	  this.emit.apply(this, arguments);
	  for (var nsp in this.nsps) {
	    if (has.call(this.nsps, nsp)) {
	      this.nsps[nsp].emit.apply(this.nsps[nsp], arguments);
	    }
	  }
	};
	
	/**
	 * Update `socket.id` of all sockets
	 *
	 * @api private
	 */
	
	Manager.prototype.updateSocketIds = function () {
	  for (var nsp in this.nsps) {
	    if (has.call(this.nsps, nsp)) {
	      this.nsps[nsp].id = this.engine.id;
	    }
	  }
	};
	
	/**
	 * Mix in `Emitter`.
	 */
	
	Emitter(Manager.prototype);
	
	/**
	 * Sets the `reconnection` config.
	 *
	 * @param {Boolean} true/false if it should automatically reconnect
	 * @return {Manager} self or value
	 * @api public
	 */
	
	Manager.prototype.reconnection = function (v) {
	  if (!arguments.length) return this._reconnection;
	  this._reconnection = !!v;
	  return this;
	};
	
	/**
	 * Sets the reconnection attempts config.
	 *
	 * @param {Number} max reconnection attempts before giving up
	 * @return {Manager} self or value
	 * @api public
	 */
	
	Manager.prototype.reconnectionAttempts = function (v) {
	  if (!arguments.length) return this._reconnectionAttempts;
	  this._reconnectionAttempts = v;
	  return this;
	};
	
	/**
	 * Sets the delay between reconnections.
	 *
	 * @param {Number} delay
	 * @return {Manager} self or value
	 * @api public
	 */
	
	Manager.prototype.reconnectionDelay = function (v) {
	  if (!arguments.length) return this._reconnectionDelay;
	  this._reconnectionDelay = v;
	  this.backoff && this.backoff.setMin(v);
	  return this;
	};
	
	Manager.prototype.randomizationFactor = function (v) {
	  if (!arguments.length) return this._randomizationFactor;
	  this._randomizationFactor = v;
	  this.backoff && this.backoff.setJitter(v);
	  return this;
	};
	
	/**
	 * Sets the maximum delay between reconnections.
	 *
	 * @param {Number} delay
	 * @return {Manager} self or value
	 * @api public
	 */
	
	Manager.prototype.reconnectionDelayMax = function (v) {
	  if (!arguments.length) return this._reconnectionDelayMax;
	  this._reconnectionDelayMax = v;
	  this.backoff && this.backoff.setMax(v);
	  return this;
	};
	
	/**
	 * Sets the connection timeout. `false` to disable
	 *
	 * @return {Manager} self or value
	 * @api public
	 */
	
	Manager.prototype.timeout = function (v) {
	  if (!arguments.length) return this._timeout;
	  this._timeout = v;
	  return this;
	};
	
	/**
	 * Starts trying to reconnect if reconnection is enabled and we have not
	 * started reconnecting yet
	 *
	 * @api private
	 */
	
	Manager.prototype.maybeReconnectOnOpen = function () {
	  // Only try to reconnect if it's the first time we're connecting
	  if (!this.reconnecting && this._reconnection && this.backoff.attempts === 0) {
	    // keeps reconnection from firing twice for the same reconnection loop
	    this.reconnect();
	  }
	};
	
	/**
	 * Sets the current transport `socket`.
	 *
	 * @param {Function} optional, callback
	 * @return {Manager} self
	 * @api public
	 */
	
	Manager.prototype.open =
	Manager.prototype.connect = function (fn, opts) {
	  debug('readyState %s', this.readyState);
	  if (~this.readyState.indexOf('open')) return this;
	
	  debug('opening %s', this.uri);
	  this.engine = eio(this.uri, this.opts);
	  var socket = this.engine;
	  var self = this;
	  this.readyState = 'opening';
	  this.skipReconnect = false;
	
	  // emit `open`
	  var openSub = on(socket, 'open', function () {
	    self.onopen();
	    fn && fn();
	  });
	
	  // emit `connect_error`
	  var errorSub = on(socket, 'error', function (data) {
	    debug('connect_error');
	    self.cleanup();
	    self.readyState = 'closed';
	    self.emitAll('connect_error', data);
	    if (fn) {
	      var err = new Error('Connection error');
	      err.data = data;
	      fn(err);
	    } else {
	      // Only do this if there is no fn to handle the error
	      self.maybeReconnectOnOpen();
	    }
	  });
	
	  // emit `connect_timeout`
	  if (false !== this._timeout) {
	    var timeout = this._timeout;
	    debug('connect attempt will timeout after %d', timeout);
	
	    // set timer
	    var timer = setTimeout(function () {
	      debug('connect attempt timed out after %d', timeout);
	      openSub.destroy();
	      socket.close();
	      socket.emit('error', 'timeout');
	      self.emitAll('connect_timeout', timeout);
	    }, timeout);
	
	    this.subs.push({
	      destroy: function () {
	        clearTimeout(timer);
	      }
	    });
	  }
	
	  this.subs.push(openSub);
	  this.subs.push(errorSub);
	
	  return this;
	};
	
	/**
	 * Called upon transport open.
	 *
	 * @api private
	 */
	
	Manager.prototype.onopen = function () {
	  debug('open');
	
	  // clear old subs
	  this.cleanup();
	
	  // mark as open
	  this.readyState = 'open';
	  this.emit('open');
	
	  // add new subs
	  var socket = this.engine;
	  this.subs.push(on(socket, 'data', bind(this, 'ondata')));
	  this.subs.push(on(socket, 'ping', bind(this, 'onping')));
	  this.subs.push(on(socket, 'pong', bind(this, 'onpong')));
	  this.subs.push(on(socket, 'error', bind(this, 'onerror')));
	  this.subs.push(on(socket, 'close', bind(this, 'onclose')));
	  this.subs.push(on(this.decoder, 'decoded', bind(this, 'ondecoded')));
	};
	
	/**
	 * Called upon a ping.
	 *
	 * @api private
	 */
	
	Manager.prototype.onping = function () {
	  this.lastPing = new Date();
	  this.emitAll('ping');
	};
	
	/**
	 * Called upon a packet.
	 *
	 * @api private
	 */
	
	Manager.prototype.onpong = function () {
	  this.emitAll('pong', new Date() - this.lastPing);
	};
	
	/**
	 * Called with data.
	 *
	 * @api private
	 */
	
	Manager.prototype.ondata = function (data) {
	  this.decoder.add(data);
	};
	
	/**
	 * Called when parser fully decodes a packet.
	 *
	 * @api private
	 */
	
	Manager.prototype.ondecoded = function (packet) {
	  this.emit('packet', packet);
	};
	
	/**
	 * Called upon socket error.
	 *
	 * @api private
	 */
	
	Manager.prototype.onerror = function (err) {
	  debug('error', err);
	  this.emitAll('error', err);
	};
	
	/**
	 * Creates a new socket for the given `nsp`.
	 *
	 * @return {Socket}
	 * @api public
	 */
	
	Manager.prototype.socket = function (nsp, opts) {
	  var socket = this.nsps[nsp];
	  if (!socket) {
	    socket = new Socket(this, nsp, opts);
	    this.nsps[nsp] = socket;
	    var self = this;
	    socket.on('connecting', onConnecting);
	    socket.on('connect', function () {
	      socket.id = self.engine.id;
	    });
	
	    if (this.autoConnect) {
	      // manually call here since connecting evnet is fired before listening
	      onConnecting();
	    }
	  }
	
	  function onConnecting () {
	    if (!~indexOf(self.connecting, socket)) {
	      self.connecting.push(socket);
	    }
	  }
	
	  return socket;
	};
	
	/**
	 * Called upon a socket close.
	 *
	 * @param {Socket} socket
	 */
	
	Manager.prototype.destroy = function (socket) {
	  var index = indexOf(this.connecting, socket);
	  if (~index) this.connecting.splice(index, 1);
	  if (this.connecting.length) return;
	
	  this.close();
	};
	
	/**
	 * Writes a packet.
	 *
	 * @param {Object} packet
	 * @api private
	 */
	
	Manager.prototype.packet = function (packet) {
	  debug('writing packet %j', packet);
	  var self = this;
	  if (packet.query && packet.type === 0) packet.nsp += '?' + packet.query;
	
	  if (!self.encoding) {
	    // encode, then write to engine with result
	    self.encoding = true;
	    this.encoder.encode(packet, function (encodedPackets) {
	      for (var i = 0; i < encodedPackets.length; i++) {
	        self.engine.write(encodedPackets[i], packet.options);
	      }
	      self.encoding = false;
	      self.processPacketQueue();
	    });
	  } else { // add packet to the queue
	    self.packetBuffer.push(packet);
	  }
	};
	
	/**
	 * If packet buffer is non-empty, begins encoding the
	 * next packet in line.
	 *
	 * @api private
	 */
	
	Manager.prototype.processPacketQueue = function () {
	  if (this.packetBuffer.length > 0 && !this.encoding) {
	    var pack = this.packetBuffer.shift();
	    this.packet(pack);
	  }
	};
	
	/**
	 * Clean up transport subscriptions and packet buffer.
	 *
	 * @api private
	 */
	
	Manager.prototype.cleanup = function () {
	  debug('cleanup');
	
	  var subsLength = this.subs.length;
	  for (var i = 0; i < subsLength; i++) {
	    var sub = this.subs.shift();
	    sub.destroy();
	  }
	
	  this.packetBuffer = [];
	  this.encoding = false;
	  this.lastPing = null;
	
	  this.decoder.destroy();
	};
	
	/**
	 * Close the current socket.
	 *
	 * @api private
	 */
	
	Manager.prototype.close =
	Manager.prototype.disconnect = function () {
	  debug('disconnect');
	  this.skipReconnect = true;
	  this.reconnecting = false;
	  if ('opening' === this.readyState) {
	    // `onclose` will not fire because
	    // an open event never happened
	    this.cleanup();
	  }
	  this.backoff.reset();
	  this.readyState = 'closed';
	  if (this.engine) this.engine.close();
	};
	
	/**
	 * Called upon engine close.
	 *
	 * @api private
	 */
	
	Manager.prototype.onclose = function (reason) {
	  debug('onclose');
	
	  this.cleanup();
	  this.backoff.reset();
	  this.readyState = 'closed';
	  this.emit('close', reason);
	
	  if (this._reconnection && !this.skipReconnect) {
	    this.reconnect();
	  }
	};
	
	/**
	 * Attempt a reconnection.
	 *
	 * @api private
	 */
	
	Manager.prototype.reconnect = function () {
	  if (this.reconnecting || this.skipReconnect) return this;
	
	  var self = this;
	
	  if (this.backoff.attempts >= this._reconnectionAttempts) {
	    debug('reconnect failed');
	    this.backoff.reset();
	    this.emitAll('reconnect_failed');
	    this.reconnecting = false;
	  } else {
	    var delay = this.backoff.duration();
	    debug('will wait %dms before reconnect attempt', delay);
	
	    this.reconnecting = true;
	    var timer = setTimeout(function () {
	      if (self.skipReconnect) return;
	
	      debug('attempting reconnect');
	      self.emitAll('reconnect_attempt', self.backoff.attempts);
	      self.emitAll('reconnecting', self.backoff.attempts);
	
	      // check again for the case socket closed in above events
	      if (self.skipReconnect) return;
	
	      self.open(function (err) {
	        if (err) {
	          debug('reconnect attempt error');
	          self.reconnecting = false;
	          self.reconnect();
	          self.emitAll('reconnect_error', err.data);
	        } else {
	          debug('reconnect success');
	          self.onreconnect();
	        }
	      });
	    }, delay);
	
	    this.subs.push({
	      destroy: function () {
	        clearTimeout(timer);
	      }
	    });
	  }
	};
	
	/**
	 * Called upon successful reconnect.
	 *
	 * @api private
	 */
	
	Manager.prototype.onreconnect = function () {
	  var attempt = this.backoff.attempts;
	  this.reconnecting = false;
	  this.backoff.reset();
	  this.updateSocketIds();
	  this.emitAll('reconnect', attempt);
	};


/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

	
	module.exports = __webpack_require__(132);


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

	
	module.exports = __webpack_require__(133);
	
	/**
	 * Exports parser
	 *
	 * @api public
	 *
	 */
	module.exports.parser = __webpack_require__(140);


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * Module dependencies.
	 */
	
	var transports = __webpack_require__(134);
	var Emitter = __webpack_require__(148);
	var debug = __webpack_require__(152)('engine.io-client:socket');
	var index = __webpack_require__(158);
	var parser = __webpack_require__(140);
	var parseuri = __webpack_require__(115);
	var parsejson = __webpack_require__(159);
	var parseqs = __webpack_require__(149);
	
	/**
	 * Module exports.
	 */
	
	module.exports = Socket;
	
	/**
	 * Socket constructor.
	 *
	 * @param {String|Object} uri or options
	 * @param {Object} options
	 * @api public
	 */
	
	function Socket (uri, opts) {
	  if (!(this instanceof Socket)) return new Socket(uri, opts);
	
	  opts = opts || {};
	
	  if (uri && 'object' === typeof uri) {
	    opts = uri;
	    uri = null;
	  }
	
	  if (uri) {
	    uri = parseuri(uri);
	    opts.hostname = uri.host;
	    opts.secure = uri.protocol === 'https' || uri.protocol === 'wss';
	    opts.port = uri.port;
	    if (uri.query) opts.query = uri.query;
	  } else if (opts.host) {
	    opts.hostname = parseuri(opts.host).host;
	  }
	
	  this.secure = null != opts.secure ? opts.secure
	    : (global.location && 'https:' === location.protocol);
	
	  if (opts.hostname && !opts.port) {
	    // if no port is specified manually, use the protocol default
	    opts.port = this.secure ? '443' : '80';
	  }
	
	  this.agent = opts.agent || false;
	  this.hostname = opts.hostname ||
	    (global.location ? location.hostname : 'localhost');
	  this.port = opts.port || (global.location && location.port
	      ? location.port
	      : (this.secure ? 443 : 80));
	  this.query = opts.query || {};
	  if ('string' === typeof this.query) this.query = parseqs.decode(this.query);
	  this.upgrade = false !== opts.upgrade;
	  this.path = (opts.path || '/engine.io').replace(/\/$/, '') + '/';
	  this.forceJSONP = !!opts.forceJSONP;
	  this.jsonp = false !== opts.jsonp;
	  this.forceBase64 = !!opts.forceBase64;
	  this.enablesXDR = !!opts.enablesXDR;
	  this.timestampParam = opts.timestampParam || 't';
	  this.timestampRequests = opts.timestampRequests;
	  this.transports = opts.transports || ['polling', 'websocket'];
	  this.readyState = '';
	  this.writeBuffer = [];
	  this.prevBufferLen = 0;
	  this.policyPort = opts.policyPort || 843;
	  this.rememberUpgrade = opts.rememberUpgrade || false;
	  this.binaryType = null;
	  this.onlyBinaryUpgrades = opts.onlyBinaryUpgrades;
	  this.perMessageDeflate = false !== opts.perMessageDeflate ? (opts.perMessageDeflate || {}) : false;
	
	  if (true === this.perMessageDeflate) this.perMessageDeflate = {};
	  if (this.perMessageDeflate && null == this.perMessageDeflate.threshold) {
	    this.perMessageDeflate.threshold = 1024;
	  }
	
	  // SSL options for Node.js client
	  this.pfx = opts.pfx || null;
	  this.key = opts.key || null;
	  this.passphrase = opts.passphrase || null;
	  this.cert = opts.cert || null;
	  this.ca = opts.ca || null;
	  this.ciphers = opts.ciphers || null;
	  this.rejectUnauthorized = opts.rejectUnauthorized === undefined ? null : opts.rejectUnauthorized;
	  this.forceNode = !!opts.forceNode;
	
	  // other options for Node.js client
	  var freeGlobal = typeof global === 'object' && global;
	  if (freeGlobal.global === freeGlobal) {
	    if (opts.extraHeaders && Object.keys(opts.extraHeaders).length > 0) {
	      this.extraHeaders = opts.extraHeaders;
	    }
	
	    if (opts.localAddress) {
	      this.localAddress = opts.localAddress;
	    }
	  }
	
	  // set on handshake
	  this.id = null;
	  this.upgrades = null;
	  this.pingInterval = null;
	  this.pingTimeout = null;
	
	  // set on heartbeat
	  this.pingIntervalTimer = null;
	  this.pingTimeoutTimer = null;
	
	  this.open();
	}
	
	Socket.priorWebsocketSuccess = false;
	
	/**
	 * Mix in `Emitter`.
	 */
	
	Emitter(Socket.prototype);
	
	/**
	 * Protocol version.
	 *
	 * @api public
	 */
	
	Socket.protocol = parser.protocol; // this is an int
	
	/**
	 * Expose deps for legacy compatibility
	 * and standalone browser access.
	 */
	
	Socket.Socket = Socket;
	Socket.Transport = __webpack_require__(139);
	Socket.transports = __webpack_require__(134);
	Socket.parser = __webpack_require__(140);
	
	/**
	 * Creates transport of the given type.
	 *
	 * @param {String} transport name
	 * @return {Transport}
	 * @api private
	 */
	
	Socket.prototype.createTransport = function (name) {
	  debug('creating transport "%s"', name);
	  var query = clone(this.query);
	
	  // append engine.io protocol identifier
	  query.EIO = parser.protocol;
	
	  // transport name
	  query.transport = name;
	
	  // session id if we already have one
	  if (this.id) query.sid = this.id;
	
	  var transport = new transports[name]({
	    agent: this.agent,
	    hostname: this.hostname,
	    port: this.port,
	    secure: this.secure,
	    path: this.path,
	    query: query,
	    forceJSONP: this.forceJSONP,
	    jsonp: this.jsonp,
	    forceBase64: this.forceBase64,
	    enablesXDR: this.enablesXDR,
	    timestampRequests: this.timestampRequests,
	    timestampParam: this.timestampParam,
	    policyPort: this.policyPort,
	    socket: this,
	    pfx: this.pfx,
	    key: this.key,
	    passphrase: this.passphrase,
	    cert: this.cert,
	    ca: this.ca,
	    ciphers: this.ciphers,
	    rejectUnauthorized: this.rejectUnauthorized,
	    perMessageDeflate: this.perMessageDeflate,
	    extraHeaders: this.extraHeaders,
	    forceNode: this.forceNode,
	    localAddress: this.localAddress
	  });
	
	  return transport;
	};
	
	function clone (obj) {
	  var o = {};
	  for (var i in obj) {
	    if (obj.hasOwnProperty(i)) {
	      o[i] = obj[i];
	    }
	  }
	  return o;
	}
	
	/**
	 * Initializes transport to use and starts probe.
	 *
	 * @api private
	 */
	Socket.prototype.open = function () {
	  var transport;
	  if (this.rememberUpgrade && Socket.priorWebsocketSuccess && this.transports.indexOf('websocket') !== -1) {
	    transport = 'websocket';
	  } else if (0 === this.transports.length) {
	    // Emit error on next tick so it can be listened to
	    var self = this;
	    setTimeout(function () {
	      self.emit('error', 'No transports available');
	    }, 0);
	    return;
	  } else {
	    transport = this.transports[0];
	  }
	  this.readyState = 'opening';
	
	  // Retry with the next transport if the transport is disabled (jsonp: false)
	  try {
	    transport = this.createTransport(transport);
	  } catch (e) {
	    this.transports.shift();
	    this.open();
	    return;
	  }
	
	  transport.open();
	  this.setTransport(transport);
	};
	
	/**
	 * Sets the current transport. Disables the existing one (if any).
	 *
	 * @api private
	 */
	
	Socket.prototype.setTransport = function (transport) {
	  debug('setting transport %s', transport.name);
	  var self = this;
	
	  if (this.transport) {
	    debug('clearing existing transport %s', this.transport.name);
	    this.transport.removeAllListeners();
	  }
	
	  // set up transport
	  this.transport = transport;
	
	  // set up transport listeners
	  transport
	  .on('drain', function () {
	    self.onDrain();
	  })
	  .on('packet', function (packet) {
	    self.onPacket(packet);
	  })
	  .on('error', function (e) {
	    self.onError(e);
	  })
	  .on('close', function () {
	    self.onClose('transport close');
	  });
	};
	
	/**
	 * Probes a transport.
	 *
	 * @param {String} transport name
	 * @api private
	 */
	
	Socket.prototype.probe = function (name) {
	  debug('probing transport "%s"', name);
	  var transport = this.createTransport(name, { probe: 1 });
	  var failed = false;
	  var self = this;
	
	  Socket.priorWebsocketSuccess = false;
	
	  function onTransportOpen () {
	    if (self.onlyBinaryUpgrades) {
	      var upgradeLosesBinary = !this.supportsBinary && self.transport.supportsBinary;
	      failed = failed || upgradeLosesBinary;
	    }
	    if (failed) return;
	
	    debug('probe transport "%s" opened', name);
	    transport.send([{ type: 'ping', data: 'probe' }]);
	    transport.once('packet', function (msg) {
	      if (failed) return;
	      if ('pong' === msg.type && 'probe' === msg.data) {
	        debug('probe transport "%s" pong', name);
	        self.upgrading = true;
	        self.emit('upgrading', transport);
	        if (!transport) return;
	        Socket.priorWebsocketSuccess = 'websocket' === transport.name;
	
	        debug('pausing current transport "%s"', self.transport.name);
	        self.transport.pause(function () {
	          if (failed) return;
	          if ('closed' === self.readyState) return;
	          debug('changing transport and sending upgrade packet');
	
	          cleanup();
	
	          self.setTransport(transport);
	          transport.send([{ type: 'upgrade' }]);
	          self.emit('upgrade', transport);
	          transport = null;
	          self.upgrading = false;
	          self.flush();
	        });
	      } else {
	        debug('probe transport "%s" failed', name);
	        var err = new Error('probe error');
	        err.transport = transport.name;
	        self.emit('upgradeError', err);
	      }
	    });
	  }
	
	  function freezeTransport () {
	    if (failed) return;
	
	    // Any callback called by transport should be ignored since now
	    failed = true;
	
	    cleanup();
	
	    transport.close();
	    transport = null;
	  }
	
	  // Handle any error that happens while probing
	  function onerror (err) {
	    var error = new Error('probe error: ' + err);
	    error.transport = transport.name;
	
	    freezeTransport();
	
	    debug('probe transport "%s" failed because of error: %s', name, err);
	
	    self.emit('upgradeError', error);
	  }
	
	  function onTransportClose () {
	    onerror('transport closed');
	  }
	
	  // When the socket is closed while we're probing
	  function onclose () {
	    onerror('socket closed');
	  }
	
	  // When the socket is upgraded while we're probing
	  function onupgrade (to) {
	    if (transport && to.name !== transport.name) {
	      debug('"%s" works - aborting "%s"', to.name, transport.name);
	      freezeTransport();
	    }
	  }
	
	  // Remove all listeners on the transport and on self
	  function cleanup () {
	    transport.removeListener('open', onTransportOpen);
	    transport.removeListener('error', onerror);
	    transport.removeListener('close', onTransportClose);
	    self.removeListener('close', onclose);
	    self.removeListener('upgrading', onupgrade);
	  }
	
	  transport.once('open', onTransportOpen);
	  transport.once('error', onerror);
	  transport.once('close', onTransportClose);
	
	  this.once('close', onclose);
	  this.once('upgrading', onupgrade);
	
	  transport.open();
	};
	
	/**
	 * Called when connection is deemed open.
	 *
	 * @api public
	 */
	
	Socket.prototype.onOpen = function () {
	  debug('socket open');
	  this.readyState = 'open';
	  Socket.priorWebsocketSuccess = 'websocket' === this.transport.name;
	  this.emit('open');
	  this.flush();
	
	  // we check for `readyState` in case an `open`
	  // listener already closed the socket
	  if ('open' === this.readyState && this.upgrade && this.transport.pause) {
	    debug('starting upgrade probes');
	    for (var i = 0, l = this.upgrades.length; i < l; i++) {
	      this.probe(this.upgrades[i]);
	    }
	  }
	};
	
	/**
	 * Handles a packet.
	 *
	 * @api private
	 */
	
	Socket.prototype.onPacket = function (packet) {
	  if ('opening' === this.readyState || 'open' === this.readyState ||
	      'closing' === this.readyState) {
	    debug('socket receive: type "%s", data "%s"', packet.type, packet.data);
	
	    this.emit('packet', packet);
	
	    // Socket is live - any packet counts
	    this.emit('heartbeat');
	
	    switch (packet.type) {
	      case 'open':
	        this.onHandshake(parsejson(packet.data));
	        break;
	
	      case 'pong':
	        this.setPing();
	        this.emit('pong');
	        break;
	
	      case 'error':
	        var err = new Error('server error');
	        err.code = packet.data;
	        this.onError(err);
	        break;
	
	      case 'message':
	        this.emit('data', packet.data);
	        this.emit('message', packet.data);
	        break;
	    }
	  } else {
	    debug('packet received with socket readyState "%s"', this.readyState);
	  }
	};
	
	/**
	 * Called upon handshake completion.
	 *
	 * @param {Object} handshake obj
	 * @api private
	 */
	
	Socket.prototype.onHandshake = function (data) {
	  this.emit('handshake', data);
	  this.id = data.sid;
	  this.transport.query.sid = data.sid;
	  this.upgrades = this.filterUpgrades(data.upgrades);
	  this.pingInterval = data.pingInterval;
	  this.pingTimeout = data.pingTimeout;
	  this.onOpen();
	  // In case open handler closes socket
	  if ('closed' === this.readyState) return;
	  this.setPing();
	
	  // Prolong liveness of socket on heartbeat
	  this.removeListener('heartbeat', this.onHeartbeat);
	  this.on('heartbeat', this.onHeartbeat);
	};
	
	/**
	 * Resets ping timeout.
	 *
	 * @api private
	 */
	
	Socket.prototype.onHeartbeat = function (timeout) {
	  clearTimeout(this.pingTimeoutTimer);
	  var self = this;
	  self.pingTimeoutTimer = setTimeout(function () {
	    if ('closed' === self.readyState) return;
	    self.onClose('ping timeout');
	  }, timeout || (self.pingInterval + self.pingTimeout));
	};
	
	/**
	 * Pings server every `this.pingInterval` and expects response
	 * within `this.pingTimeout` or closes connection.
	 *
	 * @api private
	 */
	
	Socket.prototype.setPing = function () {
	  var self = this;
	  clearTimeout(self.pingIntervalTimer);
	  self.pingIntervalTimer = setTimeout(function () {
	    debug('writing ping packet - expecting pong within %sms', self.pingTimeout);
	    self.ping();
	    self.onHeartbeat(self.pingTimeout);
	  }, self.pingInterval);
	};
	
	/**
	* Sends a ping packet.
	*
	* @api private
	*/
	
	Socket.prototype.ping = function () {
	  var self = this;
	  this.sendPacket('ping', function () {
	    self.emit('ping');
	  });
	};
	
	/**
	 * Called on `drain` event
	 *
	 * @api private
	 */
	
	Socket.prototype.onDrain = function () {
	  this.writeBuffer.splice(0, this.prevBufferLen);
	
	  // setting prevBufferLen = 0 is very important
	  // for example, when upgrading, upgrade packet is sent over,
	  // and a nonzero prevBufferLen could cause problems on `drain`
	  this.prevBufferLen = 0;
	
	  if (0 === this.writeBuffer.length) {
	    this.emit('drain');
	  } else {
	    this.flush();
	  }
	};
	
	/**
	 * Flush write buffers.
	 *
	 * @api private
	 */
	
	Socket.prototype.flush = function () {
	  if ('closed' !== this.readyState && this.transport.writable &&
	    !this.upgrading && this.writeBuffer.length) {
	    debug('flushing %d packets in socket', this.writeBuffer.length);
	    this.transport.send(this.writeBuffer);
	    // keep track of current length of writeBuffer
	    // splice writeBuffer and callbackBuffer on `drain`
	    this.prevBufferLen = this.writeBuffer.length;
	    this.emit('flush');
	  }
	};
	
	/**
	 * Sends a message.
	 *
	 * @param {String} message.
	 * @param {Function} callback function.
	 * @param {Object} options.
	 * @return {Socket} for chaining.
	 * @api public
	 */
	
	Socket.prototype.write =
	Socket.prototype.send = function (msg, options, fn) {
	  this.sendPacket('message', msg, options, fn);
	  return this;
	};
	
	/**
	 * Sends a packet.
	 *
	 * @param {String} packet type.
	 * @param {String} data.
	 * @param {Object} options.
	 * @param {Function} callback function.
	 * @api private
	 */
	
	Socket.prototype.sendPacket = function (type, data, options, fn) {
	  if ('function' === typeof data) {
	    fn = data;
	    data = undefined;
	  }
	
	  if ('function' === typeof options) {
	    fn = options;
	    options = null;
	  }
	
	  if ('closing' === this.readyState || 'closed' === this.readyState) {
	    return;
	  }
	
	  options = options || {};
	  options.compress = false !== options.compress;
	
	  var packet = {
	    type: type,
	    data: data,
	    options: options
	  };
	  this.emit('packetCreate', packet);
	  this.writeBuffer.push(packet);
	  if (fn) this.once('flush', fn);
	  this.flush();
	};
	
	/**
	 * Closes the connection.
	 *
	 * @api private
	 */
	
	Socket.prototype.close = function () {
	  if ('opening' === this.readyState || 'open' === this.readyState) {
	    this.readyState = 'closing';
	
	    var self = this;
	
	    if (this.writeBuffer.length) {
	      this.once('drain', function () {
	        if (this.upgrading) {
	          waitForUpgrade();
	        } else {
	          close();
	        }
	      });
	    } else if (this.upgrading) {
	      waitForUpgrade();
	    } else {
	      close();
	    }
	  }
	
	  function close () {
	    self.onClose('forced close');
	    debug('socket closing - telling transport to close');
	    self.transport.close();
	  }
	
	  function cleanupAndClose () {
	    self.removeListener('upgrade', cleanupAndClose);
	    self.removeListener('upgradeError', cleanupAndClose);
	    close();
	  }
	
	  function waitForUpgrade () {
	    // wait for upgrade to finish since we can't send packets while pausing a transport
	    self.once('upgrade', cleanupAndClose);
	    self.once('upgradeError', cleanupAndClose);
	  }
	
	  return this;
	};
	
	/**
	 * Called upon transport error
	 *
	 * @api private
	 */
	
	Socket.prototype.onError = function (err) {
	  debug('socket error %j', err);
	  Socket.priorWebsocketSuccess = false;
	  this.emit('error', err);
	  this.onClose('transport error', err);
	};
	
	/**
	 * Called upon transport close.
	 *
	 * @api private
	 */
	
	Socket.prototype.onClose = function (reason, desc) {
	  if ('opening' === this.readyState || 'open' === this.readyState || 'closing' === this.readyState) {
	    debug('socket close with reason: "%s"', reason);
	    var self = this;
	
	    // clear timers
	    clearTimeout(this.pingIntervalTimer);
	    clearTimeout(this.pingTimeoutTimer);
	
	    // stop event from firing again for transport
	    this.transport.removeAllListeners('close');
	
	    // ensure transport won't stay open
	    this.transport.close();
	
	    // ignore further transport communication
	    this.transport.removeAllListeners();
	
	    // set ready state
	    this.readyState = 'closed';
	
	    // clear session id
	    this.id = null;
	
	    // emit close event
	    this.emit('close', reason, desc);
	
	    // clean buffers after, so users can still
	    // grab the buffers on `close` event
	    self.writeBuffer = [];
	    self.prevBufferLen = 0;
	  }
	};
	
	/**
	 * Filters upgrades, returning only those matching client transports.
	 *
	 * @param {Array} server upgrades
	 * @api private
	 *
	 */
	
	Socket.prototype.filterUpgrades = function (upgrades) {
	  var filteredUpgrades = [];
	  for (var i = 0, j = upgrades.length; i < j; i++) {
	    if (~index(this.transports, upgrades[i])) filteredUpgrades.push(upgrades[i]);
	  }
	  return filteredUpgrades;
	};
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * Module dependencies
	 */
	
	var XMLHttpRequest = __webpack_require__(135);
	var XHR = __webpack_require__(137);
	var JSONP = __webpack_require__(155);
	var websocket = __webpack_require__(156);
	
	/**
	 * Export transports.
	 */
	
	exports.polling = polling;
	exports.websocket = websocket;
	
	/**
	 * Polling transport polymorphic constructor.
	 * Decides on xhr vs jsonp based on feature detection.
	 *
	 * @api private
	 */
	
	function polling (opts) {
	  var xhr;
	  var xd = false;
	  var xs = false;
	  var jsonp = false !== opts.jsonp;
	
	  if (global.location) {
	    var isSSL = 'https:' === location.protocol;
	    var port = location.port;
	
	    // some user agents have empty `location.port`
	    if (!port) {
	      port = isSSL ? 443 : 80;
	    }
	
	    xd = opts.hostname !== location.hostname || port !== opts.port;
	    xs = opts.secure !== isSSL;
	  }
	
	  opts.xdomain = xd;
	  opts.xscheme = xs;
	  xhr = new XMLHttpRequest(opts);
	
	  if ('open' in xhr && !opts.forceJSONP) {
	    return new XHR(opts);
	  } else {
	    if (!jsonp) throw new Error('JSONP disabled');
	    return new JSONP(opts);
	  }
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {// browser shim for xmlhttprequest module
	
	var hasCORS = __webpack_require__(136);
	
	module.exports = function (opts) {
	  var xdomain = opts.xdomain;
	
	  // scheme must be same when usign XDomainRequest
	  // http://blogs.msdn.com/b/ieinternals/archive/2010/05/13/xdomainrequest-restrictions-limitations-and-workarounds.aspx
	  var xscheme = opts.xscheme;
	
	  // XDomainRequest has a flow of not sending cookie, therefore it should be disabled as a default.
	  // https://github.com/Automattic/engine.io-client/pull/217
	  var enablesXDR = opts.enablesXDR;
	
	  // XMLHttpRequest can be disabled on IE
	  try {
	    if ('undefined' !== typeof XMLHttpRequest && (!xdomain || hasCORS)) {
	      return new XMLHttpRequest();
	    }
	  } catch (e) { }
	
	  // Use XDomainRequest for IE8 if enablesXDR is true
	  // because loading bar keeps flashing when using jsonp-polling
	  // https://github.com/yujiosaka/socke.io-ie8-loading-example
	  try {
	    if ('undefined' !== typeof XDomainRequest && !xscheme && enablesXDR) {
	      return new XDomainRequest();
	    }
	  } catch (e) { }
	
	  if (!xdomain) {
	    try {
	      return new global[['Active'].concat('Object').join('X')]('Microsoft.XMLHTTP');
	    } catch (e) { }
	  }
	};
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 136 */
/***/ (function(module, exports) {

	
	/**
	 * Module exports.
	 *
	 * Logic borrowed from Modernizr:
	 *
	 *   - https://github.com/Modernizr/Modernizr/blob/master/feature-detects/cors.js
	 */
	
	try {
	  module.exports = typeof XMLHttpRequest !== 'undefined' &&
	    'withCredentials' in new XMLHttpRequest();
	} catch (err) {
	  // if XMLHttp support is disabled in IE then it will throw
	  // when trying to create
	  module.exports = false;
	}


/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * Module requirements.
	 */
	
	var XMLHttpRequest = __webpack_require__(135);
	var Polling = __webpack_require__(138);
	var Emitter = __webpack_require__(148);
	var inherit = __webpack_require__(150);
	var debug = __webpack_require__(152)('engine.io-client:polling-xhr');
	
	/**
	 * Module exports.
	 */
	
	module.exports = XHR;
	module.exports.Request = Request;
	
	/**
	 * Empty function
	 */
	
	function empty () {}
	
	/**
	 * XHR Polling constructor.
	 *
	 * @param {Object} opts
	 * @api public
	 */
	
	function XHR (opts) {
	  Polling.call(this, opts);
	  this.requestTimeout = opts.requestTimeout;
	
	  if (global.location) {
	    var isSSL = 'https:' === location.protocol;
	    var port = location.port;
	
	    // some user agents have empty `location.port`
	    if (!port) {
	      port = isSSL ? 443 : 80;
	    }
	
	    this.xd = opts.hostname !== global.location.hostname ||
	      port !== opts.port;
	    this.xs = opts.secure !== isSSL;
	  } else {
	    this.extraHeaders = opts.extraHeaders;
	  }
	}
	
	/**
	 * Inherits from Polling.
	 */
	
	inherit(XHR, Polling);
	
	/**
	 * XHR supports binary
	 */
	
	XHR.prototype.supportsBinary = true;
	
	/**
	 * Creates a request.
	 *
	 * @param {String} method
	 * @api private
	 */
	
	XHR.prototype.request = function (opts) {
	  opts = opts || {};
	  opts.uri = this.uri();
	  opts.xd = this.xd;
	  opts.xs = this.xs;
	  opts.agent = this.agent || false;
	  opts.supportsBinary = this.supportsBinary;
	  opts.enablesXDR = this.enablesXDR;
	
	  // SSL options for Node.js client
	  opts.pfx = this.pfx;
	  opts.key = this.key;
	  opts.passphrase = this.passphrase;
	  opts.cert = this.cert;
	  opts.ca = this.ca;
	  opts.ciphers = this.ciphers;
	  opts.rejectUnauthorized = this.rejectUnauthorized;
	  opts.requestTimeout = this.requestTimeout;
	
	  // other options for Node.js client
	  opts.extraHeaders = this.extraHeaders;
	
	  return new Request(opts);
	};
	
	/**
	 * Sends data.
	 *
	 * @param {String} data to send.
	 * @param {Function} called upon flush.
	 * @api private
	 */
	
	XHR.prototype.doWrite = function (data, fn) {
	  var isBinary = typeof data !== 'string' && data !== undefined;
	  var req = this.request({ method: 'POST', data: data, isBinary: isBinary });
	  var self = this;
	  req.on('success', fn);
	  req.on('error', function (err) {
	    self.onError('xhr post error', err);
	  });
	  this.sendXhr = req;
	};
	
	/**
	 * Starts a poll cycle.
	 *
	 * @api private
	 */
	
	XHR.prototype.doPoll = function () {
	  debug('xhr poll');
	  var req = this.request();
	  var self = this;
	  req.on('data', function (data) {
	    self.onData(data);
	  });
	  req.on('error', function (err) {
	    self.onError('xhr poll error', err);
	  });
	  this.pollXhr = req;
	};
	
	/**
	 * Request constructor
	 *
	 * @param {Object} options
	 * @api public
	 */
	
	function Request (opts) {
	  this.method = opts.method || 'GET';
	  this.uri = opts.uri;
	  this.xd = !!opts.xd;
	  this.xs = !!opts.xs;
	  this.async = false !== opts.async;
	  this.data = undefined !== opts.data ? opts.data : null;
	  this.agent = opts.agent;
	  this.isBinary = opts.isBinary;
	  this.supportsBinary = opts.supportsBinary;
	  this.enablesXDR = opts.enablesXDR;
	  this.requestTimeout = opts.requestTimeout;
	
	  // SSL options for Node.js client
	  this.pfx = opts.pfx;
	  this.key = opts.key;
	  this.passphrase = opts.passphrase;
	  this.cert = opts.cert;
	  this.ca = opts.ca;
	  this.ciphers = opts.ciphers;
	  this.rejectUnauthorized = opts.rejectUnauthorized;
	
	  // other options for Node.js client
	  this.extraHeaders = opts.extraHeaders;
	
	  this.create();
	}
	
	/**
	 * Mix in `Emitter`.
	 */
	
	Emitter(Request.prototype);
	
	/**
	 * Creates the XHR object and sends the request.
	 *
	 * @api private
	 */
	
	Request.prototype.create = function () {
	  var opts = { agent: this.agent, xdomain: this.xd, xscheme: this.xs, enablesXDR: this.enablesXDR };
	
	  // SSL options for Node.js client
	  opts.pfx = this.pfx;
	  opts.key = this.key;
	  opts.passphrase = this.passphrase;
	  opts.cert = this.cert;
	  opts.ca = this.ca;
	  opts.ciphers = this.ciphers;
	  opts.rejectUnauthorized = this.rejectUnauthorized;
	
	  var xhr = this.xhr = new XMLHttpRequest(opts);
	  var self = this;
	
	  try {
	    debug('xhr open %s: %s', this.method, this.uri);
	    xhr.open(this.method, this.uri, this.async);
	    try {
	      if (this.extraHeaders) {
	        xhr.setDisableHeaderCheck(true);
	        for (var i in this.extraHeaders) {
	          if (this.extraHeaders.hasOwnProperty(i)) {
	            xhr.setRequestHeader(i, this.extraHeaders[i]);
	          }
	        }
	      }
	    } catch (e) {}
	    if (this.supportsBinary) {
	      // This has to be done after open because Firefox is stupid
	      // http://stackoverflow.com/questions/13216903/get-binary-data-with-xmlhttprequest-in-a-firefox-extension
	      xhr.responseType = 'arraybuffer';
	    }
	
	    if ('POST' === this.method) {
	      try {
	        if (this.isBinary) {
	          xhr.setRequestHeader('Content-type', 'application/octet-stream');
	        } else {
	          xhr.setRequestHeader('Content-type', 'text/plain;charset=UTF-8');
	        }
	      } catch (e) {}
	    }
	
	    try {
	      xhr.setRequestHeader('Accept', '*/*');
	    } catch (e) {}
	
	    // ie6 check
	    if ('withCredentials' in xhr) {
	      xhr.withCredentials = true;
	    }
	
	    if (this.requestTimeout) {
	      xhr.timeout = this.requestTimeout;
	    }
	
	    if (this.hasXDR()) {
	      xhr.onload = function () {
	        self.onLoad();
	      };
	      xhr.onerror = function () {
	        self.onError(xhr.responseText);
	      };
	    } else {
	      xhr.onreadystatechange = function () {
	        if (4 !== xhr.readyState) return;
	        if (200 === xhr.status || 1223 === xhr.status) {
	          self.onLoad();
	        } else {
	          // make sure the `error` event handler that's user-set
	          // does not throw in the same tick and gets caught here
	          setTimeout(function () {
	            self.onError(xhr.status);
	          }, 0);
	        }
	      };
	    }
	
	    debug('xhr data %s', this.data);
	    xhr.send(this.data);
	  } catch (e) {
	    // Need to defer since .create() is called directly fhrom the constructor
	    // and thus the 'error' event can only be only bound *after* this exception
	    // occurs.  Therefore, also, we cannot throw here at all.
	    setTimeout(function () {
	      self.onError(e);
	    }, 0);
	    return;
	  }
	
	  if (global.document) {
	    this.index = Request.requestsCount++;
	    Request.requests[this.index] = this;
	  }
	};
	
	/**
	 * Called upon successful response.
	 *
	 * @api private
	 */
	
	Request.prototype.onSuccess = function () {
	  this.emit('success');
	  this.cleanup();
	};
	
	/**
	 * Called if we have data.
	 *
	 * @api private
	 */
	
	Request.prototype.onData = function (data) {
	  this.emit('data', data);
	  this.onSuccess();
	};
	
	/**
	 * Called upon error.
	 *
	 * @api private
	 */
	
	Request.prototype.onError = function (err) {
	  this.emit('error', err);
	  this.cleanup(true);
	};
	
	/**
	 * Cleans up house.
	 *
	 * @api private
	 */
	
	Request.prototype.cleanup = function (fromError) {
	  if ('undefined' === typeof this.xhr || null === this.xhr) {
	    return;
	  }
	  // xmlhttprequest
	  if (this.hasXDR()) {
	    this.xhr.onload = this.xhr.onerror = empty;
	  } else {
	    this.xhr.onreadystatechange = empty;
	  }
	
	  if (fromError) {
	    try {
	      this.xhr.abort();
	    } catch (e) {}
	  }
	
	  if (global.document) {
	    delete Request.requests[this.index];
	  }
	
	  this.xhr = null;
	};
	
	/**
	 * Called upon load.
	 *
	 * @api private
	 */
	
	Request.prototype.onLoad = function () {
	  var data;
	  try {
	    var contentType;
	    try {
	      contentType = this.xhr.getResponseHeader('Content-Type').split(';')[0];
	    } catch (e) {}
	    if (contentType === 'application/octet-stream') {
	      data = this.xhr.response || this.xhr.responseText;
	    } else {
	      if (!this.supportsBinary) {
	        data = this.xhr.responseText;
	      } else {
	        try {
	          data = String.fromCharCode.apply(null, new Uint8Array(this.xhr.response));
	        } catch (e) {
	          var ui8Arr = new Uint8Array(this.xhr.response);
	          var dataArray = [];
	          for (var idx = 0, length = ui8Arr.length; idx < length; idx++) {
	            dataArray.push(ui8Arr[idx]);
	          }
	
	          data = String.fromCharCode.apply(null, dataArray);
	        }
	      }
	    }
	  } catch (e) {
	    this.onError(e);
	  }
	  if (null != data) {
	    this.onData(data);
	  }
	};
	
	/**
	 * Check if it has XDomainRequest.
	 *
	 * @api private
	 */
	
	Request.prototype.hasXDR = function () {
	  return 'undefined' !== typeof global.XDomainRequest && !this.xs && this.enablesXDR;
	};
	
	/**
	 * Aborts the request.
	 *
	 * @api public
	 */
	
	Request.prototype.abort = function () {
	  this.cleanup();
	};
	
	/**
	 * Aborts pending requests when unloading the window. This is needed to prevent
	 * memory leaks (e.g. when using IE) and to ensure that no spurious error is
	 * emitted.
	 */
	
	Request.requestsCount = 0;
	Request.requests = {};
	
	if (global.document) {
	  if (global.attachEvent) {
	    global.attachEvent('onunload', unloadHandler);
	  } else if (global.addEventListener) {
	    global.addEventListener('beforeunload', unloadHandler, false);
	  }
	}
	
	function unloadHandler () {
	  for (var i in Request.requests) {
	    if (Request.requests.hasOwnProperty(i)) {
	      Request.requests[i].abort();
	    }
	  }
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */
	
	var Transport = __webpack_require__(139);
	var parseqs = __webpack_require__(149);
	var parser = __webpack_require__(140);
	var inherit = __webpack_require__(150);
	var yeast = __webpack_require__(151);
	var debug = __webpack_require__(152)('engine.io-client:polling');
	
	/**
	 * Module exports.
	 */
	
	module.exports = Polling;
	
	/**
	 * Is XHR2 supported?
	 */
	
	var hasXHR2 = (function () {
	  var XMLHttpRequest = __webpack_require__(135);
	  var xhr = new XMLHttpRequest({ xdomain: false });
	  return null != xhr.responseType;
	})();
	
	/**
	 * Polling interface.
	 *
	 * @param {Object} opts
	 * @api private
	 */
	
	function Polling (opts) {
	  var forceBase64 = (opts && opts.forceBase64);
	  if (!hasXHR2 || forceBase64) {
	    this.supportsBinary = false;
	  }
	  Transport.call(this, opts);
	}
	
	/**
	 * Inherits from Transport.
	 */
	
	inherit(Polling, Transport);
	
	/**
	 * Transport name.
	 */
	
	Polling.prototype.name = 'polling';
	
	/**
	 * Opens the socket (triggers polling). We write a PING message to determine
	 * when the transport is open.
	 *
	 * @api private
	 */
	
	Polling.prototype.doOpen = function () {
	  this.poll();
	};
	
	/**
	 * Pauses polling.
	 *
	 * @param {Function} callback upon buffers are flushed and transport is paused
	 * @api private
	 */
	
	Polling.prototype.pause = function (onPause) {
	  var self = this;
	
	  this.readyState = 'pausing';
	
	  function pause () {
	    debug('paused');
	    self.readyState = 'paused';
	    onPause();
	  }
	
	  if (this.polling || !this.writable) {
	    var total = 0;
	
	    if (this.polling) {
	      debug('we are currently polling - waiting to pause');
	      total++;
	      this.once('pollComplete', function () {
	        debug('pre-pause polling complete');
	        --total || pause();
	      });
	    }
	
	    if (!this.writable) {
	      debug('we are currently writing - waiting to pause');
	      total++;
	      this.once('drain', function () {
	        debug('pre-pause writing complete');
	        --total || pause();
	      });
	    }
	  } else {
	    pause();
	  }
	};
	
	/**
	 * Starts polling cycle.
	 *
	 * @api public
	 */
	
	Polling.prototype.poll = function () {
	  debug('polling');
	  this.polling = true;
	  this.doPoll();
	  this.emit('poll');
	};
	
	/**
	 * Overloads onData to detect payloads.
	 *
	 * @api private
	 */
	
	Polling.prototype.onData = function (data) {
	  var self = this;
	  debug('polling got data %s', data);
	  var callback = function (packet, index, total) {
	    // if its the first message we consider the transport open
	    if ('opening' === self.readyState) {
	      self.onOpen();
	    }
	
	    // if its a close packet, we close the ongoing requests
	    if ('close' === packet.type) {
	      self.onClose();
	      return false;
	    }
	
	    // otherwise bypass onData and handle the message
	    self.onPacket(packet);
	  };
	
	  // decode payload
	  parser.decodePayload(data, this.socket.binaryType, callback);
	
	  // if an event did not trigger closing
	  if ('closed' !== this.readyState) {
	    // if we got data we're not polling
	    this.polling = false;
	    this.emit('pollComplete');
	
	    if ('open' === this.readyState) {
	      this.poll();
	    } else {
	      debug('ignoring poll - transport state "%s"', this.readyState);
	    }
	  }
	};
	
	/**
	 * For polling, send a close packet.
	 *
	 * @api private
	 */
	
	Polling.prototype.doClose = function () {
	  var self = this;
	
	  function close () {
	    debug('writing close packet');
	    self.write([{ type: 'close' }]);
	  }
	
	  if ('open' === this.readyState) {
	    debug('transport open - closing');
	    close();
	  } else {
	    // in case we're trying to close while
	    // handshaking is in progress (GH-164)
	    debug('transport not open - deferring close');
	    this.once('open', close);
	  }
	};
	
	/**
	 * Writes a packets payload.
	 *
	 * @param {Array} data packets
	 * @param {Function} drain callback
	 * @api private
	 */
	
	Polling.prototype.write = function (packets) {
	  var self = this;
	  this.writable = false;
	  var callbackfn = function () {
	    self.writable = true;
	    self.emit('drain');
	  };
	
	  parser.encodePayload(packets, this.supportsBinary, function (data) {
	    self.doWrite(data, callbackfn);
	  });
	};
	
	/**
	 * Generates uri for connection.
	 *
	 * @api private
	 */
	
	Polling.prototype.uri = function () {
	  var query = this.query || {};
	  var schema = this.secure ? 'https' : 'http';
	  var port = '';
	
	  // cache busting is forced
	  if (false !== this.timestampRequests) {
	    query[this.timestampParam] = yeast();
	  }
	
	  if (!this.supportsBinary && !query.sid) {
	    query.b64 = 1;
	  }
	
	  query = parseqs.encode(query);
	
	  // avoid port if default for schema
	  if (this.port && (('https' === schema && Number(this.port) !== 443) ||
	     ('http' === schema && Number(this.port) !== 80))) {
	    port = ':' + this.port;
	  }
	
	  // prepend ? to query
	  if (query.length) {
	    query = '?' + query;
	  }
	
	  var ipv6 = this.hostname.indexOf(':') !== -1;
	  return schema + '://' + (ipv6 ? '[' + this.hostname + ']' : this.hostname) + port + this.path + query;
	};


/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */
	
	var parser = __webpack_require__(140);
	var Emitter = __webpack_require__(148);
	
	/**
	 * Module exports.
	 */
	
	module.exports = Transport;
	
	/**
	 * Transport abstract constructor.
	 *
	 * @param {Object} options.
	 * @api private
	 */
	
	function Transport (opts) {
	  this.path = opts.path;
	  this.hostname = opts.hostname;
	  this.port = opts.port;
	  this.secure = opts.secure;
	  this.query = opts.query;
	  this.timestampParam = opts.timestampParam;
	  this.timestampRequests = opts.timestampRequests;
	  this.readyState = '';
	  this.agent = opts.agent || false;
	  this.socket = opts.socket;
	  this.enablesXDR = opts.enablesXDR;
	
	  // SSL options for Node.js client
	  this.pfx = opts.pfx;
	  this.key = opts.key;
	  this.passphrase = opts.passphrase;
	  this.cert = opts.cert;
	  this.ca = opts.ca;
	  this.ciphers = opts.ciphers;
	  this.rejectUnauthorized = opts.rejectUnauthorized;
	  this.forceNode = opts.forceNode;
	
	  // other options for Node.js client
	  this.extraHeaders = opts.extraHeaders;
	  this.localAddress = opts.localAddress;
	}
	
	/**
	 * Mix in `Emitter`.
	 */
	
	Emitter(Transport.prototype);
	
	/**
	 * Emits an error.
	 *
	 * @param {String} str
	 * @return {Transport} for chaining
	 * @api public
	 */
	
	Transport.prototype.onError = function (msg, desc) {
	  var err = new Error(msg);
	  err.type = 'TransportError';
	  err.description = desc;
	  this.emit('error', err);
	  return this;
	};
	
	/**
	 * Opens the transport.
	 *
	 * @api public
	 */
	
	Transport.prototype.open = function () {
	  if ('closed' === this.readyState || '' === this.readyState) {
	    this.readyState = 'opening';
	    this.doOpen();
	  }
	
	  return this;
	};
	
	/**
	 * Closes the transport.
	 *
	 * @api private
	 */
	
	Transport.prototype.close = function () {
	  if ('opening' === this.readyState || 'open' === this.readyState) {
	    this.doClose();
	    this.onClose();
	  }
	
	  return this;
	};
	
	/**
	 * Sends multiple packets.
	 *
	 * @param {Array} packets
	 * @api private
	 */
	
	Transport.prototype.send = function (packets) {
	  if ('open' === this.readyState) {
	    this.write(packets);
	  } else {
	    throw new Error('Transport not open');
	  }
	};
	
	/**
	 * Called upon open
	 *
	 * @api private
	 */
	
	Transport.prototype.onOpen = function () {
	  this.readyState = 'open';
	  this.writable = true;
	  this.emit('open');
	};
	
	/**
	 * Called with data.
	 *
	 * @param {String} data
	 * @api private
	 */
	
	Transport.prototype.onData = function (data) {
	  var packet = parser.decodePacket(data, this.socket.binaryType);
	  this.onPacket(packet);
	};
	
	/**
	 * Called with a decoded packet.
	 */
	
	Transport.prototype.onPacket = function (packet) {
	  this.emit('packet', packet);
	};
	
	/**
	 * Called upon close.
	 *
	 * @api private
	 */
	
	Transport.prototype.onClose = function () {
	  this.readyState = 'closed';
	  this.emit('close');
	};


/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * Module dependencies.
	 */
	
	var keys = __webpack_require__(141);
	var hasBinary = __webpack_require__(142);
	var sliceBuffer = __webpack_require__(143);
	var after = __webpack_require__(144);
	var utf8 = __webpack_require__(145);
	
	var base64encoder;
	if (global && global.ArrayBuffer) {
	  base64encoder = __webpack_require__(146);
	}
	
	/**
	 * Check if we are running an android browser. That requires us to use
	 * ArrayBuffer with polling transports...
	 *
	 * http://ghinda.net/jpeg-blob-ajax-android/
	 */
	
	var isAndroid = typeof navigator !== 'undefined' && /Android/i.test(navigator.userAgent);
	
	/**
	 * Check if we are running in PhantomJS.
	 * Uploading a Blob with PhantomJS does not work correctly, as reported here:
	 * https://github.com/ariya/phantomjs/issues/11395
	 * @type boolean
	 */
	var isPhantomJS = typeof navigator !== 'undefined' && /PhantomJS/i.test(navigator.userAgent);
	
	/**
	 * When true, avoids using Blobs to encode payloads.
	 * @type boolean
	 */
	var dontSendBlobs = isAndroid || isPhantomJS;
	
	/**
	 * Current protocol version.
	 */
	
	exports.protocol = 3;
	
	/**
	 * Packet types.
	 */
	
	var packets = exports.packets = {
	    open:     0    // non-ws
	  , close:    1    // non-ws
	  , ping:     2
	  , pong:     3
	  , message:  4
	  , upgrade:  5
	  , noop:     6
	};
	
	var packetslist = keys(packets);
	
	/**
	 * Premade error packet.
	 */
	
	var err = { type: 'error', data: 'parser error' };
	
	/**
	 * Create a blob api even for blob builder when vendor prefixes exist
	 */
	
	var Blob = __webpack_require__(147);
	
	/**
	 * Encodes a packet.
	 *
	 *     <packet type id> [ <data> ]
	 *
	 * Example:
	 *
	 *     5hello world
	 *     3
	 *     4
	 *
	 * Binary is encoded in an identical principle
	 *
	 * @api private
	 */
	
	exports.encodePacket = function (packet, supportsBinary, utf8encode, callback) {
	  if ('function' == typeof supportsBinary) {
	    callback = supportsBinary;
	    supportsBinary = false;
	  }
	
	  if ('function' == typeof utf8encode) {
	    callback = utf8encode;
	    utf8encode = null;
	  }
	
	  var data = (packet.data === undefined)
	    ? undefined
	    : packet.data.buffer || packet.data;
	
	  if (global.ArrayBuffer && data instanceof ArrayBuffer) {
	    return encodeArrayBuffer(packet, supportsBinary, callback);
	  } else if (Blob && data instanceof global.Blob) {
	    return encodeBlob(packet, supportsBinary, callback);
	  }
	
	  // might be an object with { base64: true, data: dataAsBase64String }
	  if (data && data.base64) {
	    return encodeBase64Object(packet, callback);
	  }
	
	  // Sending data as a utf-8 string
	  var encoded = packets[packet.type];
	
	  // data fragment is optional
	  if (undefined !== packet.data) {
	    encoded += utf8encode ? utf8.encode(String(packet.data)) : String(packet.data);
	  }
	
	  return callback('' + encoded);
	
	};
	
	function encodeBase64Object(packet, callback) {
	  // packet data is an object { base64: true, data: dataAsBase64String }
	  var message = 'b' + exports.packets[packet.type] + packet.data.data;
	  return callback(message);
	}
	
	/**
	 * Encode packet helpers for binary types
	 */
	
	function encodeArrayBuffer(packet, supportsBinary, callback) {
	  if (!supportsBinary) {
	    return exports.encodeBase64Packet(packet, callback);
	  }
	
	  var data = packet.data;
	  var contentArray = new Uint8Array(data);
	  var resultBuffer = new Uint8Array(1 + data.byteLength);
	
	  resultBuffer[0] = packets[packet.type];
	  for (var i = 0; i < contentArray.length; i++) {
	    resultBuffer[i+1] = contentArray[i];
	  }
	
	  return callback(resultBuffer.buffer);
	}
	
	function encodeBlobAsArrayBuffer(packet, supportsBinary, callback) {
	  if (!supportsBinary) {
	    return exports.encodeBase64Packet(packet, callback);
	  }
	
	  var fr = new FileReader();
	  fr.onload = function() {
	    packet.data = fr.result;
	    exports.encodePacket(packet, supportsBinary, true, callback);
	  };
	  return fr.readAsArrayBuffer(packet.data);
	}
	
	function encodeBlob(packet, supportsBinary, callback) {
	  if (!supportsBinary) {
	    return exports.encodeBase64Packet(packet, callback);
	  }
	
	  if (dontSendBlobs) {
	    return encodeBlobAsArrayBuffer(packet, supportsBinary, callback);
	  }
	
	  var length = new Uint8Array(1);
	  length[0] = packets[packet.type];
	  var blob = new Blob([length.buffer, packet.data]);
	
	  return callback(blob);
	}
	
	/**
	 * Encodes a packet with binary data in a base64 string
	 *
	 * @param {Object} packet, has `type` and `data`
	 * @return {String} base64 encoded message
	 */
	
	exports.encodeBase64Packet = function(packet, callback) {
	  var message = 'b' + exports.packets[packet.type];
	  if (Blob && packet.data instanceof global.Blob) {
	    var fr = new FileReader();
	    fr.onload = function() {
	      var b64 = fr.result.split(',')[1];
	      callback(message + b64);
	    };
	    return fr.readAsDataURL(packet.data);
	  }
	
	  var b64data;
	  try {
	    b64data = String.fromCharCode.apply(null, new Uint8Array(packet.data));
	  } catch (e) {
	    // iPhone Safari doesn't let you apply with typed arrays
	    var typed = new Uint8Array(packet.data);
	    var basic = new Array(typed.length);
	    for (var i = 0; i < typed.length; i++) {
	      basic[i] = typed[i];
	    }
	    b64data = String.fromCharCode.apply(null, basic);
	  }
	  message += global.btoa(b64data);
	  return callback(message);
	};
	
	/**
	 * Decodes a packet. Changes format to Blob if requested.
	 *
	 * @return {Object} with `type` and `data` (if any)
	 * @api private
	 */
	
	exports.decodePacket = function (data, binaryType, utf8decode) {
	  if (data === undefined) {
	    return err;
	  }
	  // String data
	  if (typeof data == 'string') {
	    if (data.charAt(0) == 'b') {
	      return exports.decodeBase64Packet(data.substr(1), binaryType);
	    }
	
	    if (utf8decode) {
	      data = tryDecode(data);
	      if (data === false) {
	        return err;
	      }
	    }
	    var type = data.charAt(0);
	
	    if (Number(type) != type || !packetslist[type]) {
	      return err;
	    }
	
	    if (data.length > 1) {
	      return { type: packetslist[type], data: data.substring(1) };
	    } else {
	      return { type: packetslist[type] };
	    }
	  }
	
	  var asArray = new Uint8Array(data);
	  var type = asArray[0];
	  var rest = sliceBuffer(data, 1);
	  if (Blob && binaryType === 'blob') {
	    rest = new Blob([rest]);
	  }
	  return { type: packetslist[type], data: rest };
	};
	
	function tryDecode(data) {
	  try {
	    data = utf8.decode(data);
	  } catch (e) {
	    return false;
	  }
	  return data;
	}
	
	/**
	 * Decodes a packet encoded in a base64 string
	 *
	 * @param {String} base64 encoded message
	 * @return {Object} with `type` and `data` (if any)
	 */
	
	exports.decodeBase64Packet = function(msg, binaryType) {
	  var type = packetslist[msg.charAt(0)];
	  if (!base64encoder) {
	    return { type: type, data: { base64: true, data: msg.substr(1) } };
	  }
	
	  var data = base64encoder.decode(msg.substr(1));
	
	  if (binaryType === 'blob' && Blob) {
	    data = new Blob([data]);
	  }
	
	  return { type: type, data: data };
	};
	
	/**
	 * Encodes multiple messages (payload).
	 *
	 *     <length>:data
	 *
	 * Example:
	 *
	 *     11:hello world2:hi
	 *
	 * If any contents are binary, they will be encoded as base64 strings. Base64
	 * encoded strings are marked with a b before the length specifier
	 *
	 * @param {Array} packets
	 * @api private
	 */
	
	exports.encodePayload = function (packets, supportsBinary, callback) {
	  if (typeof supportsBinary == 'function') {
	    callback = supportsBinary;
	    supportsBinary = null;
	  }
	
	  var isBinary = hasBinary(packets);
	
	  if (supportsBinary && isBinary) {
	    if (Blob && !dontSendBlobs) {
	      return exports.encodePayloadAsBlob(packets, callback);
	    }
	
	    return exports.encodePayloadAsArrayBuffer(packets, callback);
	  }
	
	  if (!packets.length) {
	    return callback('0:');
	  }
	
	  function setLengthHeader(message) {
	    return message.length + ':' + message;
	  }
	
	  function encodeOne(packet, doneCallback) {
	    exports.encodePacket(packet, !isBinary ? false : supportsBinary, true, function(message) {
	      doneCallback(null, setLengthHeader(message));
	    });
	  }
	
	  map(packets, encodeOne, function(err, results) {
	    return callback(results.join(''));
	  });
	};
	
	/**
	 * Async array map using after
	 */
	
	function map(ary, each, done) {
	  var result = new Array(ary.length);
	  var next = after(ary.length, done);
	
	  var eachWithIndex = function(i, el, cb) {
	    each(el, function(error, msg) {
	      result[i] = msg;
	      cb(error, result);
	    });
	  };
	
	  for (var i = 0; i < ary.length; i++) {
	    eachWithIndex(i, ary[i], next);
	  }
	}
	
	/*
	 * Decodes data when a payload is maybe expected. Possible binary contents are
	 * decoded from their base64 representation
	 *
	 * @param {String} data, callback method
	 * @api public
	 */
	
	exports.decodePayload = function (data, binaryType, callback) {
	  if (typeof data != 'string') {
	    return exports.decodePayloadAsBinary(data, binaryType, callback);
	  }
	
	  if (typeof binaryType === 'function') {
	    callback = binaryType;
	    binaryType = null;
	  }
	
	  var packet;
	  if (data == '') {
	    // parser error - ignoring payload
	    return callback(err, 0, 1);
	  }
	
	  var length = ''
	    , n, msg;
	
	  for (var i = 0, l = data.length; i < l; i++) {
	    var chr = data.charAt(i);
	
	    if (':' != chr) {
	      length += chr;
	    } else {
	      if ('' == length || (length != (n = Number(length)))) {
	        // parser error - ignoring payload
	        return callback(err, 0, 1);
	      }
	
	      msg = data.substr(i + 1, n);
	
	      if (length != msg.length) {
	        // parser error - ignoring payload
	        return callback(err, 0, 1);
	      }
	
	      if (msg.length) {
	        packet = exports.decodePacket(msg, binaryType, true);
	
	        if (err.type == packet.type && err.data == packet.data) {
	          // parser error in individual packet - ignoring payload
	          return callback(err, 0, 1);
	        }
	
	        var ret = callback(packet, i + n, l);
	        if (false === ret) return;
	      }
	
	      // advance cursor
	      i += n;
	      length = '';
	    }
	  }
	
	  if (length != '') {
	    // parser error - ignoring payload
	    return callback(err, 0, 1);
	  }
	
	};
	
	/**
	 * Encodes multiple messages (payload) as binary.
	 *
	 * <1 = binary, 0 = string><number from 0-9><number from 0-9>[...]<number
	 * 255><data>
	 *
	 * Example:
	 * 1 3 255 1 2 3, if the binary contents are interpreted as 8 bit integers
	 *
	 * @param {Array} packets
	 * @return {ArrayBuffer} encoded payload
	 * @api private
	 */
	
	exports.encodePayloadAsArrayBuffer = function(packets, callback) {
	  if (!packets.length) {
	    return callback(new ArrayBuffer(0));
	  }
	
	  function encodeOne(packet, doneCallback) {
	    exports.encodePacket(packet, true, true, function(data) {
	      return doneCallback(null, data);
	    });
	  }
	
	  map(packets, encodeOne, function(err, encodedPackets) {
	    var totalLength = encodedPackets.reduce(function(acc, p) {
	      var len;
	      if (typeof p === 'string'){
	        len = p.length;
	      } else {
	        len = p.byteLength;
	      }
	      return acc + len.toString().length + len + 2; // string/binary identifier + separator = 2
	    }, 0);
	
	    var resultArray = new Uint8Array(totalLength);
	
	    var bufferIndex = 0;
	    encodedPackets.forEach(function(p) {
	      var isString = typeof p === 'string';
	      var ab = p;
	      if (isString) {
	        var view = new Uint8Array(p.length);
	        for (var i = 0; i < p.length; i++) {
	          view[i] = p.charCodeAt(i);
	        }
	        ab = view.buffer;
	      }
	
	      if (isString) { // not true binary
	        resultArray[bufferIndex++] = 0;
	      } else { // true binary
	        resultArray[bufferIndex++] = 1;
	      }
	
	      var lenStr = ab.byteLength.toString();
	      for (var i = 0; i < lenStr.length; i++) {
	        resultArray[bufferIndex++] = parseInt(lenStr[i]);
	      }
	      resultArray[bufferIndex++] = 255;
	
	      var view = new Uint8Array(ab);
	      for (var i = 0; i < view.length; i++) {
	        resultArray[bufferIndex++] = view[i];
	      }
	    });
	
	    return callback(resultArray.buffer);
	  });
	};
	
	/**
	 * Encode as Blob
	 */
	
	exports.encodePayloadAsBlob = function(packets, callback) {
	  function encodeOne(packet, doneCallback) {
	    exports.encodePacket(packet, true, true, function(encoded) {
	      var binaryIdentifier = new Uint8Array(1);
	      binaryIdentifier[0] = 1;
	      if (typeof encoded === 'string') {
	        var view = new Uint8Array(encoded.length);
	        for (var i = 0; i < encoded.length; i++) {
	          view[i] = encoded.charCodeAt(i);
	        }
	        encoded = view.buffer;
	        binaryIdentifier[0] = 0;
	      }
	
	      var len = (encoded instanceof ArrayBuffer)
	        ? encoded.byteLength
	        : encoded.size;
	
	      var lenStr = len.toString();
	      var lengthAry = new Uint8Array(lenStr.length + 1);
	      for (var i = 0; i < lenStr.length; i++) {
	        lengthAry[i] = parseInt(lenStr[i]);
	      }
	      lengthAry[lenStr.length] = 255;
	
	      if (Blob) {
	        var blob = new Blob([binaryIdentifier.buffer, lengthAry.buffer, encoded]);
	        doneCallback(null, blob);
	      }
	    });
	  }
	
	  map(packets, encodeOne, function(err, results) {
	    return callback(new Blob(results));
	  });
	};
	
	/*
	 * Decodes data when a payload is maybe expected. Strings are decoded by
	 * interpreting each byte as a key code for entries marked to start with 0. See
	 * description of encodePayloadAsBinary
	 *
	 * @param {ArrayBuffer} data, callback method
	 * @api public
	 */
	
	exports.decodePayloadAsBinary = function (data, binaryType, callback) {
	  if (typeof binaryType === 'function') {
	    callback = binaryType;
	    binaryType = null;
	  }
	
	  var bufferTail = data;
	  var buffers = [];
	
	  var numberTooLong = false;
	  while (bufferTail.byteLength > 0) {
	    var tailArray = new Uint8Array(bufferTail);
	    var isString = tailArray[0] === 0;
	    var msgLength = '';
	
	    for (var i = 1; ; i++) {
	      if (tailArray[i] == 255) break;
	
	      if (msgLength.length > 310) {
	        numberTooLong = true;
	        break;
	      }
	
	      msgLength += tailArray[i];
	    }
	
	    if(numberTooLong) return callback(err, 0, 1);
	
	    bufferTail = sliceBuffer(bufferTail, 2 + msgLength.length);
	    msgLength = parseInt(msgLength);
	
	    var msg = sliceBuffer(bufferTail, 0, msgLength);
	    if (isString) {
	      try {
	        msg = String.fromCharCode.apply(null, new Uint8Array(msg));
	      } catch (e) {
	        // iPhone Safari doesn't let you apply to typed arrays
	        var typed = new Uint8Array(msg);
	        msg = '';
	        for (var i = 0; i < typed.length; i++) {
	          msg += String.fromCharCode(typed[i]);
	        }
	      }
	    }
	
	    buffers.push(msg);
	    bufferTail = sliceBuffer(bufferTail, msgLength);
	  }
	
	  var total = buffers.length;
	  buffers.forEach(function(buffer, i) {
	    callback(exports.decodePacket(buffer, binaryType, true), i, total);
	  });
	};
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 141 */
/***/ (function(module, exports) {

	
	/**
	 * Gets the keys for an object.
	 *
	 * @return {Array} keys
	 * @api private
	 */
	
	module.exports = Object.keys || function keys (obj){
	  var arr = [];
	  var has = Object.prototype.hasOwnProperty;
	
	  for (var i in obj) {
	    if (has.call(obj, i)) {
	      arr.push(i);
	    }
	  }
	  return arr;
	};


/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {
	/*
	 * Module requirements.
	 */
	
	var isArray = __webpack_require__(128);
	
	/**
	 * Module exports.
	 */
	
	module.exports = hasBinary;
	
	/**
	 * Checks for binary data.
	 *
	 * Right now only Buffer and ArrayBuffer are supported..
	 *
	 * @param {Object} anything
	 * @api public
	 */
	
	function hasBinary(data) {
	
	  function _hasBinary(obj) {
	    if (!obj) return false;
	
	    if ( (global.Buffer && global.Buffer.isBuffer && global.Buffer.isBuffer(obj)) ||
	         (global.ArrayBuffer && obj instanceof ArrayBuffer) ||
	         (global.Blob && obj instanceof Blob) ||
	         (global.File && obj instanceof File)
	        ) {
	      return true;
	    }
	
	    if (isArray(obj)) {
	      for (var i = 0; i < obj.length; i++) {
	          if (_hasBinary(obj[i])) {
	              return true;
	          }
	      }
	    } else if (obj && 'object' == typeof obj) {
	      // see: https://github.com/Automattic/has-binary/pull/4
	      if (obj.toJSON && 'function' == typeof obj.toJSON) {
	        obj = obj.toJSON();
	      }
	
	      for (var key in obj) {
	        if (Object.prototype.hasOwnProperty.call(obj, key) && _hasBinary(obj[key])) {
	          return true;
	        }
	      }
	    }
	
	    return false;
	  }
	
	  return _hasBinary(data);
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 143 */
/***/ (function(module, exports) {

	/**
	 * An abstraction for slicing an arraybuffer even when
	 * ArrayBuffer.prototype.slice is not supported
	 *
	 * @api public
	 */
	
	module.exports = function(arraybuffer, start, end) {
	  var bytes = arraybuffer.byteLength;
	  start = start || 0;
	  end = end || bytes;
	
	  if (arraybuffer.slice) { return arraybuffer.slice(start, end); }
	
	  if (start < 0) { start += bytes; }
	  if (end < 0) { end += bytes; }
	  if (end > bytes) { end = bytes; }
	
	  if (start >= bytes || start >= end || bytes === 0) {
	    return new ArrayBuffer(0);
	  }
	
	  var abv = new Uint8Array(arraybuffer);
	  var result = new Uint8Array(end - start);
	  for (var i = start, ii = 0; i < end; i++, ii++) {
	    result[ii] = abv[i];
	  }
	  return result.buffer;
	};


/***/ }),
/* 144 */
/***/ (function(module, exports) {

	module.exports = after
	
	function after(count, callback, err_cb) {
	    var bail = false
	    err_cb = err_cb || noop
	    proxy.count = count
	
	    return (count === 0) ? callback() : proxy
	
	    function proxy(err, result) {
	        if (proxy.count <= 0) {
	            throw new Error('after called too many times')
	        }
	        --proxy.count
	
	        // after first error, rest are passed to err_cb
	        if (err) {
	            bail = true
	            callback(err)
	            // future error callbacks will go to error handler
	            callback = err_cb
	        } else if (proxy.count === 0 && !bail) {
	            callback(null, result)
	        }
	    }
	}
	
	function noop() {}


/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module, global) {/*! https://mths.be/wtf8 v1.0.0 by @mathias */
	;(function(root) {
	
		// Detect free variables `exports`
		var freeExports = typeof exports == 'object' && exports;
	
		// Detect free variable `module`
		var freeModule = typeof module == 'object' && module &&
			module.exports == freeExports && module;
	
		// Detect free variable `global`, from Node.js or Browserified code,
		// and use it as `root`
		var freeGlobal = typeof global == 'object' && global;
		if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
			root = freeGlobal;
		}
	
		/*--------------------------------------------------------------------------*/
	
		var stringFromCharCode = String.fromCharCode;
	
		// Taken from https://mths.be/punycode
		function ucs2decode(string) {
			var output = [];
			var counter = 0;
			var length = string.length;
			var value;
			var extra;
			while (counter < length) {
				value = string.charCodeAt(counter++);
				if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
					// high surrogate, and there is a next character
					extra = string.charCodeAt(counter++);
					if ((extra & 0xFC00) == 0xDC00) { // low surrogate
						output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
					} else {
						// unmatched surrogate; only append this code unit, in case the next
						// code unit is the high surrogate of a surrogate pair
						output.push(value);
						counter--;
					}
				} else {
					output.push(value);
				}
			}
			return output;
		}
	
		// Taken from https://mths.be/punycode
		function ucs2encode(array) {
			var length = array.length;
			var index = -1;
			var value;
			var output = '';
			while (++index < length) {
				value = array[index];
				if (value > 0xFFFF) {
					value -= 0x10000;
					output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
					value = 0xDC00 | value & 0x3FF;
				}
				output += stringFromCharCode(value);
			}
			return output;
		}
	
		/*--------------------------------------------------------------------------*/
	
		function createByte(codePoint, shift) {
			return stringFromCharCode(((codePoint >> shift) & 0x3F) | 0x80);
		}
	
		function encodeCodePoint(codePoint) {
			if ((codePoint & 0xFFFFFF80) == 0) { // 1-byte sequence
				return stringFromCharCode(codePoint);
			}
			var symbol = '';
			if ((codePoint & 0xFFFFF800) == 0) { // 2-byte sequence
				symbol = stringFromCharCode(((codePoint >> 6) & 0x1F) | 0xC0);
			}
			else if ((codePoint & 0xFFFF0000) == 0) { // 3-byte sequence
				symbol = stringFromCharCode(((codePoint >> 12) & 0x0F) | 0xE0);
				symbol += createByte(codePoint, 6);
			}
			else if ((codePoint & 0xFFE00000) == 0) { // 4-byte sequence
				symbol = stringFromCharCode(((codePoint >> 18) & 0x07) | 0xF0);
				symbol += createByte(codePoint, 12);
				symbol += createByte(codePoint, 6);
			}
			symbol += stringFromCharCode((codePoint & 0x3F) | 0x80);
			return symbol;
		}
	
		function wtf8encode(string) {
			var codePoints = ucs2decode(string);
			var length = codePoints.length;
			var index = -1;
			var codePoint;
			var byteString = '';
			while (++index < length) {
				codePoint = codePoints[index];
				byteString += encodeCodePoint(codePoint);
			}
			return byteString;
		}
	
		/*--------------------------------------------------------------------------*/
	
		function readContinuationByte() {
			if (byteIndex >= byteCount) {
				throw Error('Invalid byte index');
			}
	
			var continuationByte = byteArray[byteIndex] & 0xFF;
			byteIndex++;
	
			if ((continuationByte & 0xC0) == 0x80) {
				return continuationByte & 0x3F;
			}
	
			// If we end up here, it’s not a continuation byte.
			throw Error('Invalid continuation byte');
		}
	
		function decodeSymbol() {
			var byte1;
			var byte2;
			var byte3;
			var byte4;
			var codePoint;
	
			if (byteIndex > byteCount) {
				throw Error('Invalid byte index');
			}
	
			if (byteIndex == byteCount) {
				return false;
			}
	
			// Read the first byte.
			byte1 = byteArray[byteIndex] & 0xFF;
			byteIndex++;
	
			// 1-byte sequence (no continuation bytes)
			if ((byte1 & 0x80) == 0) {
				return byte1;
			}
	
			// 2-byte sequence
			if ((byte1 & 0xE0) == 0xC0) {
				var byte2 = readContinuationByte();
				codePoint = ((byte1 & 0x1F) << 6) | byte2;
				if (codePoint >= 0x80) {
					return codePoint;
				} else {
					throw Error('Invalid continuation byte');
				}
			}
	
			// 3-byte sequence (may include unpaired surrogates)
			if ((byte1 & 0xF0) == 0xE0) {
				byte2 = readContinuationByte();
				byte3 = readContinuationByte();
				codePoint = ((byte1 & 0x0F) << 12) | (byte2 << 6) | byte3;
				if (codePoint >= 0x0800) {
					return codePoint;
				} else {
					throw Error('Invalid continuation byte');
				}
			}
	
			// 4-byte sequence
			if ((byte1 & 0xF8) == 0xF0) {
				byte2 = readContinuationByte();
				byte3 = readContinuationByte();
				byte4 = readContinuationByte();
				codePoint = ((byte1 & 0x0F) << 0x12) | (byte2 << 0x0C) |
					(byte3 << 0x06) | byte4;
				if (codePoint >= 0x010000 && codePoint <= 0x10FFFF) {
					return codePoint;
				}
			}
	
			throw Error('Invalid WTF-8 detected');
		}
	
		var byteArray;
		var byteCount;
		var byteIndex;
		function wtf8decode(byteString) {
			byteArray = ucs2decode(byteString);
			byteCount = byteArray.length;
			byteIndex = 0;
			var codePoints = [];
			var tmp;
			while ((tmp = decodeSymbol()) !== false) {
				codePoints.push(tmp);
			}
			return ucs2encode(codePoints);
		}
	
		/*--------------------------------------------------------------------------*/
	
		var wtf8 = {
			'version': '1.0.0',
			'encode': wtf8encode,
			'decode': wtf8decode
		};
	
		// Some AMD build optimizers, like r.js, check for specific condition patterns
		// like the following:
		if (
			true
		) {
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
				return wtf8;
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		}	else if (freeExports && !freeExports.nodeType) {
			if (freeModule) { // in Node.js or RingoJS v0.8.0+
				freeModule.exports = wtf8;
			} else { // in Narwhal or RingoJS v0.7.0-
				var object = {};
				var hasOwnProperty = object.hasOwnProperty;
				for (var key in wtf8) {
					hasOwnProperty.call(wtf8, key) && (freeExports[key] = wtf8[key]);
				}
			}
		} else { // in Rhino or a web browser
			root.wtf8 = wtf8;
		}
	
	}(this));
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(62)(module), (function() { return this; }())))

/***/ }),
/* 146 */
/***/ (function(module, exports) {

	/*
	 * base64-arraybuffer
	 * https://github.com/niklasvh/base64-arraybuffer
	 *
	 * Copyright (c) 2012 Niklas von Hertzen
	 * Licensed under the MIT license.
	 */
	(function(){
	  "use strict";
	
	  var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
	
	  // Use a lookup table to find the index.
	  var lookup = new Uint8Array(256);
	  for (var i = 0; i < chars.length; i++) {
	    lookup[chars.charCodeAt(i)] = i;
	  }
	
	  exports.encode = function(arraybuffer) {
	    var bytes = new Uint8Array(arraybuffer),
	    i, len = bytes.length, base64 = "";
	
	    for (i = 0; i < len; i+=3) {
	      base64 += chars[bytes[i] >> 2];
	      base64 += chars[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)];
	      base64 += chars[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)];
	      base64 += chars[bytes[i + 2] & 63];
	    }
	
	    if ((len % 3) === 2) {
	      base64 = base64.substring(0, base64.length - 1) + "=";
	    } else if (len % 3 === 1) {
	      base64 = base64.substring(0, base64.length - 2) + "==";
	    }
	
	    return base64;
	  };
	
	  exports.decode =  function(base64) {
	    var bufferLength = base64.length * 0.75,
	    len = base64.length, i, p = 0,
	    encoded1, encoded2, encoded3, encoded4;
	
	    if (base64[base64.length - 1] === "=") {
	      bufferLength--;
	      if (base64[base64.length - 2] === "=") {
	        bufferLength--;
	      }
	    }
	
	    var arraybuffer = new ArrayBuffer(bufferLength),
	    bytes = new Uint8Array(arraybuffer);
	
	    for (i = 0; i < len; i+=4) {
	      encoded1 = lookup[base64.charCodeAt(i)];
	      encoded2 = lookup[base64.charCodeAt(i+1)];
	      encoded3 = lookup[base64.charCodeAt(i+2)];
	      encoded4 = lookup[base64.charCodeAt(i+3)];
	
	      bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
	      bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
	      bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
	    }
	
	    return arraybuffer;
	  };
	})();


/***/ }),
/* 147 */
/***/ (function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * Create a blob builder even when vendor prefixes exist
	 */
	
	var BlobBuilder = global.BlobBuilder
	  || global.WebKitBlobBuilder
	  || global.MSBlobBuilder
	  || global.MozBlobBuilder;
	
	/**
	 * Check if Blob constructor is supported
	 */
	
	var blobSupported = (function() {
	  try {
	    var a = new Blob(['hi']);
	    return a.size === 2;
	  } catch(e) {
	    return false;
	  }
	})();
	
	/**
	 * Check if Blob constructor supports ArrayBufferViews
	 * Fails in Safari 6, so we need to map to ArrayBuffers there.
	 */
	
	var blobSupportsArrayBufferView = blobSupported && (function() {
	  try {
	    var b = new Blob([new Uint8Array([1,2])]);
	    return b.size === 2;
	  } catch(e) {
	    return false;
	  }
	})();
	
	/**
	 * Check if BlobBuilder is supported
	 */
	
	var blobBuilderSupported = BlobBuilder
	  && BlobBuilder.prototype.append
	  && BlobBuilder.prototype.getBlob;
	
	/**
	 * Helper function that maps ArrayBufferViews to ArrayBuffers
	 * Used by BlobBuilder constructor and old browsers that didn't
	 * support it in the Blob constructor.
	 */
	
	function mapArrayBufferViews(ary) {
	  for (var i = 0; i < ary.length; i++) {
	    var chunk = ary[i];
	    if (chunk.buffer instanceof ArrayBuffer) {
	      var buf = chunk.buffer;
	
	      // if this is a subarray, make a copy so we only
	      // include the subarray region from the underlying buffer
	      if (chunk.byteLength !== buf.byteLength) {
	        var copy = new Uint8Array(chunk.byteLength);
	        copy.set(new Uint8Array(buf, chunk.byteOffset, chunk.byteLength));
	        buf = copy.buffer;
	      }
	
	      ary[i] = buf;
	    }
	  }
	}
	
	function BlobBuilderConstructor(ary, options) {
	  options = options || {};
	
	  var bb = new BlobBuilder();
	  mapArrayBufferViews(ary);
	
	  for (var i = 0; i < ary.length; i++) {
	    bb.append(ary[i]);
	  }
	
	  return (options.type) ? bb.getBlob(options.type) : bb.getBlob();
	};
	
	function BlobConstructor(ary, options) {
	  mapArrayBufferViews(ary);
	  return new Blob(ary, options || {});
	};
	
	module.exports = (function() {
	  if (blobSupported) {
	    return blobSupportsArrayBufferView ? global.Blob : BlobConstructor;
	  } else if (blobBuilderSupported) {
	    return BlobBuilderConstructor;
	  } else {
	    return undefined;
	  }
	})();
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

	
	/**
	 * Expose `Emitter`.
	 */
	
	if (true) {
	  module.exports = Emitter;
	}
	
	/**
	 * Initialize a new `Emitter`.
	 *
	 * @api public
	 */
	
	function Emitter(obj) {
	  if (obj) return mixin(obj);
	};
	
	/**
	 * Mixin the emitter properties.
	 *
	 * @param {Object} obj
	 * @return {Object}
	 * @api private
	 */
	
	function mixin(obj) {
	  for (var key in Emitter.prototype) {
	    obj[key] = Emitter.prototype[key];
	  }
	  return obj;
	}
	
	/**
	 * Listen on the given `event` with `fn`.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */
	
	Emitter.prototype.on =
	Emitter.prototype.addEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};
	  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
	    .push(fn);
	  return this;
	};
	
	/**
	 * Adds an `event` listener that will be invoked a single
	 * time then automatically removed.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */
	
	Emitter.prototype.once = function(event, fn){
	  function on() {
	    this.off(event, on);
	    fn.apply(this, arguments);
	  }
	
	  on.fn = fn;
	  this.on(event, on);
	  return this;
	};
	
	/**
	 * Remove the given callback for `event` or all
	 * registered callbacks.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */
	
	Emitter.prototype.off =
	Emitter.prototype.removeListener =
	Emitter.prototype.removeAllListeners =
	Emitter.prototype.removeEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};
	
	  // all
	  if (0 == arguments.length) {
	    this._callbacks = {};
	    return this;
	  }
	
	  // specific event
	  var callbacks = this._callbacks['$' + event];
	  if (!callbacks) return this;
	
	  // remove all handlers
	  if (1 == arguments.length) {
	    delete this._callbacks['$' + event];
	    return this;
	  }
	
	  // remove specific handler
	  var cb;
	  for (var i = 0; i < callbacks.length; i++) {
	    cb = callbacks[i];
	    if (cb === fn || cb.fn === fn) {
	      callbacks.splice(i, 1);
	      break;
	    }
	  }
	  return this;
	};
	
	/**
	 * Emit `event` with the given args.
	 *
	 * @param {String} event
	 * @param {Mixed} ...
	 * @return {Emitter}
	 */
	
	Emitter.prototype.emit = function(event){
	  this._callbacks = this._callbacks || {};
	  var args = [].slice.call(arguments, 1)
	    , callbacks = this._callbacks['$' + event];
	
	  if (callbacks) {
	    callbacks = callbacks.slice(0);
	    for (var i = 0, len = callbacks.length; i < len; ++i) {
	      callbacks[i].apply(this, args);
	    }
	  }
	
	  return this;
	};
	
	/**
	 * Return array of callbacks for `event`.
	 *
	 * @param {String} event
	 * @return {Array}
	 * @api public
	 */
	
	Emitter.prototype.listeners = function(event){
	  this._callbacks = this._callbacks || {};
	  return this._callbacks['$' + event] || [];
	};
	
	/**
	 * Check if this emitter has `event` handlers.
	 *
	 * @param {String} event
	 * @return {Boolean}
	 * @api public
	 */
	
	Emitter.prototype.hasListeners = function(event){
	  return !! this.listeners(event).length;
	};


/***/ }),
/* 149 */
/***/ (function(module, exports) {

	/**
	 * Compiles a querystring
	 * Returns string representation of the object
	 *
	 * @param {Object}
	 * @api private
	 */
	
	exports.encode = function (obj) {
	  var str = '';
	
	  for (var i in obj) {
	    if (obj.hasOwnProperty(i)) {
	      if (str.length) str += '&';
	      str += encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]);
	    }
	  }
	
	  return str;
	};
	
	/**
	 * Parses a simple querystring into an object
	 *
	 * @param {String} qs
	 * @api private
	 */
	
	exports.decode = function(qs){
	  var qry = {};
	  var pairs = qs.split('&');
	  for (var i = 0, l = pairs.length; i < l; i++) {
	    var pair = pairs[i].split('=');
	    qry[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
	  }
	  return qry;
	};


/***/ }),
/* 150 */
/***/ (function(module, exports) {

	
	module.exports = function(a, b){
	  var fn = function(){};
	  fn.prototype = b.prototype;
	  a.prototype = new fn;
	  a.prototype.constructor = a;
	};

/***/ }),
/* 151 */
/***/ (function(module, exports) {

	'use strict';
	
	var alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_'.split('')
	  , length = 64
	  , map = {}
	  , seed = 0
	  , i = 0
	  , prev;
	
	/**
	 * Return a string representing the specified number.
	 *
	 * @param {Number} num The number to convert.
	 * @returns {String} The string representation of the number.
	 * @api public
	 */
	function encode(num) {
	  var encoded = '';
	
	  do {
	    encoded = alphabet[num % length] + encoded;
	    num = Math.floor(num / length);
	  } while (num > 0);
	
	  return encoded;
	}
	
	/**
	 * Return the integer value specified by the given string.
	 *
	 * @param {String} str The string to convert.
	 * @returns {Number} The integer value represented by the string.
	 * @api public
	 */
	function decode(str) {
	  var decoded = 0;
	
	  for (i = 0; i < str.length; i++) {
	    decoded = decoded * length + map[str.charAt(i)];
	  }
	
	  return decoded;
	}
	
	/**
	 * Yeast: A tiny growing id generator.
	 *
	 * @returns {String} A unique id.
	 * @api public
	 */
	function yeast() {
	  var now = encode(+new Date());
	
	  if (now !== prev) return seed = 0, prev = now;
	  return now +'.'+ encode(seed++);
	}
	
	//
	// Map each character to its index.
	//
	for (; i < length; i++) map[alphabet[i]] = i;
	
	//
	// Expose the `yeast`, `encode` and `decode` functions.
	//
	yeast.encode = encode;
	yeast.decode = decode;
	module.exports = yeast;


/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {
	/**
	 * This is the web browser implementation of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */
	
	exports = module.exports = __webpack_require__(153);
	exports.log = log;
	exports.formatArgs = formatArgs;
	exports.save = save;
	exports.load = load;
	exports.useColors = useColors;
	exports.storage = 'undefined' != typeof chrome
	               && 'undefined' != typeof chrome.storage
	                  ? chrome.storage.local
	                  : localstorage();
	
	/**
	 * Colors.
	 */
	
	exports.colors = [
	  'lightseagreen',
	  'forestgreen',
	  'goldenrod',
	  'dodgerblue',
	  'darkorchid',
	  'crimson'
	];
	
	/**
	 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
	 * and the Firebug extension (any Firefox version) are known
	 * to support "%c" CSS customizations.
	 *
	 * TODO: add a `localStorage` variable to explicitly enable/disable colors
	 */
	
	function useColors() {
	  // is webkit? http://stackoverflow.com/a/16459606/376773
	  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
	  return (typeof document !== 'undefined' && 'WebkitAppearance' in document.documentElement.style) ||
	    // is firebug? http://stackoverflow.com/a/398120/376773
	    (window.console && (console.firebug || (console.exception && console.table))) ||
	    // is firefox >= v31?
	    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
	    (navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31);
	}
	
	/**
	 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
	 */
	
	exports.formatters.j = function(v) {
	  try {
	    return JSON.stringify(v);
	  } catch (err) {
	    return '[UnexpectedJSONParseError]: ' + err.message;
	  }
	};
	
	
	/**
	 * Colorize log arguments if enabled.
	 *
	 * @api public
	 */
	
	function formatArgs() {
	  var args = arguments;
	  var useColors = this.useColors;
	
	  args[0] = (useColors ? '%c' : '')
	    + this.namespace
	    + (useColors ? ' %c' : ' ')
	    + args[0]
	    + (useColors ? '%c ' : ' ')
	    + '+' + exports.humanize(this.diff);
	
	  if (!useColors) return args;
	
	  var c = 'color: ' + this.color;
	  args = [args[0], c, 'color: inherit'].concat(Array.prototype.slice.call(args, 1));
	
	  // the final "%c" is somewhat tricky, because there could be other
	  // arguments passed either before or after the %c, so we need to
	  // figure out the correct index to insert the CSS into
	  var index = 0;
	  var lastC = 0;
	  args[0].replace(/%[a-z%]/g, function(match) {
	    if ('%%' === match) return;
	    index++;
	    if ('%c' === match) {
	      // we only are interested in the *last* %c
	      // (the user may have provided their own)
	      lastC = index;
	    }
	  });
	
	  args.splice(lastC, 0, c);
	  return args;
	}
	
	/**
	 * Invokes `console.log()` when available.
	 * No-op when `console.log` is not a "function".
	 *
	 * @api public
	 */
	
	function log() {
	  // this hackery is required for IE8/9, where
	  // the `console.log` function doesn't have 'apply'
	  return 'object' === typeof console
	    && console.log
	    && Function.prototype.apply.call(console.log, console, arguments);
	}
	
	/**
	 * Save `namespaces`.
	 *
	 * @param {String} namespaces
	 * @api private
	 */
	
	function save(namespaces) {
	  try {
	    if (null == namespaces) {
	      exports.storage.removeItem('debug');
	    } else {
	      exports.storage.debug = namespaces;
	    }
	  } catch(e) {}
	}
	
	/**
	 * Load `namespaces`.
	 *
	 * @return {String} returns the previously persisted debug modes
	 * @api private
	 */
	
	function load() {
	  var r;
	  try {
	    return exports.storage.debug;
	  } catch(e) {}
	
	  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
	  if (typeof process !== 'undefined' && 'env' in process) {
	    return process.env.DEBUG;
	  }
	}
	
	/**
	 * Enable namespaces listed in `localStorage.debug` initially.
	 */
	
	exports.enable(load());
	
	/**
	 * Localstorage attempts to return the localstorage.
	 *
	 * This is necessary because safari throws
	 * when a user disables cookies/localstorage
	 * and you attempt to access it.
	 *
	 * @return {LocalStorage}
	 * @api private
	 */
	
	function localstorage(){
	  try {
	    return window.localStorage;
	  } catch (e) {}
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(117)))

/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

	
	/**
	 * This is the common logic for both the Node.js and web browser
	 * implementations of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */
	
	exports = module.exports = debug.debug = debug;
	exports.coerce = coerce;
	exports.disable = disable;
	exports.enable = enable;
	exports.enabled = enabled;
	exports.humanize = __webpack_require__(154);
	
	/**
	 * The currently active debug mode names, and names to skip.
	 */
	
	exports.names = [];
	exports.skips = [];
	
	/**
	 * Map of special "%n" handling functions, for the debug "format" argument.
	 *
	 * Valid key names are a single, lowercased letter, i.e. "n".
	 */
	
	exports.formatters = {};
	
	/**
	 * Previously assigned color.
	 */
	
	var prevColor = 0;
	
	/**
	 * Previous log timestamp.
	 */
	
	var prevTime;
	
	/**
	 * Select a color.
	 *
	 * @return {Number}
	 * @api private
	 */
	
	function selectColor() {
	  return exports.colors[prevColor++ % exports.colors.length];
	}
	
	/**
	 * Create a debugger with the given `namespace`.
	 *
	 * @param {String} namespace
	 * @return {Function}
	 * @api public
	 */
	
	function debug(namespace) {
	
	  // define the `disabled` version
	  function disabled() {
	  }
	  disabled.enabled = false;
	
	  // define the `enabled` version
	  function enabled() {
	
	    var self = enabled;
	
	    // set `diff` timestamp
	    var curr = +new Date();
	    var ms = curr - (prevTime || curr);
	    self.diff = ms;
	    self.prev = prevTime;
	    self.curr = curr;
	    prevTime = curr;
	
	    // add the `color` if not set
	    if (null == self.useColors) self.useColors = exports.useColors();
	    if (null == self.color && self.useColors) self.color = selectColor();
	
	    var args = new Array(arguments.length);
	    for (var i = 0; i < args.length; i++) {
	      args[i] = arguments[i];
	    }
	
	    args[0] = exports.coerce(args[0]);
	
	    if ('string' !== typeof args[0]) {
	      // anything else let's inspect with %o
	      args = ['%o'].concat(args);
	    }
	
	    // apply any `formatters` transformations
	    var index = 0;
	    args[0] = args[0].replace(/%([a-z%])/g, function(match, format) {
	      // if we encounter an escaped % then don't increase the array index
	      if (match === '%%') return match;
	      index++;
	      var formatter = exports.formatters[format];
	      if ('function' === typeof formatter) {
	        var val = args[index];
	        match = formatter.call(self, val);
	
	        // now we need to remove `args[index]` since it's inlined in the `format`
	        args.splice(index, 1);
	        index--;
	      }
	      return match;
	    });
	
	    // apply env-specific formatting
	    args = exports.formatArgs.apply(self, args);
	
	    var logFn = enabled.log || exports.log || console.log.bind(console);
	    logFn.apply(self, args);
	  }
	  enabled.enabled = true;
	
	  var fn = exports.enabled(namespace) ? enabled : disabled;
	
	  fn.namespace = namespace;
	
	  return fn;
	}
	
	/**
	 * Enables a debug mode by namespaces. This can include modes
	 * separated by a colon and wildcards.
	 *
	 * @param {String} namespaces
	 * @api public
	 */
	
	function enable(namespaces) {
	  exports.save(namespaces);
	
	  var split = (namespaces || '').split(/[\s,]+/);
	  var len = split.length;
	
	  for (var i = 0; i < len; i++) {
	    if (!split[i]) continue; // ignore empty strings
	    namespaces = split[i].replace(/[\\^$+?.()|[\]{}]/g, '\\$&').replace(/\*/g, '.*?');
	    if (namespaces[0] === '-') {
	      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
	    } else {
	      exports.names.push(new RegExp('^' + namespaces + '$'));
	    }
	  }
	}
	
	/**
	 * Disable debug output.
	 *
	 * @api public
	 */
	
	function disable() {
	  exports.enable('');
	}
	
	/**
	 * Returns true if the given mode name is enabled, false otherwise.
	 *
	 * @param {String} name
	 * @return {Boolean}
	 * @api public
	 */
	
	function enabled(name) {
	  var i, len;
	  for (i = 0, len = exports.skips.length; i < len; i++) {
	    if (exports.skips[i].test(name)) {
	      return false;
	    }
	  }
	  for (i = 0, len = exports.names.length; i < len; i++) {
	    if (exports.names[i].test(name)) {
	      return true;
	    }
	  }
	  return false;
	}
	
	/**
	 * Coerce `val`.
	 *
	 * @param {Mixed} val
	 * @return {Mixed}
	 * @api private
	 */
	
	function coerce(val) {
	  if (val instanceof Error) return val.stack || val.message;
	  return val;
	}


/***/ }),
/* 154 */
/***/ (function(module, exports) {

	/**
	 * Helpers.
	 */
	
	var s = 1000
	var m = s * 60
	var h = m * 60
	var d = h * 24
	var y = d * 365.25
	
	/**
	 * Parse or format the given `val`.
	 *
	 * Options:
	 *
	 *  - `long` verbose formatting [false]
	 *
	 * @param {String|Number} val
	 * @param {Object} options
	 * @throws {Error} throw an error if val is not a non-empty string or a number
	 * @return {String|Number}
	 * @api public
	 */
	
	module.exports = function (val, options) {
	  options = options || {}
	  var type = typeof val
	  if (type === 'string' && val.length > 0) {
	    return parse(val)
	  } else if (type === 'number' && isNaN(val) === false) {
	    return options.long ?
				fmtLong(val) :
				fmtShort(val)
	  }
	  throw new Error('val is not a non-empty string or a valid number. val=' + JSON.stringify(val))
	}
	
	/**
	 * Parse the given `str` and return milliseconds.
	 *
	 * @param {String} str
	 * @return {Number}
	 * @api private
	 */
	
	function parse(str) {
	  str = String(str)
	  if (str.length > 10000) {
	    return
	  }
	  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str)
	  if (!match) {
	    return
	  }
	  var n = parseFloat(match[1])
	  var type = (match[2] || 'ms').toLowerCase()
	  switch (type) {
	    case 'years':
	    case 'year':
	    case 'yrs':
	    case 'yr':
	    case 'y':
	      return n * y
	    case 'days':
	    case 'day':
	    case 'd':
	      return n * d
	    case 'hours':
	    case 'hour':
	    case 'hrs':
	    case 'hr':
	    case 'h':
	      return n * h
	    case 'minutes':
	    case 'minute':
	    case 'mins':
	    case 'min':
	    case 'm':
	      return n * m
	    case 'seconds':
	    case 'second':
	    case 'secs':
	    case 'sec':
	    case 's':
	      return n * s
	    case 'milliseconds':
	    case 'millisecond':
	    case 'msecs':
	    case 'msec':
	    case 'ms':
	      return n
	    default:
	      return undefined
	  }
	}
	
	/**
	 * Short format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */
	
	function fmtShort(ms) {
	  if (ms >= d) {
	    return Math.round(ms / d) + 'd'
	  }
	  if (ms >= h) {
	    return Math.round(ms / h) + 'h'
	  }
	  if (ms >= m) {
	    return Math.round(ms / m) + 'm'
	  }
	  if (ms >= s) {
	    return Math.round(ms / s) + 's'
	  }
	  return ms + 'ms'
	}
	
	/**
	 * Long format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */
	
	function fmtLong(ms) {
	  return plural(ms, d, 'day') ||
	    plural(ms, h, 'hour') ||
	    plural(ms, m, 'minute') ||
	    plural(ms, s, 'second') ||
	    ms + ' ms'
	}
	
	/**
	 * Pluralization helper.
	 */
	
	function plural(ms, n, name) {
	  if (ms < n) {
	    return
	  }
	  if (ms < n * 1.5) {
	    return Math.floor(ms / n) + ' ' + name
	  }
	  return Math.ceil(ms / n) + ' ' + name + 's'
	}


/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {
	/**
	 * Module requirements.
	 */
	
	var Polling = __webpack_require__(138);
	var inherit = __webpack_require__(150);
	
	/**
	 * Module exports.
	 */
	
	module.exports = JSONPPolling;
	
	/**
	 * Cached regular expressions.
	 */
	
	var rNewline = /\n/g;
	var rEscapedNewline = /\\n/g;
	
	/**
	 * Global JSONP callbacks.
	 */
	
	var callbacks;
	
	/**
	 * Noop.
	 */
	
	function empty () { }
	
	/**
	 * JSONP Polling constructor.
	 *
	 * @param {Object} opts.
	 * @api public
	 */
	
	function JSONPPolling (opts) {
	  Polling.call(this, opts);
	
	  this.query = this.query || {};
	
	  // define global callbacks array if not present
	  // we do this here (lazily) to avoid unneeded global pollution
	  if (!callbacks) {
	    // we need to consider multiple engines in the same page
	    if (!global.___eio) global.___eio = [];
	    callbacks = global.___eio;
	  }
	
	  // callback identifier
	  this.index = callbacks.length;
	
	  // add callback to jsonp global
	  var self = this;
	  callbacks.push(function (msg) {
	    self.onData(msg);
	  });
	
	  // append to query string
	  this.query.j = this.index;
	
	  // prevent spurious errors from being emitted when the window is unloaded
	  if (global.document && global.addEventListener) {
	    global.addEventListener('beforeunload', function () {
	      if (self.script) self.script.onerror = empty;
	    }, false);
	  }
	}
	
	/**
	 * Inherits from Polling.
	 */
	
	inherit(JSONPPolling, Polling);
	
	/*
	 * JSONP only supports binary as base64 encoded strings
	 */
	
	JSONPPolling.prototype.supportsBinary = false;
	
	/**
	 * Closes the socket.
	 *
	 * @api private
	 */
	
	JSONPPolling.prototype.doClose = function () {
	  if (this.script) {
	    this.script.parentNode.removeChild(this.script);
	    this.script = null;
	  }
	
	  if (this.form) {
	    this.form.parentNode.removeChild(this.form);
	    this.form = null;
	    this.iframe = null;
	  }
	
	  Polling.prototype.doClose.call(this);
	};
	
	/**
	 * Starts a poll cycle.
	 *
	 * @api private
	 */
	
	JSONPPolling.prototype.doPoll = function () {
	  var self = this;
	  var script = document.createElement('script');
	
	  if (this.script) {
	    this.script.parentNode.removeChild(this.script);
	    this.script = null;
	  }
	
	  script.async = true;
	  script.src = this.uri();
	  script.onerror = function (e) {
	    self.onError('jsonp poll error', e);
	  };
	
	  var insertAt = document.getElementsByTagName('script')[0];
	  if (insertAt) {
	    insertAt.parentNode.insertBefore(script, insertAt);
	  } else {
	    (document.head || document.body).appendChild(script);
	  }
	  this.script = script;
	
	  var isUAgecko = 'undefined' !== typeof navigator && /gecko/i.test(navigator.userAgent);
	
	  if (isUAgecko) {
	    setTimeout(function () {
	      var iframe = document.createElement('iframe');
	      document.body.appendChild(iframe);
	      document.body.removeChild(iframe);
	    }, 100);
	  }
	};
	
	/**
	 * Writes with a hidden iframe.
	 *
	 * @param {String} data to send
	 * @param {Function} called upon flush.
	 * @api private
	 */
	
	JSONPPolling.prototype.doWrite = function (data, fn) {
	  var self = this;
	
	  if (!this.form) {
	    var form = document.createElement('form');
	    var area = document.createElement('textarea');
	    var id = this.iframeId = 'eio_iframe_' + this.index;
	    var iframe;
	
	    form.className = 'socketio';
	    form.style.position = 'absolute';
	    form.style.top = '-1000px';
	    form.style.left = '-1000px';
	    form.target = id;
	    form.method = 'POST';
	    form.setAttribute('accept-charset', 'utf-8');
	    area.name = 'd';
	    form.appendChild(area);
	    document.body.appendChild(form);
	
	    this.form = form;
	    this.area = area;
	  }
	
	  this.form.action = this.uri();
	
	  function complete () {
	    initIframe();
	    fn();
	  }
	
	  function initIframe () {
	    if (self.iframe) {
	      try {
	        self.form.removeChild(self.iframe);
	      } catch (e) {
	        self.onError('jsonp polling iframe removal error', e);
	      }
	    }
	
	    try {
	      // ie6 dynamic iframes with target="" support (thanks Chris Lambacher)
	      var html = '<iframe src="javascript:0" name="' + self.iframeId + '">';
	      iframe = document.createElement(html);
	    } catch (e) {
	      iframe = document.createElement('iframe');
	      iframe.name = self.iframeId;
	      iframe.src = 'javascript:0';
	    }
	
	    iframe.id = self.iframeId;
	
	    self.form.appendChild(iframe);
	    self.iframe = iframe;
	  }
	
	  initIframe();
	
	  // escape \n to prevent it from being converted into \r\n by some UAs
	  // double escaping is required for escaped new lines because unescaping of new lines can be done safely on server-side
	  data = data.replace(rEscapedNewline, '\\\n');
	  this.area.value = data.replace(rNewline, '\\n');
	
	  try {
	    this.form.submit();
	  } catch (e) {}
	
	  if (this.iframe.attachEvent) {
	    this.iframe.onreadystatechange = function () {
	      if (self.iframe.readyState === 'complete') {
	        complete();
	      }
	    };
	  } else {
	    this.iframe.onload = complete;
	  }
	};
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * Module dependencies.
	 */
	
	var Transport = __webpack_require__(139);
	var parser = __webpack_require__(140);
	var parseqs = __webpack_require__(149);
	var inherit = __webpack_require__(150);
	var yeast = __webpack_require__(151);
	var debug = __webpack_require__(152)('engine.io-client:websocket');
	var BrowserWebSocket = global.WebSocket || global.MozWebSocket;
	var NodeWebSocket;
	if (typeof window === 'undefined') {
	  try {
	    NodeWebSocket = __webpack_require__(157);
	  } catch (e) { }
	}
	
	/**
	 * Get either the `WebSocket` or `MozWebSocket` globals
	 * in the browser or try to resolve WebSocket-compatible
	 * interface exposed by `ws` for Node-like environment.
	 */
	
	var WebSocket = BrowserWebSocket;
	if (!WebSocket && typeof window === 'undefined') {
	  WebSocket = NodeWebSocket;
	}
	
	/**
	 * Module exports.
	 */
	
	module.exports = WS;
	
	/**
	 * WebSocket transport constructor.
	 *
	 * @api {Object} connection options
	 * @api public
	 */
	
	function WS (opts) {
	  var forceBase64 = (opts && opts.forceBase64);
	  if (forceBase64) {
	    this.supportsBinary = false;
	  }
	  this.perMessageDeflate = opts.perMessageDeflate;
	  this.usingBrowserWebSocket = BrowserWebSocket && !opts.forceNode;
	  if (!this.usingBrowserWebSocket) {
	    WebSocket = NodeWebSocket;
	  }
	  Transport.call(this, opts);
	}
	
	/**
	 * Inherits from Transport.
	 */
	
	inherit(WS, Transport);
	
	/**
	 * Transport name.
	 *
	 * @api public
	 */
	
	WS.prototype.name = 'websocket';
	
	/*
	 * WebSockets support binary
	 */
	
	WS.prototype.supportsBinary = true;
	
	/**
	 * Opens socket.
	 *
	 * @api private
	 */
	
	WS.prototype.doOpen = function () {
	  if (!this.check()) {
	    // let probe timeout
	    return;
	  }
	
	  var uri = this.uri();
	  var protocols = void (0);
	  var opts = {
	    agent: this.agent,
	    perMessageDeflate: this.perMessageDeflate
	  };
	
	  // SSL options for Node.js client
	  opts.pfx = this.pfx;
	  opts.key = this.key;
	  opts.passphrase = this.passphrase;
	  opts.cert = this.cert;
	  opts.ca = this.ca;
	  opts.ciphers = this.ciphers;
	  opts.rejectUnauthorized = this.rejectUnauthorized;
	  if (this.extraHeaders) {
	    opts.headers = this.extraHeaders;
	  }
	  if (this.localAddress) {
	    opts.localAddress = this.localAddress;
	  }
	
	  try {
	    this.ws = this.usingBrowserWebSocket ? new WebSocket(uri) : new WebSocket(uri, protocols, opts);
	  } catch (err) {
	    return this.emit('error', err);
	  }
	
	  if (this.ws.binaryType === undefined) {
	    this.supportsBinary = false;
	  }
	
	  if (this.ws.supports && this.ws.supports.binary) {
	    this.supportsBinary = true;
	    this.ws.binaryType = 'nodebuffer';
	  } else {
	    this.ws.binaryType = 'arraybuffer';
	  }
	
	  this.addEventListeners();
	};
	
	/**
	 * Adds event listeners to the socket
	 *
	 * @api private
	 */
	
	WS.prototype.addEventListeners = function () {
	  var self = this;
	
	  this.ws.onopen = function () {
	    self.onOpen();
	  };
	  this.ws.onclose = function () {
	    self.onClose();
	  };
	  this.ws.onmessage = function (ev) {
	    self.onData(ev.data);
	  };
	  this.ws.onerror = function (e) {
	    self.onError('websocket error', e);
	  };
	};
	
	/**
	 * Writes data to socket.
	 *
	 * @param {Array} array of packets.
	 * @api private
	 */
	
	WS.prototype.write = function (packets) {
	  var self = this;
	  this.writable = false;
	
	  // encodePacket efficient as it uses WS framing
	  // no need for encodePayload
	  var total = packets.length;
	  for (var i = 0, l = total; i < l; i++) {
	    (function (packet) {
	      parser.encodePacket(packet, self.supportsBinary, function (data) {
	        if (!self.usingBrowserWebSocket) {
	          // always create a new object (GH-437)
	          var opts = {};
	          if (packet.options) {
	            opts.compress = packet.options.compress;
	          }
	
	          if (self.perMessageDeflate) {
	            var len = 'string' === typeof data ? global.Buffer.byteLength(data) : data.length;
	            if (len < self.perMessageDeflate.threshold) {
	              opts.compress = false;
	            }
	          }
	        }
	
	        // Sometimes the websocket has already been closed but the browser didn't
	        // have a chance of informing us about it yet, in that case send will
	        // throw an error
	        try {
	          if (self.usingBrowserWebSocket) {
	            // TypeError is thrown when passing the second argument on Safari
	            self.ws.send(data);
	          } else {
	            self.ws.send(data, opts);
	          }
	        } catch (e) {
	          debug('websocket closed before onclose event');
	        }
	
	        --total || done();
	      });
	    })(packets[i]);
	  }
	
	  function done () {
	    self.emit('flush');
	
	    // fake drain
	    // defer to next tick to allow Socket to clear writeBuffer
	    setTimeout(function () {
	      self.writable = true;
	      self.emit('drain');
	    }, 0);
	  }
	};
	
	/**
	 * Called upon close
	 *
	 * @api private
	 */
	
	WS.prototype.onClose = function () {
	  Transport.prototype.onClose.call(this);
	};
	
	/**
	 * Closes socket.
	 *
	 * @api private
	 */
	
	WS.prototype.doClose = function () {
	  if (typeof this.ws !== 'undefined') {
	    this.ws.close();
	  }
	};
	
	/**
	 * Generates uri for connection.
	 *
	 * @api private
	 */
	
	WS.prototype.uri = function () {
	  var query = this.query || {};
	  var schema = this.secure ? 'wss' : 'ws';
	  var port = '';
	
	  // avoid port if default for schema
	  if (this.port && (('wss' === schema && Number(this.port) !== 443) ||
	    ('ws' === schema && Number(this.port) !== 80))) {
	    port = ':' + this.port;
	  }
	
	  // append timestamp to URI
	  if (this.timestampRequests) {
	    query[this.timestampParam] = yeast();
	  }
	
	  // communicate binary support capabilities
	  if (!this.supportsBinary) {
	    query.b64 = 1;
	  }
	
	  query = parseqs.encode(query);
	
	  // prepend ? to query
	  if (query.length) {
	    query = '?' + query;
	  }
	
	  var ipv6 = this.hostname.indexOf(':') !== -1;
	  return schema + '://' + (ipv6 ? '[' + this.hostname + ']' : this.hostname) + port + this.path + query;
	};
	
	/**
	 * Feature detection for WebSocket.
	 *
	 * @return {Boolean} whether this transport is available.
	 * @api public
	 */
	
	WS.prototype.check = function () {
	  return !!WebSocket && !('__initialize' in WebSocket && this.name === WS.prototype.name);
	};
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 157 */
/***/ (function(module, exports) {

	/* (ignored) */

/***/ }),
/* 158 */
/***/ (function(module, exports) {

	
	var indexOf = [].indexOf;
	
	module.exports = function(arr, obj){
	  if (indexOf) return arr.indexOf(obj);
	  for (var i = 0; i < arr.length; ++i) {
	    if (arr[i] === obj) return i;
	  }
	  return -1;
	};

/***/ }),
/* 159 */
/***/ (function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * JSON parse.
	 *
	 * @see Based on jQuery#parseJSON (MIT) and JSON2
	 * @api private
	 */
	
	var rvalidchars = /^[\],:{}\s]*$/;
	var rvalidescape = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
	var rvalidtokens = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
	var rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g;
	var rtrimLeft = /^\s+/;
	var rtrimRight = /\s+$/;
	
	module.exports = function parsejson(data) {
	  if ('string' != typeof data || !data) {
	    return null;
	  }
	
	  data = data.replace(rtrimLeft, '').replace(rtrimRight, '');
	
	  // Attempt to parse using the native JSON parser first
	  if (global.JSON && JSON.parse) {
	    return JSON.parse(data);
	  }
	
	  if (rvalidchars.test(data.replace(rvalidescape, '@')
	      .replace(rvalidtokens, ']')
	      .replace(rvalidbraces, ''))) {
	    return (new Function('return ' + data))();
	  }
	};
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

	
	/**
	 * Module dependencies.
	 */
	
	var parser = __webpack_require__(120);
	var Emitter = __webpack_require__(161);
	var toArray = __webpack_require__(162);
	var on = __webpack_require__(163);
	var bind = __webpack_require__(164);
	var debug = __webpack_require__(116)('socket.io-client:socket');
	var hasBin = __webpack_require__(142);
	
	/**
	 * Module exports.
	 */
	
	module.exports = exports = Socket;
	
	/**
	 * Internal events (blacklisted).
	 * These events can't be emitted by the user.
	 *
	 * @api private
	 */
	
	var events = {
	  connect: 1,
	  connect_error: 1,
	  connect_timeout: 1,
	  connecting: 1,
	  disconnect: 1,
	  error: 1,
	  reconnect: 1,
	  reconnect_attempt: 1,
	  reconnect_failed: 1,
	  reconnect_error: 1,
	  reconnecting: 1,
	  ping: 1,
	  pong: 1
	};
	
	/**
	 * Shortcut to `Emitter#emit`.
	 */
	
	var emit = Emitter.prototype.emit;
	
	/**
	 * `Socket` constructor.
	 *
	 * @api public
	 */
	
	function Socket (io, nsp, opts) {
	  this.io = io;
	  this.nsp = nsp;
	  this.json = this; // compat
	  this.ids = 0;
	  this.acks = {};
	  this.receiveBuffer = [];
	  this.sendBuffer = [];
	  this.connected = false;
	  this.disconnected = true;
	  if (opts && opts.query) {
	    this.query = opts.query;
	  }
	  if (this.io.autoConnect) this.open();
	}
	
	/**
	 * Mix in `Emitter`.
	 */
	
	Emitter(Socket.prototype);
	
	/**
	 * Subscribe to open, close and packet events
	 *
	 * @api private
	 */
	
	Socket.prototype.subEvents = function () {
	  if (this.subs) return;
	
	  var io = this.io;
	  this.subs = [
	    on(io, 'open', bind(this, 'onopen')),
	    on(io, 'packet', bind(this, 'onpacket')),
	    on(io, 'close', bind(this, 'onclose'))
	  ];
	};
	
	/**
	 * "Opens" the socket.
	 *
	 * @api public
	 */
	
	Socket.prototype.open =
	Socket.prototype.connect = function () {
	  if (this.connected) return this;
	
	  this.subEvents();
	  this.io.open(); // ensure open
	  if ('open' === this.io.readyState) this.onopen();
	  this.emit('connecting');
	  return this;
	};
	
	/**
	 * Sends a `message` event.
	 *
	 * @return {Socket} self
	 * @api public
	 */
	
	Socket.prototype.send = function () {
	  var args = toArray(arguments);
	  args.unshift('message');
	  this.emit.apply(this, args);
	  return this;
	};
	
	/**
	 * Override `emit`.
	 * If the event is in `events`, it's emitted normally.
	 *
	 * @param {String} event name
	 * @return {Socket} self
	 * @api public
	 */
	
	Socket.prototype.emit = function (ev) {
	  if (events.hasOwnProperty(ev)) {
	    emit.apply(this, arguments);
	    return this;
	  }
	
	  var args = toArray(arguments);
	  var parserType = parser.EVENT; // default
	  if (hasBin(args)) { parserType = parser.BINARY_EVENT; } // binary
	  var packet = { type: parserType, data: args };
	
	  packet.options = {};
	  packet.options.compress = !this.flags || false !== this.flags.compress;
	
	  // event ack callback
	  if ('function' === typeof args[args.length - 1]) {
	    debug('emitting packet with ack id %d', this.ids);
	    this.acks[this.ids] = args.pop();
	    packet.id = this.ids++;
	  }
	
	  if (this.connected) {
	    this.packet(packet);
	  } else {
	    this.sendBuffer.push(packet);
	  }
	
	  delete this.flags;
	
	  return this;
	};
	
	/**
	 * Sends a packet.
	 *
	 * @param {Object} packet
	 * @api private
	 */
	
	Socket.prototype.packet = function (packet) {
	  packet.nsp = this.nsp;
	  this.io.packet(packet);
	};
	
	/**
	 * Called upon engine `open`.
	 *
	 * @api private
	 */
	
	Socket.prototype.onopen = function () {
	  debug('transport is open - connecting');
	
	  // write connect packet if necessary
	  if ('/' !== this.nsp) {
	    if (this.query) {
	      this.packet({type: parser.CONNECT, query: this.query});
	    } else {
	      this.packet({type: parser.CONNECT});
	    }
	  }
	};
	
	/**
	 * Called upon engine `close`.
	 *
	 * @param {String} reason
	 * @api private
	 */
	
	Socket.prototype.onclose = function (reason) {
	  debug('close (%s)', reason);
	  this.connected = false;
	  this.disconnected = true;
	  delete this.id;
	  this.emit('disconnect', reason);
	};
	
	/**
	 * Called with socket packet.
	 *
	 * @param {Object} packet
	 * @api private
	 */
	
	Socket.prototype.onpacket = function (packet) {
	  if (packet.nsp !== this.nsp) return;
	
	  switch (packet.type) {
	    case parser.CONNECT:
	      this.onconnect();
	      break;
	
	    case parser.EVENT:
	      this.onevent(packet);
	      break;
	
	    case parser.BINARY_EVENT:
	      this.onevent(packet);
	      break;
	
	    case parser.ACK:
	      this.onack(packet);
	      break;
	
	    case parser.BINARY_ACK:
	      this.onack(packet);
	      break;
	
	    case parser.DISCONNECT:
	      this.ondisconnect();
	      break;
	
	    case parser.ERROR:
	      this.emit('error', packet.data);
	      break;
	  }
	};
	
	/**
	 * Called upon a server event.
	 *
	 * @param {Object} packet
	 * @api private
	 */
	
	Socket.prototype.onevent = function (packet) {
	  var args = packet.data || [];
	  debug('emitting event %j', args);
	
	  if (null != packet.id) {
	    debug('attaching ack callback to event');
	    args.push(this.ack(packet.id));
	  }
	
	  if (this.connected) {
	    emit.apply(this, args);
	  } else {
	    this.receiveBuffer.push(args);
	  }
	};
	
	/**
	 * Produces an ack callback to emit with an event.
	 *
	 * @api private
	 */
	
	Socket.prototype.ack = function (id) {
	  var self = this;
	  var sent = false;
	  return function () {
	    // prevent double callbacks
	    if (sent) return;
	    sent = true;
	    var args = toArray(arguments);
	    debug('sending ack %j', args);
	
	    var type = hasBin(args) ? parser.BINARY_ACK : parser.ACK;
	    self.packet({
	      type: type,
	      id: id,
	      data: args
	    });
	  };
	};
	
	/**
	 * Called upon a server acknowlegement.
	 *
	 * @param {Object} packet
	 * @api private
	 */
	
	Socket.prototype.onack = function (packet) {
	  var ack = this.acks[packet.id];
	  if ('function' === typeof ack) {
	    debug('calling ack %s with %j', packet.id, packet.data);
	    ack.apply(this, packet.data);
	    delete this.acks[packet.id];
	  } else {
	    debug('bad ack %s', packet.id);
	  }
	};
	
	/**
	 * Called upon server connect.
	 *
	 * @api private
	 */
	
	Socket.prototype.onconnect = function () {
	  this.connected = true;
	  this.disconnected = false;
	  this.emit('connect');
	  this.emitBuffered();
	};
	
	/**
	 * Emit buffered events (received and emitted).
	 *
	 * @api private
	 */
	
	Socket.prototype.emitBuffered = function () {
	  var i;
	  for (i = 0; i < this.receiveBuffer.length; i++) {
	    emit.apply(this, this.receiveBuffer[i]);
	  }
	  this.receiveBuffer = [];
	
	  for (i = 0; i < this.sendBuffer.length; i++) {
	    this.packet(this.sendBuffer[i]);
	  }
	  this.sendBuffer = [];
	};
	
	/**
	 * Called upon server disconnect.
	 *
	 * @api private
	 */
	
	Socket.prototype.ondisconnect = function () {
	  debug('server disconnect (%s)', this.nsp);
	  this.destroy();
	  this.onclose('io server disconnect');
	};
	
	/**
	 * Called upon forced client/server side disconnections,
	 * this method ensures the manager stops tracking us and
	 * that reconnections don't get triggered for this.
	 *
	 * @api private.
	 */
	
	Socket.prototype.destroy = function () {
	  if (this.subs) {
	    // clean subscriptions to avoid reconnections
	    for (var i = 0; i < this.subs.length; i++) {
	      this.subs[i].destroy();
	    }
	    this.subs = null;
	  }
	
	  this.io.destroy(this);
	};
	
	/**
	 * Disconnects the socket manually.
	 *
	 * @return {Socket} self
	 * @api public
	 */
	
	Socket.prototype.close =
	Socket.prototype.disconnect = function () {
	  if (this.connected) {
	    debug('performing disconnect (%s)', this.nsp);
	    this.packet({ type: parser.DISCONNECT });
	  }
	
	  // remove socket from pool
	  this.destroy();
	
	  if (this.connected) {
	    // fire events
	    this.onclose('io client disconnect');
	  }
	  return this;
	};
	
	/**
	 * Sets the compress flag.
	 *
	 * @param {Boolean} if `true`, compresses the sending data
	 * @return {Socket} self
	 * @api public
	 */
	
	Socket.prototype.compress = function (compress) {
	  this.flags = this.flags || {};
	  this.flags.compress = compress;
	  return this;
	};


/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

	
	/**
	 * Expose `Emitter`.
	 */
	
	if (true) {
	  module.exports = Emitter;
	}
	
	/**
	 * Initialize a new `Emitter`.
	 *
	 * @api public
	 */
	
	function Emitter(obj) {
	  if (obj) return mixin(obj);
	};
	
	/**
	 * Mixin the emitter properties.
	 *
	 * @param {Object} obj
	 * @return {Object}
	 * @api private
	 */
	
	function mixin(obj) {
	  for (var key in Emitter.prototype) {
	    obj[key] = Emitter.prototype[key];
	  }
	  return obj;
	}
	
	/**
	 * Listen on the given `event` with `fn`.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */
	
	Emitter.prototype.on =
	Emitter.prototype.addEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};
	  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
	    .push(fn);
	  return this;
	};
	
	/**
	 * Adds an `event` listener that will be invoked a single
	 * time then automatically removed.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */
	
	Emitter.prototype.once = function(event, fn){
	  function on() {
	    this.off(event, on);
	    fn.apply(this, arguments);
	  }
	
	  on.fn = fn;
	  this.on(event, on);
	  return this;
	};
	
	/**
	 * Remove the given callback for `event` or all
	 * registered callbacks.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */
	
	Emitter.prototype.off =
	Emitter.prototype.removeListener =
	Emitter.prototype.removeAllListeners =
	Emitter.prototype.removeEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};
	
	  // all
	  if (0 == arguments.length) {
	    this._callbacks = {};
	    return this;
	  }
	
	  // specific event
	  var callbacks = this._callbacks['$' + event];
	  if (!callbacks) return this;
	
	  // remove all handlers
	  if (1 == arguments.length) {
	    delete this._callbacks['$' + event];
	    return this;
	  }
	
	  // remove specific handler
	  var cb;
	  for (var i = 0; i < callbacks.length; i++) {
	    cb = callbacks[i];
	    if (cb === fn || cb.fn === fn) {
	      callbacks.splice(i, 1);
	      break;
	    }
	  }
	  return this;
	};
	
	/**
	 * Emit `event` with the given args.
	 *
	 * @param {String} event
	 * @param {Mixed} ...
	 * @return {Emitter}
	 */
	
	Emitter.prototype.emit = function(event){
	  this._callbacks = this._callbacks || {};
	  var args = [].slice.call(arguments, 1)
	    , callbacks = this._callbacks['$' + event];
	
	  if (callbacks) {
	    callbacks = callbacks.slice(0);
	    for (var i = 0, len = callbacks.length; i < len; ++i) {
	      callbacks[i].apply(this, args);
	    }
	  }
	
	  return this;
	};
	
	/**
	 * Return array of callbacks for `event`.
	 *
	 * @param {String} event
	 * @return {Array}
	 * @api public
	 */
	
	Emitter.prototype.listeners = function(event){
	  this._callbacks = this._callbacks || {};
	  return this._callbacks['$' + event] || [];
	};
	
	/**
	 * Check if this emitter has `event` handlers.
	 *
	 * @param {String} event
	 * @return {Boolean}
	 * @api public
	 */
	
	Emitter.prototype.hasListeners = function(event){
	  return !! this.listeners(event).length;
	};


/***/ }),
/* 162 */
/***/ (function(module, exports) {

	module.exports = toArray
	
	function toArray(list, index) {
	    var array = []
	
	    index = index || 0
	
	    for (var i = index || 0; i < list.length; i++) {
	        array[i - index] = list[i]
	    }
	
	    return array
	}


/***/ }),
/* 163 */
/***/ (function(module, exports) {

	
	/**
	 * Module exports.
	 */
	
	module.exports = on;
	
	/**
	 * Helper for subscriptions.
	 *
	 * @param {Object|EventEmitter} obj with `Emitter` mixin or `EventEmitter`
	 * @param {String} event name
	 * @param {Function} callback
	 * @api public
	 */
	
	function on (obj, ev, fn) {
	  obj.on(ev, fn);
	  return {
	    destroy: function () {
	      obj.removeListener(ev, fn);
	    }
	  };
	}


/***/ }),
/* 164 */
/***/ (function(module, exports) {

	/**
	 * Slice reference.
	 */
	
	var slice = [].slice;
	
	/**
	 * Bind `obj` to `fn`.
	 *
	 * @param {Object} obj
	 * @param {Function|String} fn or string
	 * @return {Function}
	 * @api public
	 */
	
	module.exports = function(obj, fn){
	  if ('string' == typeof fn) fn = obj[fn];
	  if ('function' != typeof fn) throw new Error('bind() requires a function');
	  var args = slice.call(arguments, 2);
	  return function(){
	    return fn.apply(obj, args.concat(slice.call(arguments)));
	  }
	};


/***/ }),
/* 165 */
/***/ (function(module, exports) {

	
	/**
	 * Expose `Backoff`.
	 */
	
	module.exports = Backoff;
	
	/**
	 * Initialize backoff timer with `opts`.
	 *
	 * - `min` initial timeout in milliseconds [100]
	 * - `max` max timeout [10000]
	 * - `jitter` [0]
	 * - `factor` [2]
	 *
	 * @param {Object} opts
	 * @api public
	 */
	
	function Backoff(opts) {
	  opts = opts || {};
	  this.ms = opts.min || 100;
	  this.max = opts.max || 10000;
	  this.factor = opts.factor || 2;
	  this.jitter = opts.jitter > 0 && opts.jitter <= 1 ? opts.jitter : 0;
	  this.attempts = 0;
	}
	
	/**
	 * Return the backoff duration.
	 *
	 * @return {Number}
	 * @api public
	 */
	
	Backoff.prototype.duration = function(){
	  var ms = this.ms * Math.pow(this.factor, this.attempts++);
	  if (this.jitter) {
	    var rand =  Math.random();
	    var deviation = Math.floor(rand * this.jitter * ms);
	    ms = (Math.floor(rand * 10) & 1) == 0  ? ms - deviation : ms + deviation;
	  }
	  return Math.min(ms, this.max) | 0;
	};
	
	/**
	 * Reset the number of attempts.
	 *
	 * @api public
	 */
	
	Backoff.prototype.reset = function(){
	  this.attempts = 0;
	};
	
	/**
	 * Set the minimum duration
	 *
	 * @api public
	 */
	
	Backoff.prototype.setMin = function(min){
	  this.ms = min;
	};
	
	/**
	 * Set the maximum duration
	 *
	 * @api public
	 */
	
	Backoff.prototype.setMax = function(max){
	  this.max = max;
	};
	
	/**
	 * Set the jitter
	 *
	 * @api public
	 */
	
	Backoff.prototype.setJitter = function(jitter){
	  this.jitter = jitter;
	};
	


/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

	//     uuid.js
	//
	//     Copyright (c) 2010-2012 Robert Kieffer
	//     MIT License - http://opensource.org/licenses/mit-license.php
	
	// Unique ID creation requires a high quality random # generator.  We feature
	// detect to determine the best RNG source, normalizing to a function that
	// returns 128-bits of randomness, since that's what's usually required
	var _rng = __webpack_require__(167);
	
	// Maps for number <-> hex string conversion
	var _byteToHex = [];
	var _hexToByte = {};
	for (var i = 0; i < 256; i++) {
	  _byteToHex[i] = (i + 0x100).toString(16).substr(1);
	  _hexToByte[_byteToHex[i]] = i;
	}
	
	// **`parse()` - Parse a UUID into it's component bytes**
	function parse(s, buf, offset) {
	  var i = (buf && offset) || 0, ii = 0;
	
	  buf = buf || [];
	  s.toLowerCase().replace(/[0-9a-f]{2}/g, function(oct) {
	    if (ii < 16) { // Don't overflow!
	      buf[i + ii++] = _hexToByte[oct];
	    }
	  });
	
	  // Zero out remaining bytes if string was short
	  while (ii < 16) {
	    buf[i + ii++] = 0;
	  }
	
	  return buf;
	}
	
	// **`unparse()` - Convert UUID byte array (ala parse()) into a string**
	function unparse(buf, offset) {
	  var i = offset || 0, bth = _byteToHex;
	  return  bth[buf[i++]] + bth[buf[i++]] +
	          bth[buf[i++]] + bth[buf[i++]] + '-' +
	          bth[buf[i++]] + bth[buf[i++]] + '-' +
	          bth[buf[i++]] + bth[buf[i++]] + '-' +
	          bth[buf[i++]] + bth[buf[i++]] + '-' +
	          bth[buf[i++]] + bth[buf[i++]] +
	          bth[buf[i++]] + bth[buf[i++]] +
	          bth[buf[i++]] + bth[buf[i++]];
	}
	
	// **`v1()` - Generate time-based UUID**
	//
	// Inspired by https://github.com/LiosK/UUID.js
	// and http://docs.python.org/library/uuid.html
	
	// random #'s we need to init node and clockseq
	var _seedBytes = _rng();
	
	// Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
	var _nodeId = [
	  _seedBytes[0] | 0x01,
	  _seedBytes[1], _seedBytes[2], _seedBytes[3], _seedBytes[4], _seedBytes[5]
	];
	
	// Per 4.2.2, randomize (14 bit) clockseq
	var _clockseq = (_seedBytes[6] << 8 | _seedBytes[7]) & 0x3fff;
	
	// Previous uuid creation time
	var _lastMSecs = 0, _lastNSecs = 0;
	
	// See https://github.com/broofa/node-uuid for API details
	function v1(options, buf, offset) {
	  var i = buf && offset || 0;
	  var b = buf || [];
	
	  options = options || {};
	
	  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;
	
	  // UUID timestamps are 100 nano-second units since the Gregorian epoch,
	  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
	  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
	  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
	  var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime();
	
	  // Per 4.2.1.2, use count of uuid's generated during the current clock
	  // cycle to simulate higher resolution clock
	  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;
	
	  // Time since last uuid creation (in msecs)
	  var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;
	
	  // Per 4.2.1.2, Bump clockseq on clock regression
	  if (dt < 0 && options.clockseq === undefined) {
	    clockseq = clockseq + 1 & 0x3fff;
	  }
	
	  // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
	  // time interval
	  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
	    nsecs = 0;
	  }
	
	  // Per 4.2.1.2 Throw error if too many uuids are requested
	  if (nsecs >= 10000) {
	    throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
	  }
	
	  _lastMSecs = msecs;
	  _lastNSecs = nsecs;
	  _clockseq = clockseq;
	
	  // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
	  msecs += 12219292800000;
	
	  // `time_low`
	  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
	  b[i++] = tl >>> 24 & 0xff;
	  b[i++] = tl >>> 16 & 0xff;
	  b[i++] = tl >>> 8 & 0xff;
	  b[i++] = tl & 0xff;
	
	  // `time_mid`
	  var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
	  b[i++] = tmh >>> 8 & 0xff;
	  b[i++] = tmh & 0xff;
	
	  // `time_high_and_version`
	  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
	  b[i++] = tmh >>> 16 & 0xff;
	
	  // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
	  b[i++] = clockseq >>> 8 | 0x80;
	
	  // `clock_seq_low`
	  b[i++] = clockseq & 0xff;
	
	  // `node`
	  var node = options.node || _nodeId;
	  for (var n = 0; n < 6; n++) {
	    b[i + n] = node[n];
	  }
	
	  return buf ? buf : unparse(b);
	}
	
	// **`v4()` - Generate random UUID**
	
	// See https://github.com/broofa/node-uuid for API details
	function v4(options, buf, offset) {
	  // Deprecated - 'format' argument, as supported in v1.2
	  var i = buf && offset || 0;
	
	  if (typeof(options) == 'string') {
	    buf = options == 'binary' ? new Array(16) : null;
	    options = null;
	  }
	  options = options || {};
	
	  var rnds = options.random || (options.rng || _rng)();
	
	  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
	  rnds[6] = (rnds[6] & 0x0f) | 0x40;
	  rnds[8] = (rnds[8] & 0x3f) | 0x80;
	
	  // Copy bytes to buffer, if provided
	  if (buf) {
	    for (var ii = 0; ii < 16; ii++) {
	      buf[i + ii] = rnds[ii];
	    }
	  }
	
	  return buf || unparse(rnds);
	}
	
	// Export public API
	var uuid = v4;
	uuid.v1 = v1;
	uuid.v4 = v4;
	uuid.parse = parse;
	uuid.unparse = unparse;
	
	module.exports = uuid;


/***/ }),
/* 167 */
/***/ (function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {
	var rng;
	
	var crypto = global.crypto || global.msCrypto; // for IE 11
	if (crypto && crypto.getRandomValues) {
	  // WHATWG crypto-based RNG - http://wiki.whatwg.org/wiki/Crypto
	  // Moderately fast, high quality
	  var _rnds8 = new Uint8Array(16);
	  rng = function whatwgRNG() {
	    crypto.getRandomValues(_rnds8);
	    return _rnds8;
	  };
	}
	
	if (!rng) {
	  // Math.random()-based (RNG)
	  //
	  // If all else fails, use Math.random().  It's fast, but is of unspecified
	  // quality.
	  var  _rnds = new Array(16);
	  rng = function() {
	    for (var i = 0, r; i < 16; i++) {
	      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
	      _rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
	    }
	
	    return _rnds;
	  };
	}
	
	module.exports = rng;
	
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _Auth = __webpack_require__(169);
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } /* global angular */
	
	
	angular.module('dappChess').factory('crypto', function () {
	  /*
	   * Usage:
	   * let text = 'My super text to be signed';
	   * let signature = crypto.sign(web3.eth.accounts[0], gameId, text);
	   * let valid = crypto.verify(web3.eth.accounts[0], gameId, signature, text);
	   */
	
	  var crypto = {};
	
	  function leftPad(nr, n, str) {
	    return Array(n - String(nr).length + 1).join(str || '0') + nr;
	  }
	
	  function solSha3() {
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    args = args.map(function (arg) {
	      if (typeof arg === 'string') {
	        if (arg.substring(0, 2) === '0x') {
	          return arg.slice(2);
	        } else {
	          return _Auth.web3.toHex(arg).slice(2);
	        }
	      }
	
	      if (typeof arg === 'number') {
	        if (arg < 0) {
	          return leftPad((arg >>> 0).toString(16), 64, 'F');
	        }
	        return leftPad(arg.toString(16), 64, 0);
	      } else {
	        return '';
	      }
	    });
	
	    args = args.join('');
	
	    return '0x' + _Auth.web3.sha3(args, { encoding: 'hex' });
	  }
	  crypto.solSha3 = solSha3;
	
	  /**
	   * Calculates the signature of the given data.
	   * @param{string} account to be used for signing
	   * @param{string/number/array} data to be signed
	   * @returns{string} the signature of the given data
	   */
	  crypto.sign = function (account, gameId) {
	    var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
	
	    if (!Array.isArray(data)) data = [data];
	    var hash = solSha3.apply(undefined, _toConsumableArray(data).concat([gameId]));
	    return _Auth.web3.eth.sign(account, hash);
	  };
	
	  /**
	   * Verifies the signature of the given data.
	   * @param{string} account of the signature
	   * @param{string} signature of the data
	   * @param{string/number/array} data that was signed
	   * @returns{boolean} true, iff the signature matches the account and data
	     */
	  crypto.verify = function (account, gameId, signature) {
	    var data = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
	
	    if (!Array.isArray(data)) data = [data];
	    var msgHash = solSha3.apply(undefined, _toConsumableArray(data).concat([gameId]));
	    var r = signature.slice(0, 66);
	    var s = '0x' + signature.slice(66, 130);
	    var v = '0x' + signature.slice(130, 132);
	    console.log('crypto calling web3.toDecimal', v);
	    v = _Auth.web3.toDecimal(v);
	
	    return _Auth.Auth.verify(account, msgHash, v, r, s);
	  };
	
	  crypto.test = function () {
	    var defaultBoard = [-4, -2, -3, -5, -6, -3, -2, -4, 0, 0, 0, 4, 0, 0, 0, 0, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 2, 3, 5, 6, 3, 2, 4, 0, 0, 0, 116, 0, 0, 0, 0];
	
	    var text = 'My super text to be signed';
	    var gameId = 0x529ae4d1feee4c1b4ae8194856bfec24ae7589bd2e31604d52a9019262b8d38e;
	
	    var signature = crypto.sign(_Auth.web3.eth.accounts[0], gameId, text);
	    var valid = crypto.verify(_Auth.web3.eth.accounts[0], gameId, signature, text);
	    console.log('testing crypto.sign & crypo.verify: text \t\t\t==>', valid);
	
	    signature = crypto.sign(_Auth.web3.eth.accounts[0], gameId, defaultBoard);
	    valid = crypto.verify(_Auth.web3.eth.accounts[0], gameId, signature, defaultBoard);
	    console.log('testing crypto.sign & crypo.verify: defaultBoard \t==>', valid);
	
	    signature = crypto.sign(_Auth.web3.eth.accounts[0], gameId, text);
	    valid = _Auth.Auth.verifySig(_Auth.web3.eth.accounts[0], solSha3(text, gameId), signature);
	    console.log('testing crypto.sign & Auth.verifySig: text \t\t\t==>', valid);
	
	    signature = crypto.sign(_Auth.web3.eth.accounts[0], gameId, defaultBoard);
	    valid = _Auth.Auth.verifySig(_Auth.web3.eth.accounts[0], solSha3.apply(undefined, defaultBoard.concat([gameId])), signature);
	    console.log('testing crypto.sign & Auth.verifySig: defaultBoard \t==>', valid);
	  };
	
	  //crypto.test();
	
	  return crypto;
	});

/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Web3 Helper
	 * Returns initialized web3 instance
	 *
	 * @author: U-Zyn Chua <chua@uzyn.com>
	 */
	var Web3 = __webpack_require__(20);
	var web3;
	if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
	 web3 = new Web3(window.web3.currentProvider);
	} else {
	 web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
	}
	
	module.exports = {
	"Auth": web3.eth.contract([{"constant":true,"inputs":[{"name":"hash","type":"bytes32"},{"name":"v","type":"uint8"},{"name":"r","type":"bytes32"},{"name":"s","type":"bytes32"}],"name":"getAddress","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":true,"inputs":[{"name":"account","type":"address"},{"name":"hash","type":"bytes32"},{"name":"v","type":"uint8"},{"name":"r","type":"bytes32"},{"name":"s","type":"bytes32"}],"name":"verify","outputs":[{"name":"","type":"bool"}],"type":"function"},{"constant":true,"inputs":[{"name":"account","type":"address"},{"name":"hash","type":"bytes32"},{"name":"sig","type":"bytes"}],"name":"verifySig","outputs":[{"name":"","type":"bool"}],"type":"function"}]).at("0xfd84510bc7984364ca31e707086d7a764e7c5839"),
	web3: web3
	};


/***/ }),
/* 170 */
/***/ (function(module, exports) {

	'use strict';
	
	/* global angular */
	angular.module('dappChess').controller('WelcomeCtrl', function () {});

/***/ }),
/* 171 */
/***/ (function(module, exports) {

	'use strict';
	
	/* global angular */
	var MESSAGE_TIMEOUTS = { message: 7000, success: 6000, error: 14000 };
	
	angular.module('dappChess').controller('MessagesCtrl', function ($scope, $timeout) {
	  $scope.messages = [];
	
	  $scope.$on('message', function (event, message) {
	    var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : message;
	    var topic = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
	
	    var id = Math.random();
	
	    if (topic) {
	      $scope.messages = $scope.messages.filter(function (message) {
	        if (topic === message.topic) {
	          return false;
	        }
	        return true;
	      });
	    }
	    if (type === 'success' || type === 'error' || type === 'message') {
	      $timeout(function () {
	        $scope.messages = $scope.messages.filter(function (message) {
	          if (id === message.id) {
	            return false;
	          }
	          return true;
	        });
	      }, MESSAGE_TIMEOUTS[type]);
	    }
	
	    $scope.messages.push({
	      id: id,
	      message: message,
	      type: type,
	      topic: topic
	    });
	  });
	});

/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _Chess = __webpack_require__(19);
	
	angular.module('dappChess').controller('InitializeGameCtrl', function ($rootScope, $scope, accounts) {
	  $scope.startcolor = 'white';
	  $scope.username = null;
	  $scope.turntime = 10;
	  $scope.etherbet = 0;
	
	  $scope.accounts = accounts;
	
	  function initializeGame() {
	    $rootScope.$broadcast('message', 'Your game is being created, please wait a moment...', 'loading', 'startgame');
	
	    try {
	      console.log('Trying to initialize game', $scope.username, {
	        from: accounts.selectedAccount,
	        value: _Chess.web3.toWei($scope.etherbet / 2, 'ether')
	      });
	      _Chess.Chess.initGame($scope.username, $scope.startcolor === 'white', $scope.turntime, {
	        from: accounts.selectedAccount,
	        gas: 10000000,
	        value: _Chess.web3.toWei($scope.etherbet / 2, 'ether')
	      });
	    } catch (e) {
	      console.log('Error on initialize game', e);
	      $rootScope.$broadcast('message', 'Could not initialize the game', 'loading', 'startgame');
	    }
	  }
	
	  $scope.initializeGame = function (form) {
	    if (form.$valid) {
	      initializeGame();
	    }
	  };
	}); /* global angular */

/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _Chess = __webpack_require__(19);
	
	angular.module('dappChess').controller('JoinGameCtrl', function ($rootScope, $scope, games, accounts) {
	  $scope.username = null;
	  $scope.gameId = null;
	  $scope.games = games.list;
	  $scope.openGames = games.openGames;
	  $scope.etherbet = 0;
	
	  $scope.accounts = accounts;
	
	  $scope.setSelectedGame = function ($event, game) {
	    $scope.gameId = game.gameId;
	    $scope.etherbet = game.pot;
	
	    $event.preventDefault();
	  };
	  $scope.isSelectedGame = function (game) {
	    return $scope.gameId === game.gameId;
	  };
	
	  function joinGame() {
	    $rootScope.$broadcast('message', 'Trying to join the game, please wait a moment.....', 'loading', 'joingame');
	    try {
	      console.log('Trying to join game', $scope.gameId, $scope.username, {
	        from: accounts.selectedAccount,
	        value: _Chess.web3.toWei($scope.etherbet.replace(',', '.'), 'ether')
	      });
	      _Chess.Chess.joinGame($scope.gameId, $scope.username, {
	        from: accounts.selectedAccount,
	        gas: 10000000,
	        value: _Chess.web3.toWei($scope.etherbet.replace(',', '.'), 'ether')
	      });
	    } catch (e) {
	      console.log('Error joining the game', e);
	      $rootScope.$broadcast('message', 'Could not join the game', 'loading', 'joingame');
	    }
	  }
	
	  $scope.joinGame = function (form) {
	    if (form.$valid) {
	      joinGame();
	    }
	  };
	}); /* global angular */

/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _Chess = __webpack_require__(19);
	
	var _fenConversion = __webpack_require__(109);
	
	/* global angular, Chessboard, ChessUtils */
	var _module = angular.module('dappChess');
	_module.controller('PlayGameCtrl', function (games, gameStates, $route, navigation, $scope, $rootScope, $timeout) {
	  // init chess validation
	  var board, lastFrom, lastTo, chessMove;
	
	  $scope.gamePgn = '';
	  $scope.gameStatus = '';
	
	  function lightItUp() {
	    var xWhite = 0,
	        yWhite = 8;
	    var xBlack = 7,
	        yBlack = 1;
	    var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
	    var playerWhite = {};
	    var playerBlack = {};
	
	    for (var i = 0; i < 64; i++) {
	      playerWhite[alphabet[xWhite] + yWhite] = i;
	      playerBlack[alphabet[xBlack] + yBlack] = i;
	
	      xWhite++;
	      xBlack--;
	      if (xWhite === 8 && xBlack) {
	        yWhite--;
	        yBlack++;
	        xWhite = 0;
	        xBlack = 7;
	      }
	    }
	
	    return { 'playerWhite': playerWhite, 'playerBlack': playerBlack };
	  }
	
	  function checkOpenGame(gameId) {
	    return games.openGames.indexOf(gameId) !== -1;
	  }
	
	  // Update game information to user
	  function updateGameInfo(status) {
	    $scope.gameStatus = status;
	    $scope.gamePgn = $scope.game.chess.pgn();
	    // Clean up Setup line
	    $scope.gamePgn = $scope.gamePgn.replace(/\[SetUp "1"\]\n\[FEN "(.*?)"\]/, '$1');
	  }
	
	  // player clicked on chess piece
	  function pieceSelected(notationSquare) {
	    var i,
	        movesNotation,
	        movesPosition = [];
	
	    movesNotation = $scope.game.chess.moves({ square: notationSquare, verbose: true });
	    for (i = 0; i < movesNotation.length; i++) {
	      movesPosition.push(ChessUtils.convertNotationSquareToIndex(movesNotation[i].to));
	    }
	    return movesPosition;
	  }
	
	  function updateBoardState(game) {
	    var chessMove = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
	
	    console.log('updateBoardState', game, chessMove);
	    var chess = game.chess;
	
	    if (chessMove) {
	      // If we know which move it was, show it on board
	      console.log('Updating chess board with move');
	      board.move(chessMove.from + '-' + chessMove.to);
	
	      var highlights = lightItUp();
	      var fromW = highlights.playerWhite[chessMove.from];
	      var toW = highlights.playerWhite[chessMove.to];
	      var fromB = highlights.playerBlack[chessMove.from];
	      var toB = highlights.playerBlack[chessMove.to];
	
	      if (lastFrom !== null) {
	        $('#board-' + game.gameId + '_chess_square_' + lastFrom).removeClass('chess_square_moved');
	        $('#board-' + game.gameId + '_chess_square_' + lastTo).removeClass('chess_square_moved');
	      }
	
	      if (game.self.color === 'white') {
	        $('#board-' + game.gameId + '_chess_square_' + fromW).addClass('chess_square_moved');
	        $('#board-' + game.gameId + '_chess_square_' + toW).addClass('chess_square_moved');
	        lastFrom = fromW;
	        lastTo = toW;
	      } else {
	        $('#board-' + game.gameId + '_chess_square_' + fromB).addClass('chess_square_moved');
	        $('#board-' + game.gameId + '_chess_square_' + toB).addClass('chess_square_moved');
	        lastFrom = fromB;
	        lastTo = toB;
	      }
	    } else {
	      // no known move to show, just update board
	      console.log('Updating chess board with state');
	      board.position(game.chess.fen().split(' ')[0]);
	      if (lastFrom !== null) {
	        $('#board-' + game.gameId + '_chess_square_' + lastFrom).removeClass('chess_square_moved');
	        $('#board-' + game.gameId + '_chess_square_' + lastTo).removeClass('chess_square_moved');
	      }
	    }
	
	    var nextPlayer = void 0,
	        status = void 0,
	        userColor = game.self.color === 'white' ? 'w' : 'b';
	    // define next player
	    if (userColor === chess.turn()) {
	      nextPlayer = 'You';
	      status = 'It\'s your turn.';
	      board.enableUserInput(true);
	    } else {
	      nextPlayer = game.opponent.username;
	      status = 'It\'s ' + nextPlayer + '\'s turn.';
	      board.enableUserInput(false);
	    }
	
	    /*
	     Situation: - Black/White makes a move. White/Black is in turn now.
	     - Black/White checks checkmate, draw and stalemate conditions
	     - If one of these conditions is true Black/White informs blockchain
	     about the situation.
	     - Note: only the player before will inform blockchain
	     */
	    if (chess.in_checkmate() === true) {
	      // jshint ignore:line
	      status = 'CHECKMATE! ' + nextPlayer + ' lost.';
	      if (chess.turn() === 'b' && game.self.color === 'white') {
	        games.claimWin(game);
	      }
	      if (chess.turn() === 'w' && game.self.color === 'black') {
	        games.claimWin(game);
	      }
	    }
	    // draw?
	    else if (chess.in_draw() === true) {
	        // jshint ignore:line
	        status = 'DRAW!';
	        if (chess.turn() === 'b' && game.self.color === 'white') {
	          games.offerDraw(game);
	        }
	        if (chess.turn() === 'w' && game.self.color === 'black') {
	          games.offerDraw(game);
	        }
	      }
	
	      // stalemate?
	      else if (chess.in_stalemate() === true) {
	          // jshint ignore:line
	          status = 'STALEMATE!';
	          if (chess.turn() === 'b' && game.self.color === 'white') {
	            games.offerDraw(game);
	          }
	          if (chess.turn() === 'w' && game.self.color === 'black') {
	            games.offerDraw(game);
	          }
	        }
	
	        // plaver in check?
	        else if (chess.in_check() === true) {
	            // jshint ignore:line
	            status = 'CHECK! ' + status;
	          }
	    updateGameInfo(status);
	  }
	
	  function pieceMoveOffChain(move) {
	    var game = $scope.getGame();
	    console.log('pieceMoveOffChain move number before', gameStates.getMoveNumberFromState(game.state));
	    console.log('old fen', game.chess.fen());
	    // move piece from ... to
	    chessMove = game.chess.move({
	      from: move.from,
	      to: move.to,
	      promotion: 'q'
	    });
	
	    var fen = game.chess.fen();
	    console.log('new fen', fen);
	
	    if (chessMove !== null) {
	      // Submit move off-chain
	      game.state = (0, _fenConversion.generateState)(fen);
	      console.log('pieceMoveOffChain move number after', gameStates.getMoveNumberFromState(game.state));
	
	      updateBoardState(game, move);
	      // be sure to call sendMove after game updated!
	      games.sendMove(game, move.from, move.to);
	      $scope.$apply();
	    } else {
	      // Invalid move
	    }
	
	    return game.chess.fen();
	  }
	
	  function initChessboard(game) {
	    board = new Chessboard('board-' + game.gameId, {
	      position: game.chess.fen(),
	      eventHandlers: {
	        onPieceSelected: pieceSelected,
	        onMove: pieceMoveOffChain
	      }
	    });
	
	    // set board orientation and disable black player to click
	    if (game.self.color === 'black') {
	      board.setOrientation(ChessUtils.ORIENTATION.black);
	    }
	
	    // Update game information
	    if (game.ended) {
	      updateGameInfo('Game ended.');
	      board.enableUserInput(false);
	    } else {
	      if (game.chess.turn() === game.self.color[0]) {
	        updateGameInfo('It\'s your turn.');
	        board.enableUserInput(true);
	      } else {
	        updateGameInfo('It\'s your opponent\'s turn.');
	        board.enableUserInput(false);
	      }
	    }
	  }
	
	  $scope.getGameId = function () {
	    return $route.current.params.id;
	  };
	
	  $scope.isOpenGame = function () {
	    var gameId = $scope.getGameId();
	
	    if (gameId) {
	      return checkOpenGame(gameId);
	    }
	
	    return false;
	  };
	
	  $scope.getGame = function () {
	    var gameId = $scope.getGameId();
	
	    if (gameId) {
	      return games.getGame(gameId);
	    }
	
	    return false;
	  };
	
	  $scope.surrender = function () {
	    $rootScope.$broadcast('message', 'Submitting your surrender, please wait...', 'loading', 'playgame');
	    try {
	      _Chess.Chess.surrender($scope.getGameId(), { from: $scope.getGame().self.accountId,
	        gas: 10000000 });
	    } catch (e) {
	      $rootScope.$broadcast('message', 'Could not submit your surrender', 'error', 'playgame-' + $scope.getGameId());
	    }
	  };
	
	  $scope.gameIsWon = function () {
	    var game = $scope.getGame();
	    if (game) {
	      return typeof game.winner !== 'undefined' && game.winner === 'self';
	    }
	
	    return false;
	  };
	
	  $scope.gameIsLost = function () {
	    var game = $scope.getGame();
	    if (game) {
	      return typeof game.winner !== 'undefined' && game.winner === 'opponent';
	    }
	
	    return false;
	  };
	
	  $scope.gameIsDraw = function () {
	    var game = $scope.getGame();
	    if (game) {
	      return game.ended && (typeof game.winner === 'undefined' || game.winner !== 'self' && game.winner !== 'opponent');
	    }
	
	    return false;
	  };
	
	  $scope.gameIsActive = function () {
	    var game = $scope.getGame();
	
	    if (game) {
	      return !game.ended;
	    }
	
	    return false;
	  };
	
	  $scope.gameCanClaimWin = function () {
	    var game = $scope.getGame();
	    if (game && game.chess) {
	      return game.timeoutState === 0 && game.nextPlayer !== game.self.accountId && typeof game.nextPlayer !== 'undefined' && game.chess.in_check() && // jshint ignore:line
	      !game.ended;
	    }
	    return false;
	  };
	
	  $scope.gameCanOfferDraw = function () {
	    var game = $scope.getGame();
	    if (game) {
	      var timeoutDatePlus2TurnTime = new Date(game.timeoutStarted * 1000 + 2 * game.turnTime * 60000);
	      return (game.timeoutState === 0 || game.timeoutState === 2 && timeoutDatePlus2TurnTime < new Date()) && !game.ended;
	    }
	  };
	
	  $scope.gameCanClaimTimeout = function () {
	    var game = $scope.getGame();
	    if (game) {
	      return game.timeoutState === 0 && game.nextPlayer !== game.self.accountId && typeof game.nextPlayer !== 'undefined' && !game.ended;
	    }
	  };
	
	  $scope.gameCanConfirmDraw = function () {
	    var game = $scope.getGame();
	    if (game) {
	      return (game.timeoutState === -1 && game.nextPlayer === game.self.accountId || game.timeoutState === -2 && game.nextPlayer !== game.self.accountId && typeof game.nextPlayer !== 'undefined') && !game.ended;
	    }
	  };
	
	  $scope.gameCanConfirmLoose = function () {
	    var game = $scope.getGame();
	    if (game) {
	      return (game.timeoutState === 1 || game.timeoutState === 2) && game.nextPlayer === game.self.accountId && !game.ended;
	    }
	  };
	
	  $scope.gameCanClaimTimeoutEnded = function () {
	    var game = $scope.getGame();
	    if (game && game.timeoutState !== 0) {
	      var timeoutDatePlusTurnTime = new Date(game.timeoutStarted * 1000 + game.turnTime * 60000);
	      // TODO show button dynamically, i think now it is only shown after reload when time greater
	      // 10 minutes
	      return game.timeoutState !== 0 && game.nextPlayer !== game.self.accountId && timeoutDatePlusTurnTime < new Date() && !game.ended;
	    }
	  };
	
	  $scope.claimWin = function () {
	    games.claimWin($scope.getGame());
	  };
	
	  $scope.offerDraw = function () {
	    games.offerDraw($scope.getGame());
	  };
	
	  $scope.claimTimeout = function () {
	    games.claimTimeout($scope.getGame());
	  };
	
	  $scope.confirmGameEnded = function () {
	    games.confirmGameEnded($scope.getGame());
	  };
	
	  $scope.claimTimeoutEnded = function () {
	    games.claimTimeoutEnded($scope.getGame());
	  };
	
	  $scope.gameHasClaimableEther = function () {
	    var game = $scope.getGame();
	
	    if (game) {
	      return game.self.wonEther > 0;
	    }
	
	    return false;
	  };
	
	  $scope.claimEther = function () {
	    games.claimEther($scope.getGame());
	  };
	
	  $scope.closeGame = function () {
	    _Chess.Chess.closePlayerGame($scope.getGameId(), { from: $scope.getGame().self.accountId,
	      gas: 10000000 });
	    $rootScope.$broadcast('message', 'Closing your game, please wait...', 'loading', 'playgame');
	  };
	
	  $scope.game = $scope.getGame();
	
	  // Keep track of currently viewing game
	  games.viewingGame.id = $scope.game.gameId;
	  $scope.$on('$destroy', function () {
	    games.viewingGame.id = 0;
	  });
	
	  // Initialize chessboard
	  if (!$scope.isOpenGame()) {
	    if ($scope.game) {
	      $timeout(function () {
	        initChessboard($scope.game);
	        updateBoardState($scope.game);
	        // $scope.$watch('game.lastMove', function(checkMove) {
	        //   updateBoardState($scope.game, checkMove);
	        // });
	        $scope.$watch('game.state', function () {
	          console.log('$watch game.state');
	          var g = $scope.game;
	          try {
	            var toFrontend = (0, _fenConversion.generateMapping)().toFrontend;
	
	            if (g.chess.turn() === g.self.color[0]) {
	              var lastOpponentMove = gameStates.getLastOpponentMove(g.gameId);
	              if ((0, _fenConversion.generateFen)(lastOpponentMove.newState) === (0, _fenConversion.generateFen)(g.state)) {
	                console.log('$watch send', {
	                  from: toFrontend[lastOpponentMove.moveFrom],
	                  to: toFrontend[lastOpponentMove.moveTo]
	                }, lastOpponentMove);
	                updateBoardState(g, {
	                  from: toFrontend[lastOpponentMove.moveFrom],
	                  to: toFrontend[lastOpponentMove.moveTo]
	                });
	                return;
	              }
	            } /* else {
	               let lastSelfMove = gameStates.getLastSelfMove(g.gameId);
	               if (generateFen(lastSelfMove.newState) === generateFen(g.state)) {
	                 updateBoardState(g, {
	                   from: toFrontend[lastSelfMove.moveFrom],
	                   to: toFrontend[lastSelfMove.moveTo]
	                 });
	                 return;
	               }
	              }*/
	          } catch (e) {
	            console.log('$watch throw', e);
	          }
	          console.log('$watch update without move');
	          updateBoardState($scope.game);
	        });
	      });
	    } else {
	      navigation.goto(navigation.welcomePage);
	      $rootScope.$broadcast('message', 'No game with the specified id exists', 'error', 'playgame');
	    }
	  }
	});
	
	_module.directive('countdown', ['$interval', function ($interval) {
	  return {
	    scope: { 'to': '=countdown' },
	    template: '{{timeLeft}}',
	    link: function link(scope) {
	      scope.timeLeft = '';
	
	      function update() {
	        var diff = scope.to.getTime() - new Date().getTime();
	        if (diff > 0) {
	          var minutes = ('00' + Math.floor(diff / 60000)).substr(-2);
	          var seconds = ('00' + Math.floor(diff % 60000 / 1000)).substr(-2);
	          scope.timeLeft = minutes + ':' + seconds + ' left';
	        } else {
	          scope.timeLeft = 'Time\'s up!';
	        }
	      }
	
	      var interval;
	      function init() {
	        if (typeof scope.to === 'undefined' || !scope.to) {
	          if (typeof interval !== 'undefined') {
	            interval.cancel();
	            scope.timeLeft = '';
	          }
	          return;
	        }
	        interval = $interval(update, 1000);
	      }
	
	      scope.$watch('to', function () {
	        init();
	      });
	      init();
	    }
	  };
	}]);

/***/ })
/******/ ]);
//# sourceMappingURL=main.js.map
/*!
 * beaker v0.0.1
 * (c) Supanat Potiwarakorn
 * Released under the Apache-2.0 License.
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var crypto = require('@cosmjs/crypto');
var cosmwasm = require('cosmwasm');

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var fromMnemonic = function (conf, network, mnemonic) { return __awaiter(void 0, void 0, void 0, function () {
    var options, wallet, networkInfo, signingClient;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                options = {
                    prefix: conf.global.account_prefix,
                    hdPaths: [crypto.stringToPath(conf.global.derivation_path)],
                };
                return [4 /*yield*/, cosmwasm.Secp256k1HdWallet.fromMnemonic(mnemonic, options)];
            case 1:
                wallet = _a.sent();
                networkInfo = conf.global.networks[network];
                if (!networkInfo) {
                    throw Error("network info for ".concat(network, " not found in the config"));
                }
                return [4 /*yield*/, cosmwasm.SigningCosmWasmClient.connectWithSigner(networkInfo.rpc_endpoint, wallet, { gasPrice: conf.global.gas_price })];
            case 2:
                signingClient = _a.sent();
                return [2 /*return*/, { signingClient: signingClient, wallet: wallet }];
        }
    });
}); };
var getAccounts = function (conf, network) { return __awaiter(void 0, void 0, void 0, function () {
    var accountName, account;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                accountName = Object.keys(conf.global.accounts);
                return [4 /*yield*/, Promise.all(Object.values(conf.global.accounts).map(function (a) {
                        return fromMnemonic(conf, network, a.mnemonic);
                    }))];
            case 1:
                account = _a.sent();
                return [2 /*return*/, Object.fromEntries(accountName.map(function (name, i) { return [name, account[i]]; }))];
        }
    });
}); };

var id = function (x) { return x; };
var mapObject = function (o, f, g) {
    return Object.fromEntries(Object.entries(o).map(function (_a) {
        var k = _a[0], v = _a[1];
        return [f(k), g(v)];
    }));
};
var mapValues = function (o, g) { return mapObject(o, id, g); };
var extendWith = function (properties) { return function (context) {
    Object.entries(properties).forEach(function (_a) {
        var k = _a[0], v = _a[1];
        Object.defineProperty(context, k, {
            configurable: true,
            enumerable: true,
            value: v,
        });
    });
}; };

var getContracts = function (client, state) {
    var getContract = function (address) { return ({
        address: address,
        query: function (qmsg) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, client.queryContractSmart(address, qmsg)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        },
        execute: function (xmsg, senderAddress, fee) {
            if (fee === void 0) { fee = 'auto'; }
            return {
                by: function (account) {
                    var _a;
                    return __awaiter(this, void 0, void 0, function () {
                        var _senderAddress, _b;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    _b = senderAddress;
                                    if (_b) return [3 /*break*/, 2];
                                    return [4 /*yield*/, account.wallet.getAccounts()];
                                case 1:
                                    _b = ((_a = (_c.sent())[0]) === null || _a === void 0 ? void 0 : _a.address);
                                    _c.label = 2;
                                case 2:
                                    _senderAddress = _b;
                                    if (!_senderAddress) {
                                        throw Error('Unable to get sender address');
                                    }
                                    return [4 /*yield*/, account.signingClient.execute(_senderAddress, address, xmsg, fee)];
                                case 3: return [2 /*return*/, _c.sent()];
                            }
                        });
                    });
                },
            };
        },
    }); };
    return mapValues(state, function (contractInfo) {
        var addresses = contractInfo.addresses;
        var prefixLabel = function (label) { return "$".concat(label); };
        var contracts = mapObject(addresses, prefixLabel, getContract);
        // @ts-ignore
        if (contracts.$default) {
            contracts = __assign(__assign({}, contracts), contracts.$default);
        }
        return contracts;
    });
};

exports.extendWith = extendWith;
exports.getAccounts = getAccounts;
exports.getContracts = getContracts;
//# sourceMappingURL=index.cjs.map

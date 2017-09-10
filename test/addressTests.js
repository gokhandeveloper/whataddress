'use strict';
let assert = require('assert');

// BTC test address: 1GQpz3e6pwDSzH5cV4tjRdbwHrT1BYS6rq
// Litecoin test address: LbmXBtjMCzLZG3R95MkSsPD4VcVmVsXT5y
//Ethereum test address: 0x7b38fcb1bbd5193e419a3c8a1d69508181ec4da2

let address = "0xde709f2102306220921060314715629080e2fb77";

let bitcoinAddress =  require('../address/bitcoin');
let litecoinAddress = require('../address/litecoin');
let ethereumAddress = require('../address/ethereum');

describe("Bitcoin address", function() {

    it("checks if the address is between 26 and 35 characters" ,function() {

        assert.equal(true, bitcoinAddress.numberOfCharactersAreBetween26And35(address) )
    });


    it("checks if the address starts with 1 or 3", function() {

        assert.equal(true, bitcoinAddress.firstCharacteris1or3(address) )

    });

});

describe("Litecoin address", function() {

    it("checks if the address is between 26 and 35 " ,function() {

        assert.equal(true, bitcoinAddress.numberOfCharactersAreBetween26And35(address) )
    });


    it("checks if the address starts with L", function() {

        assert.equal(true, litecoinAddress.firstCharacterisL(address) )

    });


});

describe("Ethereum address", function() {

    it("check etherium address", function() {

        assert.equal(true, ethereumAddress.isAddress(address) )

    });


});

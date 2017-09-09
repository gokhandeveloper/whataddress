'use strict';
var assert = require('assert');
var address = "0xde709f2102306220921060314715629080e2fb77";

describe("Bitcoin address", function() {

    it("checks if the address is between 26 and 35 characters" ,function() {

        assert.equal(true, numberOfCharactersAreBetween26And35(address) )
    });


    it("checks if the address starts with 1", function() {

        assert.equal(true, firstCharacteris1or3(address) )

    });


});

describe("Litecoin address", function() {

    it("checks if the address is between 26 and 35 " ,function() {

        assert.equal(true, numberOfCharactersAreBetween26And35(address) )
    });


    it("checks if the address starts with L", function() {

        assert.equal(true, firstCharacterisL(address) )

    });


});

describe("Etherium address", function() {

    it("checks if the address is between 26 and 35 " ,function() {

        assert.equal(true, numberOfCharactersAreBetween26And35(address) )
    });


    it("check etherium address", function() {

        assert.equal(true, firstCharacteris0AndSecondIsx(address) )

    });


});


function numberOfCharactersAreBetween26And35(address) {
    if(26<=address.length <=35 ) {
        return true;
    }
    return false;

}
function firstCharacteris1or3(address) {
    if ((address.charAt(0))== "1" || (address.charAt(0))== "3") {
        return true;
    };
    return false;
}

function firstCharacterisL(address) {
    if ((address.charAt(0)) == "L") {
        return true;
    }
    return false;
}

let isAddress = (address) => {
    if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
        // Check if it has the basic requirements of an address
        return false;
    }
    else if (/^(0x)?[0-9a-f]{40}$/.test(address) || /^(0x)?[0-9A-F]{40}$/.test(address)) {
        // If it's all small caps or all all caps, return true
        return true;
    }
    else {
        // Otherwise check each case
        return isChecksumAddress(address);
    }
};

let isChecksumAddress = function (address) {
    // Check each case
    address = address.replace('0x','');
    let addressHash = sha3(address.toLowerCase());

    for (let i = 0; i < 40; i++ ) {
        // The nth letter should be uppercase if the nth digit of casemap is 1
        if ((parseInt(addressHash[i], 16) > 7 && address[i].toUpperCase() !== address[i]) ||
            (parseInt(addressHash[i], 16) <= 7 && address[i].toLowerCase() !== address[i])) {
            return false;
        }
    }
    return true;
};
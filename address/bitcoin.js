'use strict';

let numberOfCharactersAreBetween26And35 = function (address) {
    if(26<=address.length <=35 ) return true;
    return false;
};

let firstCharacteris1or3 = function (address) {
    if ((address.charAt(0))== "1" || (address.charAt(0))== "3") return true;
    return false;
};



module.exports.firstCharacteris1or3 = firstCharacteris1or3;
module.exports.numberOfCharactersAreBetween26And35 = numberOfCharactersAreBetween26And35;



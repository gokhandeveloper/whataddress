(function(window, document, undefined) {

    if (!window) {
        return;
    }

    function Litecoin(targetElement) {

        var self = this;

        targetElement = targetElement || document;

        if (!(self instanceof Litecoin)) {
            return new Litecoin(targetElement);
        }

    }
    Litecoin.prototype.firstCharacterisL = function (address) {
        if ((address.charAt(0))== "L") return true;
        return false;
    };

    Litecoin.prototype.numberOfCharactersAreBetween26And35 = function(address) {
        if(26<=address.length <=35 ) return true;
        return false;

    };

    Litecoin.prototype.isLikely = function(address) {
        if (Litecoin.prototype.firstCharacterisL(address)
            && Litecoin.prototype.numberOfCharactersAreBetween26And35(address)) return true;
        return false;
    };


    Litecoin.init = function() {
        var documentLitecoin = Litecoin(document);
        for (var method in documentLitecoin) {
            if (method.charAt(0) !== '_') {
                Litecoin[method] = (function(method) {
                    return function() {
                        return documentLitecoin[method].apply(documentLitecoin, arguments);
                    };
                } (method));
            }
        }
    };

    Litecoin.init();

    window.Litecoin = Litecoin;


    if (typeof module !== 'undefined' && module.exports) {
        module.exports = Litecoin;
    }

}) (typeof window !== 'undefined' ? window : null, typeof  window !== 'undefined' ? document : null);
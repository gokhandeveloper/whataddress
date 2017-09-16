'use strict';

Mousetrap.bind(['command+c', 'ctrl+c'], function(e) {
    console.log("i am copying");
    checkAddresses();

});

Mousetrap.bind(['command+v', 'ctrl+v'], function(e) {
    console.log("i am pasting");

});

function checkAddresses() {
    if(verifyAddress()==="Bitcoin") return console.log("Bitcoin address") ;
    if(verifyAddress()==="Litecoin") return console.log("Litecoin address") ;

}

function verifyAddress() {

   if(Bitcoin.isLikely(getSelectionText())) return "Bitcoin";
    if(Litecoin.isLikely(getSelectionText())) return "Litecoin";

}

function getSelectionText() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    console.log(text);
    return text;
}

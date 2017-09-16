'use strict';

Mousetrap.bind(['command+c', 'ctrl+c'], function(e) {
    console.log("i am copying");
    if(verifyAddress()==="Bitcoin") return promptAddress(bitcoinMessage());
    if(verifyAddress()==="Litecoin") return promptAddress(litecoinMessage());


});

Mousetrap.bind(['command+v', 'ctrl+v'], function(e) {
    console.log("i am pasting");

});


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

function bitcoinMessage() {
    return "This is a BTC(BITCOIN) address- To the MOON GUYS TO THE MOOOON!!";
}

function litecoinMessage() {
    return "CHUCK IS IN THE HOUSE!!!";
}


function promptAddress(coin) {
    window.prompt(coin +"Please copy to clipboard: Ctrl+C for Windows&Linux or Command+C for MAC THEN Enter", getSelectionText());
}

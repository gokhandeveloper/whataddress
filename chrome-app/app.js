/**
 * Created by gokhandilek on 9/9/17.
 */

//check the current tab
//If the current tab matches the exchange sites, then look for the copy/paste action.
//Once the copy/paste action is detected, look at what is copied.
//check the copied address.
//if the copied address matches the criteria, show the coin type to user.
//if the copied address does not match the criteria, do nothing.


console.log("hello");
chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    var url = tabs[0].url;
    console.log("The url is" + url);
});

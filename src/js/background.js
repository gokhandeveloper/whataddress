//
// console.log('background!');
//
//
// function copyToClipboard(text) {
//   var copyDiv = document.createElement('div');
//   copyDiv.contentEditable = true;
//   document.body.appendChild(copyDiv);
//   copyDiv.innerHTML = text;
//   copyDiv.unselectable = 'off';
//   copyDiv.focus();
//   document.execCommand('SelectAll');
//   document.execCommand('Copy', false, null);
//   document.body.removeChild(copyDiv);
// }
//
// function selectTab(direction) {
//   chrome.tabs.getAllInWindow(null, function(tabs) {
//     if (tabs.length <= 1) {
//       return;
//     }
//     chrome.tabs.getSelected(null, function(currentTab) {
//       console.log("i am selected");
//       var toSelect;
//       switch (direction) {
//         case 'next':
//           toSelect = tabs[(currentTab.index + 1 + tabs.length) % tabs.length];
//           break;
//         case 'previous':
//           toSelect = tabs[(currentTab.index - 1 + tabs.length) % tabs.length];
//           break;
//         case 'first':
//           toSelect = tabs[0];
//           break;
//         case 'last':
//           toSelect = tabs[tabs.length - 1];
//           break;
//       }
//       chrome.tabs.update(toSelect.id, { selected: true });
//     });
//   });
// }
//
//
// chrome.runtime.onMessage.addListener(
//     function(request, sender, sendResponse) {
//         console.log(sender.tab ?
//             "from a content script:" + sender.tab.url :
//             "from the extension");
//         if (request.greeting == "hello")
//             sendResponse({farewell: "goodbye"});
//     });
//
// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//     var action = request.action;
//   if (action === 'getKeys') {
//     console.log("getkeyactin");
//     sendResponse("d");
//   }
//
//   else if (action === 'copyurl') {
//     copyToClipboard(request.text);
//   }
//
//   else {
//     console.log("asasdasd");
//     sendResponse({});
//   }
// });
//

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    if (request.method == "getSelection")
        sendResponse({data: window.getSelection().toString()});
    else
        sendResponse({}); // snub them.
});

chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.tabs.executeScript({
        file: 'js/test.js'
    });
});
chrome.tabs.executeScript(null, {code:"console.log(window.getSelection().toString());"})
chrome.tabs.executeScript( {
    code: "window.getSelection().toString();"
}, function(selection) {
    document.getElementById("output").value = selection[0];
});
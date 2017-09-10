'use strict';

function copyToClipboard(text) {
  var copyDiv = document.createElement('div');
  copyDiv.contentEditable = true;
  document.body.appendChild(copyDiv);
  copyDiv.innerHTML = text;
  copyDiv.unselectable = 'off';
  copyDiv.focus();
  document.execCommand('SelectAll');
  document.execCommand('Copy', false, null);
  document.body.removeChild(copyDiv);
}

function selectTab(direction) {
  chrome.tabs.getAllInWindow(null, function(tabs) {
    if (tabs.length <= 1) {
      return;
    }
    chrome.tabs.getSelected(null, function(currentTab) {
      var toSelect;
      switch (direction) {
        case 'next':
          toSelect = tabs[(currentTab.index + 1 + tabs.length) % tabs.length];
          break;
        case 'previous':
          toSelect = tabs[(currentTab.index - 1 + tabs.length) % tabs.length];
          break;
        case 'first':
          toSelect = tabs[0];
          break;
        case 'last':
          toSelect = tabs[tabs.length - 1];
          break;
      }
      chrome.tabs.update(toSelect.id, { selected: true });
    });
  });
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  var action = request.action;
  if (action === 'getKeys') {
    sendResponse(localStorage.shortkeys);
  }

  else if (action === 'copyurl') {
    copyToClipboard(request.text);
  }

  else {
    sendResponse({});
  }
});



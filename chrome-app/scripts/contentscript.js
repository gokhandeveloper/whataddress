'use strict';
/* global Mousetrap */


console.log("hello");
chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    var url = tabs[0].url;
    console.log("The url is" + url);
});


var keySettings;

/**
 * Fetches the Shortkeys configuration object and wires up each configured shortcut.
 */

chrome.runtime.sendMessage({action: 'getKeys'}, function(response) {
    if (response) {
        keySettings = JSON.parse(response);
        var keys = keySettings.keys;
        if (keys.length > 0) {
            for (var i = 0; i < keys.length; i++) {
                activateKey(keys[i]);
            }
        }
    }
});

/**
 * Given a key shortcut config item, ask if the current site is allowed, and if so,
 * activate the shortcut.
 *
 * @param keySetting
 */
let activateKey = function(keySetting) {
    let action = function() {
        if (!isAllowedSite(keySetting)) return false;
        doAction(keySetting);
        return false;
    };
    Mousetrap.bind(keySetting.key, action);
};


/**
 * Helper function to convert glob/wildcard * syntax to valid RegExp for URL checking.
 *
 * @param glob
 * @returns {RegExp}
 */
var globToRegex = function(glob) {
    // Use a regexp if the url starts and ends with a slash `/`
    if (/^\/.*\/$/, '$1'.test(glob)) return new RegExp(glob.replace(/^\/(.*)\/$/, '$1'))

    var specialChars = '\\^$*+?.()|{}[]';
    var regexChars = ['^'];
    for (var i = 0; i < glob.length; ++i) {
        var c = glob.charAt(i);
        if (c === '*') {
            regexChars.push('.*');
        } else {
            if (specialChars.indexOf(c) >= 0) {
                regexChars.push('\\');
            }
            regexChars.push(c);
        }
    }
    regexChars.push('$');
    return new RegExp(regexChars.join(''));
};

/**
 * Helper function to determine if the current site is blacklisted or not.
 *
 * @param keySetting
 * @returns {boolean}
 */
var isAllowedSite = function(keySetting) {
    var url = document.URL;
    var allowed = true;

    // The setting for this shortcut is "Whitelist allowed sites" so we cycle
    // through the sites to see if any match the current site, and only return
    // true if that's the case.
    allowed = false;
    for (var j = 0; j < keySetting.sitesArray.length; j++) {
        if (url.match(globToRegex(keySetting.sitesArray[j]))) {
            allowed = true;
            break;
        }
    }

    return allowed;
};


/**
 * Given a key shortcut config item, carry out the action configured for it.
 * This is what happens when the user triggers the shortcut.
 *
 * @param keySetting
 */
var doAction = function(keySetting) {
    var action = keySetting.action;
    var message = {};
    var curZoom;

    if (action === 'copyurl') {
        message.text = document.URL;
    }

    switch(action) {
        case 'javascript':
            var script = document.createElement('script');
            script.textContent = keySetting.code.replace(/^\s*javascript:/, '');
            document.body.appendChild(script);
            document.body.removeChild(script);
            break;
        default:
            for (var attribute in keySetting) {
                message[attribute] = keySetting[attribute];
            }
            chrome.runtime.sendMessage(message);
    }
};



/**
 * Helper function for fetching the full key shortcut config given a keyboard combo.
 *
 * @param keyCombo
 */
var fetchConfig = function(keyCombo) {
  var keys = keySettings.keys;
  if (keys.length > 0) {
    for (var i = 0; i < keys.length; i++) {
      if (keys[i].key === keyCombo) {
        return keys[i];
      }
    }
  }
  return false;
};




/**
 * Overrides the default stopCallback from Mousetrap so that we can customize
 * a few things, such as not using the "whitelist inputs with the mousetrap class"
 * functionality and wire up the "activate in form inputs" checkbox.
 *
 * @param e
 * @param element
 * @param combo
 */
Mousetrap.stopCallback = function(e, element, combo) {
  var keySetting = fetchConfig(combo);

  if (element.classList.contains('mousetrap')) {
    // We're not using the 'mousetrap' class functionality, which allows
    // you to whitelist elements, so if we come across elements with that class
    // then we can assume that they are provided by the site itself, not by
    // us, so we don't activate Shortkeys in that case, to prevent conflicts.
    // This fixes the chat box in Twitch.tv for example.
    return true;

  } else if (!keySetting.activeInInputs) {
    // If the user has not checked "Also allow in form inputs" for this shortcut,
    // then we cut out of the user is in a form input.
    return element.tagName === 'INPUT' ||
      element.tagName === 'SELECT' ||
      element.tagName === 'TEXTAREA' ||
      element.isContentEditable;

  } else {
    // The user HAS checked "Also allow in form inputs" for this shortcut so we
    // have no reason to stop it from triggering.
    return false;
  }
};



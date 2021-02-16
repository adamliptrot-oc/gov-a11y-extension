"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

document.addEventListener('DOMContentLoaded', function () {
  chrome.tabs.insertCSS(null, {
    file: "tests/common/common.css"
  });
  chrome.tabs.executeScript(null, {
    file: "tests/common/common.js"
  });
  var buttons = [].slice.call(document.querySelectorAll('[role="switch"]'));
  buttons.forEach(function (btn) {
    var thisID = btn.getAttribute('id').toLowerCase();
    chrome.storage.sync.get(thisID, function (result) {
      // set states based on storage values
      if (result[thisID] == "on") {
        btn.setAttribute('aria-checked', 'true');
      } else {
        btn.setAttribute('aria-checked', 'false');
      }

      fireUpdate(btn); // set event handlers
      // update buttons states

      btn.addEventListener('click', function () {
        if (btn.getAttribute('aria-checked') == "true") {
          btn.setAttribute('aria-checked', 'false');
          fireUpdate(btn);
        } else {
          btn.setAttribute('aria-checked', 'true');
          fireUpdate(btn);
        }
      });
    });
  });

  function fireUpdate(btn) {
    var action = btn.getAttribute('id').toLowerCase();
    console.log(action);

    if (btn.getAttribute('aria-checked') == "true") {
      chrome.tabs.insertCSS(null, {
        file: "tests/".concat(action, "/").concat(action, ".css")
      });
      chrome.tabs.executeScript(null, {
        code: 'var ' + action + '  = true;'
      }, function () {
        chrome.tabs.executeScript(null, {
          file: "tests/".concat(action, "/").concat(action, ".js")
        });
      });
      chrome.storage.sync.set(_defineProperty({}, action, "on"));
    } else {
      chrome.tabs.executeScript(null, {
        code: 'var ' + action + ' = false;'
      }, function () {
        chrome.tabs.executeScript(null, {
          file: "tests/".concat(action, "/").concat(action, ".js")
        });
      });
      chrome.storage.sync.set(_defineProperty({}, action, "off"));
    }
  }
}, false);
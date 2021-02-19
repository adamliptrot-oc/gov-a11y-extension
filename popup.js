document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('#version').innerText = chrome.app.getDetails().version;
    chrome.tabs.insertCSS(null, { file:  `tests/common/common.css` });
    chrome.tabs.executeScript(null, { file: `tests/common/common.js` });

    var buttons = [].slice.call(document.querySelectorAll('[role="switch"]'));
    buttons.forEach(function(btn){
        var thisID = btn.getAttribute('id').toLowerCase();
        chrome.storage.sync.get(thisID, function(result){
            // set states based on storage values
            if(result[thisID] == "on"){
                btn.setAttribute('aria-checked', 'true')
            } else {
                btn.setAttribute('aria-checked', 'false')
            }
            fireUpdate(btn)

            // set event handlers
            // update buttons states
            btn.addEventListener('click', function(){
                if(btn.getAttribute('aria-checked') == "true"){
                    btn.setAttribute('aria-checked', 'false');
                    fireUpdate(btn)
                } else {
                    btn.setAttribute('aria-checked', 'true');
                    fireUpdate(btn)
                }
            })
        })

    })


    function fireUpdate(btn){
        var action = btn.getAttribute('id').toLowerCase();
        console.log(action)

        if(action == "checkall"){
            var otherbuttons = [].slice.call(document.querySelectorAll('[role="switch"]:not(#checkall, #onlyissues)'));
            if(btn.getAttribute('aria-checked') == "true"){
                otherbuttons.forEach(function(otherbtn){
                    otherbtn.setAttribute('aria-checked', 'true');
                    fireUpdate(otherbtn)
                })
                chrome.storage.sync.set({[action]: "on"});
            } else {
                otherbuttons.forEach(function(otherbtn){
                    otherbtn.setAttribute('aria-checked', 'false');
                    fireUpdate(otherbtn)
                })
                chrome.storage.sync.set({[action]: "off"});
            }
        } else {
            if(btn.getAttribute('aria-checked') == "true"){
                chrome.tabs.insertCSS(null, { file:  `tests/${action}/${action}.css` });
                chrome.tabs.executeScript(null, {
                    code: 'var ' + action + '  = true;'
                }, function() {
                    chrome.tabs.executeScript(null, { file: `tests/${action}/${action}.js` });
                });
                chrome.storage.sync.set({[action]: "on"});
            } else {
                if(action!="onlyissues"){
                    document.querySelector('#checkall').setAttribute('aria-checked','false');
                    chrome.storage.sync.set({"checkall": "off"});
                }
                chrome.tabs.executeScript(null, {
                    code: 'var ' + action + ' = false;'
                }, function() {
                    chrome.tabs.executeScript(null, { file: `tests/${action}/${action}.js` });
                });
                chrome.storage.sync.set({[action]: "off"});
            }
        }

    }
}, false);
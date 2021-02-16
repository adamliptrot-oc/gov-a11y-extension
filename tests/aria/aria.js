var body = document.querySelector('body')
var removeMe = [].slice.call(document.querySelectorAll('.hmrc-ally-aria'));
removeMe.forEach(function(itm){
    itm.remove();
})

if(aria){
    body.classList.add('hmrc-ally-aria--active')

    var errorMessages = [].slice.call(document.querySelectorAll('.govuk-error-message, .error-message, .error-notification'));
    var hintMessages = [].slice.call(document.querySelectorAll('.govuk-hint, .hint, .form-hint'));
    var allMessages = [].slice.call(document.querySelectorAll('.govuk-hint, .hint, .form-hint, .govuk-error-message, .error-message, .error-notification'));

    var allAria = [].slice.call(document.querySelectorAll('.govuk-hint, .hint, .form-hint, .govuk-error-message, .error-message, .error-notification, fieldset, [aria-label], [aria-live], [role], [level], [aria-describedby], [aria-labelledby]'));

    allAria.forEach(function(itm, i){
        var itmCopy = "";

        if(allMessages.includes(itm)) {
            var isError = errorMessages.includes(itm);
            var isHint = hintMessages.includes(itm);
            // error message inside a label or legend
            if(itm.parentElement.nodeName.toLowerCase() == "legend" || itm.parentElement.nodeName.toLowerCase() == "label"){
                if(isError){
                    itmCopy = itmCopy + '<span class="hmrc-ally-warn hmrc-ally-note"><span>Error message</span> <a href="https://design-system.service.gov.uk/components/text-input/">move to outside label/legend</a></span>';
                }
                if(isHint){
                    itmCopy = itmCopy + '<span class="hmrc-ally-warn hmrc-ally-note"><span>Hint</span> <a href="https://design-system.service.gov.uk/components/text-input/">move to outside label/legend</a></span>';
                }
            } else {
                // ok if has an id and is described somewhere
                if(itm.id && document.querySelectorAll('[aria-describedby~="' + itm.id + '"]').length > 0){
                    // TO DO expand this to cover multiple
                    // TO DO if assoc with input show the input name/id
                    if(isError){
                        itmCopy = itmCopy + '<span class="hmrc-ally-note"><span>Error message</span> associated with ' + document.querySelectorAll('[aria-describedby~="' + itm.id + '"]')[0].tagName + '</span>';
                    }
                    if(isHint){
                        itmCopy = itmCopy + '<span class="hmrc-ally-note"><span>Hint</span> associated with ' + document.querySelectorAll('[aria-describedby~="' + itm.id + '"]')[0].tagName + '</span>';
                    }
                } else {
                    // aria is missing
                    if(isError){
                        itmCopy = itmCopy + '<span class="hmrc-ally-warn hmrc-ally-note"><span>Error message</span> <a href="https://design-system.service.gov.uk/components/text-input/">aria link to input missing</a></span>';
                    }
                    if(isHint){
                        itmCopy = itmCopy + '<span class="hmrc-ally-warn hmrc-ally-note"><span>Hint</span> <a href="https://design-system.service.gov.uk/components/text-input/">aria link to input missing</a></span>';
                    }
                }

            }
        }

        if(itm.hasAttribute('aria-label')){
            itmCopy = itmCopy + '<span class="hmrc-ally-note"><span>Aria label set</span> ' + itm.getAttribute('aria-label') + '</span>';
        }
        if(itm.hasAttribute('aria-live')){
            itmCopy = itmCopy + '<span class="hmrc-ally-note"><span>Aria live region</span> ' + itm.getAttribute('aria-live') + '</span>';
        }
        if(itm.hasAttribute('role')){
            itmCopy = itmCopy + '<span class="hmrc-ally-note"><span>Aria role set</span> ' + itm.getAttribute('role') + '</span>';
        }
        if(itm.hasAttribute('level')){
            itmCopy = itmCopy + '<span class="hmrc-ally-note"><span>Aria level set</span> ' + itm.getAttribute('level') + '</span>';
        }
        if(itm.hasAttribute('aria-describedby')){
            itmCopy = itmCopy + '<span class="hmrc-ally-note"><span>Aria describedby set</span> ';
            var attr = itm.getAttribute('aria-describedby');
            var descCopy = "";
            attr.split(" ").forEach(function(at){
                at = at.trim();
                if(descCopy>""){descCopy = descCopy + ", "}
                if(document.querySelector('#' + at)){
                    var str = document.querySelector('#' + at).innerText;
                    if(str.length > 20){
                        descCopy = descCopy + str.substring(0, 17) + "&hellip;"
                    } else {
                        descCopy = descCopy + str;
                    }
                } else {
                    descCopy = descCopy + 'not found id="' + at + '"'
                }
            })
            itmCopy = itmCopy + descCopy + '</span>';
        }
        if(itm.hasAttribute('aria-labelledby')){
            itmCopy = itmCopy + '<span class="hmrc-ally-note"><span>Aria labelledby set</span> ';
            var attr = itm.getAttribute('aria-labelledby');
            var descCopy = "";
            attr.split(" ").forEach(function(at){
                at = at.trim();
                if(descCopy>""){descCopy = descCopy + ", "}
                if(document.querySelector('#' + at)){
                    var str = document.querySelector('#' + at).innerText;
                    if(str.length > 20){
                        descCopy = descCopy + str.substring(0, 17) + "&hellip;"
                    } else {
                        descCopy = descCopy + str;
                    }
                } else {
                    descCopy = descCopy + 'not found id="' + at + '"'
                }
            })
            itmCopy = itmCopy + descCopy + '</span>';
        }


        itm.insertAdjacentHTML('beforebegin', '<div class="hmrc-ally-aria">' + itmCopy + '</div>');
    });


} else {
    body.classList.remove('hmrc-ally-aria--active')
}

// TODO add warning icon when attribute targets are not found
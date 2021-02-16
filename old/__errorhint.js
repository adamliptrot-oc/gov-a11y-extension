var body = document.querySelector('body')
if(errorhint){
    body.classList.add('hmrc-ally-errorHint--active')

    var errorMessages = [].slice.call(document.querySelectorAll('.govuk-error-message, .error-message, .error-notification'));
    var hintMessages = [].slice.call(document.querySelectorAll('.govuk-hint, .hint, .form-hint'));
    var allMessages = [].slice.call(document.querySelectorAll('.govuk-hint, .hint, .form-hint, .govuk-error-message, .error-message, .error-notification'));

    // are error messages and hints linked via an aria-describedby?
    allMessages.forEach(function(itm, i){
        var isAssoc = false;
        // ok if in a label or legend
        if(itm.parentElement.nodeName.toLowerCase() == "legend" || itm.parentElement.nodeName.toLowerCase() == "label"){
            isAssoc = true;
            itm.classList.add('hmrc-ally-inlabel'); // in label
        }
        // ok if has an id and is described somewhere
        if(itm.id && document.querySelectorAll('[aria-describedby~="' + itm.id + '"]').length > 0){
            isAssoc = true;
        }
        if(!isAssoc){
            itm.classList.add('hmrc-ally-errorHint'); // missing aria
        }
    });

    // are hints and error messages linked to aria-describedby off the fieldset?
    var fieldsets = [].slice.call(document.querySelectorAll('fieldset'));
    fieldsets.forEach(function(fld){
        var fldMessages = [].slice.call(fld.querySelectorAll('.govuk-error-message, .error-message, .error-notification, .govuk-hint, .form-hint, .hint'));
        var fldDesc;
        // get aria-describedby
        if(fld.getAttribute('aria-describedby') > ""){
            fldDesc = fld.getAttribute('aria-describedby').split(" ");
        }

        if(fldMessages.length > 0 && fld.querySelectorAll('.form-date, .govuk-date-input, [type="radio"], [type="checkbox"]').length > 0){
            // fieldsets with radios and checkboxes or dates should have an aria-describedby for any error messages or hints
            fldMessages.forEach(function(msg){
                var isLinked = false;
                // ok if the message is inside a legend
                if(msg.parentElement.nodeName.toLowerCase() == "legend"){
                    isLinked = true;
                    itm.classList.add('hmrc-ally-inlabel'); // in label
                } else {
                    // check against aria-describedby
                    if(fldDesc){
                        fldDesc.forEach(function(d){
                            if(msg == d){
                                isLinked = true;
                            }
                        })
                    }
                }
                if(!isLinked){
                    msg.classList.add('hmrc-ally-errorHint'); // missing aria
                }
            })
        }
    })


} else {
    body.classList.remove('hmrc-ally-errorHint--active')
}


var body = document.querySelector('body')
var removeMe = [].slice.call(document.querySelectorAll('.hmrc-ally-inputs'));
removeMe.forEach(function(itm){
    itm.remove();
})

if(inputs){
    body.classList.add('hmrc-ally-inputs--active')
    var inputControls = [].slice.call(document.querySelectorAll('input:not([type="submit"]):not([type="hidden"]), select, textarea'));
    // save off labels as we will be adding stuff to the DOM this can get messed up as we do so
    inputControls.forEach(function(itm, i){
        var itmLabel = [].slice.call(document.querySelectorAll('[for="' + itm.getAttribute("id") + '"]'));
        var itmLabelText = "";
        if(itmLabel.length > 0){
            itmLabelText = itmLabel[0].innerText.toLowerCase().trim()
        }
        itm.setAttribute("data-hmrc-label", itmLabelText);
    })

    inputControls.forEach(function(itm, i){
        itmLabelText = itm.getAttribute("data-hmrc-label")

        var itmCopy = "";

        // INFO - input type
        if(itm.tagName.toLowerCase().trim() != "select" && itm.tagName.toLowerCase().trim() != "textarea"){
            if(itm.getAttribute('type') > "" ){
                itmCopy = itmCopy + '<span class="hmrc-ally-note"><span>Type</span> ' + itm.getAttribute('type') + '</span>';
            } else {
                // WARN - no input (default to text)
                itmCopy = itmCopy + '<span class="hmrc-ally-note hmrc-ally-warn"><span>Type</span> no type specificed, defaults to text</span>';
            }
        }

        // INFO - autocomplete
        if(itm.getAttribute('autocomplete') > ""){
            itmCopy = itmCopy + '<span class="hmrc-ally-note"><span>Autocomplete</span> ' + itm.getAttribute('autocomplete') + '</span>';
        }

        // INFO inputmode
        if(itm.getAttribute('inputmode') > ""){
            // WARN if using decimal
            if(itm.getAttribute('inputmode') == 'decimal'){
                itmCopy = itmCopy + '<span class="hmrc-ally-note hmrc-ally-warn"><span>Inputmode</span> <a href="https://github.com/alphagov/govuk-design-system/pull/1279#issuecomment-639467489" target="_blank">decimal can cause issues</a></span>';
            } else {
                itmCopy = itmCopy + '<span class="hmrc-ally-note"><span>Inputmode</span> ' + itm.getAttribute('inputmode') + '</span>';
            }
        }

        // INFO pattern
        if(itm.getAttribute('pattern') > ""){
            itmCopy = itmCopy + '<span class="hmrc-ally-note"><span>Pattern</span> ' + itm.getAttribute('pattern') + '</span>';
        }

        // WARN no label
        // to do check for aria being used instead and warnings
        if(itmLabelText == ""){
            var hasValidLabel = false;
            if(itm.getAttribute("aria-label") > ""){
                hasValidLabel = true;
                itmCopy = itmCopy + '<span class="hmrc-ally-note hmrc-ally-info"><span>Label</span> label set by aria-label</span>';
            }

            if(itm.getAttribute('aria-labelledby') > ""){
                var setByAria = false;
                var attr = itm.getAttribute('aria-labelledby');
                var descCopy = "";
                attr.split(" ").forEach(function(at){
                    at = at.trim();
                    if(descCopy>""){descCopy = descCopy + ", "}
                    if(document.querySelector('#' + at)){
                        hasValidLabel = true;
                        setByAria = true;
                    }
                })
                if(setByAria){
                    itmCopy = itmCopy + '<span class="hmrc-ally-note hmrc-ally-info"><span>Label</span> label set by aria-labelledby</span>';
                }
            }
            if(!hasValidLabel){
                itmCopy = itmCopy + '<span class="hmrc-ally-note hmrc-ally-warn"><span>Label missing</span> <a href="https://design-system.service.gov.uk/components/text-input/#label-text-inputs" target="_blank">all inputs must have a label</a></span>';
            }
        }

        // WARN missing fieldsets for radios and checkboxes
        if(itm.getAttribute('type') == "radio" || itm.getAttribute('type') == "checkbox") {
            if(upTo(itm, "fieldset") == null){
                var url = "https://design-system.service.gov.uk/components/checkboxes/"
                if(itm.getAttribute("type") == "radio"){
                    url = "https://design-system.service.gov.uk/components/radios/"
                }
                itmCopy = itmCopy + '<span class="hmrc-ally-note hmrc-ally-warn"><span>Fieldset</span> <a href="' + url + '" target="_blank">fieldset missing</a></span>';
            }
        }

        // WARN if using number
        if(itm.getAttribute('type') == "number"){
            itmCopy = itmCopy + '<span class="hmrc-ally-note hmrc-ally-warn"><span>Type</span> <a href="https://design-system.service.gov.uk/components/text-input/#avoid-using-inputs-with-a-type-of-number" target="_blank">do not use number type</a></span>';
        }

        // WARN autocomplete
        if(!itm.getAttribute('autocomplete') > "" && itmLabelText > "" && itm.getAttribute('type') != "radio" && itm.getAttribute('type') != "checkbox"){
            // check some common labels to see if it should have an autocomplete
            var arrLabels = ['name', 'phone', 'email', 'address line 1', 'address', 'town', 'country', 'postcode', 'postal code'];
            arrLabels.forEach(function(autolabel){
                if(itmLabelText.indexOf(autolabel.toLowerCase()) >=0 ){
                    itmCopy = itmCopy + '<span class="hmrc-ally-note hmrc-ally-info"><span>Autocomplete</span>  <a href="https://design-system.service.gov.uk/components/text-input/#use-the-autocomplete-attribute" target="_blank">is autocomplete missing?</a></span>';
                }
            })
        }

        // WARN inputmode
        if(!itm.getAttribute('inputmode') > "" && itmLabelText > ""){
            // check some common labels to see if it should have an inputmode
            var arrLabelsDate = ['month', 'day', 'year'];
            arrLabelsDate.forEach(function(autolabel){
                if(autolabel.toLowerCase() == itmLabelText){
                    itmCopy = itmCopy + '<span class="hmrc-ally-note hmrc-ally-info"><span>Inputmode</span> <a href="https://design-system.service.gov.uk/components/text-input/#use-the-autocomplete-attribute" target="_blank">is autocomplete missing?</a></span>';
                }
            })
        }

        if(itmLabelText > "" && itm.getAttribute('type') != "radio" && itm.getAttribute('type') != "checkbox"){
            // the rest of these checks require a label to compare against
            // just check for non-radio/checkboxes

            // WARN phone in the label - check if type=tel
            var arrLabelsPhone = ['phone'];
            arrLabelsPhone.forEach(function(autolabel){
                if(itmLabelText.indexOf(autolabel.toLowerCase()) >=0 && itm.getAttribute("type") != "tel"){
                    itmCopy = itmCopy + '<span class="hmrc-ally-note hmrc-ally-info"><span>Type</span> <a href="https://design-system.service.gov.uk/patterns/telephone-numbers/" target="_blank">maybe use tel?</a></span>';
                }
            })
            // WARN email in the label - check if type=email
            var arrLabelsEmail = ['email'];
            arrLabelsEmail.forEach(function(autolabel){
                if(itmLabelText.indexOf(autolabel.toLowerCase()) >=0 && itm.getAttribute("type") != "email"){
                    itmCopy = itmCopy + '<span class="hmrc-ally-note hmrc-ally-info"><span>Type</span> <a href="https://design-system.service.gov.uk/patterns/email-addresses/" target="_blank">maybe use email?</a></span>';
                }
            })

        }



        // **********
        itm.insertAdjacentHTML('beforebegin', '<div class="hmrc-ally-inputs">' + itmCopy + '</div>');




        // using max/minlength

        // using aria-required

        // Error messages and hints associated with inputs/fieldsets

        // Error messages and hints not inside legend/label

        // Error summary between back link and h1

    });

    // check for novalidate on form if using type=email|tel|pattern|required
    [].slice.call(document.querySelectorAll('form:not([novalidate])')).forEach(function(frm){
        var fmInputControls = [].slice.call(frm.querySelectorAll('input:not([type="submit"]):not([type="hidden"]):not([type="radio"]):not([type="checkbox"]), select, textarea'));
        var reqNovalidate = false;
        var arrContraints = ['pattern', 'min', 'max', 'required', 'step', 'minlength','maxlength'];
        var arrContraintTypes = ['email', 'url'];
        fmInputControls.forEach(function(itm){
            arrContraints.forEach(function(con){
                if(itm.hasAttribute(con)){
                    reqNovalidate = true;
                }
            });
            arrContraintTypes.forEach(function(con){
                var itmType = itm.getAttribute("type") || "text"
                if(itmType.toLowerCase().trim() == con){
                    reqNovalidate = true;
                }
            });
        })
        if(reqNovalidate){
            var itmCopy = '<span class="hmrc-ally-note hmrc-ally-warn"><span>Novalidate</span> <a href="https://design-system.service.gov.uk/patterns/validation/#turn-off-html5-validation" target="_blank">turn off HTML5 validation</a></span>';
            frm.insertAdjacentHTML('beforebegin', '<div class="hmrc-ally-inputs">' + itmCopy + '</div>')
        }
    });

    // missing legends
    [].slice.call(document.querySelectorAll('fieldset')).forEach(function(fld){
        // TO DO add checks for aria labels
        if(fld.querySelectorAll('legend').length == 0) {
            var itmCopy = '<span class="hmrc-ally-note hmrc-ally-warn"><span>No legend</span> <a href="https://design-system.service.gov.uk/components/fieldset/" target="_blank">fieldsets must have a legend</a></span>';
            fld.insertAdjacentHTML('beforebegin', '<div class="hmrc-ally-inputs">' + itmCopy + '</div>')
        }
    })



} else {
    body.classList.remove('hmrc-ally-inputs--active')
}

// To do:
// - Autocomplete on addresses etc
// - Fieldsets for radios and checkboxes
// - Error summary between back link and h1
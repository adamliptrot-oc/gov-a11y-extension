var body = document.querySelector('body')
var removeMe = [].slice.call(document.querySelectorAll('.hmrc-ally-markup'));
removeMe.forEach(function(itm){
    itm.remove();
})

if(markup){
    body.classList.add('hmrc-ally-markup--active')
    var err = false;
    var errMessage = "";

    // TIMEOUTS
        // check for latest version of timeout (meta tag) in wrong place
        if(document.querySelector('body meta[name="hmrc-timeout-dialog"]')){
            if( errMessage > "" ){ errMessage =  errMessage + ", "}
            err = true;
            errMessage = errMessage + "meta timeout placed outside head";
        }

        // check for old style timeout
        var scripts = document.querySelectorAll('script:not([src])');
        scripts.forEach(function(itm){
            if(itm.innerText.indexOf("timeoutDialog") > 0){
                err = true;
                if( errMessage > "" ){ errMessage =  errMessage + ", "}
                errMessage = errMessage + "old style timeout present";
            }
        });

        // check meta refresh not present
        if(document.querySelector('meta[http-equiv="refresh"]')){
            err = true;
            if( errMessage > "" ){ errMessage =  errMessage + ", "}
            errMessage = errMessage + "meta refresh used instead of a timeout dialog";
        }


        // check meta version is not placed outside of head
        if(document.querySelector('body meta[name="hmrc-timeout-dialog"]')){
            err = true;
            if( errMessage > "" ){ errMessage =  errMessage + ", "}
            errMessage = errMessage + "meta timeout placed outside head";
        }




        var itmCopy = "";

        // check for meta inside head
        if(document.querySelector('head meta[name="hmrc-timeout-dialog"]')){
            itmCopy = itmCopy + '<span class="hmrc-ally-note">';
            itmCopy = itmCopy + '<span>Timeout</span>Timeout present</span>';
        } else {
            if(!err) {
                err = true;
                if( errMessage > "" ){ errMessage =  errMessage + ", "}
                errMessage = errMessage + "no timeout dialog found";
            }
            if(err) {
                itmCopy = itmCopy + '<span class="hmrc-ally-note hmrc-ally-warn">';
                itmCopy = itmCopy + '<span>Timeout</span><a href="https://design.tax.service.gov.uk/hmrc-design-patterns/service-timeout/" target="_blank">' + errMessage + '</a></span>';
            }
        }

    // LIBRARY
        // TODO check scripts have been loaded for the correct CSS library being used

        if(document.querySelectorAll('script[src$="/govuk-frontend/govuk/all.js"]').length > 0){
            itmCopy = itmCopy + '<span class="hmrc-ally-note"><span>Scripts</span>Gov Frontend</span>';
        }
        if(document.querySelectorAll('script[src$="/hmrc-frontend/hmrc/all.js"]').length > 0){
            itmCopy = itmCopy + '<span class="hmrc-ally-note"><span>Scripts</span>HMRC Frontend</span>';
        }


        [].slice.call(document.querySelectorAll('script[src]')).forEach(function(scrpt){
            var src = scrpt.getAttribute('src');
            if(/\/assets\/[0-9].[0-9]{1,2}.[0-9]{1,2}\/[^\/]*\/application.min.js/gm.test(src)){

                var v = src.substring(8, src.indexOf("/", 9));
                itmCopy = itmCopy + '<span class="hmrc-ally-note"><span>Scripts</span>Assets Frontend v' + v + '</span>';
            }

        });


    document.querySelector('header').insertAdjacentHTML('beforebegin', '<div class="hmrc-ally-markup">' + itmCopy + '</div>');


} else {
    body.classList.remove('hmrc-ally-markup--active')
}


// TODO
// check GOVUK logo links to correct url
// check service name in banner links to correct url
// check link markup - if it has visually-hidden but no aria hidden
// Tables
// Empty labels or legends
// Use dl for CYA
// Highlight empty headings, legends and labels
// JS Event handlers
// Inline styles
// Link CYA markup
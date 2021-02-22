var body = document.querySelector('body')
if(pagetitle){
    body.classList.add('hmrc-ally-pagetitle--active')

    // page title and h1 should match
    if(document.querySelector('#pageTitleError') == null){
        var err = false;
        var errMessage = "";
        if(document.title.indexOf("-") == -1){
            err = true;
            errMessage =  "Parts missing"
        } else {
            var titleSections = document.title.split("-");
            // check there are enough sections
            if(titleSections.length < 2){
                err = true;
                errMessage = "Parts missing"
            }

            // check page title matches h1
            var pageTitle = titleSections[0].trim().toLowerCase();
            var pageHeader = "";
            if(document.querySelectorAll('h1').length > 0){
                pageHeader = document.querySelectorAll('h1')[0].innerText.trim().toLowerCase();
            }
            if(pageTitle != pageHeader){
                err = true;
                if( errMessage > "" ){ errMessage =  errMessage + ", "}
                errMessage = errMessage + "h1 does not match"
            }



            // check service name matches service name in banner
            // TODO check for just service name and GOVUK for homepage
            var serviceName = "";
            if(titleSections.length > 3){
                serviceName = titleSections[titleSections.length - 2].trim().toLowerCase();
            } else {
                serviceName = titleSections[1].trim().toLowerCase();
            }
            var pageServiceName = "";
            if(document.querySelector('.govuk-header__link--service-name')){
                pageServiceName = document.querySelector('.govuk-header__link--service-name').innerText.toLowerCase();
            } else {
                if(document.querySelector('.header__menu__proposition-name')){
                    pageServiceName = document.querySelector('.header__menu__proposition-name').innerText.toLowerCase();
                }
            }
            if(serviceName != pageServiceName){
                err = true;
                console.log(serviceName, pageServiceName)
                if( errMessage > "" ){ errMessage =  errMessage + ", "}
                errMessage = errMessage + "Service name does not match"
            }

            // check gov uk present
            var govUK = titleSections[titleSections.length - 1].trim().toLowerCase();
            if(govUK != "gov.uk"){
                err = true;
                if( errMessage > "" ){ errMessage =  errMessage + ", "}
                errMessage = errMessage + "GOV.UK missing"
            }

        }


        var itmCopy = "";
        if(err) {
            itmCopy = itmCopy + '<span class="hmrc-ally-note hmrc-ally-warn">';
            itmCopy = itmCopy + '<span>Page title</span><a href="https://design.tax.service.gov.uk/hmrc-design-patterns/page-title/" target="_blank">' + errMessage + '</a></span>';
        }else{
            itmCopy = itmCopy + '<span class="hmrc-ally-note">';
            itmCopy = itmCopy + '<span>Page title</span>' + document.title + '</span>';
        }


        document.querySelector('header').insertAdjacentHTML('beforebegin', '<div id="pageTitleError" class="hmrc-ally-pagetitles">' + itmCopy + '</div>');

    }
} else {
    body.classList.remove('hmrc-ally-pagetitle--active')
}
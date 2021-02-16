var body = document.querySelector('body')
if(a11ycss){
    body.classList.add('hmrc-ally-outline--active')

    // highlight js events
    // these can be on inputs so we need to insert some html rather than using pseudo elements
    var ev = [].slice.call(document.querySelectorAll('[onload],[onblur],[onchange],[onfocus],[onsubmit],[onkeydown],[onkeypress],[onkeyup],[onclick],[ondblclick],[onmousedown],[onmousemove],[onmouseout],[onmouseover],[onmouseup],[onmousewheel], [onscroll]'));
    ev.forEach(function(ick){
        ick.insertAdjacentHTML('afterend', '<span class="hmrc-ally-err">JS event attr</span>');
    })

    // highlight empty headings, legends and labels
    // we just trim whitespace here and let the css rule show the issues
    var h = [].slice.call(document.querySelectorAll('h1,h2,h3,h4,h5,h6,legend,label'))
    h.forEach(function(ick){
        if(ick.innerText.length == 0){
            ick.innerText = "";
        }
    })

    // page title and h1 should match
    if(document.querySelector('#pageTitleError') == null){
        var pageTitle = document.title.split("-")[0].trim();
        var pageHeader = "";
        if(document.querySelectorAll('h1').length > 0){
            pageheader = document.querySelectorAll('h1')[0].innerText
        }
        if(pageTitle != pageheader) {
            document.querySelector('header').insertAdjacentHTML('beforebegin', '<div id="pageTitleError" class="hmrc-ally-err">Page title/h1 mismatch: ' + pageTitle + '</div>');
        }
    }


} else {
    body.classList.remove('hmrc-ally-outline--active')
}


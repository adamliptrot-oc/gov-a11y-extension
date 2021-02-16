var body = document.querySelector('body')
if(hiddencopy){
    body.classList.add('hmrc-ally-hiddencopy--active')
    var copy = [].slice.call(document.querySelectorAll('.govuk-warning-text__assistive,.govuk-visually-hidden,.visually-hidden, .visuallyhidden, .govuk-visually-hidden'));
    copy.forEach(function(itm, i){
        itm.classList.add('hmrc-ally-hiddencopy');
    })
} else {
    body.classList.remove('hmrc-ally-hiddencopy--active')
}


document.addEventListener('DOMContentLoaded', function() {


    var hmrcA11y = true;


    var buttons = [].slice.call(document.querySelectorAll('[role="switch"]'));
    buttons.forEach(function(btn){

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


    function fireUpdate(btn){
        if(btn.id == "hiddenCopy"){
            var hiddenCopyBtn = btn;
            var hiddencopy;
            if(hiddenCopyBtn.getAttribute('aria-checked') == "true"){
                hiddencopy = true;
            } else {
                hiddencopy = false;
            }
        }
        if(btn.id == "a11yCSS"){
            var a11yCSSBtn = btn;
            var a11ycss;
            if(a11yCSSBtn.getAttribute('aria-checked') == "true"){
                a11ycss = true
            } else {
                a11ycss = false;
            }
        }
        if(btn.id == "errorHint"){
            var errBtn = btn;
            var errorhint;
            if(errBtn.getAttribute('aria-checked') == "true"){
                errorhint = true;
            } else {
                errorhint = false;
            }
        }

    }
}, false);
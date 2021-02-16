var body = document.querySelector('html')
if(hmrcA11y){
    body.classList.add('hmrc-ally-ui--active');
    if(document.querySelector('#hmrc-a11y') == null){
        document.querySelector('body').insertAdjacentHTML('beforebegin', '<iframe id="hmrc-a11y" src="chrome-extension://fglfeegmngdianofjfkbkjdcdabnojba/panel.html"></iframe>');
    }
} else {
    body.classList.remove('hmrc-ally-ui--active');
}
"use strict";

var body = document.querySelector('body');

if (onlyissues) {
  body.classList.add('hmrc-ally-onlyissues');
} else {
  body.classList.remove('hmrc-ally-onlyissues');
}
"use strict";

var body = document.querySelector('body');
var removeMe = [].slice.call(document.querySelectorAll('.hmrc-ally-outlines'));
removeMe.forEach(function (itm) {
  itm.remove();
});

if (outlines) {
  body.classList.add('hmrc-ally-outlines--active');
  var elements = [].slice.call(document.querySelectorAll('h1, h2,h3,h4,h5,h6,label,legend,fieldset,form,table,dl'));
  elements.forEach(function (itm, i) {
    var itmCopy = "";

    switch (itm.tagName.toLowerCase().trim()) {
      case "dl":
        itm.extraInfo = " " + [].slice.call(itm.querySelectorAll("dt")).length + " items";
        break;

      default:
        itm.extraInfo = "";
    }

    itmCopy = itmCopy + '<span class="hmrc-ally-note"><span>Element</span> ' + itm.tagName + itm.extraInfo + '</span>';

    if (itm.tagName.toLowerCase().trim() == "table") {
      itm.querySelector("caption"); // caption

      if (itm.querySelector("caption")) {
        var cap = itm.querySelector("caption").innerText;
        itmCopy = itmCopy + '<span class="hmrc-ally-note"><span>Table</span> Caption: "' + cap + '"</span>';
      } else {
        itmCopy = itmCopy + '<span class="hmrc-ally-note hmrc-ally-warn"><span>Table</span> <a href="https://design-system.service.gov.uk/components/table/#table-captions" target="_blank">Caption missing</a></span>';
      } // has table headers


      if (itm.querySelector("th")) {} else {
        itmCopy = itmCopy + '<span class="hmrc-ally-note hmrc-ally-warn"><span>Table</span> No table headings found</span>';
      }
    }

    itm.insertAdjacentHTML('beforebegin', '<div class="hmrc-ally-outlines">' + itmCopy + '</div>');
  });
  var img = [].slice.call(document.querySelectorAll('img'));
  img.forEach(function (itm, i) {
    var itmCopy = "";

    if (itm.hasAttribute('alt')) {
      itmCopy = itmCopy + '<span class="hmrc-ally-note"><span>Image</span> Alt: "' + itm.getAttribute('alt') + '"</span>';
    } else {
      itmCopy = itmCopy + '<span class="hmrc-ally-note hmrc-ally-warn"><span>Image</span> No alt text</span>';
    }

    itm.insertAdjacentHTML('beforebegin', '<div class="hmrc-ally-outlines">' + itmCopy + '</div>');
  });
} else {
  body.classList.remove('hmrc-ally-outlines--active');
}
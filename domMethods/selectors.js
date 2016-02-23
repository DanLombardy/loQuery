'use strict';

var domSelector = function(selector) {
  if (typeof selector !== 'string' || selector instanceof String) throw 'Error: Selector must be a string.';

  if (selector.indexOf('#') === 0) {
    var selectorId = document.getElementById(selector.slice(1));

    if (selectorId === null) throw 'Error: Selector must be an existing ID.';
    return selectorId;
  };

  if (selector.indexOf('.') === 0) {
    var selectorClass = document.getElementsByClassName(selector.slice(1));

    if (selectorClass.length === 0 || null || undefined) throw 'Error: Selector must be an existing class.';
    return selectorClass;
  };

  if (selector) {
    var selectorTag = document.getElementsByTagName(selector);

    if (selectorTag.length === 0 || null || undefined) throw 'Error: Selector must be an existing element.';
    return selectorTag;
  };
};

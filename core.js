var arrayMethods = require(__dirname + "/arrayMethods.js");
var cssMethods = require(__dirname + "/cssMethods.js");
var domMethods = require(__dirname + "/domMethods.js");

var base_$ = function(selector){
  this.selector = selector;
  /** Check to see if selection is html. If it is, make array
  * out of selections.
  *
  */
  if(/<[a-z][\s\S]*>/i.test(selector)) {
    var elements= document.querySelectorAll(selector); // Elements stores the reference to the collection?

    for (var i = 0; i < elements.length; i++) {
      // array index
      this.selector[i] = elements[i];
    }
    this.length = this.selector.length;
  }
}

function _$(selector){
  return new base_$(selector);
};

function setPrototypes(construct, methodsObject){
  for(var prop in methodsObject){
    construct.prototype[prop] = methodsObject[prop];
  }
}

setPrototypes(base_$, arrayMethods);
setPrototypes(base_$, cssMethods);
setPrototypes(base_$, domMethods);

var arrayMethods = require(__dirname + "/arrayMethods.js");
function isObject(obj) {
  return obj === Object(obj);
}
var _$ = function(selector){

/** Check if selector is array. If true, return array methods
*
*/
  if (Array.isArray(selector)){

/** Return array methods as an object
*
*/
    arrayMethods.selector = selector;
    return arrayMethods;
  }
/** Check if selector is a string. If true, return array methods
*
*/
  if (typeof selector === 'string')
  {
/** Return string methods as an object
*
*/
    return {

    }
  }
/** Check if selector is a number. If true, return array methods
*
*/
  if (typeof selector === 'number'){
/** Return number methods as an object
*
*/
    return {

    }

  }
/** Check if selector is an object. If true, return array methods
*
*/
  if (isObject(selector)){
/** Return object methods as an object
*
*/
    return {

    }

  }
/** Check if selector is a map. If true, return array methods
*
*/
  if (selector.constructor === Map){
/** Return object methods as an object
*
*/
    return {

    }

  }
}

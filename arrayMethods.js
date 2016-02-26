/** Remove array elements that pass test and return them
*@parameter this.selector {array} returned from selector
*@parameter test {function} used for testing what needs to be removed
*/

function remove(test){
  if (!Array.isArray(this.selector)) return [];

  var removed = [];
  var fullArray = this.selector;
  var fullLength = this.selector.length;
  for (var i = 0; i <fullLength; i++){
    if (test(fullArray[i])){
      removed.push(fullArray[i]);
      this.selector.splice(this.selector.indexOf(this.selector[i]), 1);
    }
  }
  return removed;
}

function drop(dropNum){
  if (!Array.isArray(this.selector)) return [];

  var dropped = [];
  if(dropNum != null){
    var index = 0;
   while(index < dropNum){
    this.selector.shift();
    index++
   }
 } else {
   this.selector.shift();
 }
 return this.selector;
}

function dropRight(dropNum){
  if (!Array.isArray(this.selector)) return [];

  var dropped = [];
  if(dropNum != null){
    var index = 0;
   while(index < dropNum){
    this.selector.pop();
    index++
   }
 } else {
   this.selector.pop();
 }
 return this.selector;
}

/** Checks to see if predicate is function, if it is, will allow a filter for
* the first matching value
* Need to add in functionality for _.match
* Also a collection method, so need to make it work with objects and move to collection.js when ready
*/
function find(predicate) {
  var selector = this.selector,
      selectorArray= Array.isArray(selector),
      predicateArray = Array.isArray(predicate),
      predicateObject = predicate.constructor === Object,

      isFunction = function(functionToCheck) {
        var getType = {};
        return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
      };

  if (!(selectorArray) ) return [];

  if(isFunction(predicate)) {
    var length = selector.length,
        index = 0;

    while(index < length ){
      if (predicate(selector[index])) {
        return selector[index];
      }
      ++index;
    }
  }
}

/** Iterates over collection from right to left
* 
* Also a collection method, so need to make it work with objects and move to collection.js when ready
*/
function forEachRight(action){
  var selector = this.selector,
      selectorArray= Array.isArray(selector),
      length = selector.length,
      indexRight = length;

  if (!(selectorArray) ) return [];

  while(indexRight--){
    action(selector[indexRight]);
  }
}


var exports = module.exports = {
  remove: remove,
  drop: drop,
  dropRight: dropRight,
  find: find,
  forEachRight: forEachRight,

};

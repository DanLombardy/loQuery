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

var exports = module.exports = {
  remove: remove

};

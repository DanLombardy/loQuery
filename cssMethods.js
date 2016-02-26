function css(name, value){
  this.selector.each(function(element){
    element.style[name] = value;
  });
  return this.selector;
};

function addClass(className) {
  this.selector.each(function(element){
    element.classList.add(className);
  });
    return this.selector;
  };

var exports = module.exports = {
  css: css,
  addClass : addClass
};

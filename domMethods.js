function html(value) {
  if (value) {
    this.selector.each(function(element) {
      element.innerHTML = value;
    });

    return this.selector;
  } else {
    return this.selector[0] ? this.selector[0].innerHTML : "";
  }
}

var exports = module.exports = {
  html: html
};

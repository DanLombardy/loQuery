// https://github.com/robflaherty/jquery-annotated-source/blob/master/jquery-1.6.2/01-core.js
// LINES 313-317
// Reduce the set of matched elements to a subset specified by a range of indices
slice: function() {
  return this.pushStack( slice.apply( this, arguments ),
    "slice", slice.call(arguments).join(",") );
},


//https://github.com/jquery/jquery/blob/master/src/core.js
// LINES 91-93
slice: function() {
  return this.pushStack( slice.apply( this, arguments ) );
},

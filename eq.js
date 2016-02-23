// https://github.com/robflaherty/jquery-annotated-source/blob/master/jquery-1.6.2/01-core.js
// lines 296-301
// Reduce the set of matched elements to the one at the specified index
eq: function( i ) {
  return i === -1 ?
    this.slice( i ) :
    this.slice( i, +i + 1 );
},

// https://github.com/jquery/jquery/blob/master/src/core.js
// lines 103-107
eq: function( i ) {
  var len = this.length,
    j = +i + ( i < 0 ? len : 0 );
  return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
},

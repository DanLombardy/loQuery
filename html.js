// **jQuery Annotated Source**.
// FROM ROB FLAHERTY'S WORK ON JQUERY 1.6
// [Home](/jquery-annotated-source/) | [Previous Chapter](09-traversing.html) | [Next Chapter](11-css.html)
//https://github.com/robflaherty/jquery-annotated-source/blob/master/jquery-1.6.2/10-manipulation.js LINE 201-240
// ## Manipulation

html: function( value ) {
  if ( value === undefined ) {
    return this[0] && this[0].nodeType === 1 ?
      this[0].innerHTML.replace(rinlinejQuery, "") :
      null;

  // See if we can take a shortcut and just use innerHTML
  } else if ( typeof value === "string" && !rnocache.test( value ) &&
    (jQuery.support.leadingWhitespace || !rleadingWhitespace.test( value )) &&
    !wrapMap[ (rtagName.exec( value ) || ["", ""])[1].toLowerCase() ] ) {

    value = value.replace(rxhtmlTag, "<$1></$2>");

    try {
      for ( var i = 0, l = this.length; i < l; i++ ) {
        // Remove element nodes and prevent memory leaks
        if ( this[i].nodeType === 1 ) {
          jQuery.cleanData( this[i].getElementsByTagName("*") );
          this[i].innerHTML = value;
        }
      }

    // If using innerHTML throws an exception, use the fallback method
    } catch(e) {
      this.empty().append( value );
    }

  } else if ( jQuery.isFunction( value ) ) {
    this.each(function(i){
      var self = jQuery( this );

      self.html( value.call(this, i, self.html()) );
    });

  } else {
    this.empty().append( value );
  }

  return this;
},

/*
  FROM CURRENT JQUERY REPO - FILE: https://github.com/jquery/jquery/blob/master/src/manipulation.js LINE 392-429
*/
html: function( value ) {
  return access( this, function( value ) {
    var elem = this[ 0 ] || {},
      i = 0,
      l = this.length;

    if ( value === undefined && elem.nodeType === 1 ) {
      return elem.innerHTML;
    }

    // See if we can take a shortcut and just use innerHTML
    if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
      !wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

      value = jQuery.htmlPrefilter( value );

      try {
        for ( ; i < l; i++ ) {
          elem = this[ i ] || {};

          // Remove element nodes and prevent memory leaks
          if ( elem.nodeType === 1 ) {
            jQuery.cleanData( getAll( elem, false ) );
            elem.innerHTML = value;
          }
        }

        elem = 0;

      // If using innerHTML throws an exception, use the fallback method
      } catch ( e ) {}
    }

    if ( elem ) {
      this.empty().append( value );
    }
  }, null, value, arguments.length );
},

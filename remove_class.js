// **jQuery Annotated Source**.
//
// [Home](/jquery-annotated-source/) | [Previous Chapter](05-queue.html) | [Next Chapter](07-event.html)
//https://github.com/robflaherty/jquery-annotated-source/blob/master/jquery-1.6.2/06-attributes.js LINE 80-111
// ## Attributes
removeClass: function( value ) {
  var classNames, i, l, elem, className, c, cl;

  if ( jQuery.isFunction( value ) ) {
    return this.each(function( j ) {
      jQuery( this ).removeClass( value.call(this, j, this.className) );
    });
  }

  if ( (value && typeof value === "string") || value === undefined ) {
    classNames = (value || "").split( rspace );

    for ( i = 0, l = this.length; i < l; i++ ) {
      elem = this[ i ];

      if ( elem.nodeType === 1 && elem.className ) {
        if ( value ) {
          className = (" " + elem.className + " ").replace( rclass, " " );
          for ( c = 0, cl = classNames.length; c < cl; c++ ) {
            className = className.replace(" " + classNames[ c ] + " ", " ");
          }
          elem.className = jQuery.trim( className );

        } else {
          elem.className = "";
        }
      }
    }
  }

  return this;
},

// https://github.com/jquery/jquery/blob/master/src/attributes/classes.js LINE 53-97

removeClass: function( value ) {
  var classes, elem, cur, curValue, clazz, j, finalValue,
    i = 0;

  if ( jQuery.isFunction( value ) ) {
    return this.each( function( j ) {
      jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
    } );
  }

  if ( !arguments.length ) {
    return this.attr( "class", "" );
  }

  if ( typeof value === "string" && value ) {
    classes = value.match( rnotwhite ) || [];

    while ( ( elem = this[ i++ ] ) ) {
      curValue = getClass( elem );

      // This expression is here for better compressibility (see addClass)
      cur = elem.nodeType === 1 &&
        ( " " + curValue + " " ).replace( rclass, " " );

      if ( cur ) {
        j = 0;
        while ( ( clazz = classes[ j++ ] ) ) {

          // Remove *all* instances
          while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
            cur = cur.replace( " " + clazz + " ", " " );
          }
        }

        // Only assign if different to avoid unneeded rendering.
        finalValue = jQuery.trim( cur );
        if ( curValue !== finalValue ) {
          elem.setAttribute( "class", finalValue );
        }
      }
    }
  }

  return this;
},

// **jQuery Annotated Source**.
//
// [Home](/jquery-annotated-source/) | [Previous Chapter](05-queue.html) | [Next Chapter](07-event.html)
//https://github.com/robflaherty/jquery-annotated-source/blob/master/jquery-1.6.2/06-attributes.js LINE 43-78
// ## Attributes
addClass: function( value ) {
  var classNames, i, l, elem,
    setClass, c, cl;

  if ( jQuery.isFunction( value ) ) {
    return this.each(function( j ) {
      jQuery( this ).addClass( value.call(this, j, this.className) );
    });
  }

  if ( value && typeof value === "string" ) {
    classNames = value.split( rspace );

    for ( i = 0, l = this.length; i < l; i++ ) {
      elem = this[ i ];

      if ( elem.nodeType === 1 ) {
        if ( !elem.className && classNames.length === 1 ) {
          elem.className = value;

        } else {
          setClass = " " + elem.className + " ";

          for ( c = 0, cl = classNames.length; c < cl; c++ ) {
            if ( !~setClass.indexOf( " " + classNames[ c ] + " " ) ) {
              setClass += classNames[ c ] + " ";
            }
          }
          elem.className = jQuery.trim( setClass );
        }
      }
    }
  }

  return this;
},

//https://github.com/jquery/jquery/blob/master/src/attributes/classes.js LINE 15-51

addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
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

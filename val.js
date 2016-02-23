// **jQuery Annotated Source**.
//
// [Home](/jquery-annotated-source/) | [Previous Chapter](05-queue.html) | [Next Chapter](07-event.html)
//https://github.com/robflaherty/jquery-annotated-source/blob/master/jquery-1.6.2/06-attributes.js LINES 161-218
// ## Attributes
val: function( value ) {
  var hooks, ret,
    elem = this[0];

  if ( !arguments.length ) {
    if ( elem ) {
      hooks = jQuery.valHooks[ elem.nodeName.toLowerCase() ] || jQuery.valHooks[ elem.type ];

      if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
        return ret;
      }

      ret = elem.value;

      return typeof ret === "string" ?
        // handle most common string cases
        ret.replace(rreturn, "") :
        // handle cases where value is null/undef or number
        ret == null ? "" : ret;
    }

    return undefined;
  }

  var isFunction = jQuery.isFunction( value );

  return this.each(function( i ) {
    var self = jQuery(this), val;

    if ( this.nodeType !== 1 ) {
      return;
    }

    if ( isFunction ) {
      val = value.call( this, i, self.val() );
    } else {
      val = value;
    }

    // Treat null/undefined as ""; convert numbers to string
    if ( val == null ) {
      val = "";
    } else if ( typeof val === "number" ) {
      val += "";
    } else if ( jQuery.isArray( val ) ) {
      val = jQuery.map(val, function ( value ) {
        return value == null ? "" : value + "";
      });
    }

    hooks = jQuery.valHooks[ this.nodeName.toLowerCase() ] || jQuery.valHooks[ this.type ];

    // If set returns undefined, fall back to normal setting
    if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
      this.value = val;
    }
  });
}

/*
  FROM CURRENT JQUERY REPO - FILE: https://github.com/jquery/jquery/blob/master/src/attributes/val.js LINE 9-76
*/

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?

					// Handle most common string cases
					ret.replace( rreturn, "" ) :

					// Handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

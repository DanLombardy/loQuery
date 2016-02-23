// https://github.com/robflaherty/jquery-annotated-source/blob/master/jquery-1.6.2/06-attributes.js LINE 113-148

toggleClass: function( value, stateVal ) {
  var type = typeof value,
    isBool = typeof stateVal === "boolean";

  if ( jQuery.isFunction( value ) ) {
    return this.each(function( i ) {
      jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
    });
  }

  return this.each(function() {
    if ( type === "string" ) {
      // toggle individual class names
      var className,
        i = 0,
        self = jQuery( this ),
        state = stateVal,
        classNames = value.split( rspace );

      while ( (className = classNames[ i++ ]) ) {
        // check each className given, space seperated list
        state = isBool ? state : !self.hasClass( className );
        self[ state ? "addClass" : "removeClass" ]( className );
      }

    } else if ( type === "undefined" || type === "boolean" ) {
      if ( this.className ) {
        // store className if set
        jQuery._data( this, "__className__", this.className );
      }

      // toggle whole className
      this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
    }
  });
},

// https://github.com/jquery/jquery/blob/master/src/attributes/classes.js LINE 99-157

toggleClass: function( value, stateVal ) {
  var type = typeof value;

  if ( typeof stateVal === "boolean" && type === "string" ) {
    return stateVal ? this.addClass( value ) : this.removeClass( value );
  }

  if ( jQuery.isFunction( value ) ) {
    return this.each( function( i ) {
      jQuery( this ).toggleClass(
        value.call( this, i, getClass( this ), stateVal ),
        stateVal
      );
    } );
  }

  return this.each( function() {
    var className, i, self, classNames;

    if ( type === "string" ) {

      // Toggle individual class names
      i = 0;
      self = jQuery( this );
      classNames = value.match( rnotwhite ) || [];

      while ( ( className = classNames[ i++ ] ) ) {

        // Check each className given, space separated list
        if ( self.hasClass( className ) ) {
          self.removeClass( className );
        } else {
          self.addClass( className );
        }
      }

    // Toggle whole class name
    } else if ( value === undefined || type === "boolean" ) {
      className = getClass( this );
      if ( className ) {

        // Store className if set
        dataPriv.set( this, "__className__", className );
      }

      // If the element has a class name or if we're passed `false`,
      // then remove the whole classname (if there was one, the above saved it).
      // Otherwise bring back whatever was previously saved (if anything),
      // falling back to the empty string if nothing was stored.
      if ( this.setAttribute ) {
        this.setAttribute( "class",
          className || value === false ?
          "" :
          dataPriv.get( this, "__className__" ) || ""
        );
      }
    }
  } );
},

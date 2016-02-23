// https://github.com/robflaherty/jquery-annotated-source/blob/master/jquery-1.6.2/13-effects.js line 26-97
// INCLUDING TWO METHODS HERE BECAUSE THEY SEEM TO HAVE BEEN COMBINED
show: function( speed, easing, callback ) {
  var elem, display;

  if ( speed || speed === 0 ) {
    return this.animate( genFx("show", 3), speed, easing, callback);

  } else {
    for ( var i = 0, j = this.length; i < j; i++ ) {
      elem = this[i];

      if ( elem.style ) {
        display = elem.style.display;

        // Reset the inline display of this element to learn if it is
        // being hidden by cascaded rules or not
        if ( !jQuery._data(elem, "olddisplay") && display === "none" ) {
          display = elem.style.display = "";
        }

        // Set elements which have been overridden with display: none
        // in a stylesheet to whatever the default browser style is
        // for such an element
        if ( display === "" && jQuery.css( elem, "display" ) === "none" ) {
          jQuery._data(elem, "olddisplay", defaultDisplay(elem.nodeName));
        }
      }
    }

    // Set the display of most of the elements in a second loop
    // to avoid the constant reflow
    for ( i = 0; i < j; i++ ) {
      elem = this[i];

      if ( elem.style ) {
        display = elem.style.display;

        if ( display === "" || display === "none" ) {
          elem.style.display = jQuery._data(elem, "olddisplay") || "";
        }
      }
    }

    return this;
  }
},

hide: function( speed, easing, callback ) {
  if ( speed || speed === 0 ) {
    return this.animate( genFx("hide", 3), speed, easing, callback);

  } else {
    for ( var i = 0, j = this.length; i < j; i++ ) {
      if ( this[i].style ) {
        var display = jQuery.css( this[i], "display" );

        if ( display !== "none" && !jQuery._data( this[i], "olddisplay" ) ) {
          jQuery._data( this[i], "olddisplay", display );
        }
      }
    }

    // Set the display of the elements in a second loop
    // to avoid the constant reflow
    for ( i = 0; i < j; i++ ) {
      if ( this[i].style ) {
        this[i].style.display = "none";
      }
    }

    return this;
  }
},

// https://github.com/jquery/jquery/blob/master/src/css/showHide.js LINES: ALL
// SEEMS LIKE THEY CHANGED SHOW/HIDE TO BE A SINGLE FUNCTION
function showHide( elements, show ) {
	var display, elem,
		values = [],
		index = 0,
		length = elements.length;

	// Determine new display value for elements that need to change
	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		display = elem.style.display;
		if ( show ) {

			// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
			// check is required in this first loop unless we have a nonempty display value (either
			// inline or about-to-be-restored)
			if ( display === "none" ) {
				values[ index ] = dataPriv.get( elem, "display" ) || null;
				if ( !values[ index ] ) {
					elem.style.display = "";
				}
			}
			if ( elem.style.display === "" && jQuery.css( elem, "display" ) === "none" &&

					// Support: Firefox <=42 - 43
					// Don't set inline display on disconnected elements with computed display: none
					jQuery.contains( elem.ownerDocument, elem ) ) {

				values[ index ] = getDefaultDisplay( elem );
			}
		} else {
			if ( display !== "none" ) {
				values[ index ] = "none";

				// Remember what we're overwriting
				dataPriv.set( elem, "display", display );
			}
		}
	}

	// Set the display of the elements in a second loop to avoid constant reflow
	for ( index = 0; index < length; index++ ) {
		if ( values[ index ] != null ) {
			elements[ index ].style.display = values[ index ];
		}
	}

	return elements;
}

jQuery.fn.extend( {
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHiddenWithinTree( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );

return showHide;
} );

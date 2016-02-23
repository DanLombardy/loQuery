// https://github.com/robflaherty/jquery-annotated-source/blob/master/jquery-1.6.2/13-effects.js
// lines 126-251
animate: function( prop, speed, easing, callback ) {
  var optall = jQuery.speed(speed, easing, callback);

  if ( jQuery.isEmptyObject( prop ) ) {
    return this.each( optall.complete, [ false ] );
  }

  // Do not change referenced properties as per-property easing will be lost
  prop = jQuery.extend( {}, prop );

  return this[ optall.queue === false ? "each" : "queue" ](function() {
    // XXX 'this' does not always have a nodeName when running the
    // test suite

    if ( optall.queue === false ) {
      jQuery._mark( this );
    }

    var opt = jQuery.extend( {}, optall ),
      isElement = this.nodeType === 1,
      hidden = isElement && jQuery(this).is(":hidden"),
      name, val, p,
      display, e,
      parts, start, end, unit;

    // will store per property easing and be used to determine when an animation is complete
    opt.animatedProperties = {};

    for ( p in prop ) {

      // property name normalization
      name = jQuery.camelCase( p );
      if ( p !== name ) {
        prop[ name ] = prop[ p ];
        delete prop[ p ];
      }

      val = prop[ name ];

      // easing resolution: per property > opt.specialEasing > opt.easing > 'swing' (default)
      if ( jQuery.isArray( val ) ) {
        opt.animatedProperties[ name ] = val[ 1 ];
        val = prop[ name ] = val[ 0 ];
      } else {
        opt.animatedProperties[ name ] = opt.specialEasing && opt.specialEasing[ name ] || opt.easing || 'swing';
      }

      if ( val === "hide" && hidden || val === "show" && !hidden ) {
        return opt.complete.call( this );
      }

      if ( isElement && ( name === "height" || name === "width" ) ) {
        // Make sure that nothing sneaks out
        // Record all 3 overflow attributes because IE does not
        // change the overflow attribute when overflowX and
        // overflowY are set to the same value
        opt.overflow = [ this.style.overflow, this.style.overflowX, this.style.overflowY ];

        // Set display property to inline-block for height/width
        // animations on inline elements that are having width/height
        // animated
        if ( jQuery.css( this, "display" ) === "inline" &&
            jQuery.css( this, "float" ) === "none" ) {
          if ( !jQuery.support.inlineBlockNeedsLayout ) {
            this.style.display = "inline-block";

          } else {
            display = defaultDisplay( this.nodeName );

            // inline-level elements accept inline-block;
            // block-level elements need to be inline with layout
            if ( display === "inline" ) {
              this.style.display = "inline-block";

            } else {
              this.style.display = "inline";
              this.style.zoom = 1;
            }
          }
        }
      }
    }

    if ( opt.overflow != null ) {
      this.style.overflow = "hidden";
    }

    for ( p in prop ) {
      e = new jQuery.fx( this, opt, p );
      val = prop[ p ];

      if ( rfxtypes.test(val) ) {
        e[ val === "toggle" ? hidden ? "show" : "hide" : val ]();

      } else {
        parts = rfxnum.exec( val );
        start = e.cur();

        if ( parts ) {
          end = parseFloat( parts[2] );
          unit = parts[3] || ( jQuery.cssNumber[ p ] ? "" : "px" );

          // We need to compute starting value
          if ( unit !== "px" ) {
            jQuery.style( this, p, (end || 1) + unit);
            start = ((end || 1) / e.cur()) * start;
            jQuery.style( this, p, start + unit);
          }

          // If a +=/-= token was provided, we're doing a relative animation
          if ( parts[1] ) {
            end = ( (parts[ 1 ] === "-=" ? -1 : 1) * end ) + start;
          }

          e.custom( start, end, unit );

        } else {
          e.custom( start, val, "" );
        }
      }
    }

    // For JS strict compliance
    return true;
  });
},

// https://github.com/jquery/jquery/blob/master/src/effects.js
// lines 487-557
animate: function( prop, speed, easing, callback ) {
  var empty = jQuery.isEmptyObject( prop ),
    optall = jQuery.speed( speed, easing, callback ),
    doAnimation = function() {

      // Operate on a copy of prop so per-property easing won't be lost
      var anim = Animation( this, jQuery.extend( {}, prop ), optall );

      // Empty animations, or finishing resolves immediately
      if ( empty || dataPriv.get( this, "finish" ) ) {
        anim.stop( true );
      }
    };
    doAnimation.finish = doAnimation;

  return empty || optall.queue === false ?
    this.each( doAnimation ) :
    this.queue( optall.queue, doAnimation );
},
stop: function( type, clearQueue, gotoEnd ) {
  var stopQueue = function( hooks ) {
    var stop = hooks.stop;
    delete hooks.stop;
    stop( gotoEnd );
  };

  if ( typeof type !== "string" ) {
    gotoEnd = clearQueue;
    clearQueue = type;
    type = undefined;
  }
  if ( clearQueue && type !== false ) {
    this.queue( type || "fx", [] );
  }

  return this.each( function() {
    var dequeue = true,
      index = type != null && type + "queueHooks",
      timers = jQuery.timers,
      data = dataPriv.get( this );

    if ( index ) {
      if ( data[ index ] && data[ index ].stop ) {
        stopQueue( data[ index ] );
      }
    } else {
      for ( index in data ) {
        if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
          stopQueue( data[ index ] );
        }
      }
    }

    for ( index = timers.length; index--; ) {
      if ( timers[ index ].elem === this &&
        ( type == null || timers[ index ].queue === type ) ) {

        timers[ index ].anim.stop( gotoEnd );
        dequeue = false;
        timers.splice( index, 1 );
      }
    }

    // Start the next in the queue if the last step wasn't forced.
    // Timers currently will call their complete callbacks, which
    // will dequeue but only if they were gotoEnd.
    if ( dequeue || !gotoEnd ) {
      jQuery.dequeue( this, type );
    }
  } );
},

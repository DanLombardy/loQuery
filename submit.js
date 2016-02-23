// https://github.com/robflaherty/jquery-annotated-source/blob/master/jquery-1.6.2/07-event.js
// LINES 701-735
// submit delegation
if ( !jQuery.support.submitBubbles ) {

  jQuery.event.special.submit = {
    setup: function( data, namespaces ) {
      if ( !jQuery.nodeName( this, "form" ) ) {
        jQuery.event.add(this, "click.specialSubmit", function( e ) {
          var elem = e.target,
            type = elem.type;

          if ( (type === "submit" || type === "image") && jQuery( elem ).closest("form").length ) {
            trigger( "submit", this, arguments );
          }
        });

        jQuery.event.add(this, "keypress.specialSubmit", function( e ) {
          var elem = e.target,
            type = elem.type;

          if ( (type === "text" || type === "password") && jQuery( elem ).closest("form").length && e.keyCode === 13 ) {
            trigger( "submit", this, arguments );
          }
        });

      } else {
        return false;
      }
    },

    teardown: function( namespaces ) {
      jQuery.event.remove( this, ".specialSubmit" );
    }
  };

}

// COULDN'T FIND THIS IN THE NEW SOURCE REPO

//= require jquery
//= require jquery_ujs
//= require bootstrap-dropdown
//= require bootstrap-modal
//= require bootstrap-transition
//= require_tree .

var orrmaps = (function(orrmaps, $) {
   $.fn.preload = function() {
    this.each(function() {
      $('<img/>')[0].src = this;
    });
  };

  $(function() {
    orrmaps.map.init(); 
    orrmaps.dialog.init();
  });

  return orrmaps;

}(orrmaps || {}, jQuery));

orrmaps.dialog = function() {
  var open = function() { 
    $('#sign_in').modal('show');    
  };

  var close = function() { 
    $('#sign_in').modal('hide');    
  };

  var init = function() {
    $('input').attr('autocomplete', 'off');
    open();
  };

  return {
    open: open,
    close: close,
    init: init
  };
}();

orrmaps.map = function() {
  var map
  var markers = [];
  var current_marker, current_marker_id, current_info_box;
  var image = '/assets/tiles/ore.png';

  var get_marker_id = function(lat, lng) {
    return String(lat).replace(/\./g, "").replace(/\-/g, "")  + '_' + String(lng).replace(/\./g, "").replace(/\-/g, ""); 
  };

  var remove_current_marker = function() {
    current_marker.setMap(null);
    current_info_box.close();
    delete markers[current_marker_id];
    $.ajax({ url: '/points/'+marker_id, 
             type: 'DELETE', 
             data: { 
               latitude: current_marker.position.Xa, 
               longitude: current_marker.position.Ya
             }
    });
  };

  var update_marker = function(marker) {
    marker_id = get_marker_id(marker.Xa, marker.Ya);
    $.ajax({ url: '/points', 
             type: 'PUT', 
             data: {
               latitude: marker.Xa, 
               longitude: marker.Ya, 
               marker_id: marker_id
             }
    });
  };

  var add_marker = function(point) {
    var _point = new google.maps.LatLng(point.lat, point.lng)
    var marker_id = get_marker_id(point.lat, point.lng);    

    var marker = new google.maps.Marker({
      position: _point,
      animation: google.maps.Animation.DROP,
      map: map,
      icon: image,
      draggable: true,
      id: 'marker_' + marker_id
    }); 

    add_info_box(marker); 
    markers[marker_id] = marker;
  };

  var place_marker = function(location) {
    marker_id = get_marker_id(location.Xa, location.Ya);

    $.post('/points', {latitude: location.Xa, longitude: location.Ya, marker_id: marker_id});

    var marker = new google.maps.Marker({
      position: location, 
      animation: google.maps.Animation.DROP,
      map: map,
      icon: image,
      draggable: true,
      id: 'marker_' + marker_id
    });

    add_info_box(marker);
    markers[marker_id] = marker;
  };

  var init = function() { 
    $('.dropdown-toggle').dropdown();

    $.get('/maps', function(data) {
      var map_options = {
        zoom: 4,
        center: new google.maps.LatLng(46.558860303117164, 10.37109375),
        disableDefaultUI: true,
      }

      var customMapType = new google.maps.ImageMapType({
        getTileUrl: function(coord, zoom) {
          var normalizedCoord = normalize(coord, zoom);
          if(normalizedCoord && (normalizedCoord.x < Math.pow(2, zoom)) && (normalizedCoord.x > -1) && (normalizedCoord.y < Math.pow(2, zoom)) && (normalizedCoord.y > -1)) {
            return 'assets/tiles/' + zoom + '_' + normalizedCoord.x + '_' + normalizedCoord.y + '.jpg';
          } else {
            return 'assets/tiles/_empty.jpg';
          }
        },
        tileSize: new google.maps.Size(256, 256),
        maxZoom: 4,
        minZoom: 2
      });

      map = new google.maps.Map(document.getElementById('map'), map_options);
      google.maps.event.addListener(map, "click", function(event) {
        place_marker(event.latLng);
      });

      map.mapTypes.set('custom', customMapType);
      map.setMapTypeId('custom'); 

      var mc = new MarkerClusterer(map, markers); 

      if (data.length > 0) {
        for (var i=0; i < data.length; i++) {
          add_marker(data[i]); 
        }
      }

    });
  };

  var add_info_box = function(marker) {
    marker_id = get_marker_id(marker.position.Xa, marker.position.Ya);

    var box = document.createElement("div");
    box.className = marker_id + " info";
    box.innerHTML = "<a class='delete' href='#'><i class='icon icon-white icon-trash'></i></a><a class='report' href='#'><i class='icon icon-white icon-flag'></i></a>";

    $(box).find('.delete').click(function() { 
      remove_current_marker();
      return false;
    });

    var box_options = {
      content: box,
      disableAutoPan: false,
      maxWidth: 0,
      pixelOffset: new google.maps.Size(-30, 0),
      zIndex: null,
      boxStyle: { 
        background: "url('/assets/tiles/tipbox.png') no-repeat 48% 1px"
      },
      closeBoxURL: "/assets/tiles/close.png",
      infoBoxClearance: new google.maps.Size(1, 1),
      isHidden: false,
      pane: "floatPane",
      enableEventPropagation: false,
      id: 'marker_' + marker_id
    }
     
    var ib = new InfoBox(box_options);

    google.maps.event.addListener(marker, 'dragend', function() {
      update_marker(marker);
    });

    google.maps.event.addListener(marker, "click", function(event) {
      current_marker = marker;
      current_marker_id = marker_id;
      current_info_box = ib;
      ib.open(map, this);
    });
  }; 
 
  var normalize = function(coord, zoom) {
     var y = coord.y;
     var x = coord.x;
     var tileRange = 1 << zoom;

     if (y < 0 || y >= tileRange) {
       return null;
     }

     if (x < 0 || x >= tileRange) {
       x = (x % tileRange + tileRange) % tileRange;
     }

     return {
       x: x,
       y: y
     };
  };
   
  return {
    add_marker: add_marker,
    remove_current_marker: remove_current_marker,
    place_marker: place_marker,
    get_marker_id: get_marker_id,
    normalize: normalize,
    init: init
  };
}();



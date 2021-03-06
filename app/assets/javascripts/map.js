//FIXME: if you're reading this, i'm so sorry.
orrmaps.map = function() {
  var map, map_id, markers = [], dmarkers = [];
  var current_marker, current_marker_id, current_info_box;
  var icon_type = "ore";

  var icon = function(img, opacity) {
    var type = img.replace("/assets/tiles/","").replace(".png", "");
    if (opacity == 100) opacity = "";
    return "/assets/tiles/" + type + opacity + ".png";
  };

  var toolshed = function() {
    $('.nodes a').live('click', function() {
      $('.nodes a').removeClass('active');
      icon_type = $(this).attr('class');
      //$('.node_toggle em').html($(this).text());
      //$('.node_toggle').css('background', $(this).css('background'));
      $(this).addClass('active');
    });
    $('#nodes a').live('click', function() {
      $('#nodes a').removeClass('active');
      icon_type = $(this).attr('class');
      $(this).addClass('active');
      $('.node').css('background', $(this).css('background'));
      $('.desc span').html($(this).attr('rel'));
    });
    $('#nodes div a').hover(function() {
      $('.desc span').html($(this).attr('rel'));
    }, function() {
      $('.desc span').html($('#nodes div').find('.active').attr('rel'));
    });
    $('.delete_all').live('click', function() {
      if(confirm("This will delete all markers on your map. Are you sure?"))
        clear_markers();
    });
    $('#reset .del_all').live('click', function() {
      clear_markers();
      $('#reset').modal('hide');
    });
    $('li.dall, li.toolshed').css('display','inline-block');
    $('#sidebar li.toolshed').css('display','block');
  };

  var filters = function() {
    $('#sidebar .filters a').live('click', function(e) {
      var rel = $(this).attr('rel');
      var on = $(this).hasClass('active');
      if(rel == "all") {
        if(on) {
          $(this).removeClass('active');
          $('#filter').removeClass('active');
          $('#filters li a').removeClass('active');
          $('#sidebar .filters a').removeClass('active');
          for (var i = 0, marker; marker = dmarkers[++i]; ) { marker.setVisible(true); }
        } else{
          $(this).addClass('active');
          $('#filter').addClass('active');
          $('#sidebar .filters a').addClass('active');
          $('#filters li a').addClass('active');
          for (var i = 0, marker; marker = dmarkers[++i]; ) { marker.setVisible(false); }
        }
      } else {
        if(on){
          $(this).removeClass('active');
          $('#filters li').find('a[rel="'+rel+'"]').removeClass('active');
        } else{
          $(this).addClass('active');
          $('#filters li').find('a[rel="'+rel+'"]').addClass('active');
        }
        for (var i = 0, marker; marker = dmarkers[++i]; ) {
          var type = marker.icon.replace("/assets/tiles/","").replace(".png", "").replace(/[0-9]/g, '');;
          if(type == rel) {
            if(on)
              marker.setVisible(true);
            else
              marker.setVisible(false);
          }
        }
      }
    });
    $('#filter').live('click', function() { $(this).toggleClass('active'); });
    $('#filters li a').on('click', function(e) {
      e.stopPropagation();
      var rel = $(this).attr('rel');
      var on = $(this).hasClass('active');
      if(rel == "all") {
        if(on) {
          $(this).removeClass('active');
          $('#filter').removeClass('active');
          $('#filters li a').removeClass('active');
          $('#sidebar .filters a').removeClass('active');
          for (var i = 0, marker; marker = dmarkers[++i]; ) { marker.setVisible(true); }
        } else{
          $(this).addClass('active');
          $('#filter').addClass('active');
          $('#sidebar .filters a').addClass('active');
          $('#filters li a').addClass('active');
          for (var i = 0, marker; marker = dmarkers[++i]; ) { marker.setVisible(false); }
        } 
      } else {
        if(on) {
          $(this).removeClass('active');
          $('#sidebar .filters').find('a[rel="'+rel+'"]').removeClass('active');
        } else {
          $(this).addClass('active');
          $('#sidebar .filters').find('a[rel="'+rel+'"]').addClass('active');
        }
        for (var i = 0, marker; marker = dmarkers[++i]; ) {
          var type = marker.icon.replace("/assets/tiles/","").replace(".png", "").replace(/[0-9]/g, '');;
          if(type == rel) {
            if(on) marker.setVisible(true);
            else; marker.setVisible(false);
          }
        }
      }
    });
  };

  var get_marker_id = function(latlng) {
    return latlng.toUrlValue();
  };

  var clear_markers = function() {
    for(var i=0; i < dmarkers.length; i++){
      dmarkers[i].setMap(null);
    }
    $.ajax({ url: '/points_all', type: 'DELETE', data: {map_id: map_id} });
    dmarkers = new Array();
  };

  var remove_current_marker = function() {
    current_marker.setMap(null);
    current_info_box.close();
    delete markers[current_marker_id];
    $.ajax({ url: '/points',
             type: 'DELETE',
             data: {
               marker_id: current_marker_id,
               latitude: current_marker.position.lat(),
               longitude: current_marker.position.lng()
             }
    });
  };

  var update_marker = function(marker) {
    marker_id = get_marker_id(marker.getPosition());
    $.ajax({ url: '/points',
             type: 'PUT',
             data: {
               latitude: marker.position.lat(),
               longitude: marker.position.lng(),
               marker_id: current_marker_id,
               new_marker_id: marker_id
             }
    });
    current_marker_id = marker_id
  };

  var add_server_marker = function(data, opacity) {
    point = new google.maps.LatLng(data.latitude, data.longitude)
    marker_id = get_marker_id(point);

    if(data.icon == "/assets/tiles/note.png") return false;

    var marker = new google.maps.Marker({
      position: point,
      //animation: google.maps.Animation.DROP,
      map: map,
      icon: icon(data.icon, opacity),
      id: 'marker_' + marker_id
    });

    markers[marker_id] = marker;
    dmarkers.push(marker);
  };

  var add_marker = function(data) {
    point = new google.maps.LatLng(data.latitude, data.longitude)
    marker_id = get_marker_id(point);

    var marker = new google.maps.Marker({
      position: point,
      //animation: google.maps.Animation.DROP,
      map: map,
      icon: data.icon,
      note: data.note,
      id: 'marker_' + marker_id
    });

    if(data.note)
      add_note_box(marker, false);

    markers[marker_id] = marker;
    dmarkers.push(marker);
  };

  var add_draggable_marker = function(data) {
    point = new google.maps.LatLng(data.latitude, data.longitude)
    marker_id = get_marker_id(point);

    var marker = new google.maps.Marker({
      position: point,
      //animation: google.maps.Animation.DROP,
      map: map,
      icon: data.icon,
      draggable: true,
      note: data.note,
      id: 'marker_' + marker_id
    });

    add_box(marker);

    markers[marker_id] = marker;
    dmarkers.push(marker);
  };

  var place_marker = function(location) {
    marker_id = get_marker_id(location);
    icon = "/assets/tiles/" + icon_type + ".png"
    $.ajax({
      url: 'points',
      type: 'post',
      data: {icon: icon, map_id: map_id, latitude: location.lat(), longitude: location.lng(), marker_id: marker_id},
      success: function(json) {
        if(json.status == "unauthorized") {
          orrmaps.ui.open();
        } else if(json.status == "failure"){
          orrmaps.alert.init("Too many markers on the map");
        } else {
          var marker = new google.maps.Marker({
            position: location,
            //animation: google.maps.Animation.DROP,
            map: map,
            icon: icon,
            draggable: true,
            id: 'marker_' + marker_id
          });

          google.maps.event.addListener(marker, 'dragstart', function() {
            current_marker = marker;
            current_marker_id = marker_id;
          });

          google.maps.event.addListener(marker, 'dragend', function() {
            update_marker(marker);
          });

          add_box(marker);
          markers[marker_id] = marker;
          dmarkers.push(marker);
        }
      }
    });
  };


  var MIN_ZOOM = 10, MAX_ZOOM = 14;

  var normalize = function(coord, zoom) {
    var totalTiles = 1 << (zoom - MIN_ZOOM),
        y = coord.y,
        x = coord.x;
    var originx = 1 << (zoom-1),
        originy = 1 << (zoom-1);

    if(y < originx || y >= originx + totalTiles ||
        x < originx || x >= originx + totalTiles){
        return null;
    }

    x -= originx;
    y -= originy;

    return { x:x, y:y };
  };

  var init = function() {
    var map_options = {
      zoom: MAX_ZOOM - 1,
      center: new google.maps.LatLng(-0.15432339128604552, 0.174407958984375),
      disableDefaultUI: true,
      zoomControl: true,
      panControl: true,
      scaleControl: false
    }

    var customMapType = new google.maps.ImageMapType({
      getTileUrl: function(coord, zoom) {
        var normalizedCoord = normalize(coord, zoom);
        //if (normalizedCoord && (normalizedCoord.x < Math.pow(2, zoom)) && (normalizedCoord.x > -1) && (normalizedCoord.y < Math.pow(2, zoom)) && (normalizedCoord.y > -1)) {
        //  return "/assets/tiles/" + zoom + '_' + normalizedCoord.x + '_' + normalizedCoord.y + '.jpg';
        if (normalizedCoord) {
          return "/assets/map/" + (zoom-MIN_ZOOM) + '_' + normalizedCoord.x + '_' + normalizedCoord.y + '.jpg';
        } else {
          return "/assets/map/_empty.jpg";
        }
      },
      tileSize: new google.maps.Size(256, 256),
      maxZoom: MAX_ZOOM,
      minZoom: 11
    });

    map = new google.maps.Map(document.getElementById('map'), map_options);
    map.mapTypes.set('custom', customMapType);
    map.overlayMapTypes.insertAt(0, customMapType);
    map.setMapTypeId('custom');

   var allowedBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(-0.3483846177618207, 0.0000858306884765625),
      new google.maps.LatLng(-0.005064010613521995, 0.35302162170410156));

    var lastValidCenter = map.getCenter();

    google.maps.event.addListener(map, 'center_changed', function() {
      if (allowedBounds.contains(map.getCenter())) {
          lastValidCenter = map.getCenter();
          return;
      }

      map.panTo(lastValidCenter);
    });

    filters();
  };

  var set_map_id = function(id) {
    map_id = id;
  };

  var click_handler = function() {
    google.maps.event.addListener(map, "click", function(event) {
      place_marker(event.latLng);
    });
  };

  var add_note_box = function(marker, enabled) {
    enabled  = typeof enabled !== 'undefined' ? enabled : true;

    var disabled = "", del = "";

    if(enabled == false)
      disabled = "disabled=disabled"
    else
      del = '<a class="delete" href="#"><i class="icon-trash"></i></a>';

    var box = document.createElement("div");
    box.className = "note_box";
    box.innerHTML = '<div class="popover fade right in" style="top: -48px; left: 60px; display: block; "><div class="arrow"></div><div class="popover-inner"><div class="popover-content"><textarea ' + disabled + ' name="note" class="note" /></textarea><a class="close" href="#">&times;</a>' + del + '<a class="status" href="#"><i class="icon-check"></i></a></div></div>';

    $(box).find('.note').val(marker.note);

    if(enabled) {
      $(box).find('.note').keypress(function(e) {
        if (e.which == 13) {
          e.preventDefault();
          return false;
        }
      }).keyup(function(e) {
        if($(this).val().length > 92)
          $(this).val($(this).val().substr(0, 92));
      });

      $(box).find('.delete').click(function() {
        remove_current_marker();
        return false;
      });

      var timeout;
      $(box).find('.note').bind('textchange', function () {
        clearTimeout(timeout);
        $(box).find('.status').fadeIn();
        timeout = setTimeout(function () {
          $.ajax({
            url: '/notes',
            type: 'PUT',
            data: {
              marker_id: current_marker_id,
              content: $(box).find('.note').val()
            },
            success: function() {
              $(box).find('.status').fadeOut();
            }
          });
        }, 1000);
      });
    }

    var box_options = {
      content: box,
      disableAutoPan: false,
      maxWidth: 0,
      pixelOffset: new google.maps.Size(-35, 0),
      zIndex: null,
      closeBoxURL: "",
      infoBoxClearance: new google.maps.Size(1, 1),
      isHidden: false,
      pane: "floatPane",
      enableEventPropagation: false,
      id: 'marker_' + marker.id
    }

    var ib = new InfoBox(box_options);

    google.maps.event.addListener(marker, 'dragend', function() {
      update_marker(marker);
    });

    google.maps.event.addListener(marker, 'dragstart', function() {
      current_marker = marker;
      current_marker_id = marker.id.replace("marker_","");
    });

    google.maps.event.addListener(marker, "click", function(event) {
      current_marker = marker;
      current_marker_id = marker.id.replace("marker_","");
      current_info_box = ib;
      ib.open(map, this);
    });

    $(box).find('.close').click(function() {
      ib.close(map, marker);
      return false;
    });

  };

  var add_box = function(marker, enabled) {
    type = marker.icon.replace("/assets/tiles/","").replace(".png", "")
    if(type == "note")
      add_note_box(marker);
    else
      add_delete_box(marker);
  };

  var add_delete_box = function(marker) {
    var box = document.createElement("div");
    box.className = "info";
    box.innerHTML = "<a class='delete' href='#'><i class='icon-cancel'></i></a>" +
                    "<a class='report' href='#'><i class='icon-exclamation'></i></a>";

    $(box).find('.delete').click(function() {
      remove_current_marker();
      return false;
    });

    var box_options = {
      content: box,
      disableAutoPan: false,
      maxWidth: 0,
      pixelOffset: new google.maps.Size(-25, 0),
      zIndex: null,
      closeBoxURL: "/assets/tiles/close.png",
      infoBoxClearance: new google.maps.Size(1, 1),
      isHidden: false,
      pane: "floatPane",
      enableEventPropagation: false,
      id: 'marker_' + marker.id
    }

    var ib = new InfoBox(box_options);

    google.maps.event.addListener(marker, 'dragend', function() {
      update_marker(marker);
    });

    google.maps.event.addListener(marker, 'dragstart', function() {
      current_marker = marker;
      current_marker_id = marker.id.replace("marker_","");
    });

    google.maps.event.addListener(marker, "click", function(event) {
      current_marker = marker;
      current_marker_id = marker.id.replace("marker_","");
      current_info_box = ib;
      ib.open(map, this);
    });
  };

  return {
    add_marker: add_marker,
    add_draggable_marker: add_draggable_marker,
    add_server_marker: add_server_marker,
    remove_current_marker: remove_current_marker,
    place_marker: place_marker,
    get_marker_id: get_marker_id,
    click_handler: click_handler,
    clear_markers: clear_markers,
    set_map_id: set_map_id,
    toolshed: toolshed,
    icon: icon,
    init: init
  };
}();


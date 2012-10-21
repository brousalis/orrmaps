orrmaps.server = function() {
  var init = function(server) {
    $.ajax({
      url: '/server_maps',
      type: 'post',
      data: {name: server},
      success: function(data) {
        orrmaps.map.init();
        orrmaps.map.set_map_id(data.map_id)

        if (data != null) {
          for (var i=0; i < data.length; i++) {
            if(data[i].points != "[]") {
              points = $.parseJSON(data[i].points);
              for (var j=0; j < points.length; j++) {
                orrmaps.map.add_server_marker(points[j], data[i].likes); 
              }
            }
          }
        }

        orrmaps.map.cluster_markers();
        orrmaps.alert.init("Like server maps with accurate nodes to highlight them on this map.")
      }
    });
  };
  
  return {
    init: init
  };
}();

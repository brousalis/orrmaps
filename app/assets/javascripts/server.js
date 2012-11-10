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
          maps = data.data
          total_like_count = data.total_like_count

          for (var i=0; i < maps.length; i++) {
            if(maps[i].points != []) {
              points = maps[i].points
              for (var j=0; j < points.length; j++) {
                orrmaps.map.add_server_marker(points[j], maps[i].likes, total_like_count);
              }
            }
          }
        }

        //orrmaps.map.cluster_markers();
        //orrmaps.alert.init("Like server maps with accurate nodes to highlight them on this map.")
      }
    });
  };
  
  return {
    init: init
  };
}();

orrmaps.index = function() {
  var init = function() { 
    $.get('/maps', function(data) {
      orrmaps.map.init();
      orrmaps.map.click_handler();
      orrmaps.map.set_map_id(data.map_id)
      orrmaps.map.toolshed();

      points = $.parseJSON(data.points);
      if (points != null) {
        for (var i=0; i < points.length; i++) {
          orrmaps.map.add_draggable_marker(points[i]); 
        }
      }
    });
  };

  return {
    init: init
  };
}();

 

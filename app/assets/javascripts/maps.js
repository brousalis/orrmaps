orrmaps.maps = function() {
  var init = function() { 
    var url = '/' + $('#map').attr('name').replace('_','\/');
    $.post(url, function(data) {
      orrmaps.map.init();
      orrmaps.map.set_map_id(data.map_id);

      if (data != null) {
        for (var i=0; i < data.length; i++) {
          orrmaps.map.add_marker(data[i]); 
        }
      }
    });
  };
   
  return {
    init: init
  };
}();

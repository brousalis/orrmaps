orrmaps.servers = function() {
  var init = function() {
    if(window.location.pathname == '/') $('.your').addClass('active');
    if(window.location.pathname.indexOf('server') > -1) $('.serv').addClass('active');
    $('.servers li a').live('click', function() {
      $.ajax({
        type: "post",
        url: "/servers",
        data: { server: $(this).attr("title") },
        success: function(json) {
          if(json.location) window.location = json.location
        },
        dataType: "json"
      }); 
    }); 
  };

  return {
    init: init,
  };
}();
 

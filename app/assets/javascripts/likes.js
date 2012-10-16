orrmaps.likes = function() {
  var init = function() {
    $('.like').live('click', function() {
      $.ajax({
        type: "post",
        url: "/likes",
        data: { map_id: $(this).attr("title") },
        success: function(json) {
          $('.like span').html(json.count);
          if(json.status == "success") {
            $('.like').effect("bounce", { times:1, distance: 5 }, 100);
            $('.like i').addClass('liked');
          } else if(json.status == "failure") {
            $('.like').effect("bounce", { direction: "down", times:1, distance: 5 }, 100);
            $('.like i').removeClass('liked');
          } else if(json.status == "own") {
            $('.like').effect("shake", { times:3, distance: 2 }, 50);
          }
        },
        dataType: "json"
      }); 
    }); 
  };

  return {
    init: init,
  };
}();
  

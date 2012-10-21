orrmaps.ui = function() {
  var open = function() { $('#sign_in').modal('show'); };
  var close = function() { $('#sign_in').modal('hide'); };

  var handle_submit = function() {
    $("#new_user").submit(function(e){
      e.preventDefault(); 
      $.ajax({
        type: "post",
        url: "/users",
        data: serialize($(this)),
        success: function(json){
          if(json.location) window.location = json.location
          $('#new_user .error').html(json.errors);
          $('#new_user .errors').fadeIn();
        },
        dataType: "json"
      });
      return false;
    });
  };

  var likes = function() {
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

  var alerts = function() {
    $('#footer .close').live('click', function() {
      $('#footer').fadeOut();
    });
    setTimeout(function() {
      $('#footer').fadeOut();
    }, 12000); 
  };

  var sidebar = function() {
   $('.top_rated, #pageslide .close').live('click', function() {
      $('#pageslide').toggle('slide', {direction: 'left'}, 500);
      $('.rated').toggleClass('active');
    });
  };

  var servers = function() {
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

  var init = function() {
    $('#sign_in').modal({keyboard: false, show: false});
    $('input').attr('autocomplete', 'off');

    handle_submit();
    alerts();
    sidebar();
    servers();
    likes();
  };

  var serialize = function() {
    var values = {}
    $("#new_user input").each( function(){
      values[this.name] = $(this).val();
    });
    values["server"] = $('.server').text();
    return values;
  };

  return {
    open: open,
    handle_submit: handle_submit,
    serialize: serialize,
    close: close,
    init: init
  };
}();
 

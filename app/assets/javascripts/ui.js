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
        url: "/like",
        data: { map_id: $(this).attr("title") },
        success: function(json) {
          $('.likes span').html(json.count);
          if(json.status == "success") {
            //$('.like').effect("bounce", { times:1, distance: 5 }, 100);
            if(!$('.dislike i').hasClass('disliked')) {
              $('.like i').toggleClass('liked');
            }
            $('.dislike i').removeClass('disliked');
          } else if(json.status == "own") {
            $('.likes').effect("shake", { times:3, distance: 2 }, 50);
          }
        },
        dataType: "json"
      });
    });
    $('.dislike').live('click', function() {
      $.ajax({
        type: "post",
        url: "/dislike",
        data: { map_id: $(this).attr("title") },
        success: function(json) {
          $('.likes span').html(json.count);
          if(json.status == "success") {
            //$('.dislike').effect("bounce", { direction: "down", times:1, distance: 5 }, 100);
            if(!$('.like i').hasClass('liked')) {
              $('.dislike i').toggleClass('disliked');
            }
            $('.like i').removeClass('liked');
          } else if(json.status == "own") {
            $('.likes').effect("shake", { times:3, distance: 2 }, 50);
          }
        },
        dataType: "json"
      });
    }); 
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

    faqs();
    handle_submit();
    servers();
    likes();
  };

  var faqs = function() {
    $('#questions li a.question').live('click', function() {
      $(this).parent().toggleClass('open');
    });
    $('.heart a').live('click', function() {
      $("a[href='#donate']").tab('show')
    });
  }

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

orrmaps.alert = function() {
  var init = function(message) {
    $('#footer .msg').html(message);
    $('#footer').fadeIn();

    $('#footer .close').live('click', function() {
      $('#footer').fadeOut();
    });

    setTimeout(function() {
      $('#footer').fadeOut();
    }, 5000);
  };

  return {
    init: init
  };
}();
